import React, {useState, useEffect} from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import CircleBlob from "../d3-components/circle-blob"
import {generateBubbleData} from "../dataUtils"
import Placeholder from "../components/placholder"

import rd3 from 'react-d3-library'

const RD3Component = rd3.Component;

const SecondPage = () => {

  const [d3Dom, setd3Dom] = useState({node: ""})
  const [simulate, setSimulate] = useState()

  useEffect(() => {
    const data = generateBubbleData({numNodes: 100})

    const obj = CircleBlob(data)
    setd3Dom(obj)
  }, [])

  return (
    <Layout>
      <SEO title="Page two"/>
      <div style={{marginTop: "100px"}}>
        <div style={{position: "absolute", margin: "20px 0px 0px 20px"}}>
          <Placeholder name="Filter"/>
        </div>
        <div style={{border: "1px solid #eee", float: "left", padding: "20px"}}>
          <RD3Component data={d3Dom.node}/>
        </div>
        <div style={{float: "left"}}>
          <div style={{padding: "20px"}}>
            <h2>คำอธิบาย</h2>
            <p>
              ...
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )

}

export default SecondPage
