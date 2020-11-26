

import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { showGlobalLoaderRes } from '../../action/loaderActions'
import Loader from './loader';
import PropTypes from 'prop-types';
class LoaderSpinner extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  
  render() {
    const { visible } = this.props;
    let load = false;
    if (visible.data.loading === false) {
        load = false;
    } else if (visible.data.loading === true) {
        load = true;
    }
    return (
      <Loader visible={load} />
    );
  }
}

LoaderSpinner.propTypes = {
  visible: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  visible: showGlobalLoaderRes,
});

export function mapDispatchToProps() {
    return {
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect)(LoaderSpinner);