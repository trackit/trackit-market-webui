import React, { Component } from 'react';
import PropTypes from 'prop-types';

import PieChartComponent from './PieChartComponent';
import { getFullProviderName, dataToPieChart, hashString, formatPrice } from '../common/formatters';

const SubBlock = ({details, title}) => (
  <div className="col-md-12">
    <h5><strong>{title}</strong></h5>
    <h4><span className="red-color">{formatPrice(details.usd)}</span></h4>
    <p>using <strong>{details.real_type}</strong></p>
    <a href={details.link} target="_blank">
      <button className="btn btn-default btn-sm">
        <i className="fa fa-external-link"/>
        &nbsp; Check
      </button>
    </a>
    <hr />
  </div>
);

// Sub Table Component
class SubTableComponent extends Component {

    render() {
      const styles = {
        title: {
          textAlign: 'center',
        }
      }

      const chartData = dataToPieChart(this.props.row.original);
      const { row } = this.props;

      return (
        <div>
          <h4 style={styles.title}>{getFullProviderName(row.original.provider)} in {row.original.region}</h4>
          <div className="row" style={{ padding: '0px 40px'}}>
            <div className="col-md-6">
              <SubBlock details={row.original.details.frequent} title="Frequent Access"/>
              <SubBlock details={row.original.details.infrequent} title="Infrequent Access"/>
              <SubBlock details={row.original.details.archive} title="Archive"/>
            </div>
            <div className="col-md-6">
              <PieChartComponent data={chartData} elementId={`chartId-${hashString(row.original.region)}`}/>
            </div>

          </div>
          <br/>
          <div className="clearfix"/>
        </div>
      );
    }

}

SubTableComponent.defaultProps = {}

// Define PropTypes
SubTableComponent.propTypes = {
  row: PropTypes.object
};


export default SubTableComponent;
