import React, {useEffect, useState} from "react"

import rd3 from 'react-d3-library'


import Page from "../components/page"
import Reference from "../components/reference"
import Quote from "../components/quote"

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
        if(viz.node){
          if(currentPage === PAGE_NO){
            viz.display()
          } else {
            viz.reset()
          }
        }
      }, [viz, currentPage])

    return <div>
            <Page header="สัดส่วนรายได้ของ อปท.">
                <div>
                    <RD3Component data={viz.node}/>
                </div>
                <span/>
            </Page>
            <div style={{ position: "absolute", marginLeft: "55%", marginTop: "8%", width: "40%" }}>
                <Quote 
                    fontSize="1.2rem"
                    lineHeight="2rem"
                    text="ในทางปฏิบัติ การกำหนดแนวทางการทำงานของท้องถิ่นยังไม่ชัดเจนเพียงพอ อีกทั้งระเบียบที่ใช้กำกับดูแล อปท. มีจำนวนค่อนข้างมากทำให้ทั้งการตัดสินใจดำเนินภารกิจของ อปท. และการตรวจสอบของสำนักงานตรวจเงินแผ่นดิน (สตง.) ต้องอาศัยดุลยพินิจในการตีความสูง และมักพบปัญหาการตีความอำนาจหน้าที่ของผู้ปฏิบัติกับผู้ตรวจสอบที่แตกต่างกัน โดยที่ผ่านมา สตง.พบปัญหาการใช้จ่ายเงินของ อปท.ที่ไม่ตรงตามวัตถุประสงค์และไม่มีระเบียบรองรับเพิ่มขึ้นต่อเนื่อง"
                />
                <p style={{marginTop: "2rem"}}>
                    ⏤ บทบาทของรัฐบาลท้องถิ่นกับการพัฒนาเศรษฐกิจแบบมีส่วนร่วม เขียนโดย คณิณ พีระวัฒนชาติ และธนาคารแห่งประเทศไทย <Reference url="https://www.bot.or.th/Thai/MonetaryPolicy/ArticleAndResearch/FAQ/FAQ_127.pdf"/>
                </p>
            </div>
    </div>
} 

export default Part4