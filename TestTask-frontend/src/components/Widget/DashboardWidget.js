import React from 'react';
import PropTypes from 'utils/propTypes';

import classNames from 'classnames';

import { Card, CardBody, CardTitle, CardSubtitle } from 'reactstrap';

const DashboardWidget = ({
  bgColor,
  icon: Icon,
  src,
  imgProps,
  iconProps,
  title,
  subtitle,
  className,
  ...restProps
}) => {
  console.log('iconProps', iconProps)
  const classes = classNames('cr-widget row row-no-margin box-shadow bdr_box' , className, {
    
  });

  const classBody = classNames('cr-widget__icon col-md-5 pd-15', className, {
    [`bg-${bgColor}`]: bgColor,
  })
  return (
    <Card inverse className={classes} {...restProps}>
      <CardBody className={classBody} >
        <img className="img_width" src={src} alt={src}/>        
      </CardBody>
      <CardBody className="col-md-7 mb-0 pd-15">
        <CardTitle className="fnt_size_weight">{title}</CardTitle>
        <CardSubtitle><p className="card_sub_title">{subtitle}</p></CardSubtitle>
      </CardBody>
    </Card>
  );
};

DashboardWidget.propTypes = {
  bgColor: PropTypes.string,
  icon: PropTypes.component,
  img: PropTypes.component,
  imgProps: PropTypes.component,
  iconProps: PropTypes.object,
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

DashboardWidget.defaultProps = {
  bgColor: 'primary',
  icon: 'span',
  iconProps: { size: 50 },
  img: 'img',
  imgProps: { size: 50 },
};

export default DashboardWidget;
