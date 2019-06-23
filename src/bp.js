import * as d3 from 'd3'

const BipartiteGraph = ({layoutData, width, height}) => {
    console.log("xx")
    console.log(layoutData)
    console.log(height)
    console.log(width)
    console.log('yyy')
    const margin = {
        left: 40,
        right: 20,
        top: 20,
        bottom: 20
    }
    const node = document.createElement('div');
    const svg = d3.select(node).append("svg")
        .attr("width", width + margin.left + margin.right + 20)
        .attr("height", height + margin.top + margin.bottom + 20)
        .style("background", "gray")

    const { flows, sources, targets } = layoutData;
    const nodes = [].concat(sources, targets);
    const nodeWidth = 10;
    
    const container = svg.append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
    
    // // flow lines
    // container.append('g')
    //   .selectAll('path')
    //   .data(flows)
    //   .enter()
    //   .append('path')
    //     .attr('d', d => d.path)
    //     .attr('opacity', 0.5)  
    //     .attr('fill', 'none')  
    //     .attr('stroke', 'steelblue')  
    //     .attr('stroke-width', d => d.thickness);
    
    // // node rectangles
    container.append('g')
      .selectAll('rect')
      .data(nodes)
        .enter().append('rect')
            .attr('x', d => d.x - nodeWidth/2)
            .attr('y', d => d.y)
          .attr('width', nodeWidth)
            .attr('height', d => d.height)
            .attr('fill', 'steelblue')  
            .attr('stroke', 'none');
    
    // // source labels
    container.append('g')
      .selectAll('text')
      .data(sources)
        .enter().append('text')
            .attr('x', d => d.x - 15)
            .attr('y', d => d.y + d.height/2)
          .attr('font-family', 'arial')
          .attr('font-size', 10)
          .attr('alignment-baseline', 'middle')
          .attr('text-anchor', 'middle')
          .text(d => d.key);
  
    // // target labels
    container.append('g')
      .selectAll('text')
      .data(targets)
        .enter().append('text')
            .attr('x', d => d.x + 15)
            .attr('y', d => d.y + d.height/2)
          .attr('font-family', 'arial')
          .attr('font-size', 10)
          .attr('alignment-baseline', 'middle')
          .attr('text-anchor', 'middle')
          .text(d => d.key);
  
    return node;
}

export default BipartiteGraph