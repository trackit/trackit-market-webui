import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Chart Component
class PieChartComponent extends Component {

    componentDidMount() {
      var layout = this.getLayout();

      window.Plotly.newPlot(this.props.elementId, this.props.data, layout, {displaylogo: false});
    }

    componentWillReceiveProps(nextProps) {
      var layout = this.getLayout();
      if (document.getElementById(nextProps.elementId)) {
        window.Plotly.purge(nextProps.elementId);
        window.Plotly.plot(nextProps.elementId, nextProps.data, layout, {displaylogo: false});
      }
    }

    getLayout(barmode) {
      return(
        {}
      );
    }

    render() {


      return (
        <div>
          <div id={this.props.elementId} />
        </div>
      );
    }

}

PieChartComponent.defaultProps = {}

// Define PropTypes
PieChartComponent.propTypes = {
  elementId: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};


export default PieChartComponent;
