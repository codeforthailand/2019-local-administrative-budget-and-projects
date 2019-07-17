import axios from "axios"

import React, {useState, useEffect} from "react"
import rd3 from 'react-d3-library'

import { useQueryParam, StringParam } from 'use-query-params';

import Layout from "../components/layout"
import bipartite from "d3-bipartite"
import BipartiteGraph from "../d3-components/bipartite"
import Link from "../components/link"

import {db} from "../constant"
import utils from "../utils"

const RD3Component = rd3.Component;

const getWindowWidthHeight = () => {
  if(typeof window !== 'undefined' && window) {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    }
  } else {
    return {
      width: 0,
      height: 0
    }
  }
}

const OrgPage = () => {
  // eslint-disable-next-line
  const [tin, _] = useQueryParam(
    'tin', StringParam, utils.defaultLocationSearch()
  );
  const [orgProfile, setOrgProfile] = useState({})

  const [d3Dom, setd3Dom] = useState()
  const [data, setData]= useState([])
  const [topKProjects, setTopKProjects]= useState([])

  const padding = 10

  const windowWidthHeight = getWindowWidthHeight()
  const width =  windowWidthHeight.width * 0.25
  const height = windowWidthHeight.height * 0.5

  const layout = bipartite() 
    .width(width)
    .height(height)
    .padding(padding)
    .source(d => d.source)
    .target(d => d.target)
    .value(d => d.value)

  useEffect(() => {
    const layoutData = layout(data)
    const bd = BipartiteGraph({
      layoutData, width, height
    })

    setd3Dom(bd)
  }, [data]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(db.url)
      
      const org = result.data
        .filter(o => o.tin === tin)[0]
      
        console.log(org)

      const dd = {}

      org.projects
        .forEach(p => {
          const k = `${p.purchase_method_name}::${p.province}`
          if (k in dd) {
            dd[k] += p.sum_price_agree / 1e6
          } else {
            dd[k] = p.sum_price_agree / 1e6
          }
        });

      const connections = Object.keys(dd).map( k => {
        const slugs = k.split("::")
        return {
            source: slugs[0],
            target: slugs[1],
            value: dd[k]
        }
      })

      setData(connections)
      setOrgProfile(org)

      const k = Math.min(5, org.projects.length)
      const topProjects = org.projects
        .slice()
        .sort( (a, b) => b.sum_price_agree - a.sum_price_agree)
        .slice(0, k)

      setTopKProjects(topProjects)

    };
    fetchData();
  }, [])

  return (
    <Layout>
      <div style={{padding: "20px"}}>
        {/* <div>
          <Link to="/">กลับไปหน้าแรก</Link> หรือ <Placeholder name="🔍 ค้นหา นิติบุคลลอื่นๆ"/>
        </div> */}
        <div style={{position: "absolute", width: "50%", paddingTop: "20px", paddingLeft: "10px"}}>
          <RD3Component data={d3Dom}/>
        </div>

        <div style={{width: "40%", marginLeft: "60%"}}>
          <h2>{orgProfile.name}</h2>

          { orgProfile.projects &&  <span>
              ได้รับโครงการจากองค์การปกครองส่วนท้องถ่ินต่างๆ ทั้งสิ้น {orgProfile.projects.length} โครงการ
              {` `}ซึ่งมีมูลค่ารวมทั้งสิ้น {utils.moneyFormat(topKProjects.map(p => p.sum_price_agree).reduce( (a,b) => a+b, 0)/1e6)}
              {` `}โดยโครงการที่มีมูลค่าสูงสุด {topKProjects.length} อันดับแรก คือ 
              <ul>
                {
                  topKProjects.map(p => {
                    return <li key={`${p.sum_price_agree}-${p.province}`}>
                      <Link href="#">
                        <b>ชื่อโครงการ </b>(มูลค่า {utils.moneyFormat(p.sum_price_agree/1e6)})<br/>
                        กับ อบต..., {p.province} {` `}
                        โดยรูปแบบ {p.purchase_method_name}
                      </Link>
                      </li>
                  })
                }
              </ul> 
          </span>
          }

          { orgProfile.tin && <div>
            <Link href={`https://datawarehouse.dbd.go.th/company/profile/${orgProfile.tin[3]}/${orgProfile.tin}`}>
                ดูข้อมูลเพิ่มเติมของนิติบุคคลนี้จากกรมการค้าภายใน
            </Link> <br/>
            <Link href={`https://govspending.data.go.th/budget?winner=${orgProfile.tin}`}>
                ดูโครงการทั้งหมดจาก ภาษีไปไหน?
            </Link>
            </div>
          }
        </div> 
      </div>
    </Layout>
  )
}

export default OrgPage
