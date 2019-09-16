import React from 'react'
import * as d3 from 'd3'

export class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [
        { id: 1, radius: 20, x: 150, color: '#2F4F4F' },
        { id: 2, radius: 10, x: 400, color: 'lightpink' },
        { id: 3, radius: 40, x: 650, color: '#708090' }
      ],
      staticCircleRadius: 100
    }
  }
  componentDidMount() {
    const { data, staticCircleRadius } = this.state
    const svgWidth = 800
    const svgHeight = 400
    const svg = d3
      .select('#svg')
      .attr('width', svgWidth)
      .attr('height', svgHeight)

    const circleGroup = svg
      .selectAll('g')
      .data(data)
      .enter()
      .append('g')
      .attr('class', 'circle-group')

    circleGroup
      .append('circle')
      .attr('class', 'inner-circle')
      .attr('r', d => d.radius)
      .attr('cx', d => d.x)
      .attr('cy', svgHeight / 2)
      .attr('fill', d => d.color)
      .attr('fill-opacity', 0)
      .attr('stroke', d => d.color)

    circleGroup
      .append('circle')
      .attr('class', 'outer-circle')
      .attr('r', d => d.radius + 5)
      .attr('cx', d => d.x)
      .attr('cy', svgHeight / 2)
      .attr('fill', 'none')
      .attr('stroke', 'coral')
      .attr('stroke-width', 3)

    circleGroup
      .append('circle')
      .attr('class', 'static-circle')
      .attr('r', staticCircleRadius)
      .attr('cx', d => d.x)
      .attr('cy', svgHeight / 2)
      .attr('fill', 'none')
      .attr('stroke', d => d.color)
      .attr('stroke-width', 3)

    circleGroup
      .append('text')
      .text(d => d.radius)
      .attr('x', d => d.x)
      .attr('y', svgHeight / 2)
      .attr('font-size', d => d.radius / 2)
      .attr('font-family', 'sans-serif')
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'central')
      .attr('fill', d => d.color)
  }

  componentDidUpdate() {
    this.redrawCircles()
  }

  redrawCircles = () => {
    const { data } = this.state
    const circleGroup = d3.selectAll('.circle-group').data(data)
    circleGroup
      .select('.inner-circle')
      .transition()
      .duration(600)
      .attr('r', d => d.radius)
      .attr('fill-opacity', d => (d.radius === 100 ? 0.5 : 0))

    circleGroup
      .select('.outer-circle')
      .transition()
      .duration(600)
      .attr('r', d => d.radius + 5)

    circleGroup
      .select('text')
      .text(d => d.radius)
      .transition()
      .duration(600)
      .attr('font-size', d => d.radius)
  }

  updateData = direction => {
    const { data, staticCircleRadius } = this.state

    const newData = data.map(d => {
      const newValue = direction === 'increase' ? d.radius + 10 : d.radius - 10

      const checkedValue =
        newValue < 0
          ? 0
          : newValue > staticCircleRadius
          ? staticCircleRadius
          : newValue

      return { ...d, radius: checkedValue }
    })
    this.setState({ data: newData })
  }

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
    )
  }
}
