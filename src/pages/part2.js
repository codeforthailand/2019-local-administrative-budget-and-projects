import React, {useEffect, useState} from "react"

import { useStaticQuery, graphql } from "gatsby"

import rd3 from 'react-d3-library'

import Page from "../components/page"
// import Reference from "../components/reference"
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

    return <Page header="ปี 2561 สตง. ตรวจสอบการจัดซื้อจัดจ้างที่พบข้อบกพร่องมากที่สุด คือ หน่วยงานราชการส่วนท้องถิ่น ที่มีมากถึงร้อยละ 51">
        <div>
            <RD3Component data={viz.node}/>
        </div>
        <div>เจาะลึกลงไป จาก 12 รูปแบบการจัดซื้อจัดจ้างภาครัฐพบว่ามี 6 รูปแบบที่มีมูลค่าสูงตั้งแต่หลักหมื่นล้าน-ร้อยล้านบาท และเกี่ยวข้องกับการจัดซื้อจัดจ้างโครงการขนาดใหญ่ในพื้นที่</div>
    </Page>
}

export default Part2