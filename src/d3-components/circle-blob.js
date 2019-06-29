import * as d3 from "d3"
import {labelConstant} from "../constant"

const CircleBlob = ({data, navigate}) => {
    const maxSize = d3.max(data, d => d.size)
    const minSize = d3.min(data, d => d.size) 

    const bubbleSizeScaler = d3.scaleLinear()
        .domain([minSize, maxSize])
        .range([2.5, 30])

    const colorScaler = d3.scaleLinear()
        .domain([0, 1])
        .range(["#eee", "#f00"])

    const node = document.createElement('div');

    const width = 896, height = 600;
    const xCenter = {
        oneCategory: [width*0.5],
        budgetCategory: [width*0.8, width*0.6, width*0.35, width*0.1],
        regionCategory: [
            width*0.85, width*0.7, width*0.55,
            width*0.4, width*0.25, width*0.1,
        ],
        totalProjectCategory: [width*0.8, width*0.6, width*0.35, width*0.1],
    }

    const svg = d3.select(node)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .style("border", "1px #eee dotted")

    const g = svg.append("g")

    const nodes = data.map( (d, i) => {
        return {
            ...d,
            radius: bubbleSizeScaler(d.size),
            fill: colorScaler(d.ratio)
        }
    });

    const tooltip = d3.select("body").append("div")	
        .attr("class", "tooltip")				
        .style("opacity", 0.0)
        .style("background", "black")
        .style("color", "white")
        .style("position", "absolute")
        .style("padding", "10px")

    const simulation = d3.forceSimulation(nodes)

    const catKey = Object.keys(xCenter)[0];

    const doSimulate = ({key, restart}) => {
        if(restart){
            d3.select("svg")
                .selectAll("text.label")
                .style("opacity", 0)

            simulation.alpha(0.8).restart()
        }

        simulation.force('charge', d3.forceManyBody().strength(1.5))
            .force('x', d3.forceX().x(function (d) {
                return xCenter[key][d[key]];
            }))
            .force('collision', d3.forceCollide().radius(function (d) {
                return d.radius;
            }))
            .on('tick', () => {
                const u = d3.select("svg").select("g") 
                    .selectAll('circle')
                    .data(nodes)

                u.enter() 
                    .append('circle')
                    .attr('r', (d) => d.radius)
                    .style('fill', d => d.fill)
                    .style('cursor', 'pointer')
                    .on("click", (d) => {
                        navigate("/org")
                    })
                    .on("mouseover", (d) => {
                        d3.select("body").select("div.tooltip")
                            .html("Company Name.")	
                            .style("left", (d3.event.pageX + 20) + "px")
                            .style("top", (d3.event.pageY - 28) + "px")
                            .transition()
                            .style("opacity", 0.8)
                    })
                    .on("mouseleave", () => {
                        d3.select("body").select("div.tooltip")
                            .transition()
                            .style("opacity", 0)
                    })
                    .merge(u)
                    .attr('cx', d => d.x)
                    .attr('cy', d => height/2 + d.y)

                u.exit().remove();
            })
            .on("end", () => {
                const u = d3.select("svg")
                    .selectAll("text.label")
                    .data(xCenter[key], d => d)

                    u.enter()
                        .append("text")
                        .attr("class", "label")
                        .style("text-anchor", "middle")
                        .merge(u)
                        .text( (d, i) => {
                            return labelConstant[key][i] + `(${i})`
                        })
                        .attr("x", (d) => d)
                        .attr("y", height - 50)
                        .style("cursor", "pointer")
                        .transition()
                        .style("opacity", 1)

                    u.exit().remove()
            });
    }

   doSimulate({key: catKey, restart: false} )

    const cleanUp = () => {
        tooltip.remove()
        simulation.stop()
    }

    return {node, cleanUp, doSimulate}
}

export default CircleBlob