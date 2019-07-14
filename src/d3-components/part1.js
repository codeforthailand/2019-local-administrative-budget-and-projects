import * as d3 from "d3"
import {globalConfig} from "../constant"

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

    let label_size = {
        width: 300,
        height: 30
    }

    const colorScale = d3.scaleLinear()
        .domain([0, 1])
        .range(globalConfig.highligthColors)


    let _label
    let _text;

    let text_value = 'เปิดขุมทรัพย์ อปท. กว่า 7 แสนล้านบาท'

    // Key variables:
    let strength = -0.25; // default repulsion
    let centeringStrength = 0.01; // power of centering force for two clusters
    let velocityDecay = 0.15; // velocity decay: higher value, less overshooting
    let outerRadius = width * 0.8; // new nodes within this radius
    let innerRadius = width * 0.1; // new nodes outside this radius, initial nodes within.
    let startCenter = [width / 2, height / 2]; // new nodes/initial nodes center point
    const n = 200; // number of initial nodes
    let cycles = 800; // number of ticks before stopping.

    const clsName = "part1"
    const selector = `svg.${clsName}`

    const node = document.createElement('div');

    const svg = d3.select(node)
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
            r: Math.random() * 5,
            fill: colorScale(Math.random())
        }
    }

    const simulation = d3.forceSimulation()
    let tick = 0;

    const data = Array.from({length: n}, (_, i) => random())
    console.log(data)


    const display_part1 = () => {
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
            .alphaDecay(0)
            .velocityDecay(velocityDecay)
            .on("tick", () => {
                tick += 1
                if (tick <= cycles) {
                    data.push(random()); // create a node
                    // this.nodes(data_nodes); // update the nodes.
                    simulation.nodes(data)

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
                } 
            })
    }

    // function ticked() {
    //     tick++;

    //     if (tick < cycles) {
    //         data_nodes.push(random()); // create a node
    //         this.nodes(data_nodes); // update the nodes.

    //         nodes = nodes.data(data_nodes)

    //         nodes = nodes.enter()
    //             .append("circle")
    //             .attr('r', d => d.r)
    //             .merge(nodes);

    //         nodes
    //             .attr("cx", d => d.x)
    //             .attr("cy", d => d.y)

    //     } else {
    //         nodes
    //             .attr("cx", d => d.x)
    //             .attr("cy", d => d.y)

    //         exit_part1()
    //     }

    // }

    // // Transition to exit part 1
    // function exit_part1() {

    //     _label
    //         .transition()
    //         .duration(50)
    //         .style("opacity", 0.0);

    //     _text
    //         .transition()
    //         .duration(50)
    //         .style("opacity", 0.0);

    //     for (let i = 0; i < data_nodes.length; i++) {
    //         data_nodes.pop();
    //     }

    //     nodes = nodes.data(data_nodes)
    //     nodes.exit()
    //         .transition()
    //         .duration(1000)
    //         .style('opacity', 0)
    //         .style('fill', 'gray')
    //         .remove();

    // }


    // display_part1()

    return {node, display_part1}
}

export default VizPart1