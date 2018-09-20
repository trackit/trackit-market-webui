import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as ProvidersActions from '../actions/providersActions';

// DeclareSetupComponent Component
class DeclareSetupComponent extends Component {

    submit() {
      const payload = {
        frequentValue: parseInt(this.frequentInput.value, 10) || 0,
        frequentUnit: this.frequentSelect.value,
        infrequentValue: parseInt(this.infrequentInput.value, 10) || 0,
        infrequentUnit: this.infrequentSelect.value,
        archiveValue: parseInt(this.archiveInput.value, 10) || 0,
        archiveUnit: this.archiveSelect.value,
      };
      this.props.setStorageTypes(payload);
      this.props.getPricingGcp();
      this.props.getPricingAws();
    }

    render() {
      const { types } = this.props;

      const styles = {
        titles: {
          textAlign: 'left',
        },
      };

      return (
        <div>
          <div className="row">
            <div className="col-md-2">
              <h4 className="paper-title">
                <i className="fa fa-cog red-color"/>
                &nbsp;
                Setup
              </h4>
            </div>

            <div className="col-md-3 col-sm-12 col-xs-12 form-inline">
              <h4 style={styles.titles}>
                <i className="grey-color fa fa-bolt" />
                &nbsp;Frequent Access
              </h4>

              <input
                className="setup-input form-control pull-left"
                type="number"
                defaultValue={types.frequentValue}
                ref={(input) => this.frequentInput = input}
              />
              &nbsp;
              <select
                className="setup-select form-control pull-left"
                style={styles.selects}
                defaultValue={types.frequentUnit}
                ref={(input) => this.frequentSelect = input}
              >
                <option value={'GB'}>GB</option>
                <option value={'TB'}>TB</option>
                <option value={'PB'}>PB</option>
              </select>
              <div style={{ clear: 'both' }} />
            </div>

            <div className="col-md-3 col-sm-12 col-xs-12 form-inline">
              <h4 style={styles.titles}>
                <i className="grey-color fa fa-fighter-jet" />
                &nbsp;Infrequent Access
              </h4>
              <input
                className="setup-input form-control pull-left"
                type="number"
                defaultValue={types.infrequentValue}
                ref={(input) => this.infrequentInput = input}
              />
                &nbsp;
              <select
                className="setup-select form-control pull-left"
                style={styles.selects}
                defaultValue={types.infrequentUnit}
                ref={(input) => this.infrequentSelect = input}
              >
                <option value={'GB'}>GB</option>
                <option value={'TB'}>TB</option>
                <option value={'PB'}>PB</option>
              </select>
              <div style={{ clear: 'both' }} />
            </div>


            <div className="col-md-3 col-sm-12 col-xs-12 form-inline">
              <h4 style={styles.titles}>
                <i className="grey-color fa fa-database" />
                &nbsp;Archive
              </h4>
              <input
                className="setup-input form-control pull-left"
                type="number"
                defaultValue={types.archiveValue}
                ref={(input) => this.archiveInput = input}
              />
              &nbsp;
              <select
                className="setup-select form-control pull-left"
                style={styles.selects}
                defaultValue={types.archiveUnit}
                ref={(input) => this.archiveSelect = input}
              >
                <option value={'GB'}>GB</option>
                <option value={'TB'}>TB</option>
                <option value={'PB'}>PB</option>
              </select>
              <div style={{ clear: 'both' }} />
            </div>


          </div>
          <div className="clearfix" />
          <div className="row" style={{ paddingLeft: '30px' }}>
            <button className="btn btn-primary setup-submit" onClick={this.submit.bind(this)}>
              <i className="fa fa-refresh" />
              &nbsp;
              Refresh
            </button>

          </div>
        </div>
      );
    }

}

// Define PropTypes
DeclareSetupComponent.propTypes = {
  types: PropTypes.object,
};

// Subscribe component to redux store and merge the state into
// component's props
const mapStateToProps = ({ types }) => ({
  types
});

const mapActionCreatorsToProps = (dispatch) => (
   bindActionCreators(ProvidersActions, dispatch)
);


// connect method from react-router connects the component with redux store
export default connect(mapStateToProps, mapActionCreatorsToProps)(DeclareSetupComponent);
