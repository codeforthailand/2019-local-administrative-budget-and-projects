import React, {useEffect, useState} from "react"

import rd3 from 'react-d3-library'

import CountUp from 'react-countup';

import Page from "../components/page"
import Reference from "../components/reference"

import VizPart1 from "../d3-components/part1"

const RD3Component = rd3.Component;

const Part1 = () => {
    const [viz, setViz] = useState({})
    useEffect(()=> {
        const obj = VizPart1()
        setViz(obj)
    }, [])

    useEffect( () => {
        console.log("effect viz")
        if(viz.node){
            viz.display_part1()
        }
    }, [viz])
    
    return <div>
        <h1 style={{marginTop: "15vh", marginLeft: "10vw"}}>
            คุณรู้หรือไม่? ในปี 2561 องค์กรปกครองส่วนท้องถิ่น <br/>
            มีรายรับโดยประมาณทั้งสิ้น
            <span style={{fontFamily: "monospace", paddingLeft: "0.5em", fontSize: "2em"}}>
                <CountUp duration={5} start={100000} end={216971} separator=","/>
            </span>
            ล้านบาท
        </h1>
        <div style={{position: "absolute", top: "15vh"}}>
            <RD3Component data={viz.node}/>
        </div>
        <div style={{marginLeft: "50%", marginTop: "10vh", width: "30%"}}>
              <p>งบประมาณราว 9.8% ไปอยู่กับการจัดซื้อจัดจ้างสาธารณูปโภค ซ่อมสร้าง ขุด ถนน ถมลูกรัง คอนกรีต และขุดท่อ กว่า 10,000
  โครงการทั่วประเทศ คิดเป็นเงินรวมแล้วกว่า 21,252 ล้านบาท<Reference url="xyz.com"/></p>
        </div>
    </div>
}

export default Part1