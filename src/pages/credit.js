import React from "react"

import ExternalLink from "../components/external-link"


const joinArray = (arr) => {
    return arr.reduce((p, c) => [p, ", ", c])
}


const CreditPage = () => {
    return <div style={{ paddingTop: "20px"}}>
        <div>
            เรียบเรียงเนื้อหา: {
                joinArray([
                    <ExternalLink name="ชนิกานต์ กาญจนสาลี" url="http://www.datatalksonline.com"/>,
                    <ExternalLink name="กิตตินันท์ นาคทอง" url="http://kittinan.sakhononline.com"/>,
                    <ExternalLink name="กนิษฐา ไชยแสง" url="#"/>
                ])
            }
            <br/>
            ออกแบบ: <ExternalLink name="อักษราภัค​ พุทธ​วงษ์​" url="#"/>
            
            <br/>
            พัฒนาเว็บไซต์: {
                joinArray([
                    <ExternalLink name={`ไวยณ์วุฒิ เอื้อจงประสิทธิ์`} url="#"/>,
                    <ExternalLink name={`ภัทรวัต ช่อไม้`} url={`http://pat.chormai.org`}/>,
                ])
            }

            <br/><br/>

            โครงการนี้เป็นส่วนหนึ่งของ Data Journalism Camp Thailand 2019<br/>
            จัดโดย <ExternalLink name="สมาคมนักข่าวนักหนังสือพิมพ์แห่งประเทศไทย" url="http://www.tja.or.th"/> ✕ {` `}
            <ExternalLink name="ชมรมเครือข่ายนักสื่อสารข้อมูลเชิงลึกแห่งประเทศไทย" url=""/>

            <br/><br/>
            ขอบคุณข้อมูลจาก {` `}
                {
                    joinArray([
                        <ExternalLink name="เว็บภาษีไปไหน?" url="http://govspending.data.go.th"/>,
                        <ExternalLink name="กรมส่งเสริมการปกครองท้องถิ่น" url="http://www.dla.go.th/work/abt/index.jsp"/>,
                        <ExternalLink name="สำนักงานการตรวจเงินแผ่นดิน" url="https://www.audit.go.th"/>,
                        <ExternalLink name="นายพิศิษฐ์ ลีลาวชิโรภาส (สัมภาษณ์)" url="#"/>,
                    ])
                }
            <br/>
            และความช่วยเหลือจาก {` `}
                {
                    joinArray([
                        <ExternalLink name="บุญมีแล็บ" url="http://boonmeelab.com"/>,
                        <ExternalLink name="พั้นช์ อัพ" url="https://www.facebook.com/punchupworld/"/>
                    ])
                }
        </div>
    </div>
}


export default CreditPage