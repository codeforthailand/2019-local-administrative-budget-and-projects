import React, {useState, useEffect, useRef} from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import CircleBlob from "../d3-components/circle-blob"
import {generateBubbleData} from "../dataUtils"
import { Link } from "gatsby"
import ReactPageScroller from "react-page-scroller";

import rd3 from 'react-d3-library'
import Page from "../components/page"

import { navigate } from "gatsby"


const RD3Component = rd3.Component;

const filterOptions = [
  {
    desc: "ภาพรวมทั้งประเทศ",
    key: "oneCategory"
  },
  {
    desc: "มูลค่าโครงการรวม",
    key: "budgetCategory"
  },
  {
    desc: "ภูมิภาคที่ได้รับโครงการส่วนใหญ่",
    key: "regionCategory"
  },
  {
    desc: "จำนวนโครงการที่ได้",
    key: "totalProjectCategory"
  }
]

const SecondPage = () => {

  const [d3Dom, setd3Dom] = useState({node: "", simulation: ""})
  const [currentCat, setCurrentCat] = useState(filterOptions[0].key)
  const refPager = useRef()

  useEffect(() => {
    const data = generateBubbleData({numNodes: 100})

    const obj = CircleBlob({data, navigate})
    setd3Dom(obj)

    return obj.cleanUp
  }, [])

  useEffect(() => {
    console.log(d3Dom)
    if(d3Dom.node){
      console.log(currentCat)
      d3Dom.doSimulate({key: currentCat, restart: true})
    }

    refPager.current.goToPage(filterOptions.findIndex(s => s.key == currentCat))
  }, [d3Dom, currentCat])

  return (
    <Layout>
      <SEO title="Home"/>
      <div style={{marginTop: "50px"}}>
        <div style={{position: "absolute", margin: "20px 0px 0px 20px"}}>
          จำแนกตามนิติบุคคลที่เกี่ยวข้องตาม
          <select onChange={(e) => setCurrentCat(e.target.value)} value={currentCat}>
            { filterOptions 
              .map( c => <option key={c.key} value={c.key}>{c.desc}</option> )
            }
          </select>
        </div>
        <div style={{border: "1px solid #eee", float: "left", padding: "20px"}}>
          <RD3Component data={d3Dom.node}/>
        </div>
        <div style={{float: "left", width: "30%", background: "#ddd"}}>
          <ReactPageScroller 
            containerWidth={384}
            containerHeight={400}
            ref={refPager} 
            pageOnChange={(e) => {
              setCurrentCat(filterOptions[e-1].key)
            }}
          >
            {
              filterOptions.map( (d) => {
                return (
                  <Page key={d.key}>คำอธิบายสำหรับ {d.desc} </Page>
                )
              })
            }

            {/* <Page>
              Credit(s)
            </Page> */}
          </ReactPageScroller>

          {/* <div style={{padding: "20px"}}>
            <b>คำอธิบาย ตาม {currentCat}</b>
            <p>
              ...
            </p>
          </div> */}
        </div>
      </div>
    </Layout>
  )

}

export default SecondPage
