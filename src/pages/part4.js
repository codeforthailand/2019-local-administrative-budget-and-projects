import React, {useEffect, useState} from "react"

import rd3 from 'react-d3-library'


import Page from "../components/page"
import Reference from "../components/reference"
import {statistics} from "../constant"

import VizPart4 from "../d3-components/part4"

const RD3Component = rd3.Component
const PAGE_NO = 3

const Part4 = ({currentPage}) => {
    const totalBudget = statistics.part4.budgetPortions
        .map(d => d.amount)
        .reduce((a, b) => a + b, 0)

    const data = statistics.part4.budgetPortions.map(d => {
        return {
            label: d.name,
            value: d.amount,
            percentage: d.amount / totalBudget
        }
    })

    const [viz, setViz] = useState({})

    useEffect(()=> {
        const obj = VizPart4(data)
        setViz(obj)
    }, [])

    useEffect( () => {
        console.log(currentPage)
        if(viz.node){
          if(currentPage === PAGE_NO){
            viz.display()
          } else {
            viz.reset()
          }
        }
      }, [viz, currentPage])

    return <Page header="เป้าหมายสัดส่วนรายได้ของ อปท. ปี 2561">
        <div>
            <RD3Component data={viz.node}/>
        </div>
        <div>
            <p>
            ฐานข้อมูลภาครัฐของสำนักงานเศรษฐกิจการคลัง เปิดเผยเป้าหมายสัดส่วนรายได้ของ อปท.2561 ไว้ใน 4 หมวดหมู่  โดยบทความเรื่อง บทบาทของรัฐบาลท้องถิ่นกับการพัฒนาเศรษฐกิจแบบมีส่วนร่วม เขียนโดย คณิน พีระวัฒนชาติ และธนาคารแห่งประเทศไทย <Reference url="https://www.bot.or.th/Thai/MonetaryPolicy/ArticleAndResearch/FAQ/FAQ_127.pdf"/> ชี้ให้เห็นว่ากฎหมายจัดตั้งส่วนท้องถิ่นแต่ละประเภทและระเบียบกระทรวงมหาดไทยฯ พ.ศ. 2547 ได้ระบุอำนาจหน้าที่ที่ อปท. สามารถทำได้ ซึ่งแม้กฎหมายจะกำหนดให้ครอบคลุมมิติการพัฒนารอบด้าน 
            </p>
            <p>
            แต่ในทางปฏิบัติ การกำหนดแนวทางการทำงานของท้องถิ่นยังไม่ชัดเจนเพียงพอ อีกทั้งระเบียบที่ใช้กำกับดูแล อปท. มีจำนวนค่อนข้างมากทำให้ทั้งการตัดสินใจดำเนินภารกิจของ อปท. และการตรวจสอบของสำนักงานตรวจเงินแผ่นดิน (สตง.) ต้องอาศัยดุลยพินิจในการตีความสูง และมักพบปัญหาการตีความอำนาจหน้าที่ของผู้ปฏิบัติกับผู้ตรวจสอบที่แตกต่างกัน โดยที่ผ่านมา สตง.พบปัญหาการใช้จ่ายเงินของ อปท.ที่ไม่ตรงตามวัตถุประสงค์และไม่มีระเบียบรองรับเพิ่มขึ้นต่อเนื่อง
            </p>
        </div>
    </Page>
} 

export default Part4