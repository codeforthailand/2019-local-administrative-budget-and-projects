import React, {useEffect, useState} from "react"

import rd3 from 'react-d3-library'

import CountUp from 'react-countup';

import Reference from "../components/reference"

import VizPart1 from "../d3-components/part1"

import {statistics} from "../constant"
import utils from "../utils"

const RD3Component = rd3.Component;


const PAGE_NO = 0

const Part1 = ({currentPage}) => {
    const [viz, setViz] = useState({})
    useEffect(()=> {
        const obj = VizPart1()
        setViz(obj)

        return () => {
            obj.reset()
        }
    }, [])

    useEffect( () => {
        if(viz.node){
            if(PAGE_NO === currentPage){
                viz.display()
            }  else {
                viz.reset()
            }
        } 
    }, [viz, currentPage])
    
    return <div style={{background: "black", color: "white", height: "100%"}}>
        <h1 style={{paddingTop: "15vh", zIndex: 2000, position: "relative", textAlign: "center"}}>
        คุณรู้หรือไม่ปี 2561 องค์กรปกครองส่วนท้องถิ่นทั่วประเทศ (อปท.) 7,852 แห่ง <br/>
        มีงบประมาณ ทั้งสิ้น{` `}<span style={{fontFamily: "monospace", fontSize: "2em"}}>
                <CountUp duration={3} start={100000} end={statistics.part1.totalGovBudget / 1e6} separator=","/>
            </span>
            {` `}ล้านบาท <Reference color="white" url="http://www.fpo.go.th/main/getattachment/Economic-report/Fiscal-Situation-Report/10820/รายงานสถานการณ์ด้านการคลังประจำปีงบประม.pdf.aspx"/>
        </h1>
        <div style={{position: "absolute", top: "10vh", zIndex: 0}}>
            <RD3Component data={viz.node}/>
        </div>
        <div style={{marginLeft: "50%", marginTop: "10vh", width: "35%", fontWeight: "bold"}}>
            <div style={{fontSize: "1.1rem", marginBottom: "1rem"}}>ข้อมูลจากจัดซื้อจัดจ้างจากเว็บภาษีไปไหน <Reference color="white" url="https://govspending.data.go.th/"/> ชี้ชัดว่า</div>
            <div style={{fontSize: "1.5rem", lineHeight: "1.5rem", marginBottom: "2rem"}}>
                1 ใน 3 จากโครงการทั้งหมดของอปท. จำนวน { utils.numFormatInt(statistics.part1.totalProjects) } โครงการ
            </div>
            <div style={{fontSize: "1.5rem", lineHeight: "1.5rem", marginBottom: "1rem"}}>
                เป็นโครงการที่เกี่ยวข้องกับการโยธา เช่น ซ่อม สร้าง ขุด ถนน ถมลูกรัง คอนกรีต และขุดท่อ
            </div>
            <div style={{fontSize: "1.1rem"}}>
                คิดเป็นมูลค่ารวมทั้งสิ้น  {utils.numFormatInt(statistics.part1.totalCivilProjectValue / 1e6)} ล้านบาท จากมูลค่ารวมโครงการอปท. ในปี 2561 { utils.numFormatInt(statistics.part1.totalValue / 1e6) } ล้านบาท
            </div>
              {/* <p>
              งบประมาณการจัดซื้อจัดจ้าง ซึ่งเปิดเผยโดยเว็บภาษีไปไหน  {` `}
              ชี้ชัดว่าอย่างน้อย 2 ใน 3 จากทั้งหมด { utils.numFormatInt(statistics.part1.totalProjects) } กว่าโครงการ
              เม็ดเงิน { utils.numFormatInt(statistics.part1.totalValue / 1e6) } ล้านบาท  มีโครงการจัดซื้อจัดจ้างโดย อปท.
              ซึ่งเป็นงานเกี่ยวกับการโยธา เช่น ซ่อม สร้าง ขุด ถนน ถมลูกรัง คอนกรีต และขุดท่อ
              จำนวน { utils.numFormatInt(statistics.part1.totalCivilProjects) } โครงการ
              คิดเป็นเงินรวมแล้วกว่า  ล้านบาท 
             </p> */}
        </div>
    </div>
}

export default Part1