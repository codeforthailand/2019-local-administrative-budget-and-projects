import React, {useEffect, useState} from "react"

import { useStaticQuery, graphql } from "gatsby"

import rd3 from 'react-d3-library'

import Page from "../components/page"
import Reference from "../components/reference"
import VizPart2 from "../d3-components/part2"


const RD3Component = rd3.Component

const PAGE_NO = 1

const Part2 = ({currentPage}) => {
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
        const obj = VizPart2(data)
        setViz(obj)
    }, [])

    useEffect( () => {
      if(viz.node){
        if(currentPage === PAGE_NO){
          viz.display()
        } else {
          viz.reset()
        }
      }

    }, [viz, currentPage])

    return <Page header="รู้ให้ลึกประเภทการจัดซื้อ จัดจ้าง">
        <div style={{marginTop: "5rem"}}>
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
        {/* <div>เจาะลึกลงไป จาก 12 รูปแบบการจัดซื้อจัดจ้างภาครัฐพบว่ามี 6 รูปแบบที่มีมูลค่าสูงตั้งแต่หลักหมื่นล้าน-ร้อยล้านบาท และเกี่ยวข้องกับการจัดซื้อจัดจ้างโครงการขนาดใหญ่ในพื้นที่</div> */}
    </Page>
}

export default Part2