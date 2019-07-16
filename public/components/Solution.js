import React from 'react';
import * as d3 from 'd3';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { id: 1, radius: 90, x: 150, color: '#FDA7DF' }
        // { id: 2, radius: 40, x: 400, color: '#54a0ff' },
        // { id: 3, radius: 0, x: 650, color: '#e84118' }
      ],
      staticCircleRadius: 100
    };
  }
  componentDidMount() {
    const { data, staticCircleRadius } = this.state;
    const svgWidth = 800;
    const svgHeight = 500;
    d3.select('#svg')
      .attr('width', svgWidth)
      .attr('height', svgHeight);

    const circleGroup = d3
      .select('svg')
      .selectAll('g')
      .data(data)
      .enter()
      .append('g')
      .attr('class', 'circle-group');

    circleGroup
      .append('circle')
      .attr('class', 'inner-circle')
      .attr('r', d => d.radius)
      .attr('cx', d => d.x)
      .attr('cy', svgHeight / 2)
      .attr('fill', 'none')
      .attr('fill-opacity', 0)
      .attr('stroke', d => d.color);

    circleGroup
      .append('circle')
      .attr('class', 'outer-circle')
      .attr('r', d => d.radius + 5)
      .attr('cx', d => d.x)
      .attr('cy', svgHeight / 2)
      .attr('fill', 'none')
      .attr('stroke', 'coral')
      .attr('stroke-width', 3);
    circleGroup
      .append('circle')
      .attr('class', 'static-circle')
      .attr('r', staticCircleRadius)
      .attr('cx', d => d.x)
      .attr('cy', svgHeight / 2)
      .attr('fill', 'none')
      .attr('stroke', d => d.color)
      .attr('stroke-width', 5);

    circleGroup
      .append('text')
      .text(d => d.radius)
      .attr('x', d => d.x)
      .attr('y', svgHeight / 2)
      .attr('font-size', d => d.radius / 2)
      .attr('font-family', 'sans-serif')
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'central')
      .attr('fill', d => d.color);
  }

  componentDidUpdate() {
    this.redrawLiquid();
  }

  redrawLiquid = () => {
    const { data } = this.state;
    const circleGroup = d3.selectAll('.circle-group').data(data);
    circleGroup
      .select('.inner-circle')
      .transition()
      .duration(750)
      .attr('r', d => d.radius)
      .attr('fill', d => {
        return d.radius === 100 ? d.color : 'none';
      })
      .attr('fill-opacity', d => {
        const op = d.radius === 100 ? 0.5 : 0;
        console.log(op);
        return op;
      });

    circleGroup
      .select('.outer-circle')
      .transition()
      .duration(250)
      .attr('r', d => d.radius + 5);

    circleGroup
      .select('text')
      .text(d => d.radius)
      .transition()
      .duration(250)
      .attr('font-size', d => d.radius);
  };

  updateData = direction => {
    const { data, staticCircleRadius } = this.state;

    const newData = data.map(d => {
      const newValue = direction === 'increase' ? d.radius + 10 : d.radius - 10;

      const checkedValue =
        newValue < 0
          ? 0
          : newValue > staticCircleRadius
          ? staticCircleRadius
          : newValue;

      return { ...d, radius: checkedValue };
    });
    this.setState({ data: newData });
  };

  render() {
    return (
      <section>
        <div id="chart">
          <svg id="svg" />
        </div>
        <div className="button-container">
          <button
            id="increase"
            className="increase-btn"
            onClick={() => this.updateData('increase')}
          >
            +
          </button>
          <button
            id="decrease"
            className="decrease-btn"
            onClick={() => this.updateData('decrease')}
          >
            -
          </button>
        </div>
      </section>
    );
  }
}
