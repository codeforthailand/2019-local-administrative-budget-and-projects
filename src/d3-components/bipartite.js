import * as d3 from 'd3'

const BipartiteGraph = ({layoutData, width, height}) => {
    const margin = {
        left: 150,
        right: 150,
        top: 40,
        bottom: 20
    }
    const node = document.createElement('div');
    const svg = d3.select(node).append("svg")
        .attr("width", width + margin.left + margin.right + 20)
        .attr("height", height + margin.top + margin.bottom + 20)

    const { flows, sources, targets } = layoutData;
    const nodes = [].concat(sources, targets);
    const nodeWidth = 10;

    const container = svg.append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
    
      // code below taken from https://observablehq.com/@ilyabo/weighted-bipartite-graph
      // flow lines
    container.append('g')
      .selectAll('path')
      .data(flows)
      .enter().append('path')
        .attr('d', d => d.path)
        .attr('opacity', 0.5)  
        .attr('fill', 'none')  
        .attr('stroke', 'steelblue')  
          .attr('stroke-width', d => d.thickness);

    // node rectangles
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

    // source labels
    container.append('g')
      .selectAll('text')
      .data(sources)
      .enter().append('text')
        .attr('x', -nodeWidth)
        .attr('y', d => d.y + d.height/2)
          .attr('font-size', 10)
          .attr('alignment-baseline', 'middle')
          .attr('text-anchor', 'end')
          .text(d => {
            const m = d.key.match(/\((.+)\)/)
            if (m) {
              return m[1]
            } else {
              return d.key
            }
            
          });

    const maxX = Math.max(...targets.map(n => n.x))

    // target labels
    container.append('g')
      .selectAll('text')
      .data(targets)
      .enter().append('text')
        .attr('x', maxX + nodeWidth)
        .attr('y', d => d.y + d.height/2)
          .attr('font-size', 10)
          .attr('alignment-baseline', 'middle')
          .attr('text-anchor', 'start')
          .text(d => d.key);

    return node;
}

export default BipartiteGraph