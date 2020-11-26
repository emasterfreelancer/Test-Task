// import logo200Image from 'assets/img/logo/logo-02.png';
import sidebarBgImage from 'assets/img/sidebar/sidebar-4.jpg';
// import SourceLink from 'components/SourceLink';
import React from 'react';
// import { FaGithub } from 'react-icons/fa';
import { MdDashboard, } from 'react-icons/md';
// MdKeyboardArrowDown, MdGroup, MdEvent, MdPayment
import { NavLink } from 'react-router-dom';
import {
  // UncontrolledTooltip,
  // Collapse,
  Nav,
  Navbar,
  NavItem,
  NavLink as BSNavLink,
} from 'reactstrap';
import bn from 'utils/bemnames';
import { Link } from 'react-router-dom';

const sidebarBackground = {
  backgroundImage: `url("${sidebarBgImage}")`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
};

// const navComponents = [
//   { to: '/all-events', name: 'All Events', exact: false, },
//   { to: '/create-events', name: 'Create Events', exact: false,},
//   { to: '/past-events', name: 'Past Events', exact: false,},
//   { to: '/upcoming-events', name: 'Upcoming Events', exact: false,},
// ];

// const navTickets= [
//   { to: '/all-tickets', name: 'All Tickets', exact: false, },
//    { to: '/create-tickets', name: 'Create Tickets', exact: false,},
// ];

// const navContents = [
//   { to: '/sponsors', name: 'Sponsors', exact: false, Icon: MdGroup },
  
// ];

// const navPayment = [
  // { to: '/payment', name: 'Payment', exact: false, Icon: MdPayment},
  // { to: '/account-details', name: 'Account Details', exact: false,},
// ];

const navItems = [
  { to: '/', name: 'dashboard', exact: true, Icon: MdDashboard },
];

const bem = bn.create('sidebar');

class Sidebar extends React.Component {
  state = {
    isOpenComponents: false,
    isOpenContents: true,
    isOpenPages: false,
    isOpenPaymentComponents: true
  };

  handleClick = name => () => {
    this.setState(prevState => {
      const isOpen = prevState[`isOpen${name}`];

      return {
        [`isOpen${name}`]: !isOpen,
      };
    });
  };

