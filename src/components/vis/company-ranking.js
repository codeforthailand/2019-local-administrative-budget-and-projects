import React, {useEffect, useState} from "react"

import rd3 from 'react-d3-library'

import BarChart from "../../d3-components/barchart"
import companyProjectProfiles from "../../data/company_stats"
import { DESKTOP_MIN_WIDTH, media } from "../../shared/style"

import { dairyCompanyFilter } from "../../shared/variables"

const RD3Component = rd3.Component

const methodSortKey = 'เฉพาะเจาะจง'

const sortAttribute = a => {
  if(!a.methodStats[methodSortKey]){
    return 0
  } else{
    return a.methodStats[methodSortKey].count
  }
}


const sortedCompany = companyProjectProfiles.sort((a, b) => {
    return sortAttribute(b) - sortAttribute(a)
  })
  .slice(0, 20)
  .reverse()
  .map(a => {
    return {
      ...a,
      totalProjectValueInMillion: a['totalProjectValue'] / 1e6
    }
  })

const CompanyRanking = () => {
    const [valueKey, setValueKey] = useState('totalProjects')


    const [viz, setViz] = useState({})

    useEffect(()=> {
      const ak = valueKey === "totalProjectValueInMillion" ? `value` : `count`
      const normalizer = valueKey === "totalProjectValueInMillion" ? 1e6 : 1

      const data = sortedCompany.map( a => {
        return {
          label: `${a.corporate_name} (เฉพาะเจาะจง: ${a.methodStats['เฉพาะเจาะจง'][ak]/normalizer})`,
          value: a[valueKey]
        }
      })

      const obj = BarChart({
        name: 'company-ranking',
        data,
        filterRx: dairyCompanyFilter
      })

      if(viz && viz.reset){
        viz.reset()
      }

      setViz(obj)
    }, [valueKey])

    useEffect( () => {
      if(viz && viz.display){
        viz.display()
      }
    }, [viz])

    return <div>
      <div style={{marginTop: "0rem"}}>
        <div css={{
          textAlign: "center",
          fontSize: "11px",
          [media(DESKTOP_MIN_WIDTH)] : {
            textAlign: "right",
          }
        }}>หน่วย: <select
            style={{
                border: "0px",
                background: "#eee",
            }}
            value={valueKey}
            onChange={(e) => {
              console.log(e.target.value)
              setValueKey(e.target.value)
            }}
          >
            <option value="totalProjects">จำนวนโครงการรวม</option>
            <option value="totalProjectValueInMillion">มูลค่าโครงการรวม​ (ล้านบาท)</option>
          </select>
        </div>
        <RD3Component data={viz.node}/>
      </div>
    </div>
}

export default CompanyRanking