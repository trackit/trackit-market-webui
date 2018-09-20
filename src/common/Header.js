import React, {Component} from 'react';

import logo from '../assets/markets-by-small.png';

class Header extends Component {

  render() {
    const styles = {
      container: {
        marginBottom: '30px',
        padding: '10px',
        backgroundColor: '#d6413b',
        color: 'white',
      },
      logo: {
        maxHeight: '40px',
        marginLeft: '30px',
      },
      title: {
        color: 'white',
        fontFamily: 'Roboto',
        fontSize: '28px',
        margin: '10px auto',
      },
      tryTrackitBtn: {
        marginTop: '10px',
        color: '#5f92ef',
        borderColor: '#d6413b',
      },

    }

    return(
      <div style={styles.container} className="row">
        <div className="col-md-4">
          <a
            href="https://trackit.io"
            rel="noopener noreferrer"
            target="_blank"
            className="pull-left animated bounceInLeft"
          >
            <img
              src={logo}
              className="header-logo"
              alt="Trackit Markets Cloud Storage Comparator"
              style={styles.logo}
            />
          </a>
        </div>
        {window.innerWidth < 630 && <div className="clearfix" />}
        <div className="col-md-4">
          <h1 style={styles.title} className="text-center">
            <i className="fa fa-bar-chart" />
            &nbsp;Cloud Storage
          </h1>
        </div>

        <div className="col-md-4">
          <a
            href="https://trackit.io"
            rel="noopener noreferrer"
            target="_blank"
            className="pull-right animated bounceInRight"
          >
            <button className="btn btn-primary" style={styles.tryTrackitBtn}>
              <i className="fa fa-cloud" />
              &nbsp;Try TrackIt
            </button>
          </a>
        </div>

        <div style={{ clear: 'both' }} />
      </div>
    );
  }

}

export default Header;
