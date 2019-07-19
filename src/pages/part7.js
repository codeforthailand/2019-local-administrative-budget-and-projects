import React from "react"

import Page from "../components/page"
import Quote from "../components/quote"

const Part7 = () => {
    return <div style={{height: "100%"}}>
        <Page header="บริษัทที่รับงานโยธา">
            <span/>
            <div style={{marginTop: "30%"}}>
                <Quote
                    fontSize="1.2rem"
                    lineHeight="1.5rem"
                    text="งานก่อสร้าง” หมายความว่า งานก่อสร้างอาคาร  งานก่อสร้างสาธารณูปโภค หรือสิ่งปลูกสร้างอื่นใด และการซ่อมแซม ต่อเติม ปรับปรุง รื้อถอน หรือการกระทําอื่นที่มีลักษณะทํานองเดียวกันต่ออาคาร สาธารณูปโภค หรือสิ่งปลูกสร้างดังกล่าว รวมทั้งงานบริการที่รวมอยู่ในงานก่อสร้างนั้นด้วย แต่มูลค่า ของงานบริการต้องไม่สูงกว่ามูลค่าของงานก่อสร้างนั้น"
                />
                <p style={{marginTop: "2rem"}}>
                    ⏤ พ.ร.บ. การจัดซื้อจัดจ้างและการบริหารพัสดุภาครัฐ พ.ศ. 2560
                </p>
            </div>
        </Page>
    </div>
} 

export default Part7