import React, {useState, useEffect, useRef} from "react"

import { navigate } from "gatsby"
import { useHotkeys } from 'react-hotkeys-hook';
import ReactPageScroller from "react-page-scroller";
import rd3 from 'react-d3-library'

import Layout from "../components/layout"
import SEO from "../components/seo"
import CircleBlob from "../d3-components/circle-blob"
import {budget2category, projectCount2Cat} from "../dataUtils"
import Page from "../components/page"
import CreditPage from "../pages/credit"

import globalStyles from "../styles/global.module.css"

import { default as utils } from "../utils"

import axios from 'axios'
import {labelConstant, db, globalConfig} from "../constant"

const RD3Component = rd3.Component;

const regionLookup = utils.array2lookup(labelConstant.region)

const filterOptions = [
  {
    desc: "ภาพรวมทั้งประเทศ",
    key: "one"
  },
  {
    desc: "ภูมิภาคที่ได้รับโครงการส่วนใหญ่",
    key: "region"
  },
  {
    desc: "ตามสัดส่วนประเภทการจัดซื้อจัดจ้าง",
    key: "totalProjects"
  },
]

const IndexPage = () => {

  const [d3Dom, setd3Dom] = useState({node: "", simulation: ""})
  const [currentCat, setCurrentCat] = useState(filterOptions[0].key)
  const [currentPage, setCurrentPage] = useState(0)
  const refPager = useRef()

  const changePage = (d) => {
    const newPage = currentPage + d
    if( newPage >= 0 && currentPage < (filterOptions.length+1)){
      setCurrentPage(newPage)
    }
  }

  const currentViz = () => globalConfig.vizAtPage[currentPage]

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(db.url)
      const data = result.data.map( (d, i) => {
        const budgetM = d['totalProjectBudget'] / 1e6
        const ratio = d['specificProjects'] / d['totalProjects']
        return {
          ...d,
          ratio: ratio,
          size: budgetM,
          category: {
            one: 0,
            budget: budget2category(budgetM),
            region: regionLookup[d['majorityRegion']],
            totalProjects: projectCount2Cat(d['totalProjects']),
            moral: ratio > 0.3 ? 0 : 1
          }
        }
      })

      const obj = CircleBlob({data, navigate})
      setd3Dom(obj)

      return obj
    };

    const obj = fetchData();
    return () => {
      obj.then(d => d.cleanUp())
    }
  }, [])

  useEffect(() => {
    if(d3Dom.node && currentViz() === "circleBlob"){
      const relIx = currentPage - globalConfig.mainVizPageNo
      d3Dom.doSimulate({key: filterOptions[relIx].key, restart: true})
    }

  }, [d3Dom, currentPage])

  const movePageBy = (diff) => {
    refPager.current.goToPage(currentPage + diff) 
  }

  return (
    <Layout>
      <SEO title="Home"/>
      <div style={{position: "absolute", width: "100%", top: "0px"}}>
        <ReactPageScroller 
          animationTimer={1000}
          containerWidth="100%"
          containerHeight="100vh"
          ref={refPager} 
          pageOnChange={(e) => {
            setCurrentPage(e-1)
          }}
        >
          <Page header="หน้าแรก (1)"></Page>
          <Page header="ประเภทการจัดซื้อจัดจ้าง (2)"></Page>
          <Page header="ประเภทการจัดซื้อจัดจ้าง (2.1)">เน้น เฉพาะเจาะจง</Page>
          <Page header="สัดส่วนการใช้งบของอปท. (3)"></Page>
          <Page header="สัดส่วนการใช้งบของอปท. (3.1)">เน้น โครงการสร้างถนน</Page>
          <Page header="เปิดขุมทรัพย์องค์การปกครองส่วนท้องถิ่น (4)">
            <div>
              นิติบุคคล ที่ได้โครงการขององค์การปกครองส่วนท้องถิ่น มากกว่า ฿20M มี xxx จาก x,xxx
            </div>
            คำอธิบายทั่วไป​ (ทั้งประเทศ)
            <div>🔴 คือนิติบุคคล</div>
            <ul>
              <li>
                เฉดสีบอกถึงอัตราส่วนโครงการที่ได้ว่าเป็นแบบเฉพาะเจาะจงมากน้อยแค่ไหน อัตราส่วนสูงแดงมาก
              </li>
              <li>
                ขนาดบอกมูลค่าโครงการรวม
              </li>
            </ul>
          </Page>
          <Page>คำอธิบาย ของ {filterOptions[1].desc}</Page>
          <Page>คำอธิบาย ของ {filterOptions[2].desc}</Page>
          <CreditPage/>
        </ReactPageScroller>
      </div>
        <div style={{
            marginTop: "10vh", position: "absolute", top: "0px",
            pointerEvents: "none",
            display: `${currentViz() === "circleBlob" ? "block": "none"}`
          }}
          className={`${globalStyles.vizElement} ${currentPage - globalConfig.mainVizPageNo < filterOptions.length ? '': globalStyles.hide }`}
          >
          <div style={{position: "absolute", margin: "20px 0px 0px 20px", pointerEvents: "all"}}>
            จำแนกตามนิติบุคคลที่เกี่ยวข้องตาม
            <select onChange={(e) => setCurrentCat(e.target.value)} value={currentCat}>
              { filterOptions 
                .map( c => <option key={c.key} value={c.key}>{c.desc}</option> )
              }
            </select>
          </div>
          <div style={{
              float: "left", padding: "20px"
            }}>
            <RD3Component data={d3Dom.node}/>
          </div>
        </div>
        <div style={{
          position: "absolute", border: "1px solid gray",
          right: "5vh", bottom: "5vh", background: "white", borderRadius: "5px" }}>
          <span style={{
                padding: "5px", cursor: "pointer"
              }}
              onClick={() => movePageBy(-1)} 
            >
              ←
            </span>
          <span
            style={{
              width: "25vh", textAlign: "center", display: "inline-block",
              borderRight: "1px solid gray",
              borderLeft: "1px solid gray",
              fontSize: "10px",
              verticalAlign: "top",
            }}
            >
              {currentPage+1}/{globalConfig.pageTitles.length} {globalConfig.pageTitles[currentPage]}
          </span>
          <span style={{
                padding: "5px", cursor: "pointer"
              }}
              onClick={() => movePageBy(1)} 
            >
              →
            </span>
        </div>
    </Layout>
  )

}

export default IndexPage