import React from "react"

import * as variables from "../shared/variables"

import { DESKTOP_MIN_WIDTH, MOBILE_CONTENT_PADDING, media } from "../shared/style"
import Placeholder from "../components/placeholder"
import CompanyInfo from "../components/vis/company-info"
import CreditPage from "./credit"
import CompanyDistribution from "../components/vis/comparny-distribution"
import MethodProfile from "../components/vis/method-ranking"
import CompanyRanking from "../components/vis/company-ranking"
import AuthorityRanking from "../components/vis/autority-ranking"
import ExternalLink from "../components/external-link"

import utils from "../utils"

require('typeface-kanit')

const isDev = true

const TextBox = ({name, children}) => {
    return <div css={{
        width: "100%",
        margin: "0px auto 10px auto",
        padding: `0 ${MOBILE_CONTENT_PADDING}px`,
        [media(DESKTOP_MIN_WIDTH)]: {
            width: `${DESKTOP_MIN_WIDTH}px`,
            padding: "0px",
        }
    }}>
        {isDev && name && <a href={`#${name}`} id={name} css={{color: "red"}}>(ย่อหน้า: {name})</a>}
        {children}
    </div>
}

const Index = () => {
    return <div
        css={{
            padding: "10px"
        }}
    >
        <TextBox>
            <h1
                css={{
                    paddingTop: "20vh",
                }}
            >{variables.header}</h1>
            <div css={{fontSize: "0.8em"}}>
                <b>เขียนโดย: </b>{variables.teamMembers.join(', ')}
                <div css={{marginTop: "5px"}}>
                    <b>วันที่: </b>{variables.date}
                </div>
                <b>หมายเหตุ: </b>1) {variables.content.remark}{
                    utils.isMobile() && <span>
                        ; 2) การแสดงผลบางส่วนอาจไม่สมบูรณ์บนจอขนาดเล็ก
                    </span>
                }
            </div>
        </TextBox>
        <br/>
        <TextBox name="intro">{variables.content.section1}</TextBox>
        <TextBox>
            <img width="100%" src="figures/total-project-value-summary.png"/>
        </TextBox>
        <TextBox name="รายละเอียดงบประมาณ อปท.">{variables.content.section2}</TextBox>
        <TextBox name="รูปแบบการจัดซื้อจัดจ้าง">{variables.content.section3}</TextBox>
        <TextBox>
            <MethodProfile/>
        </TextBox>
        <TextBox name="บทสัมภาษณ์"> {variables.content.section5}</TextBox>
        <TextBox>
            <Placeholder name="viz 3" width="100%" height="200px"/>
        </TextBox>
        <TextBox name="อปท. เจาะจงมากสุด 5 แห่ง">{variables.content.sectionEmpty}</TextBox>
        <TextBox>
            <AuthorityRanking/>
        </TextBox>
        <TextBox name="บริษัท ที่เจาะมากสุด 5 แห่ง">บริษัทที่มีมูลค่าโครงการรวมทั้งหมดมากกว่า 100 ล้าน {variables.content.sectionEmpty}</TextBox>
        <TextBox>
            <CompanyRanking/>
        </TextBox>
        <TextBox name="การกระจายตัวของบริษัทในแต่ละภูมิภาค">{variables.content.sectionEmpty}</TextBox>
        <TextBox>
            <CompanyDistribution/>
        </TextBox>
        <TextBox name="ลองสุ่มดูบริษัทอื่นๆ ที่มี รายได้มากกว่า 100 บาท"> {variables.content.sectionEmpty}</TextBox>
        <TextBox>
            <CompanyInfo/>
        </TextBox>
        <TextBox name="บทสรุป">
            {variables.content.sectionEmpty}
        </TextBox>
        <TextBox>
            <b>รายละเอียดเพิ่มเติม</b>
            <ol>
                <li>
                    <ExternalLink name="ชุดข้อมูลโครงการจัดซื้อจ้างของอปท. ที่ใช้ในการวิเคราะห์" url="https://github.com/codeforthailand/2019-local-administrative-budget-and-projects#ชุดข้อมูล"/>
                </li>
                <li>
                    <ExternalLink name="สิ่งที่ได้เรียนรู้ในการทำงานโปรเจ็คนี้" url="#"/>
                </li>
            </ol>
            <div>
            </div>
            <b>คณะผู้จัดทำ</b>
            <CreditPage/>
            {/* {variables.content.sectionCredit} */}
        </TextBox>
    </div>
}

export default Index