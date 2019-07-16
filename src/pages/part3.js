import React from "react"

import img from "../images/ajan-pisit.jpg"
import Page from "../components/page"

const Part3 = () => {
    return <Page header="ปัญหาของการจัดซื้อจัดจ้าง">
        <div style={{textAlign: "center"}}>
            <img src={img} style={{width: "30%"}}/>
        </div>
        <div>
            <p>...(เน้น เฉพาะเจาะจง)
            </p>
        </div>
    </Page>
} 

export default Part3