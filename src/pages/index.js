import axios from "axios"
import {window} from 'browser-monads'

import React, {useState, useEffect, useRef} from "react"
import rd3 from 'react-d3-library'
import ReactPageScroller from "react-page-scroller";

import Layout from "../components/layout"
import Placeholder from '../components/placholder'
import Page from "../components/page"
import bipartite from '../bipartite'
import BipartiteGraph from '../bp'

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
  const refPager = useRef()

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
    const something = BipartiteGraph({
      layoutData, width, height
    })

    setd3Dom(something)
    refPager.current.goToPage(0)
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
      <div style={{position: "absolute", width: "50%", paddingTop: "20px", paddingLeft: "10px"}}>
        <h2>นิติบุคคลที่มีส่วนรวมในโครงการขององค์การปกครองส่วนท้องถิ่น</h2>
        <select onChange={(e) => setSource(e.target.value)}>
          {
            availableSources.map(({name, value}) => {
              return <option key={value} value={value}>{name}</option>
            })
          }
        </select>
        <RD3Component data={d3Dom}/>
      </div>

      <div style={{background: "blue", width: "40%", marginLeft: "60%"}}>
        <ReactPageScroller 
          containerWidth={windowSize.width * 0.4}
          ref={refPager} 
          // animationTimer={500}
        >
          <Page>
            คำอธิบายสั้นๆ 
          </Page>
          <Page>
            วิเคราะห์ 1
          </Page>
          <Page>
            วิเคราะห์ 2
          </Page>
          <Page>
            Credit(s)
          </Page>
        </ReactPageScroller>
      </div>

    </Layout>
  )
}

export default IndexPage
