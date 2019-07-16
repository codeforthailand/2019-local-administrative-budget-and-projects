import React, {useState, useEffect, useRef} from "react"

import { navigate } from "gatsby"
import ReactPageScroller from "react-page-scroller";
import rd3 from 'react-d3-library'

import Layout from "../components/layout"
import SEO from "../components/seo"
import Placeholder from "../components/placeholder"
import {budget2category, projectCount2Cat} from "../dataUtils"

import CircleBlob from "../d3-components/circle-blob"
import globalStyles from "../styles/global.module.css"

import Page from "../components/page"
import Reference from "../components/reference"
import Part1 from "../pages/part1"
import Part2 from "../pages/part2"
import Part3 from "../pages/part3"

import Part5 from "../pages/part5"

import CreditPage from "../pages/credit"

import { default as utils } from "../utils"

import axios from 'axios'
import {labelConstant, db, globalConfig} from "../constant"

import sizeLegendImage from "../images/size-legend.svg"

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
  const [currentPage, setCurrentPage] = useState(0)
  const [highlightCategory, setHighlightCategory] = useState(0)
  const refPager = useRef()

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
      d3Dom.doSimulate({
        key: filterOptions[relIx].key,
        restart: true,
        highlightKey: globalConfig.purchaseMethods[highlightCategory]
      })
    }

  }, [d3Dom, currentPage])

  useEffect(() => {
    if(d3Dom.node){
      const relIx = currentPage - globalConfig.mainVizPageNo
      d3Dom.setCircleHighlight(
        filterOptions[relIx].key,
        globalConfig.purchaseMethods[highlightCategory]
      )
    }
  }, [highlightCategory])

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
          <Part1 currentPage={currentPage}/>
          <Part2 currentPage={currentPage}/>
          <Part3/>

          {/* <Page header="คุณรู้หรือไม่? ในปี 2561 องค์กรปกครองท้องถิ่นไทยทั้งสิ้น 216,971 ล้านบาท">
            <Placeholder name="graphic" width="100%" height="30vh"/>
            <div>
              <p>
              เจาะลึกลงไป จาก 12 รูปแบบการจัดซื้อจัดจ้างภาครัฐพบว่ามี 6 ... <Reference url="abc.org"/>
              </p>
            </div>
          </Page> */}

          <Page header="สัดส่วนการใช้งบในแต่ละด้านของอปท.">
            <Placeholder name="รอ graphic จากพี่แปม" width="100%" height="30vh"/>
            <div>
              <p>...</p>
            </div>
          </Page>

          {/* <Page header="...">
            <Placeholder name="graphic" width="100%" height="30vh"/>
            <div>
              <p>งบก่อสร้าง ซ่อม ถนน เป็นปัญหาใหญ่ที่ สตง.ตรวจพบเสมอ อดีตผู้ว่า...</p>
            </div>
          </Page> */}
          <Part5/>

          <Page header="50 นิติบุคคลที่มีขีดความสามารถได้โครงการอปท.มากที่สุด">
            <span/>
            <div>
              <div>
                นิติบุคคล ที่ได้โครงการขององค์การปกครองส่วนท้องถิ่น มากกว่า ฿20M มี xxx จาก x,xxx
              </div>
              <ul>
                <li>
                  เฉดสีบอกถึงอัตราส่วนโครงการที่ได้ว่าเป็นแบบเฉพาะเจาะจงมากน้อยแค่ไหน อัตราส่วนสูงแดงมาก
                </li>
                <li>
                  ขนาดบอกมูลค่าโครงการรวม
                </li>
              </ul>
            </div>
          </Page>

          <Page header="50 นิติบุคคลที่มีขีดความสามารถได้โครงการอปท.มากที่สุด">
            <span/>
            <div>
              คำอธิบาย ของ {filterOptions[1].desc}
            </div>
          </Page>

          <Page header="50 นิติบุคคลที่มีขีดความสามารถได้โครงการอปท.มากที่สุด">
            <span/>
            <div>
              คำอธิบาย ของ {filterOptions[2].desc}
            </div>
          </Page>

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
          <div style={{
              float: "left", padding: "20px"
            }}>
            <RD3Component data={d3Dom.node}/>
          </div>

        <div style={{
            position: "fixed", fontSize: "10px",
            left: "5vh", bottom: "5vh", 
            pointerEvents: "all"
          }}
        >
            <div>
              <img style={{height: "30px", marginBottom: 0, verticalAlign: "middle"}}
                src={sizeLegendImage} alt="สัดส่วนมูลค่าโครงการทั้งหมด"/>
                สัดส่วนมูลค่าโครงการทั้งหมด
            </div>
            <div>
              เลือกไฮไลท์สีตามสัดส่วนโครงการแบบ {` `}
              <select
                value={highlightCategory}
                onChange={(e) => {
                  setHighlightCategory(e.target.value)
                }}
              >
                {
                  globalConfig.purchaseMethods.map( (m, i) => {
                    return <option key={i} value={i}>
                      {m.name}
                    </option>
                  })
                }
              </select>
            </div>
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