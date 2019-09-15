import React, { useState, useEffect } from 'react'

import rd3 from 'react-d3-library'

import companyProjectProfiles from "../../data/company_stats"
import CircleBlob from '../../d3-components/circle-blob'

import utils from "../../utils"

import {labelConstant, globalConfig} from "../../constant"

const regionLookup = utils.array2lookup(labelConstant.region)

const RD3Component = rd3.Component

const filterOptions = [
  {
    desc: "ภูมิภาคที่ได้รับโครงการส่วนใหญ่",
    key: "region"
  },
]

const CompanyDistribution = () => {
    const [d3Dom, setd3Dom] = useState({})
    const [highlightCategory, setHighlightCategory] = useState(0)


    useEffect(() =>{
        const data = companyProjectProfiles.map( (d, i) => {
            const budgetM = d['totalProjectValue'] / 1e6
            return {
                ...d,
                size: budgetM,
                category: {
                region: regionLookup[d['primaryRegion']],
                }
            }
        })

        const obj = CircleBlob(data)

        setd3Dom(obj)
    }, [])

    useEffect(() => {
        if(d3Dom.node){
            d3Dom.doSimulate({
                key: filterOptions[0].key,
                highlightKey: globalConfig.purchaseMethods[highlightCategory]
            })
        }
    }, [d3Dom])

    useEffect(() => {
        if(d3Dom.node){
          d3Dom.setCircleHighlight(
            filterOptions[0].key,
            globalConfig.purchaseMethods[highlightCategory]
          )
        }
    }, [d3Dom, highlightCategory])

    return <div>
        <div css={{ textAlign: "center"}}>
            เลือกไฮไลท์สีตามสัดส่วนโครงการแบบ {` `}
            <select
            style={{
                border: "0px",
                background: "#eee",
            }}
            value={highlightCategory}
            onChange={(e) => {
                setHighlightCategory(e.target.value)
            }}
            >
            {
                globalConfig.purchaseMethods.map( (m, i) => {
                return <option key={i} value={i}>
                    {m.name}
                </option>
                })
            }
            </select>
        </div>
        <RD3Component data={d3Dom.node}/>
    </div>
}

export default CompanyDistribution