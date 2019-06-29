import * as d3 from "d3"

const CircleBlob = (data) => {
    const maxSize = d3.max(data, d => d.size)
    const minSize = d3.min(data, d => d.size) 

    const bubbleSizeScaler = d3.scaleLinear()
        .domain([minSize, maxSize])
        .range([10, 40])

    const colorScaler = d3.scaleLinear()
        .domain([0, 1])
        .range(["#eee", "#f00"])

    const node = document.createElement('div');

    const width = 1152, height = 600;
    const svg = d3.select(node)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .style("border", "1px #eee dotted")

    const g = svg.append("g")

    const xCenter = [width*0.8, width*0.6, width*0.35, width*0.1]

    const nodes = data.map( (d, i) => {
        return {
            radius: bubbleSizeScaler(d.size),
            category: d.category,
            fill: colorScaler(d.ratio)
        }
    });

    const tooltip = d3.select("body").append("div")	
        .attr("class", "tooltip")				
        .style("opacity", 0.0)
        .style("background", "black")
        .style("color", "white")
        .style("position", "absolute")

    d3.forceSimulation(nodes)
        .force('charge', d3.forceManyBody().strength(5))
        .force('x', d3.forceX().x(function (d) {
            return xCenter[d.category];
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
                .on("mouseover", (d) => {
                    console.log("toolip")
                    d3.select("body").select("div.tooltip")
                        .html("something")	
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

    return {node}
}

export default CircleBlob