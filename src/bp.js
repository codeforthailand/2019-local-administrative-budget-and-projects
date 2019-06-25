import * as d3 from 'd3'

const BipartiteGraph = ({layoutData, width, height}) => {
    const margin = {
        left: 20,
        right: 20,
        top: 40,
        bottom: 20
    }
    const node = document.createElement('div');
    const svg = d3.select(node).append("svg")
        .attr("width", width + margin.left + margin.right + 20)
        .attr("height", height + margin.top + margin.bottom + 20)

    const { flows, sources, targets } = layoutData;
    const nodes = [].concat(sources, targets);
    const nodeHeight = 10;
    
    const container = svg.append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
    
    // // flow lines
    container.append('g')
      .selectAll('path')
      .data(flows)
      .enter()
      .append('path')
        .attr('d', d => d.path)
        .attr('opacity', 0.5)  
        .attr('fill', 'none')  
        .attr('stroke', 'steelblue')  
        .attr('stroke-width', d => d.thickness);
    
    // // node rectangles
    container.append('g')
      .selectAll('rect')
      .data(nodes)
        .enter().append('rect')
            .attr('x', d => d.x)
            .attr('y', d => d.y - nodeHeight/2)
            .attr('height', nodeHeight)
            .attr('width', d => d.width)
            .attr('fill', 'steelblue')  
            .attr('stroke', 'none')
            .on('mouseover', (d, i) => {
                d3.selectAll("rect")
                .transition()
                .ease(d3.easeCubic)
                .duration(500)
                .attr("fill", "blue"); 
            })
            .on('mouseout', (d, i) => {
                d3.selectAll("rect")
                .transition()
                .ease(d3.easeCubic)
                .duration(500)
                .attr("fill", "steelblue"); 
            })
    
    // // source labels
    container.append('g')
      .selectAll('text')
      .data(sources)
        .enter().append('text')
            .attr('x', d => d.x + d.width/2)
            .attr('y', d => d.y - 15)
          .attr('font-family', 'arial')
          .attr('font-size', 10)
          .attr('alignment-baseline', 'middle')
          .attr('text-anchor', 'middle')
          .text(d => d.key);
  
    // // // target labels
    container.append('g')
      .selectAll('text')
      .data(targets)
        .enter().append('text')
            .attr('x', d => d.x + d.width/2)
            .attr('y', d => d.y + 15)
          .attr('font-family', 'arial')
          .attr('font-size', 10)
          .attr('alignment-baseline', 'middle')
          .attr('text-anchor', 'middle')
          .text(d => d.key)
  
    return node;
}

export default BipartiteGraph