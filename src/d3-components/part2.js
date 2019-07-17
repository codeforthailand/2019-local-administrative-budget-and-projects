import * as d3 from "d3"
import {globalConfig} from "../constant"

const VizPart2 = (data) => {
    const clsName = "part2"
    const selector = `svg.${clsName}`

    const width = 700;
    const height = 300;
    const margin = { top: 20, left: 40, bottom: 80, right: 40 }
    const chart_margin = {top: 40, left:200, bottom:0, right:50}

    data.sort((a,b) => {
        return d3.ascending(a.project_money, b.project_money)
    })

    const xScale = d3.scaleLinear()
            .range([0, width-chart_margin.left-chart_margin.right])
            .domain([0, d3.max(data, (d) => {
                return d.project_money
            })]);

    const yScale = d3.scaleBand()
            .range([height-chart_margin.top-chart_margin.bottom, 0])
            .domain(data.map((d) => { return d.purchase_method_name }))
            .padding(0.5);

    const node = document.createElement('div')

    d3.select(node)
        .append('svg')
        .attr("class", clsName)
        .attr("width", width + margin.left + margin.right)      
        .attr("height", height + margin.top + margin.bottom)                                                         
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

    const display = () => {
        // //create y axis
        d3.select(selector)
            .append("g")
            .attr("class", "p2_y_axis")
            .call(d3.axisLeft(yScale).tickSize([]))
            .attr("transform", "translate("+chart_margin.left+"," + chart_margin.top + ")")
        
        // //create x axis
        d3.select(selector)
            .append("g")
            .attr("class", "p2_x_axis")
            .attr("transform", "translate("+chart_margin.left+"," + chart_margin.top + ")")
            .call(d3.axisTop(xScale))
        
        // //create bar chart
        const bar = d3.select(selector)
            .append('g')
            .attr("class", "bar")    
            .selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("width", 0)
            .attr("y", (d) => yScale(d.purchase_method_name))
            .attr("height", yScale.bandwidth())
            .attr("transform", "translate("+chart_margin.left+"," + chart_margin.top + ")")

        bar
            .transition()
            .delay(200)
            .duration(2000)
            .attr("fill", globalConfig.highligthColors[1])
            .attr("width", function(d) {return xScale(d.project_money)})

        // //add chart label
        const project_val = d3.select(selector)
            .append('g')
            .attr("class", "p2_bar_chart_value")    
            .selectAll("text")
            .data(data)
            .enter().append("text")
            .text((d) => {
                return d3.format(',.2f')((d.project_money))
            })
            .attr("x", 0)
            .attr("y", (d) => yScale(d.purchase_method_name)+(yScale.bandwidth()/2+ 4))
            .attr("transform", "translate("+chart_margin.left+"," + chart_margin.top + ")")
            .style("font-size", "11px")
        
        project_val
            .transition()
            .delay(200)
            .duration(2000)
            .attr("x", d => xScale(d.project_money) + 10)


        d3.select(selector)
            .append("text")
            .attr("x", width - chart_margin.right)
            .attr("y", chart_margin.top - margin.top)
            .text("หน่วย: ล้านบาท")
            .style("font-size", "9px")


        console.log("done")
        

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

export default VizPart2