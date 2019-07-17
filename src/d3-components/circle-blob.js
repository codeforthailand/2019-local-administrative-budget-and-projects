import * as d3 from "d3"
import {labelConstant, globalConfig} from "../constant"

const CircleBlob = ({data, navigate}) => {
    const maxSize = d3.max(data, d => d.size)
    const minSize = d3.min(data, d => d.size) 


    const colorScale = d3.scaleLinear()
        .domain([0, 1])
        .range(globalConfig.highligthColors)

    const bubbleSizeScaler = d3.scaleLinear()
        .domain([minSize, maxSize])
        .range([2.5, 30])

    const node = document.createElement('div');

    const width = 896, height = 600;
    const xCenter = {
        one: [width*0.5],
        region: [
            width*0.85, width*0.7, width*0.55,
            width*0.4, width*0.25, width*0.1,
        ],
        doCivilProjects: [width*0.7, width*0.2],
    }

    const svg = d3.select(node)
        .append("svg")
        .attr("class", "part4")
        .attr("width", width)
        .attr("height", height)

    svg.append("g").attr("class", "main-panel")

    const nodes = data.map( (d, i) => {
        return {
            ...d,
            radius: bubbleSizeScaler(d.size),
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
    const cleanUp = () => {
        tooltip.remove()
        simulation.stop()
    }

    const findColor = (highlightKey, d) => {
        console.log("find colorxx")
        const selectedProjects = d.projects.filter(
            p => p.purchase_method_name === highlightKey.name
        )

        return colorScale(selectedProjects.length / d.projects.length)
    }

    const setLabels = (key) => {
        const u = d3.select("svg.part4")
            .selectAll("text.label")
            .data(xCenter[key], d => d)

            u.enter()
                .append("text")
                .attr("class", "label")
                .style("text-anchor", "middle")
                .style("font-size", 12)
                .merge(u)
                .attr("x", (d) => d)
                .attr("y", height - 100)
                .style("cursor", "pointer")
                .text((_, i) => labelConstant[key][i])

            u.exit().remove()
    }


    const draw = (key, highlightKey) => {
        const u = d3.select("svg.part4").select("g") 
            .selectAll('circle')
            .data(nodes)

        u.enter() 
            .append('circle')
            .attr("class", "org")
            .attr('r', (d) => d.radius)
            .style("pointer-events", "all")
            .style('cursor', 'pointer')
            .attr("fill", (d) => findColor(highlightKey, d))
            .on("click", d => { 
                window.open(`/org?tin=${d.tin}`, "_blank")
            })
            .on("mouseover", (d) => {
                d3.select("body").select("div.tooltip")
                    .html(`
                    ${d.name}<br/>
                    ได้รับทั้งหมด ${d.totalProjects} โครงการ
                    รวมมูลค่าทั้งสิ้น ฿${Math.round(d.size)}M
                    `
                    )
                    .style("z-index", 1000)
                    .style("left", (d3.event.pageX + 20) + "px")
                    .style("top", (d3.event.pageY - 28) + "px")
                    .transition()
                    .style("opacity", 0.8)
                    .style("display", "block")
            })
            .on("mouseleave", () => {
                d3.select("body").select("div.tooltip")
                    .transition()
                    .style("opacity", 0)
                    .style("display", "none")
            })
            .merge(u)
            .attr('cx', d => d.x)
            .attr('cy', d => height/2 + d.y)

        u.exit().remove();

        setLabels(key)
    }

    const doSimulate = ({key, restart, highlightKey}) => {
        if(restart){
            simulation.alpha(0.8).restart()
        }

        simulation.force('charge', d3.forceManyBody().strength(1.5))
            .force('x', d3.forceX().x(d => xCenter[key][d.category[key]]))
            .force('collision', d3.forceCollide().radius(d => d.radius))
            .on('tick', () => draw(key, highlightKey))
    }

    const setCircleHighlight = (key, highlightKey) => {
        draw(key, highlightKey)

        d3.select("svg.part4")
            .selectAll("circle")
            .transition()
            .attr("fill", (d) => findColor(highlightKey, d))
    }

   return {node, cleanUp, doSimulate, setCircleHighlight}
}

export default CircleBlob