import React from "react"

import * as variables from "../shared/variables"

import { DESKTOP_MIN_WIDTH, MOBILE_CONTENT_PADDING, media } from "../shared/style"
import Placeholder from "../components/placeholder"
import CompanyInfo from "../components/vis/company-info"
import CreditPage from "./credit"
import CompanyDistribution from "../components/vis/comparny-distribution"

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
            </div>
        </TextBox>
        <br/>
        <TextBox name="intro">{variables.content.section1}</TextBox>
        <TextBox>
            <img width="100%" src="/figures/total-project-value-summary.png"/>
        </TextBox>
        <TextBox name="รายละเอียดงบประมาณ อปท.">{variables.content.section2}</TextBox>
        <TextBox name="รูปแบบการจัดซื้อจัดจ้าง">{variables.content.section3}</TextBox>
        <TextBox>
            <img width="100%" src="/figures/type-procurement.png"/>
        </TextBox>
        <TextBox name="บทสัมภาษณ์"> (⏯ กดเพิ่มเปิดเล่นเสียงสัมภาษณ์) {variables.content.section5}</TextBox>
        <TextBox>
            <Placeholder name="viz 3" width="100%" height="200px"/>
        </TextBox>
        <TextBox name="อปท. เจาะจงมากสุด 5 แห่ง">{variables.content.sectionEmpty}</TextBox>
        <TextBox>
            <img width="100%" src="/figures/local-authority-view.png"/>
        </TextBox>
        <TextBox name="บริษัท ที่เจาะมากสุด 5 แห่ง">{variables.content.sectionEmpty}</TextBox>
        <TextBox>
            <img  width="100%" src="/figures/local-org-view.png"/>
        </TextBox>
        <TextBox name="การกระจายตัวของบริษัทในแต่ละภูมิภาค">{variables.content.sectionEmpty}</TextBox>
        <TextBox name="comp-dist">
            <CompanyDistribution/>
        </TextBox>
        <TextBox name="ลองสุ่มดูบริษัทอื่นๆ ที่มี รายได้มากกว่า x บาท">{variables.content.sectionEmpty}</TextBox>
        <TextBox>
            {/* <img  width="100%" src="/figures/org-details.png"/> */}
            <CompanyInfo/>
        </TextBox>
        <TextBox name="บทสรุป">
            {variables.content.sectionEmpty}
        </TextBox>
        <TextBox>
            <div align="center">
                ⏤ คณะผู้จัดทำ ⏤
            </div>
        </TextBox>
        <TextBox>
            <CreditPage/>
            {/* {variables.content.sectionCredit} */}
        </TextBox>
    </div>
}

export default Index