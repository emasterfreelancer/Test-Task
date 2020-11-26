// import Avatar from 'components/Avatar';
// import { UserCard } from 'components/Card';
// import Notifications from 'components/Notifications';
// import SearchInput from 'components/SearchInput';
// import { notificationsData } from 'demos/header';
// import withBadge from 'hocs/withBadge';
// import { compose } from 'redux';
// import { connect } from 'react-redux';
import React from 'react';
import {
  MdClearAll,
  
  // MdHelp,
  // MdInsertChart,
  // MdMessage,
  // MdNotificationsActive,
  // MdNotificationsNone,
  
  // MdSettingsApplications,
} from 'react-icons/md';
// MdPersonPin,
//   MdVpnKey,
// MdExitToApp,
import {
  Button,
  
  // NavbarToggler,
  Nav,
  Navbar,
  NavItem,
  
} from 'reactstrap';
// NavLink,
//   Popover,
//   PopoverBody,
// ListGroup,
//   ListGroupItem,
import bn from 'utils/bemnames';
// import { Link } from 'react-router-dom';

// import PropTypes from 'prop-types';
// import { createStructuredSelector } from 'reselect';
// import {ProfileView, doProfileViewRes} from '../../action/ProfileViewActions';
// import firstProfile from 'assets/img/profile/demo.png';

const bem = bn.create('header');

// const MdNotificationsActiveWithBadge = withBadge({
//   size: 'md',
//   color: 'primary',
//   style: {
//     top: -10,
//     right: -10,
//     display: 'inline-flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   children: <small>5</small>,
// })(MdNotificationsActive);

class Header extends React.Component {
  constructor(props){
    super(props)
    this.state={
      profileViewData : undefined
    }
  }
  state = {
    isOpenNotificationPopover: false,
    isNotificationConfirmed: false,
    isOpenUserCardPopover: false,
  };

  componentDidMount(){
    console.log(this.props)
    console.log('header', this.state.adminData)
    this.setState({
      profileViewData:JSON.parse(localStorage.getItem('managerAdminData'))
    })
  }

  toggleNotificationPopover = () => {
    this.setState({
      isOpenNotificationPopover: !this.state.isOpenNotificationPopover,
    });

    if (!this.state.isNotificationConfirmed) {
      this.setState({ isNotificationConfirmed: true });
    }
  };

  toggleUserCardPopover = () => {
    this.setState({
      isOpenUserCardPopover: !this.state.isOpenUserCardPopover,
    });
  };

  handleSidebarControlButton = event => {
    event.preventDefault();
    event.stopPropagation();

    document.querySelector('.cr-sidebar').classList.toggle('cr-sidebar--open');
  };

  logOut() {
    
    // localStorage.clear();
    localStorage.removeItem('auth_token')
    localStorage.removeItem('managerName')
    localStorage.removeItem('managerId')
    localStorage.removeItem('managerAdminData')
    window.location.href = '/';
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.doProfileViewRes && nextProps.doProfileViewRes.user){
      if(nextProps.doProfileViewRes.user && nextProps.doProfileViewRes.user.ProfileViewRes){
        if(nextProps.doProfileViewRes.user.ProfileViewRes && nextProps.doProfileViewRes.user.ProfileViewRes.success === true){
          if(nextProps.doProfileViewRes.user.ProfileViewRes.datalist){
            this.setState({
              isLoader: false,
              profileViewData : nextProps.doProfileViewRes.user.ProfileViewRes.datalist,              
            })
          }
        }
      }
    }
  }

  render() {
    // const { isNotificationConfirmed } = this.state;
    return (
      <Navbar light expand className={bem.b('bg-white')}>
        <Nav navbar className="mr-2">
          <Button outline onClick={this.handleSidebarControlButton}>
            <MdClearAll size={25} />
          </Button>
        </Nav>
        {/* <Nav navbar>
          <SearchInput />
        </Nav> */}

        <Nav navbar className={bem.e('nav-right')}>
          {/* <NavItem className="d-inline-flex">
            <NavLink id="Popover1" className="position-relative">
              {isNotificationConfirmed ? (
                <MdNotificationsNone
                  size={25}
                  className="text-secondary can-click"
                  onClick={this.toggleNotificationPopover}
                />
              ) : (
                <MdNotificationsActiveWithBadge
                  size={25}
                  className="text-secondary can-click animated swing infinite"
                  onClick={this.toggleNotificationPopover}
                />
              )}
            </NavLink>
            <Popover
              placement="bottom"
              isOpen={this.state.isOpenNotificationPopover}
              toggle={this.toggleNotificationPopover}
              target="Popover1"
            >
              <PopoverBody>
                <Notifications notificationsData={notificationsData} />
              </PopoverBody>
            </Popover>
          </NavItem> */}

          <NavItem>
            {/* <NavLink id="PopoverFocus">
              {
                this.state.profileViewData && this.state.profileViewData.image  ? 
                <Avatar
                onClick={this.toggleUserCardPopover}
                className="can-click"
                src={this.state.profileViewData && this.state.profileViewData.image}
                />
                : <Avatar
                  onClick={this.toggleUserCardPopover}
                  className="can-click"
                  src={firstProfile}
                />
              }
            </NavLink> */}
            {/* <Popover
              placement="bottom-end"
              isOpen={this.state.isOpenUserCardPopover}
              toggle={this.toggleUserCardPopover}
              target="PopoverFocus"
              trigger="focus" 
              className="p-0 border-0"
              style={{ minWidth: 250 }}
            >
              <PopoverBody className="p-0 border-light">
                <UserCard
                  title={this.state.profileViewData && this.state.profileViewData.username}
                  subtitle={this.state.profileViewData && this.state.profileViewData.email}
                  avatar={this.state.profileViewData && this.state.profileViewData.image ? this.state.profileViewData && this.state.profileViewData.image : firstProfile}
                  text=""
                  className="border-light"
                >
                  <ListGroup flush>
                    <ListGroupItem tag="button" action className="border-light">
                    <Link to={'/profile'} className="link_clr"><MdPersonPin /> Profile </Link>
                    </ListGroupItem>
                    <ListGroupItem tag="button" action className="border-light">
                    <Link to={'/change-password'} className="link_clr"><MdVpnKey /> Change Password </Link>
                    </ListGroupItem>
                    
                    <ListGroupItem tag="button" action className="border-light">
                    <Link to={''} onClick={() => this.logOut()} className="link_clr"><MdExitToApp /> Signout </Link>
                    </ListGroupItem>
                  </ListGroup>
                </UserCard>
              </PopoverBody>
            </Popover> */}
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}

// Header.propTypes = {
//   doProfileViewRes: PropTypes.any,
// };

// const mapStateToProps = createStructuredSelector({
//   doProfileViewRes: doProfileViewRes,
// });

// function mapDispatchToProps(dispatch) {
//   return {
//     ProfileView: (data) => dispatch(ProfileView(data)),
//   };
// }
// const withConnect = connect(mapStateToProps, mapDispatchToProps);
// export default compose(withConnect)(Header);
export default Header;