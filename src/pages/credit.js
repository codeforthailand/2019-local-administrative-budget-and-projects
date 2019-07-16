import React from "react"



const joinArray = (arr) => {
    return arr.reduce((p, c) => [p, ", ", c])
}
const Person = ({name, url}) => {
    return <a style={{color: "white", textDecoration: "none"}}
        href={url} target="_blank" rel="noopener noreferrer"
        >
            {name}
        </a>
}


const CreditPage = () => {
    return <div style={{ paddingTop: "20vh"}}>
        <div style={{
            height: "80vh",
            paddingLeft: "10%", paddingTop: "10%",
            background: "black", color: "white"
        }}>
            เรียบเรียงเนื้อหา: {
                joinArray([
                    <Person name="ชนิกานต์ กาญจนสาลี" url="http://www.datatalksonline.com"/>,
                    <Person name="กิตตินันท์ นาคทอง" url="http://kittinan.sakhononline.com"/>,
                    <Person name="กนิษฐา ไชยแสง" url="#"/>
                ])
            }
            <br/>
            ออกแบบ: <Person name="อักษราภัค​ พุทธ​วงษ์​" url="#"/>
            
            <br/>
            พัฒนาเว็บไซต์: {
                joinArray([
                    <Person name={`ไวยณ์วุฒิ เอื้อจงประสิทธิ์`} url="#"/>,
                    <Person name={`ภัทรวัต ช่อไม้`} url={`http://pat.chormai.org`}/>,
                ])
            }

            <br/><br/>

            โครงการนี้เป็นส่วนหนึ่งของ Data Journalism Camp Thailand 2019<br/>
            จัดโดย <Person name="สมาคมนักข่าวนักหนังสือพิมพ์แห่งประเทศไทย" url="http://www.tja.or.th"/> ✕ {` `}
            <Person name="ชมรมเครือข่ายนักสื่อสารข้อมูลเชิงลึกแห่งประเทศไทย" url=""/>

            <br/><br/>
            ขอบคุณข้อมูลจาก {` `}
                {
                    joinArray([
                        <Person name="เว็บภาษีไปไหน?" url="http://govspending.data.go.th"/>,
                        <Person name="กรมส่งเสริมการปกครองท้องถิ่น" url="http://www.dla.go.th/work/abt/index.jsp"/>,
                        <Person name="สำนักงานการตรวจเงินแผ่นดิน" url="https://www.audit.go.th"/>,
                        <Person name="นายพิศิษฐ์ ลีลาวชิโรภาส (สัมภาษณ์)" url="#"/>,
                    ])
                }
            <br/>
            และความช่วยเหลือจาก {` `}
                {
                    joinArray([
                        <Person name="บุญมีแลป" url="http://boonmeelab.com"/>
                    ])
                }
            <br/>
        </div>
    </div>
}


export default CreditPage