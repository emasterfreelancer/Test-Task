
import './loader.scss';
import React from 'react';
import styled from 'styled-components';
import Load from '../../assets/img/loader-example.gif';
import PropTypes from 'prop-types';

import VerticalCenter from './VerticalCenter/index';

const LoaderDialog = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  background-color: rgba(0,0,0,0.5);
  z-index: 1000;
  display: ${(props) => props.open ? 'block' : 'none'};
`;

const Loader = (props) => (
  <LoaderDialog
    title=""
    open={props.visible}
  >
    <VerticalCenter width="100px" height="100px" borderRadius="50%" padding="0px">
      <img src={Load} alt="" />
    </VerticalCenter>
  </LoaderDialog>
);

Loader.propTypes = {
  visible: PropTypes.bool,
};

export default Loader;