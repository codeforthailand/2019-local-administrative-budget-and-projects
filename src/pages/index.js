import React, {useState, useEffect, useRef} from "react"
// import { Link } from "gatsby"

import Layout from "../components/layout"
// import Image from "../components/image"
// import SEO from "../components/seo"

import rd3 from 'react-d3-library'

// import * from 'd3'
// import * as d3 from "d3"
// import * as d3Scale from 'd3-scale-chromatic'

import bipartite from '../bipartite'
import Placeholder from '../components/placholder'

import BipartiteGraph from '../bp'



const RD3Component = rd3.Component;

const mock_data = [
  {
    source: "เชียงใหม่",
    target: "บริษัท A",
    value: 6631
  },
  {
    source: "เชียงราย",
    target: "หจก. B",
    value: 1004
  },
  {
    source: "ลำปาง",
    target: "บริษัท A",
    value: 512
  },
]

const IndexPage = () => {
  const [d3Dom, setd3Dom] = useState()

  const padding = 10
  const width = 800
  const height = 410

  const layout = bipartite() 
    .width(width)
    .height(height)
    .padding(padding)
    .source(d => d.source)
    .target(d => d.target)
    .value(d => d.value)

  const layoutData = layout(mock_data)
  
  useEffect(() => {
    const something = BipartiteGraph({
      layoutData, width, height
    })

    setd3Dom(something)

  }, []);

  return (
    <Layout>
      <h1>นิติบุคคลที่มีส่วนรวมในโครงการขององค์การปกครองส่วนท้องถิ่น</h1>
      <Placeholder name="Filter: ภาคเหนือ ▼"/>
      <RD3Component data={d3Dom}/>
    </Layout>
  )
}

export default IndexPage
