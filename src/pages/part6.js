import React from "react"

import Page from "../components/page"

const Part6 = ({totalOrgs=20}) => {
    return <Page header="บริษัทที่มีขีดความสามารถในการได้งานจากท้องถิ่นทั่วประเทศ ปี 2561">
        <span/>
        <div>
                และนี่คือ {totalOrgs} บริษัท ที่มีขีดความสามารถในการได้งานจากท้องถิ่นทั่วประเทศ ด้วยการชี้วัดมูลค่างานและจำนวนสัญญา โดยการเปิดเผยจากเว็บภาษีไปไหน
        </div>
    </Page>
} 

export default Part6