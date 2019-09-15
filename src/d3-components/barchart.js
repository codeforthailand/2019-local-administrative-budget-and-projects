import * as d3 from "d3"
import {globalConfig} from "../constant"
import utils from "../utils"

const BarChart = ({name, data}) => {
    const width = utils.getWidth()
    const height = 35 * data.length

    const clsName = name
    const selector = `svg.${clsName}`

    const margin = { top: 10, left: 20, bottom: 10, right: 20}
    const chart_margin = {top: 0, left:5, bottom:10, right: 15}

    const xScale = d3.scaleLinear()
            .range([0, width-chart_margin.left-chart_margin.right])
            .domain([0, d3.max(data, (d) => {
                return d.value
            })]);

    const yScale = d3.scaleBand()
            .range([height-chart_margin.top-chart_margin.bottom, 0])
            .domain(data.map((d) => d.label))
            .padding(0.6)

    const node = document.createElement('div')

    d3.select(node)
        .append('svg')
        .attr("class", clsName)
        .attr("width", width + margin.left + margin.right)      
        .attr("height", height + margin.top + margin.bottom)                                                         
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

    const display = () => {
        // //create bar chart
        const bar = d3.select(selector)
            .append('g')
            .attr("class", "bar")    
            .selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("width", 0)
            .attr("y", (d) => yScale(d.label))
            .attr("height", yScale.bandwidth())
            .attr("transform", "translate("+chart_margin.left+"," + chart_margin.top + ")")

        bar
            .transition()
            .delay(1000)
            .duration(1000)
            .attr("fill", globalConfig.highligthColors[1])
            .attr("width", function(d) {return xScale(d.value)})

        d3.select(selector)
            .append("g")
            .attr("class", "label")
            .selectAll("text")
            .data(data)
            .enter()
            .append("text")
            .attr("y", (d) => yScale(d.label) - 5)
            .text((d) => `${d.label} ${d3.format(',.2f')((d.value))}`)
            .style("font-size", utils.isMobile() ? "8px" : "14px")
            .attr("transform", "translate("+chart_margin.left+"," + chart_margin.top + ")")
    }

    const reset = () => {
        d3.select(selector)
            .selectAll("g")
            .transition()
            .style("opacity", 0)
            .remove()
    }

    return {node, display, reset}
}

export default BarChart