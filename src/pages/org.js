import axios from "axios"

import React, {useState, useEffect} from "react"
import rd3 from 'react-d3-library'

import { useQueryParam, StringParam } from 'use-query-params';

import Layout from "../components/layout"
import bipartite from "d3-bipartite"
import BipartiteGraph from "../d3-components/bipartite"
import Link from "../components/link"

import Sugar from "sugar"

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
      const result = await axios(db.companyProfile(tin))
      
      const org = result.data
      console.log(org)

      const dd = {}

      org.projects
        .forEach(p => {
          const k = `${p.purchaseMethod}::${p.province}`
          if (k in dd) {
            dd[k] += p.projectValue / 1e6
          } else {
            dd[k] = p.projectValue / 1e6
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

      const k = Math.min(3, org.projects.length)
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
      <div style={{padding: "20px", marginTop: "5%"}}>
        {/* <div>
          <Link to="/">กลับไปหน้าแรก</Link> หรือ <Placeholder name="🔍 ค้นหา นิติบุคลลอื่นๆ"/>
        </div> */}
        <div style={{position: "absolute", width: "50%", paddingTop: "20px", paddingLeft: "10px"}}>
          <RD3Component data={d3Dom}/>
        </div>

        <div style={{width: "40%", marginLeft: "55%"}}>
          <div style={{fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem", marginTop: "0"}}>
            {orgProfile.name}
          </div>
          { orgProfile.projects &&  <span>
              ได้รับโครงการจากอปท.ต่างๆ ทั้งสิ้น {orgProfile.projects.length} โครงการ
              {` `}ซึ่งรวมมูลค่าทั้งหมด {utils.moneyFormat(orgProfile.projects.map(p => p.projectValue).reduce( (a,b) => a+b, 0)/1e6)}
              {` `}โดยโครงการที่มีมูลค่าสูงสุด {topKProjects.length} อันดับแรก คือ 
              <ul>
                {
                  topKProjects.map(p => {
                    return <li key={p.projectName} alt={p.projectName}>
                      <a style={{color: "black", textDecoration: "none"}}
                        href={`https://govspending.data.go.th/budget?tgsp=${p.projectId}`} target="_blank" rel="noopener noreferrer"
                      >
                        <b>{ Sugar.String.truncate(p.projectName, 60) }</b> <br/>
                        กับ {p.localAuthority}, {p.province} {` `} <br/>
                        โดยรูปแบบ {p.purchaseMethod} <br/>
                        มูลค่าโครงการ {utils.moneyFormat(p.projectValue/1e6)}<br/>
                      </a>
                      </li>
                  })
                }
              </ul> 
          </span>
          }

          { orgProfile.tin && <div style={{textDecoration: "underline", textAlign: "center"}}>
            <a style={{color: "black", textDecoration: "none"}}
              href={`https://datawarehouse.dbd.go.th/company/profile/${orgProfile.tin[3]}/${orgProfile.tin}`} rel="noopener noreferrer">
                ดูข้อมูลเพิ่มเติมของนิติบุคคลนี้จากกรมการค้าภายใน
            </a> <br/>
            <a style={{color: "black", textDecoration: "none"}}
               href={`https://govspending.data.go.th/budget?winner=${orgProfile.tin}`} rel="noopener noreferrer">
                ดูโครงการทั้งหมดจาก ภาษีไปไหน?
            </a>
            </div>
          }
        </div> 
      </div>
    </Layout>
  )
}

export default OrgPage