  render() {
    return (
      // data-image={sidebarBgImage}
      <aside className={bem.b()} >  
        <div className={bem.e('background')} style={sidebarBackground} />
        <div className={bem.e('content')}>
          <Navbar>
            {/* <SourceLink className="navbar-brand d-flex"> */}
            <div className="navbar-brand d-flex">
              <Link to={'/'}>
                {/* <img src={logo200Image} height="50" alt="" /> */}
                <p className="heading">TEST TASK</p>
              </Link>
              {/* <span className="text-white">
                Reduction <FaGithub />
              </span> */}
            </div>
            {/* </SourceLink> */}
          </Navbar>
          <Nav vertical>
            {navItems.map(({ to, name, exact, Icon }, index) => (
              <NavItem key={index} className={bem.e('nav-item')}>
                <BSNavLink
                  id={`navItem-${name}-${index}`}
                  className="text-uppercase fnt_size_sidebar"
                  tag={NavLink}
                  to={to}
                  activeClassName="active"
                  exact={exact}
                >
                  <Icon className={bem.e('nav-item-icon')} />
                  <span className="">{name}</span>
                </BSNavLink>
              </NavItem>
            ))}

            {/* <NavItem
              className={bem.e('nav-item')}
              onClick={this.handleClick('Components')}
            >
              <BSNavLink className={bem.e('nav-item-collapse')}>
                <div className="d-flex">
                  <MdEvent className={bem.e('nav-item-icon')} />
                  <span className="text-uppercase align-self-start fnt_size_sidebar sidebar_txt_pd">Events</span>
                </div>
                <MdKeyboardArrowDown
                  className={bem.e('nav-item-icon')}
                  style={{
                    padding: 0,
                    transform: this.state.isOpenComponents
                      ? 'rotate(0deg)'
                      : 'rotate(-90deg)',
                    transitionDuration: '0.3s',
                    transitionProperty: 'transform',
                  }}
                />
              </BSNavLink>
            </NavItem> */}
            {/* <Collapse isOpen={this.state.isOpenComponents}>
              {navComponents.map(({ to, name, exact, Icon }, index) => (
                <NavItem key={index} className={bem.e('nav-item')}>
                  <BSNavLink
                    id={`navItem-${name}-${index}`}
                    className="text-uppercase fnt_size_sidebar"
                    tag={NavLink}
                    to={to}
                    activeClassName="active"
                    exact={exact}
                  >
                    <Icon className={bem.e('nav-item-icon')} />
                    <span className="">-  {name}</span>
                  </BSNavLink>
                </NavItem>
              ))}
            </Collapse> */}

            {/* <Collapse isOpen={this.state.isOpenContents}>
              {navContents.map(({ to, name, exact, Icon }, index) => (
                <NavItem key={index} className={bem.e('nav-item')}>
                  <BSNavLink
                    id={`navItem-${name}-${index}`}
                    className="text-uppercase fnt_size_sidebar"
                    tag={NavLink}
                    to={to}
                    activeClassName="active"
                    exact={exact}
                  >
                    <Icon className={bem.e('nav-item-icon')} />
                    <span className="">{name}</span>
                  </BSNavLink>
                </NavItem>
              ))}
            </Collapse> */}

            

            {/* <NavItem
              className={bem.e('nav-item')}
              onClick={this.handleClick('Pages')}
            >
              <BSNavLink className={bem.e('nav-item-collapse')}>
                <div className="d-flex">
                  <MdEvent className={bem.e('nav-item-icon')} />
                  <span className="text-uppercase align-self-start fnt_size_sidebar sidebar_txt_pd">Tickets</span>
                </div>
                <MdKeyboardArrowDown
                  className={bem.e('nav-item-icon')}
                  style={{
                    padding: 0,
                    transform: this.state.isOpenPages
                      ? 'rotate(0deg)'
                      : 'rotate(-90deg)',
                    transitionDuration: '0.3s',
                    transitionProperty: 'transform',
                  }}
                />
              </BSNavLink>
            </NavItem>
            <Collapse isOpen={this.state.isOpenPages}>
              {navTickets.map(({ to, name, exact, Icon }, index) => (
                <NavItem key={index} className={bem.e('nav-item')}>
                  <BSNavLink
                    id={`navItem-${name}-${index}`}
                    className="text-uppercase fnt_size_sidebar"
                    tag={NavLink}
                    to={to}
                    activeClassName="active"
                    exact={exact}
                  >
                    <span className="">-  {name}</span>
                  </BSNavLink>
                </NavItem>
              ))}
            </Collapse> */}

            


            {/* <NavItem
              className={bem.e('nav-item')}
              onClick={this.handleClick('PaymentComponents')}
            >
              <BSNavLink className={bem.e('nav-item-collapse')}>
                <div className="d-flex">
                  <MdPayment className={bem.e('nav-item-icon')} />
                  <span className="text-uppercase align-self-start fnt_size_sidebar sidebar_txt_pd">Payment</span>
                </div>
                <MdKeyboardArrowDown
                  className={bem.e('nav-item-icon')}
                  style={{
                    padding: 0,
                    transform: this.state.isOpenPaymentComponents
                      ? 'rotate(0deg)'
                      : 'rotate(-90deg)',
                    transitionDuration: '0.3s',
                    transitionProperty: 'transform',
                  }}
                />
              </BSNavLink>
            </NavItem> */}
            {/* <Collapse isOpen={this.state.isOpenPaymentComponents}>
              {navPayment.map(({ to, name, exact, Icon }, index) => (
                <NavItem key={index} className={bem.e('nav-item')}>
                  <BSNavLink
                    id={`navItem-${name}-${index}`}
                    className="text-uppercase fnt_size_sidebar"
                    tag={NavLink}
                    to={to}
                    activeClassName="active"
                    exact={exact}
                  >
                    <Icon className={bem.e('nav-item-icon')} />
                    <span className="">{name}</span>
                  </BSNavLink>
                </NavItem>
              ))}
            </Collapse>             */}
          </Nav>
        </div>
      </aside>
    );
  }
}

export default Sidebar;
