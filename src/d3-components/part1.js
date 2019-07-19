import * as d3 from "d3"
import {globalConfig, statistics} from "../constant"
import utils from "../utils"

const VizPart1 = () => {
    // constants to define the size
    // and margins of the vis area.
    let width = 800;
    let height = 500;
    let margin = {
        top: 20,
        left: 40,
        bottom: 80,
        right: 40
    };

    const colorScale = d3.scaleLinear()
        .domain([0, 1])
        .range(globalConfig.highligthColors)

    // Key variables:
    let strength = -0.25; // default repulsion
    let centeringStrength = 0.01; // power of centering force for two clusters
    let velocityDecay = 0.15; // velocity decay: higher value, less overshooting
    let outerRadius = width * 0.8; // new nodes within this radius
    let innerRadius = width * 0.1; // new nodes outside this radius, initial nodes within.
    let startCenter = [width / 2, height / 2]; // new nodes/initial nodes center point
    const n = 200; // number of initial nodes
    let cycles = 200; // number of ticks before stopping.

    const clsName = "part1"
    const selector = `svg.${clsName}`

    const node = document.createElement('div');

    d3.select(node)
        .append('svg')
        .attr("class", clsName)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Helper function for part 1 - Create a random node
    function random() {
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * (outerRadius - innerRadius) + innerRadius;
        const x = Math.cos(angle) * distance + startCenter[0];
        const y = Math.sin(angle) * distance + startCenter[1];

        return {
            x: x,
            y: y,
            strength: strength,
            r: Math.random() * 3,
            fill: colorScale(Math.random())
        }
    }


    const dataInit = () => Array.from({length: n}, (_, i) => random())

    const display = () => {
        console.log("display part1")
        const data = dataInit()
        let tick = 0
        const simulation = d3.forceSimulation()

        d3.select(selector)
            .selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr('r', d => d.r)
            .attr('fill', d => d.fill)
            .attr('x', 5)
            .attr('y', 20)

        simulation
            .nodes(data)
            .force("charge", d3.forceManyBody().strength(function (d) {
                return d.strength;
            }))
            .force("x1", d3.forceX().x(function (d) {
                return startCenter[0]
            })
            .strength(centeringStrength))
            .force("y1", d3.forceY().y(function (d) {
                return startCenter[1]
            })
            .strength(centeringStrength))
            .velocityDecay(velocityDecay)
            .on("tick", () => {
                const u = d3.select(selector)
                    .selectAll("circle")

                u.data(data)
                    .enter()
                    .append("circle")
                    .attr('r', d => d.r)
                    .attr('fill', d => d.fill)
                    .merge(u)
                    .attr("cx", d => d.x)
                    .attr("cy", d => d.y)

                tick += 1
                if (tick <= cycles) {
                    data.push(random()); // create a node
                    simulation.nodes(data)
                } else {
                    simulation.alphaMin(0.2)
                }
            })
            .on("end", () => {
                d3.select(selector)
                    .append("text")
                    .text(`มี ${utils.numFormatInt(statistics.part1.totalOrgs)} นิติบุคคล ที่เกี่ยวข้องกับอปท.`)
                    .attr("text-anchor", "middle")
                    .attr("x", startCenter[0] - 50)
                    .attr("y", startCenter[1] + innerRadius + 100)
                    .style("font-size", "1.5rem")
                    .style("font-weight", "bold")
                    .transition()
                    .attr("fill", "white")
            })
    }

    const reset = () => {
        d3.select(selector)
            .selectAll("circle")
            .transition()
            .style("opacity", 0)
            .remove()

        d3.select(selector).select("text").remove()
    }

    return {node, display, reset}
}

export default VizPart1