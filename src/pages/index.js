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
    source: 6631,
    target: 6534,
    value: 6631
  },
  {
    source: 6532,
    target: 6535,
    value: 1004
  },
]

const IndexPage = () => {
  // const bpData = viz.biPartite()
  //   .data(mock_data)
  //   .orient("horizontal")
  const [d3Dom, setd3Dom] = useState()

  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current || !ref.current.getBoundingClientRect().width) return;
    console.log('useEffect')
    console.log('do something with', ref.current.getBoundingClientRect().width);
  }, [ref.current]);


  const padding = 10
  // const width = window.innerWidth - 2*padding - 40 - 20;
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
  console.log(layoutData)
  

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
