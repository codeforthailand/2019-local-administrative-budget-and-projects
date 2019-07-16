import React, {useEffect, useState} from "react"

import { useStaticQuery, graphql } from "gatsby"

import rd3 from 'react-d3-library'

import Page from "../components/page"
import Reference from "../components/reference"
import VizPart2 from "../d3-components/part2"



const RD3Component = rd3.Component

const PAGE_NO = 1

const Part2 = ({currentPage}) => {
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
            project_money: parseFloat(n.node.project_money) / 1e6
        }
    })

    const [viz, setViz] = useState({})
    useEffect(()=> {
        const obj = VizPart2(data)
        setViz(obj)
    }, [])

    useEffect( () => {
      if(currentPage === PAGE_NO && viz.node){
        viz.display()
      }

    }, [viz, currentPage])

    return <Page header="12 รูปแบบการจัดซื้อจัดจ้างภาครัฐ">
        <div>
            <RD3Component data={viz.node}/>
        </div>
        <div>content</div>
    </Page>
}

export default Part2