import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ReactTable from 'react-table'
import { concatProvidersData, capitalizeFirstLetter, formatPrice } from '../common/formatters';

import * as ProvidersActions from '../actions/providersActions';
import SubTableComponent from './SubTableComponent';

import gcSquare from '../assets/gc-square.png';
import s3square from '../assets/s3-square.png';

const googleColor = '#4885ed';
const awsColor = '#ff9900';


// TableComponent Component
class TableComponent extends Component {

    constructor() {
      super();
      this.state = {
        expanded : {
          0: true,
        }
      };
      this.toggleExpanded = this.toggleExpanded.bind(this);
    }

    componentDidMount() {}

    toggleExpanded(index) {
      const currentExpanded = this.state.expanded;

      if (!currentExpanded[index]) {
        currentExpanded[index] = true;
      } else {
        currentExpanded[index] = !currentExpanded[index];
      }
      this.setState({ expanded : currentExpanded });
    }

    formatPriceCell(price, link, provider) {

      const styles = {
        linkBtn: {},
      };

      switch (provider) {
        case 'aws':
          styles.linkBtn.color = awsColor;
          break;
        case 'gcp':
          styles.linkBtn.color = googleColor;
          break;
        default:
          styles.linkBtn.color = 'black';
      };

      const res = (
        <span className="price-cell">
          {formatPrice(price)}
          <a href={link} target="_blank">
            <button className="btn btn-xs" style={styles.linkBtn}>
              <i className="fa fa-external-link"/>
            </button>
          </a>
        </span>
      );
      return res;
    }

    formatProvider(value) {
      const styles = {
        span: {
          color: 'black',
          fontWeight: 'bold',
        },
        logo: {
          height: '20px',
        },
      };

      let picture;
      switch (value) {
        case 'aws':
          picture = s3square;
          styles.span.color = awsColor;
          break;
        case 'gcp':
          picture = gcSquare;
          styles.span.color = googleColor;
          break;
        default:
          picture = '';
      };
      const res = (
        <span style={styles.span}>
            <img src={picture} alt="Provider logo" style={styles.logo}/>
            &nbsp;
            {value.toUpperCase()}
        </span>
      );
      return res;
    }

    render() {

      let data = this.props.aws.pricing || this.props.gcp.pricing;
      if (this.props.aws.pricing && this.props.gcp.pricing) {
        data = concatProvidersData([this.props.aws.pricing, this.props.gcp.pricing]);
      }


      const columns = [
        {
          Header: 'Region',
          accessor: 'region',
          Cell: props => <strong>{capitalizeFirstLetter(props.value)}</strong> // Custom cell components!
        },
        {
          Header: 'Provider',
          accessor: 'provider',
          Cell: props => this.formatProvider(props.value) // Custom cell components!
        },
        {
          id: 'frequentPrice',
          Header: 'Frequent Access',
          accessor: d => ({provider: d.provider, price: d.details.frequent.usd, link: d.details.frequent.link}),
          Cell: props => this.formatPriceCell(props.value.price, props.value.link, props.value.provider) // Custom cell components!
        },
        {
          id: 'infrequentPrice',
          Header: 'Infrequent Access',
          accessor: d => ({provider: d.provider, price: d.details.infrequent.usd, link: d.details.infrequent.link}),
          Cell: props => this.formatPriceCell(props.value.price, props.value.link, props.value.provider) // Custom cell components!
        },
        {
          id: 'archivePrice',
          Header: 'Archive',
          accessor: d => ({provider: d.provider, price: d.details.archive.usd, link: d.details.archive.link}),
          Cell: props => this.formatPriceCell(props.value.price, props.value.link, props.value.provider) // Custom cell components!
        },
        {
          Header: 'Total',
          accessor: 'total',
          Cell: props => <strong className="price-cell">{formatPrice(props.value)}</strong> // Custom cell components!
        },



      ];

      return (
        <div>
          <div>
            <div className="col-md-12">
              <h4 className="paper-title">
                <i className="fa fa-list red-color"/>
                &nbsp;
                Table (monthly prices)
                <br/>
                <span className="small-helper">
                  Click header to sort.     Shift + click to multi sort.
                  <br />
                  Unfold left arrow for details
                </span>
              </h4>
            </div>
          </div>
          <div className="clearfix" />
          <ReactTable
            data={data}
            columns={columns}
            defaultSorted={[
               {
                 id: "total",
                 desc: false
               }
             ]}
            SubComponent={row => <SubTableComponent row={row} />}
            expanded={this.state.expanded}
            getTdProps={(state, rowInfo, column, instance) => {
              return {
                onClick: (e, handleOriginal) => {
                  this.toggleExpanded(rowInfo.index);
                }
              }
            }}
          />
      </div>
      );
    }

}


// Define PropTypes
TableComponent.propTypes = {
  gcp: PropTypes.object,
};


// Subscribe component to redux store and merge the state into
// component's props
const mapStateToProps = ({ gcp, aws }) => ({
  gcp,
  aws
});

const mapActionCreatorsToProps = (dispatch) => (
   bindActionCreators(ProvidersActions, dispatch)
);


// connect method from react-router connects the component with redux store
export default connect(mapStateToProps, mapActionCreatorsToProps)(TableComponent);
