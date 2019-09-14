import * as d3 from 'd3'
import {globalConfig} from "../constant"
import utils from "../utils"

const BipartiteGraph = ({layoutData, width, height}) => {
    const margin = {
        left: 200,
        right: 150,
        top: 40,
        bottom: 20
    }
    const node = document.createElement('div');
    const svg = d3.select(node).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)

    const { flows, sources, targets } = layoutData
    const nodes = [].concat(sources, targets)
    const nodeWidth = 10
    const labelFontSize = 10
    const pathOpacity = 0.3


    const container = svg.append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
    
    // code below taken from https://observablehq.com/@ilyabo/weighted-bipartite-graph
    // flow lines
    const eventSlug = (p) => `${p.source}-${p.target}`
    const pathContainer = container.append('g').attr("class", "pathContainer")

    d3.select("body")
      .append("div")
      .attr("class", "textLabel")
      .style("position", "absolute")
      .style("background", "black")
      .style("color", "white")
      .style("opacity", 0)
      .style("pointer-events", "none")
      .style("padding", "10px")

    pathContainer.on("mouseout", () => {
        d3.select(".pathContainer")
          .selectAll("path")
          .transition()
          .style("opacity", pathOpacity)
        d3.select("div.textLabel")
          .style("opacity", 0)
      })

    pathContainer.selectAll('path')
      .data(flows)
      .enter().append('path')
        .attr('d', d => d.path)
        .attr('opacity', pathOpacity)  
        .style("z-index", 1000)
        .attr('fill', 'none')  
        .attr('stroke', globalConfig.highligthColors[1])
        .attr('stroke-width', d => d.thickness)
        .on("mouseover", function(d) {
          d3.selectAll("path").dispatch("highlight", {detail: eventSlug(d)})
          d3.select("div.textLabel")
            .style("left", `${d3.event.x}px`)
            .style("top", `${d3.event.y + 20}px`)
            .style("opacity", 1)
            .html(`โครงการแบบ${d.source} ที่ทำร่วมกับอปท.ในจังหวัด${d.target} <br>รวมเป็นมูลค่า ${utils.moneyFormat(d.value)}`)
        })
        .on("highlight", function(d) {
          const slug = d3.event.detail
          if(slug !== eventSlug(d)) {
            d3.select(this)
              .transition()
              .style("opacity", 0.1)
          } else {
            d3.select(this)
              .style("z-index", 10)
              .transition()
              .style("opacity", 0.5)
          }
        })

    // node rectangles
    container.append('g')
      .selectAll('rect')
      .data(nodes)
      .enter().append('rect')
        .attr('x', d => d.x - nodeWidth/2)
        .attr('y', d => d.y)
        .attr('width', nodeWidth)
        .attr('height', d => d.height)
        .attr('fill', globalConfig.highligthColors[1])
        .attr('stroke', 'none');

    // source labels
    container.append('g')
      .selectAll('text')
      .data(sources)
      .enter().append('text')
        .attr('x', -nodeWidth)
        .attr('y', d => d.y + d.height/2)
          .attr('font-size', labelFontSize)
          .attr('alignment-baseline', 'middle')
          .attr('text-anchor', 'end')
          .text(d => {
            const m = d.key.match(/\((.+)\)/)
            const slug = m ? m[1] : d.key
            return slug
          });

    // source value
    container.append('g')
      .selectAll('text')
      .data(sources)
      .enter().append('text')
        .attr('x', -nodeWidth)
        .attr('y', d => d.y + d.height/2 + labelFontSize)
        .attr('font-size', labelFontSize)
        .attr('alignment-baseline', 'middle')
        .attr('text-anchor', 'end')
        .text(d => `(${utils.moneyFormat(d.value)})`)

    const maxX = Math.max(...targets.map(n => n.x))

    // target labels
    container.append('g')
      .selectAll('text')
      .data(targets)
      .enter().append('text')
        .attr('x', maxX + nodeWidth)
        .attr('y', d => d.y + d.height/2)
          .attr('font-size', 10)
          .attr('alignment-baseline', 'middle')
          .attr('text-anchor', 'start')
          .text(d => `${d.key} (${utils.moneyFormat(d.value)})`)

    return node;
}

export default BipartiteGraph