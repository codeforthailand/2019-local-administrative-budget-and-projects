import React, {useEffect, useState} from "react"

import rd3 from 'react-d3-library'

import BarChart from "../../d3-components/barchart"
import companyProjectProfiles from "../../data/company-project-profiles"

const RD3Component = rd3.Component


const methodSortKey = 'เฉพาะเจาะจง'

const sortAttribute = a => a.purchaseMethodCount[methodSortKey] || 0

const sortedCompany = companyProjectProfiles.sort((a, b) => {
    return - (sortAttribute(a) - sortAttribute(b))
  }).slice(0, 6)
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
      const data = sortedCompany.map( a => {
          return {
            label: `${a.name} (เฉพาะเจาะจง: ${sortAttribute(a)} โครงการ)`,
            value: a[valueKey]
          }
        })
        const obj = BarChart({
          name: 'company-ranking',
          data,
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
          textAlign: "right",
          fontSize: "11px",
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
            <option value="totalProjects">จำนวนโครงการ</option>
            <option value="totalProjectValueInMillion">มูลค่าโครงการรวม​ (ล้านบาท)</option>
          </select>
        </div>
        <RD3Component data={viz.node}/>
      </div>
    </div>
}

export default CompanyRanking