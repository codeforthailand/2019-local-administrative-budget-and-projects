import React, {useEffect, useState} from "react"

import { useStaticQuery, graphql } from "gatsby"

import rd3 from 'react-d3-library'

import Page from "../components/page"
import Reference from "../components/reference"
import VizPart2 from "../d3-components/part2"
import utils from "../utils";

import MediaQuery from 'react-responsive';

const RD3Component = rd3.Component

const PAGE_NO = 1

const Part2 = ({pageNo, currentPage}) => {
    const windowObj = utils.getWindowObj()
    const {allPurchaseMethodSummaryCsv} =  useStaticQuery(graphql`
      query {
        allPurchaseMethodSummaryCsv 
        {
          edges {
            node {
              id
              purchase_method_name
              project_money
            }
          }
        }
      }
    `)

    const data = allPurchaseMethodSummaryCsv.edges.map(n => {
        return {
            purchase_method_name: n.node.purchase_method_name,
            project_money: parseFloat(n.node.project_money) / 1e6
        }
    })

    const [viz, setViz] = useState({})
    useEffect(()=> {
        const obj = VizPart2({
          data,
          width: windowObj.innerWidth*0.5,
          height: windowObj.innerHeight*0.7
        })

        setViz(obj)
    }, [])

    useEffect( () => {
      if(viz.node){
        if(currentPage === pageNo){
          viz.display()
        } else {
          viz.reset()
        }
      }

    }, [viz, currentPage])

    return <div>
        <MediaQuery query="(orientation: portrait)">
          <Page header="รู้ให้ลึกประเภทการจัดซื้อ จัดจ้าง">
            <span></span>
            <span></span>
          </Page>
          <div>portrait</div>
          <div style={{marginTop: "0rem"}}>
              <RD3Component data={viz.node}/>
          </div>
        </MediaQuery>
        <MediaQuery query="(orientation: landscape)">
          <Page header="รู้ให้ลึกประเภทการจัดซื้อ จัดจ้าง">
              <div style={{marginTop: "0rem"}}>
                  <RD3Component data={viz.node}/>
              </div>
              <div>
                <div style={{ fontWeight: "bold", fontSize: "1.2rem", lineHeight: "1.5rem", marginTop: "6rem" }}>
                  เมื่อเจาะลึกรูปแบบการจัดซื้อจัดจ้าง 12 รูปแบบ พบว่ามี 6 รูปแบบที่นิยมนำมาใช้ โดยมีมูลค่าโครงการตั้งแต่หลักร้อย ถึงหมื่นล้านบาท และเกี่ยวข้องกับการจัดซื้อจัดจ้างโครงการใหญ่ในหลายพื้นที่
                </div>
                <div style={{marginTop: "1rem"}}>
                  <b>หมายเหตุ:</b> ระบบประกวดราคาอิเล็กทรอนิกส์ หรือ “อี-บิดดิ้ง” (e-Bidding) ถูกนำมาใช้มากที่สุด หลัง พ.ร.บ.จัดซื้อจัดจ้าง ปี 2560 ให้ใช้ระบบนี้แทนการประกวดราคาแบบ “อี-ออคชั่น” (e-Auction) เดิม <Reference url="https://www.matichon.co.th/news-monitor/news_1568156"/>
                </div>
              </div>
          </Page>
        </MediaQuery>
    </div>
}

export default Part2