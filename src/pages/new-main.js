// require('typeface-kanit')

import React, {useState, useEffect} from "react"

import * as variables from "../shared/variables"

import { DESKTOP_MIN_WIDTH, media } from "../shared/style"
import Placeholder from "../components/placeholder"


const isDev = true

const TextBox = ({name, children}) => {
    return <div css={{
        width: "100%",
        margin: "0px auto 10px auto",
        padding: "0 20px",
        [media(DESKTOP_MIN_WIDTH)]: {
            width: `${DESKTOP_MIN_WIDTH}px`,
            padding: "0px",
        }
    }}>
        {isDev && name && <span css={{color: "red"}}>(ย่อหน้า: {name})</span>}
        {children}
    </div>
}

const NewMain = () => {
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
                <b>เขียนโดย</b>
                <div css={{marginTop: "10px"}}>
                    {variables.teamMembers.join(', ')}
                </div>
                <b>วันที่</b> {variables.date}
            </div>
        </TextBox>
        <br/>
        <TextBox name="intro">{variables.content.section1}</TextBox>
        <TextBox>
            <img src="figures/total-project-value-summary.png"/>
        </TextBox>
        <TextBox name="รายละเอียดงบประมาณ อปท.">{variables.content.section2}</TextBox>
        <TextBox name="รูปแบบการจัดซื้อจัดจ้าง">{variables.content.section3}</TextBox>
        <TextBox>
            <img src="figures/type-procurement.png"/>
        </TextBox>
        <TextBox name="บทสัมภาษณ์"> (⏯ กดเพิ่มเปิดเล่นเสียงสัมภาษณ์) {variables.content.section5}</TextBox>
        <TextBox>
            <Placeholder name="viz 3" width="100%" height="200px"/>
        </TextBox>
        <TextBox name="อปท. เจาะจงมากสุด 5 แห่ง">{variables.content.sectionEmpty}</TextBox>
        <TextBox>
            <img src="figures/local-authority-view.png"/>
        </TextBox>
        <TextBox name="บริษัท ที่เจาะมากสุด 5 แห่ง">{variables.content.sectionEmpty}</TextBox>
        <TextBox>
            <img src="figures/local-org-view.png"/>
        </TextBox>
        <TextBox name="การกระจายตัวของบริษัทในแต่ละภูมิภาค">{variables.content.sectionEmpty}</TextBox>
        <TextBox>
            <img src="figures/org-regional-cluster.png"/>
        </TextBox>
        <TextBox name="ลองซุ่มดูบริษัทอื่นๆ ที่มี รายได้มากกว่า x บาท">{variables.content.sectionEmpty}</TextBox>
        <TextBox>
            <img src="figures/org-details.png"/>
        </TextBox>
        <TextBox name="บทสรุป">
            {variables.content.sectionEmpty}
        </TextBox>
        <TextBox name="เครดิต">
            {variables.content.sectionCredit}
        </TextBox>
    </div>
}

export default NewMain