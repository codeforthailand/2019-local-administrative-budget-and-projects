import * as d3 from "d3"
import {labelConstant, globalConfig} from "../constant"
import utils from "../utils"

const CircleBlob = (data) => {
    const clsName = "circleBlob"
    const selector = `svg.${clsName}`

    const maxSize = d3.max(data, d => d.size)
    const minSize = d3.min(data, d => d.size) 


    const colorScale = d3.scaleLinear()
        .domain([0, 1])
        .range(globalConfig.highligthColors)

    const bubbleSizeScaler = d3.scaleLinear()
        .domain([minSize, maxSize])
        .range(utils.isMobile() ? [2.5, 20] : [2.5, 30])

    const node = document.createElement('div');

    const width = utils.isMobile() ? utils.getWindowWidthHeight().width * 0.8 : 896
    const height = 400

    const scalingFactor = utils.isMobile() ?
        [ 0.9, 0.5, 0.1, 0.9, 0.5, 0.1] : [0.8, 0.5, 0.2, 0.8, 0.5, 0.2]
    
    const xCenter = {
        one: [width*0.5],
        region: scalingFactor.map(f => width * f),
        doCivilProjects: [width*0.7, width*0.2],
    }

    const yCenter = {
        region: [0.7, 0.7, 0.7, 0.3, 0.3, 0.3].map(f => height * f),
    }

    const svg = d3.select(node)
        .append("svg")
        .attr("class", clsName)
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


    const getKey = (a, k) => {
        if(!a.methodStats[k]){
          return 0
        } else{
          return a.methodStats[k].count
        }
      }

    const findColor = (highlightKey, d) => {
        console.log(d.methodStats)
        const selectedProjects = getKey(d, highlightKey.name)
        //  d.methodStats[highlightKey.name].count || 0

        return colorScale(selectedProjects / d.totalProjects)
    }

    const setLabels = (key) => {
        const centers = xCenter[key].map((d, i) => {
            return {
                x: d,
                y: yCenter[key][i] + 70
            }
        })

        const u = d3.select(selector)
            .selectAll("text.label")
            .data(centers, d => d)

            u.enter()
                .append("text")
                .attr("class", "label")
                .style("text-anchor", "middle")
                .merge(u)
                .attr("x", d => d.x)
                .attr("y", d => d.y)
                .style("font-size", utils.isMobile() ? "10px": "14px")
                .text((_, i) => labelConstant[key][i])

            u.exit().remove()
    }


    const draw = (key, highlightKey) => {
        const u = d3.select(selector).select("g") 
            .selectAll('circle')
            .data(nodes)

        u.enter() 
            .append('circle')
            .attr("class", "org")
            .attr('r', (d) => d.radius)
            .style("pointer-events", "all")
            // .style('cursor', 'pointer')
            .attr("fill", (d) => findColor(highlightKey, d))
            // .on("click", d => { 
            //     window.open(`/org?tin=${d.tin}`, "_blank")
            // })
            .on("mouseover", (d) => {
                d3.select("body").select("div.tooltip")
                    .html(`
                    ${d.corporate_name}<br/>
                    ได้รับงานอปท.ทั้งหมด ${d.totalProjects} โครงการ
                    รวมมูลค่าทั้งสิ้น ${ utils.numFormatInt(Math.round(d.size)) } ล้านบาท
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
            .attr('cy', d => d.y)

        u.exit().remove();

        setLabels(key)
    }

    let lastKey

    const doSimulate = ({key, restart=false, highlightKey}) => {
        if(lastKey !== key || restart){
            simulation.alpha(0.8).restart()
        }

        simulation.force('charge', d3.forceManyBody().strength(1.5))
            .force('x', d3.forceX().x(d => xCenter[key][d.category[key]]))
            .force('y', d3.forceY().y(d => yCenter[key][d.category[key]]))
            .force('collision', d3.forceCollide().radius(d => d.radius))
            .on('tick', () => draw(key, highlightKey))

        lastKey = key
    }

    const setCircleHighlight = (key, highlightKey) => {
        draw(key, highlightKey)

        d3.select(selector)
            .selectAll("circle")
            .transition()
            .attr("fill", (d) => findColor(highlightKey, d))
    }

   return {node, cleanUp, doSimulate, setCircleHighlight}
}

export default CircleBlob