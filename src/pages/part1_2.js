import React from "react"

import Reference from "../components/reference"
import {statistics} from "../constant"
import utils from "../utils"
import Placeholder from "../components/placeholder"

const Part1_2 = () => {
    return <div style={{
            background: "red",
            color: "white", height: "100vh",
            paddingTop: "10vh",
            paddingLeft: "5vw",
            paddingRight: "5vw"
         }}>
             <div style={{ border: "1px solid white", padding: "10px" }}>
                <Placeholder name="bar chart showing 2/3 propotion"/>
             </div>
            <div style={{marginLeft: "auto",  marginRight: "auto", fontWeight: "bold"}}>
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
            </div>
    </div>
}

export default Part1_2