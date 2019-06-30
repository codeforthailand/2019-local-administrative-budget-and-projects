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

import globalStyles from "../styles/global.module.css"

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
  const [currentPage, setCurrentPage] = useState(0)
  const refPager = useRef()

  useEffect(() => {
    const data = generateBubbleData({numNodes: 100})

    const obj = CircleBlob({data, navigate})
    setd3Dom(obj)
    window.doSimulate = obj.doSimulate

    return obj.cleanUp
  }, [])

  useEffect(() => {
    if(d3Dom.node){
      d3Dom.doSimulate({key: currentCat, restart: true})
    }

    refPager.current.goToPage(filterOptions.findIndex(s => s.key == currentCat))
  }, [d3Dom, currentCat])

  useEffect(() => {
    if(currentPage < filterOptions.length){
      setCurrentCat(filterOptions[currentPage].key)
    }
  }, [currentPage])

  return (
    <Layout>
      <SEO title="Home"/>
      <div style={{position: "absolute", width: "100%", top: "0px"}}>
        <ReactPageScroller 
          containerWidth="100%"
          containerHeight="100vh"
          ref={refPager} 
          pageOnChange={(e) => {
            setCurrentPage(e-1)
          }}
        >
          <Page header="เปิดขุมทรัพย์">คำอธิบายทั่วไป​ (ทั้งประเทศ)</Page>
          <Page>คำอธิบาย ของ {filterOptions[1].desc}</Page>
          <Page>คำอธิบาย ของ {filterOptions[2].desc}</Page>
          <Page>คำอธิบาย ของ {filterOptions[3].desc}</Page>
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
        }}
        className={`${globalStyles.vizElement} ${currentPage < filterOptions.length? '': globalStyles.hide }`}
        >
        <div style={{position: "absolute", margin: "20px 0px 0px 20px"}}>
          จำแนกตามนิติบุคคลที่เกี่ยวข้องตาม
          <select onChange={(e) => setCurrentCat(e.target.value)} value={currentCat}>
            { filterOptions 
              .map( c => <option key={c.key} value={c.key}>{c.desc}</option> )
            }
          </select>
          <span className={globalStyles.textRed}>Page {currentPage}</span>
        </div>
        <div style={{border: "1px solid #eee", float: "left", padding: "20px"}}>
          <RD3Component data={d3Dom.node}/>
        </div>
      </div>
    </Layout>
  )

}

export default SecondPage
