import React, {useEffect, useState} from "react"

import rd3 from 'react-d3-library'

import BarChart2Layer from "../../d3-components/barchart-2layer"
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
  .map(a => {
    return {
      ...a,
      totalProjectValueInMillion: a['totalProjectValue'] / 1e6
    }
  })

const CompanyRanking = () => {
    const [valueKey, setValueKey] = useState('totalProjects')
    const [filterDairyCompanies, setFilterDairyComparies] = useState(false)


    const [viz, setViz] = useState({})

    useEffect(()=> {
      const ak = valueKey === "totalProjectValueInMillion" ? `value` : `count`
      const normalizer = valueKey === "totalProjectValueInMillion" ? 1e6 : 1

      const data = sortedCompany
      .filter(a => !(a.corporate_name.match(dairyCompanyFilter) && filterDairyCompanies))
      .slice(0, 20)
      .map( a => {
        return {
          label: `${a.corporate_name} (เฉพาะเจาะจง: ${a.methodStats['เฉพาะเจาะจง'][ak]/normalizer})`,
          value: a[valueKey],
          value2: a.methodStats['เฉพาะเจาะจง'][ak]/normalizer
        }
      })
      .reverse()

      const obj = BarChart2Layer({
        name: 'company-ranking',
        data,
        filterRx: dairyCompanyFilter
      })

      if(viz && viz.reset){
        viz.reset()
      }

      setViz(obj)
    }, [valueKey, filterDairyCompanies])

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
        }}>
          <div css={{
            fontWeight: "bold",
            [media(DESKTOP_MIN_WIDTH)] : {
              float: "left"
            }
          }}>
            เรียงตามจำนวนโครงการจัดซื้อจัดจ้างแบบเฉพาะเจาะจง
          </div>
          หน่วย: <select
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
            <option value="totalProjects">จำนวนโครงการทั้งหมด</option>
            <option value="totalProjectValueInMillion">มูลค่าโครงการรวม​ (ล้านบาท)</option>
          </select>
          <div css={{
            textAlign: "center",
            [media(DESKTOP_MIN_WIDTH)] : {
              textAlign: "left",
            }
          }}>
            <input
              type="checkbox" defaultChecked={!filterDairyCompanies}
              onChange={() => {
                setFilterDairyComparies(!filterDairyCompanies)
              }}
            />{` `}รวมข้อมูลของนิติบุคคลที่เกี่ยวกับด้านผลิตภัณฑ์นม
          </div>
        </div>
        <RD3Component data={viz.node}/>
      </div>
    </div>
}

export default CompanyRanking