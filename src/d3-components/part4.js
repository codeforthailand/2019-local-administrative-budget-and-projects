import * as d3 from "d3"

const VizPart4 = (data) => {
    const clsName = "part4"
    const selector = `svg.${clsName}`
    const node = document.createElement('div')

    const moneyFormat = d3.format(',.0f')
    const percentageFormat = d3.format(".2%")

    const width = 800;
    const height = 500;
    const margin = { top: 0, left: 0, bottom: 0, right: 0};
    const radius = Math.min(width, height) / 2 * 0.75;
    const centroid = {cx:width/2,cy:height/2}
    const delay_duration = 1800

    const cScale = d3.scaleOrdinal()
        .domain(d => d.income_src)
        .range(d3.schemeDark2)

    d3.select(node).append('svg')
        .attr("class", clsName)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

    const display = () => {
        const centerText = d3.select(selector)
            .append("text")
            .attr('class','center_text')
            .attr('x', centroid.cx-80)
            .attr('y', centroid.cy+10)
            .style("font-size", "1.5em")

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
            .attr("fill", d => cScale(d.data.label))

        donus.transition().delay( (_, i) => {
                return i * delay_duration;
            })
            .duration(delay_duration)
            .attrTween('d', (d) => {
                const i = d3.interpolate(d.startAngle+0.1, d.endAngle);
                return function(t) {
                        d.endAngle = i(t); 
                        return arc(d)
                    }
            });

        donus.on('mouseover', (d) => {
            d3.select(this)
                .transition()
                .duration(500)
                .ease(d3.easeBounce)
                .attr("opacity",'0.6')
                .style("stroke-width", "4px")

            centerText.text(moneyFormat(d.data.value) + " ล้านบาท")
        })
        .on('mouseleave', () => {
            d3.select(this)
                    .transition()
                    .duration(500)
                    .ease(d3.easeBounce)
                    .attr("opacity",'1')
                    .style("stroke-width", "2px")

            centerText.text("")
        })

        chart.append('g')
            .attr('class','label')
            .selectAll("text")
            .data(pie(data))
            .enter()
            .append("text")
            .attr('transform', (d) => {
                let pos = outerArc.centroid(d);
                let midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
                // control position of label on the left side
                if(midangle > Math.PI){
                    pos[0] =  -radius * 1.25
                }
                return 'translate(' + pos + ')';
            })
            .text((d) => {
                return d.data.label + "  " + percentageFormat(d.data.percentage)
            })
            .style('font-size', '10px')
            .transition()
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