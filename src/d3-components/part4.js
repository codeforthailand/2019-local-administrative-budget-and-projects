import * as d3 from "d3"
import {globalConfig} from "../constant"

const VizPart4 = (data) => {
    const clsName = "part4"
    const selector = `svg.${clsName}`

    const node = document.createElement('div')

    const moneyFormat = d3.format(',.0f')
    const percentageFormat = d3.format(".2%")

    const width = 800;
    const height = 500;
    const margin = { top: 0, left: 100, bottom: 0, right: 60};
    const radius = Math.min(width, height) / 2 * 0.75;
    const centroid = {cx:width/2,cy:height/2}
    const delay_duration = 1000
    const centerTextDefault =  "ปี 2561"

    const cScale = d3.scaleLinear()
        .domain([0, Math.max(...data.map(d => d.percentage))])
        .range(globalConfig.highligthColors)

    d3.select(node).append('svg')
        .attr("class", clsName)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("transform", "translate(" + (-margin.left) + "," + margin.top + ")")

    const display = () => {
        const centerText = d3.select(selector)
            .append("text")
            .attr('class','center_text')
            .attr('x', centroid.cx)
            .attr('y', centroid.cy)
            .style("font-size", "1.5rem")
            .style("font-weight", "bold")
            .style("text-anchor", "middle")
            .text(centerTextDefault)

        const arc = d3.arc()
                .outerRadius(radius * 0.6)
                .innerRadius(radius * 0.8)
                
        // // Another arc that won't be drawn. Just for labels positioning
        const outerArc = d3.arc()
            .innerRadius(radius * 0.9)
            .outerRadius(radius * 0.9)

        const pie = d3.pie()
            .value(d => d.value)
            .sort(null)

        const chart = d3.select(selector)
            .append("g")
            .attr("class", "chart")
            .attr("transform", "translate(" + centroid.cx + "," + centroid.cy + ")")

        const donus = chart
            .append('g')
            .attr('class','donut')
            .selectAll("path")
            .data(pie(data))
            .enter()
            .append('path')
            .attr("stroke", "white")
            .style("stroke-width", "2px")
            .attr("fill", d => cScale(d.data.percentage))

        donus.transition().delay( (_, i) => {
                return i * delay_duration;
            })
            .duration(delay_duration)
            .attrTween('d', (d) => {
                const i = d3.interpolate(d.startAngle+0.1, d.endAngle);
                return (t) => {
                    d.endAngle = i(t)
                    return arc(d)
                }
            });

        donus.on('mouseover', (d, i) => {
            d3.select(selector).selectAll("path")
                .transition()
                .duration(500)
                .style("opacity", (dd, j) => {
                    if (i === j) {
                        return 1
                    } else {
                        return 0.1
                    }
                })

            d3.select(selector).selectAll("text.label")
                .style("opacity", (dd, j) => {
                    console.log(dd, j)
                    if (i === j) {
                        return 1
                    } else {
                        return 0.1
                    }
                })

            centerText.text(moneyFormat(d.data.value) + " ล้านบาท")
        })
        .on('mouseleave', () => {
            d3.select(selector)
                .selectAll("path")
                .transition()
                .style("opacity", 1)

            centerText.text(centerTextDefault)
        })

        chart.append('g')
            .selectAll("text")
            .data(pie(data))
            .enter()
            .append("text")
            .attr('class','label')
            .attr('transform', (d) => {
                let pos = outerArc.centroid(d);
                let midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
                // control position of label on the left side
                if(midangle > Math.PI){
                    pos[0] =  -radius * 1.5
                }
                return 'translate(' + pos + ')';
            })
            .text((d) => {
                return d.data.label + "  " + percentageFormat(d.data.percentage)
            })
            .style("font-weight", "bold")
            .style("opacity", 0)
            .transition()
            .delay(delay_duration*data.length)
            .style('opacity', 1)
    }

    const reset = () => {
        d3.select(selector)
            .selectAll(".donus")
            .transition()
            .style("opacity", 0)
            .remove()

        d3.select(selector)
            .selectAll(".text")
            .remove()
    }


    return {node, display, reset}
}

export default VizPart4