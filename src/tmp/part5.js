import React from "react"

import img from "../images/broken-road.png"
import Page from "../components/page"
import Quote from "../components/quote"

const Part5 = () => {
    return <div style={{
            height: "100%",
            background: `url("${img}") no-repeat center center`,
            backgroundSize: "cover",
            color: "white"
        }}>
        <div style={{marginLeft: "auto", marginRight: "auto", width: "50%", paddingTop: "15%"}}>
            <Quote 
                fontSize="1.2rem"
                lineHeight="1.5rem"
                text="คอนกรีตกับลูกรังเป็นสองกรณีที่พบปัญหาบ่อยมาก งานก่อสร้างมักจะสะท้อนปัญหาสร้างแล้วก็พัง สร้างแล้วไม่ได้ใช้ประโยชน์ แล้วก็ถนนลูกรังชอบมากที่สุด ปัญหาถนนลูกรังก็คือตรวจสอบยาก เช่น เทดินลูกรังลงไปหมดกี่คันรถ พอเกลี่ยลงไปแล้วเราก็ตรวจสอบไม่ได้ บางทีก็โกยจากข้างๆ ขึ้นมา แล้วก็บอกว่าเทแล้ว ความจริงมันก็คือสไลด์ลงไป พวกนี้มีจุดรั่วไหล  ส่วนพวกคอนกรีตก็คือส่วนผสมไม่ได้มาตรฐาน ถนนเสียหายเร็ว เหล็กไม่ได้ขนาด ความหนาไม่ได้ วางเหล็กไม่ได้ตามระดับเป็นไปตามที่ออกแบบ พวกนี้มีปัญหา ถนนหนา 15 เซนติเมตร เหล็กต้อง 7.5 เซนติเมตร แต่บางทีกองไว้ข้างล่าง วีธิสร้างชุ่ยๆ ไม่มีลูกถ้วยรองรับ มีจุดรั่วไหลอย่างนี้"
            />
            <p style={{marginTop: "2rem"}}>
                ⏤ อดีตผู้ว่าฯ สตง. สะท้อนการตรวจสอบงบจัดซื้อจัดจ้าง จากประสบการณ์ที่ผ่านพบว่า งบก่อสร้างและซ่อมถนน มีปัญหาบ่อยครั้งมากที่สุด
            </p>
        </div>
    </div>
} 

export default Part5