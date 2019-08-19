import React from 'react';
import * as d3 from 'd3';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { id: 1, radius: 20, x: 150, color: '#2F4F4F' },
        { id: 2, radius: 10, x: 400, color: 'lightpink' },
        { id: 3, radius: 40, x: 650, color: '#708090' }
      ],
      staticCircleRadius: 100
    };
  }
  componentDidMount() {
    // in here we need to bind each bit of data to a group
    // in this group we will append all the circles that relate to this group

  }

  componentDidUpdate() {
    this.redrawLiquid()
  }

  redrawLiquid = () => {
    // in here you should rebind the groups with the updated data
    // and then re trigger the calculations of the properties that need to be updated
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
