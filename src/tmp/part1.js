import React, {useEffect, useState} from "react"

import rd3 from 'react-d3-library'

import CountUp from 'react-countup';

import Reference from "../components/reference"

import VizPart1 from "../d3-components/part1"

import {statistics} from "../constant"

import utils from '../utils'


const RD3Component = rd3.Component;

const Part1 = ({pageNo, currentPage}) => {
    const [viz, setViz] = useState({})
    const windowObj = utils.getWindowObj()

    useEffect(()=> {
        const obj = VizPart1({
            containerWidth: windowObj.innerWidth,
            containerHeight: windowObj.innerHeight,
        })

        setViz(obj)

        return () => {
            obj.reset()
        }
    }, [])

    useEffect( () => {
        if(viz.node){
            if(pageNo === currentPage){
                viz.display()
            }  else {
                viz.reset()
            }
        } 
    }, [viz, currentPage])
    
    return <div style={{background: "black", color: "white", height: "100%"}}>
        <h1 style={{paddingTop: "15vh", zIndex: 2000, position: "relative", textAlign: "center"}}>
        คุณรู้หรือไม่ปี 2561 องค์กรปกครองส่วนท้องถิ่นทั่วประเทศ (อปท.) 7,852 แห่ง <br/>
        มีงบประมาณ ทั้งสิ้น{` `}<span style={{display: "inline-block", width: "3.1em", fontSize: "2em", color: "red"}}>
                <CountUp duration={3} start={100000} end={statistics.part1.totalGovBudget / 1e6} separator=","/>
            </span>
            {` `}ล้านบาท <Reference color="white" url="http://www.fpo.go.th/main/getattachment/Economic-report/Fiscal-Situation-Report/10820/รายงานสถานการณ์ด้านการคลังประจำปีงบประม.pdf.aspx"/>
        </h1>
        <div style={{
            position: "absolute",
            width: "100%",
            textAlign: "center",
            top: 0,
            zIndex: 0,
        }}>
            <RD3Component data={viz.node}/>
        </div>
    </div>
}

export default Part1