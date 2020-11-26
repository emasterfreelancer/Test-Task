import React from 'react';

import { Navbar, Nav, NavItem } from 'reactstrap';

// import SourceLink from 'components/SourceLink';

const Footer = () => {
  return (
    <Navbar className="footer_fixed">
      <Nav navbar >
        <NavItem className="footer_copyright">
          {/* 2018 Reduction theme, source on <SourceLink>Github</SourceLink> */}
          @ Copyrights Dyonisos 2020. All rights reserved. Designed by EMS
        </NavItem>
      </Nav>
    </Navbar>
  );
};

export default Footer;
