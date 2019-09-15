import React, {useEffect, useState} from "react"

import { useStaticQuery, graphql } from "gatsby"

import rd3 from 'react-d3-library'

import BarChart from "../../d3-components/barchart"

const RD3Component = rd3.Component

const MethodProfiles = () => {
    const {allPurchaseMethodSummaryCsv} =  useStaticQuery(graphql`
      query {
        allPurchaseMethodSummaryCsv 
        {
          edges {
            node {
              id
              purchase_method_name
              project_money
            }
          }
        }
      }
    `)

    const data = allPurchaseMethodSummaryCsv.edges.map(n => {
        return {
            purchase_method_name: n.node.purchase_method_name,
            project_money: parseFloat(n.node.project_money) / 1e6,
            label: n.node.purchase_method_name,
            value: parseFloat(n.node.project_money) / 1e6
        }
    })

    const [viz, setViz] = useState({})

    useEffect(()=> {
        const obj = BarChart({
          data,
        })

        setViz(obj)
    }, [])

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
          fontWeight: "bold"
        }}>หน่วย: ล้านบาท</div>
        <RD3Component data={viz.node}/>
      </div>
    </div>
}

export default MethodProfiles