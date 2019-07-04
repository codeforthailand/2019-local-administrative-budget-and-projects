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

import globalStyles from "../styles/global.module.css"
import {array2lookup} from "../utils"

import axios from 'axios'
import {labelConstant, db} from "../constant"

const RD3Component = rd3.Component;

const regionLookup = array2lookup(labelConstant.region)

const filterOptions = [
  {
    desc: "ภาพรวมทั้งประเทศ",
    key: "one"
  },
  {
    desc: "มูลค่าโครงการรวม",
    key: "budget"
  },
  {
    desc: "ภูมิภาคที่ได้รับโครงการส่วนใหญ่",
    key: "region"
  },
  {
    desc: "จำนวนโครงการที่ได้",
    key: "totalProjects"
  },
  {
    desc: "อัตราส่วนได้โครงการแบบเฉพาะเจาะจง",
    key: "moral"
  }
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
    if(d3Dom.node){
     d3Dom.doSimulate({key: currentCat, restart: true})
    }

    refPager.current.goToPage(filterOptions.findIndex(s => s.key === currentCat))
  }, [d3Dom, currentCat])

  useEffect(() => {
    if(currentPage < filterOptions.length){
      setCurrentCat(filterOptions[currentPage].key)
    } 

    refPager.current.goToPage(currentPage)
  }, [currentPage])

  useEffect(() => {
    refPager.current.goToPage(filterOptions.findIndex(s => s.key == currentCat))
  }, [currentCat])

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
          <Page header="เปิดขุมทรัพย์องค์การปกครองส่วนท้องถิ่น">
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
          <Page>คำอธิบาย ของ {filterOptions[3].desc}</Page>
          <Page>คำอธิบาย ของ {filterOptions[4].desc}</Page>
          <div style={{ paddingTop: "20vh"}}>
            <div style={{
              height: "80vh",
              paddingLeft: "10%", paddingTop: "10%",
              background: "black", color: "white"
            }}>
              <b>โครงการนี้เป็นส่วนหนึ่งของ .... </b> <br/>
              <b>คณะผู้จัดทำ</b> ชื่อ นามสกุล (หน้าที่) <br/>
              <b>พาร์ทเนอร์</b> <br/>
              <b>ขอบคุณข้อมูลจาก ...</b> <br/>
            </div>
          </div>
        </ReactPageScroller>
      </div>
      <div style={{
          marginTop: "10vh", position: "absolute", top: "0px",
          pointerEvents: "none"
        }}
        className={`${globalStyles.vizElement} ${currentPage < filterOptions.length? '': globalStyles.hide }`}
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
            // border: "1px solid #eee",
            float: "left", padding: "20px"
          }}>
          <RD3Component data={d3Dom.node}/>
        </div>
      </div>
    </Layout>
  )

}

export default IndexPage