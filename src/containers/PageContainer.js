import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

import Tabs, { Tab } from 'material-ui/Tabs';
import Paper from 'material-ui/Paper';


import DeclareSetupComponent from '../components/DeclareSetupComponent';
import ChartManagerComponent from '../components/ChartManagerComponent';
import TableComponent from '../components/TableComponent';


import * as ProvidersActions from '../actions/providersActions';

// PageContainer Component
class PageContainer extends Component {

    componentDidMount() {
      this.props.getPricingGcp();
      this.props.getPricingAws();
    }

    handleTabChange = (event, value) => {
      this.props.selectTab(value);
    };


    render() {
      const styles = {
        paper: {
          padding: '15px',
          margin: '15px',
        },
        noPadding: {
          padding: '0px'
        },
        vertPaddingOnly: {
          padding: '15px 0px'
        }
      }

      const chartsPaper = (
        <Paper elevation={3} style={styles.paper} className="animated fadeIn">
          <ChartManagerComponent />
        </Paper>
      );

      const tablePaper = (
        <Paper elevation={3} style={Object.assign({},styles.paper, styles.vertPaddingOnly)} className="animated fadeIn">
          <TableComponent />
        </Paper>
      );

      const displayedPaper = (this.props.view.tabsIndex === 0 ? tablePaper : chartsPaper);
      return (
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <Paper elevation={3} style={styles.paper} className="animated bounceInRight">
                <DeclareSetupComponent />
              </Paper>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <Paper elevation={3} style={Object.assign({},styles.paper, styles.noPadding)}>
                <Tabs
                  value={this.props.view.tabsIndex}
                  onChange={this.handleTabChange}
                  indicatorColor="primary"
                  textColor="primary"
                  centered
                >
                  <Tab label={<span><i className="fa fa-list"/> Table</span>} />
                  <Tab label={<span><i className="fa fa-bar-chart"/> Charts</span>} />
                </Tabs>
              </Paper>
            </div>
          </div>

          {displayedPaper}

        </div>
      );
    }

}


// Define PropTypes
PageContainer.propTypes = {};


// Subscribe component to redux store and merge the state into
// component's props
const mapStateToProps = ({ view }) => ({
  view
});

const mapActionCreatorsToProps = (dispatch) => (
   bindActionCreators(ProvidersActions, dispatch)
);


// connect method from react-router connects the component with redux store
export default connect(mapStateToProps, mapActionCreatorsToProps)(PageContainer);
