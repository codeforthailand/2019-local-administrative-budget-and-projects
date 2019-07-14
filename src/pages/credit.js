import React from "react"



const joinArray = (arr) => {
    return arr.reduce((p, c) => [p, ", ", c])
}
const Person = ({name, url}) => {
    return <b><a style={{color: "white", textDecoration: "none"}}
        href={url} target="_blank" rel="noopener noreferrer"
        >
            {name}
        </a>
    </b>
}


const CreditPage = () => {
    return <div style={{ paddingTop: "20vh"}}>
        <div style={{
            height: "80vh",
            paddingLeft: "10%", paddingTop: "10%",
            background: "black", color: "white"
        }}>
            เรียบเรียงเนื้อหา {
                joinArray([
                    <Person name="ชนิกานต์ กาญจนสาลี" url="http://www.datatalksonline.com"/>,
                    <Person name="กิตตินันท์ นาคทอง" url="http://kittinan.sakhononline.com"/>
                ])
            }
            <br/>
            ออกแบบ <Person name="อักษราภัค​ พุทธ​วงษ์​" url="#"/>
            
            <br/>
            พัฒนาเว็บไซต์ <Person name={`ภัทรวัต ช่อไม้`} url={`http://pat.chormai.org`}/>

            <br/><br/>

            โครงการนี้เป็นส่วนหนึ่งของ <b>Data Journalism Camp Thailand 2019</b><br/>
            จัดโดย <Person name="สมาคมนักข่าวนักหนังสือพิมพ์แห่งประเทศไทย" url="http://www.tja.or.th"/> ✕ {` `}
            <Person name="ชมรมเครือข่ายนักสื่อสารข้อมูลเชิงลึกแห่งประเทศไทย" url=""/>

            <br/><br/>
            ขอบคุณข้อมูลจาก {` `}
                {
                    joinArray([
                        <Person name="เว็บภาษีไปไหน?" url="http://govspending.data.go.th"/>,
                        <Person name="กรมการค้าภายใน" url="https://datawarehouse.dbd.go.th"/>
                    ])
                }
            <br/>
            ขอบคุณความช่วยเหลือจาก {` `}
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