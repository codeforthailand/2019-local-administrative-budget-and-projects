import React from "react"

import img from "../images/broken-road.png"
import Page from "../components/page"

const Part5 = () => {
    return <Page header="ปัญหาของการจัดซื้อจัดจ้างทางด้านโยธา">
        <div style={{textAlign: "center"}}>
            <img src={img} style={{width: "50%"}}/>
        </div>
        <div>
            <p>งบก่อสร้าง ซ่อม ถนน เป็นปัญหาใหญ่ที่ สตง.ตรวจพบเสมอ อดีตผู้ว่า...</p>
        </div>
    </Page>
} 

export default Part5