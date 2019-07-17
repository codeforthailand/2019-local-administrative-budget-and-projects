import React, {useState, useEffect, useRef, useCallback} from "react"

import { navigate } from "gatsby"
import ReactPageScroller from "react-page-scroller";
import rd3 from 'react-d3-library'

import Layout from "../components/layout"
import SEO from "../components/seo"

import CircleBlob from "../d3-components/circle-blob"
import globalStyles from "../styles/global.module.css"

import Part1 from "../pages/part1"
import Part2 from "../pages/part2"
import Part3 from "../pages/part3"
import Part4 from "../pages/part4"
import Part5 from "../pages/part5"
import Part6 from "../pages/part6"
import Part7 from "../pages/part7"
import Part8 from "../pages/part8"

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
    desc: "ขอบเขตงานเกี่ยวข้องกับโครงการด้านโยธา",
    key: "doCivilProjects"
  },
  {
    desc: "ภูมิภาคที่ได้รับโครงการส่วนใหญ่",
    key: "region"
  },
]

const IndexPage = () => {

  const [d3Dom, setd3Dom] = useState({})
  const [currentPage, setCurrentPage] = useState(0)
  const [highlightCategory, setHighlightCategory] = useState(0)
  const refPager = useRef()

  const [totalOrgs, setTotalOrgs] = useState(0)

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
            region: regionLookup[d['majorityRegion']],
            doCivilProjects: Math.random() > 0.7 ? 0 : 1, // this is a mock
          }
        }
      })

      const obj = CircleBlob({data, navigate})
      setd3Dom(obj)
      setTotalOrgs(data.length)

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
    const relIx = currentPage - globalConfig.mainVizPageNo
    if(d3Dom.node && relIx >= 0){
      d3Dom.setCircleHighlight(
        filterOptions[relIx].key,
        globalConfig.purchaseMethods[highlightCategory]
      )
    }
  }, [d3Dom, highlightCategory])

  const movePageBy = (diff) => {
    refPager.current.goToPage(currentPage + diff) 
  }

  const handleUserKeyPress = useCallback(event => {
    const { key } = event
    if(key === "n" || key === "ArrowRight"){
      movePageBy(1)
    } else if(key === "p" || key === "ArrowLeft") {
      movePageBy(-1)
    } else if(key === "g") {
      const pageNo = parseInt(
        prompt(`Please input page number (1-${globalConfig.pageTitles.length})`)
      )
      refPager.current.goToPage(pageNo-1)
    }
  }, [currentPage]);

  useEffect(() => {
      window.addEventListener('keydown', handleUserKeyPress);
    return () => {
      window.removeEventListener('keydown', handleUserKeyPress);
    };
  }, [handleUserKeyPress]);

  return (
    <Layout>
      <SEO title="Home"/>
      <div style={{position: "absolute", width: "100%", top: "0px"}}>
        <ReactPageScroller 
          animationTimer={1000}
          containerWidth="100%"
          containerHeight="100vh"
          ref={refPager} 
          pageOnChange={(e) => setCurrentPage(e-1)}
        >
          <Part1 currentPage={currentPage}/>
          <Part2 currentPage={currentPage}/>
          <Part3/>
          <Part4 currentPage={currentPage}/>
          <Part5/>
          <Part6 totalOrgs={totalOrgs}/>
          <Part7/>
          <Part8/>
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
              width: "30vh", textAlign: "center", display: "inline-block",
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