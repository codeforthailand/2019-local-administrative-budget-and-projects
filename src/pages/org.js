import axios from "axios"

import React, {useState, useEffect, useRef} from "react"
import rd3 from 'react-d3-library'

import { useQueryParam, StringParam } from 'use-query-params';

import Layout from "../components/layout"
import Placeholder from "../components/placholder"
import bipartite from "d3-bipartite"
import BipartiteGraph from "../d3-components/bipartite"

import {db} from "../constant"
import { default as utils } from "../utils"

import { Link } from "gatsby"
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
  const [tin, setTin] = useQueryParam(
    'tin', StringParam, utils.defaultLocationSearch()
  );
  const [orgProfile, setOrgProfile] = useState({})

  const [d3Dom, setd3Dom] = useState()
  const [data, setData]= useState([])

  const padding = 10

  const windowWidthHeight = getWindowWidthHeight()
  const width =  windowWidthHeight.width * 0.4
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
      console.log(result.data)
      
      const org = result.data
        .filter(o => o.tin === tin)[0]

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

    };
    fetchData();
  }, [])

  return (
    <Layout>
      <div>
        <Link to="/">Back to Main</Link> หรือ <Placeholder name="ค้นหา นิติบุคลลอื่นๆ"/>
      </div>
      <div style={{position: "absolute", width: "50%", paddingTop: "20px", paddingLeft: "10px"}}>
        <RD3Component data={d3Dom}/>
      </div>

      <div style={{border: "1px solid #ddd", width: "40%", marginLeft: "60%"}}>
        <h2>{orgProfile.name}</h2>

        { orgProfile.projects &&  <span>
             ได้รับโครงการรัฤทั้งสิ้น {orgProfile.projects.length} โครงการ
        </span>
        }
        {/* โดยโครงการที่มีมูลค่าสูงสุด 5 อันดับแรกคือ 
        <p>
        1.
        2.
        3.
        4.
        5
        </p>

        เกี่ยวข้องกับ นาย ... */}
        <a href={`https://datawarehouse.dbd.go.th/company/profile/3/${orgProfile.tin}`} target="_blank">ข้อมูลเพิ่มเติมจาก DBD</a>
      </div>

    </Layout>
  )
}

export default OrgPage
