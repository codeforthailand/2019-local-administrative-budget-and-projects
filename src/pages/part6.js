import React from "react"

import Page from "../components/page"

const Part6 = ({totalOrgs=20}) => {
    return <div style={{height: "100%"}}>
        <Page header="รู้ไหมบริษัทไหนได้งานจากท้องถิ่น">
            <span/>
            <div style={{fontWeight: "bold"}}>
                <div style={{fontSize: "2rem", marginTop: "45%"}}>
                    {totalOrgs} บริษัท
                </div>
                <div style={{fontSize: "1.2rem", marginTop: "1.5rem"}}>
                    ที่มีขีดความสามารถในการได้งานจากท้องถิ่นทั่วประเทศ ด้วยการชี้วัดมูลค่างานและจำนวนสัญญา
                </div>
                <div style={{font: "1rem", fontWeight: "normal", marginTop: "1.2rem"}}>
                   <b>หมายเหตุ:</b> ข้อมูลจากเว็บภาษีไปไหน
                </div>
            </div>
        </Page>
    </div>
} 

export default Part6