import React from "react"

import img from "../images/ajan-pisit.jpg"
import Page from "../components/page"
import Quote from "../components/quote"

const Part3 = () => {
    return <div>
        <Page header="รูปแบบการจัดซื้อแบบเฉพาะเจาะจง">
            <div style={{textAlign: "center"}}>
                <img src={img} style={{marginTop: "2rem", width: "40%"}} alt="อ.พิศิษฐ์ อดีตผู้ว่า สตง."/>
            </div>
            <span/>
        </Page>
        <div style={{ position: "absolute", marginLeft: "45%", marginTop: "5%", width: "45%" }}>
            <Quote text="ในการใช้งบประมาณก็มีการหลบเลี่ยง บางอย่างไม่ควรเจาะจงก็ทำ ระบบ e-bidding อย่าไปคิดว่ามันไม่มีปัญหา อาจจะซ่อนปัญหาไว้ก็ได้ เช่น โอเวอร์สเปก เขียนราคาให้สูง แล้วเวลาส่งมอบกลับได้ของอีกเกรดหนึ่ง ซึ่งส่วนต่างอาจกลับมาเป็นเงินทอน"/>
            <p style={{marginTop: "2rem"}}>⏤ นายพิศิษฐ์ ลีลาวชิโรภาส อดีตผู้ว่าการตรวจเงินแผ่นดิน (สตง.) เปิดเผยกับทีมข่าว TDJ เล่าประสบการณ์งานตรวจสอบการจัดซื้อจัดจ้างภาครัฐ</p>
        </div>
    </div>
} 

export default Part3