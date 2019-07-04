import axios from "axios"
import {window} from 'browser-monads'

import React, {useState, useEffect, useRef} from "react"
import rd3 from 'react-d3-library'
import ReactPageScroller from "react-page-scroller";
import { useQueryParam, StringParam } from 'use-query-params';

import Layout from "../components/layout"
import Placeholder from '../components/placholder'
import bipartite from '../bipartite'
import BipartiteGraph from '../bp'

import {db} from "../constant"

import { Link } from "gatsby"
const RD3Component = rd3.Component;

const datasource = {
  'north':[
    {
      source: "เชียงใหม่",
      target: "บริษัท A",
      value: 6631
    },
    {
      source: "เชียงราย",
      target: "หจก. B",
      value: 1004
    },
    {
      source: "ลำปาง",
      target: "บริษัท A",
      value: 512
    },
  ],
  'east':[
    {
      source: "ระยอง",
      target: "ระยองการช่าง",
      value: 3000
    },
    {
      source: "ตราด",
      target: "ระยองการช่าง",
      value: 1004
    },
    {
      source: "ชลบุรี",
      target: "หจก. ประธานพร",
      value: 8800
    },
  ],
  'org':[
    {
      source: "e-bidding",
      target: "เชียงใหม่",
      value: 6631
    },
    {
      source: "e-bidding",
      target: "เชียงราย",
      value: 1004
    },
    {
      source: "เฉพาะเจาะจง",
      target: "ลำปาง",
      value: 512
    },
    {
      source: "เฉพาะเจาะจง",
      target: "ลำพูน",
      value: 1024
    },
    {
      source: "เฉพาะเจาะจง",
      target: "พะเยา",
      value: 423
    },
    {
      source: "คัดเลือกพิเศษ",
      target: "พะเยา",
      value: 2400
    },
  ],
}

const getWindowWidthHeight = () => {
  return {
    width: window.innerWidth,
    height: window.innerHeight
  }
}

const availableSources = [
  {
    "value": "เทศบาลตำบลตาพระยา-สระแก้ว",
    "name" : "เทศบาลตำบลตาพระยา-สระแก้ว"
  },
  {
    "value": "องค์การบริหารส่วนตำบลท่างาม-ปราจีนบุรี",
    "name" : "องค์การบริหารส่วนตำบลท่างาม-ปราจีนบุรี"
  },
  {
    "value": "องค์การบริหารส่วนตำบลท่าตูม-ปราจีนบุรี",
    "name" : "องค์การบริหารส่วนตำบลท่าตูม-ปราจีนบุรี"
  },
  {
    "value": "chiangmai-top-20",
    "name" : "โครงการก่อสร้างในเชียงใหม่ (5 นิติบุคคลที่ได้โครงการมากสุด)"
  },
  {
    "value": "north-specific-vendor-budget-500k",
    "name" : "โครงการในจังหวัดภาคเหนือที่จัดซื้อจัดจ้างเป็นเฉพาะเจาะจงและมูลค่ารวมมากกว่า 500k"
  },
]

const OrgPage = () => {
  const [tin, setTin] = useQueryParam('tin', StringParam);
  const [orgProfile, setOrgProfile] = useState({})

  const [d3Dom, setd3Dom] = useState()
  const [data, setData]= useState([])
  const [source, setSource] = useState(availableSources[0].value)
  const [windowSize, setWindowSize] = useState({width: 0, height: 0})

  const padding = 10
  const width = window.innerWidth * 0.55
  const height = window.innerHeight * 0.5

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

    };
    fetchData();
  }, [source])

  useEffect(() => {
    const wh = getWindowWidthHeight()
    setWindowSize(wh)
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
