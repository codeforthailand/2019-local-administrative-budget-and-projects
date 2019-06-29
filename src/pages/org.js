import axios from "axios"
import {window} from 'browser-monads'

import React, {useState, useEffect, useRef} from "react"
import rd3 from 'react-d3-library'
import ReactPageScroller from "react-page-scroller";

import Layout from "../components/layout"
import Placeholder from '../components/placholder'
import bipartite from '../bipartite'
import BipartiteGraph from '../bp'

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
  ]
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

const IndexPage = () => {
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
      const sourceUrl = "data/"+source+".json"
      console.log(sourceUrl)
      const result = await axios(sourceUrl)
      setData(result.data)
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
        <h2>บ.​ อะไรดี</h2>

        ได้รับโครงการรัฤทั้งสิ้น ... โครงการก
        โดยโครงการที่มีมูลค่าสูงสุด 5 อันดับแรกคือ 
        <p>
        1.
        2.
        3.
        4.
        5
        </p>

        เกี่ยวข้องกับ นาย ...
      </div>

    </Layout>
  )
}

export default IndexPage
