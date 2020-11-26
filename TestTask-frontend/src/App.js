import { MainLayout } from 'components/Layout';
import PageSpinner from 'components/PageSpinner';
// import AuthPage from 'pages/AuthPage';
import React from 'react';
import componentQueries from 'react-component-queries';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './styles/reduction.scss';
// Prime React CSS
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const DashboardPage = React.lazy(() => import('pages/DashboardPage'));
const StateCollege = React.lazy(() => import('pages/StateCollege'));


class App extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <BrowserRouter>
          {/* <GAListener> */}
            <Switch>
              
              {
                localStorage.getItem('auth_token') &&
                <MainLayout breakpoint={this.props.breakpoint}>
                  <React.Suspense fallback={<PageSpinner />}>
                    <Route exact path="/" component={DashboardPage} />
                     <Route exact path="/state-college" component={StateCollege} />
                  </React.Suspense>
                </MainLayout>
              }
              <Redirect to="/" />
            </Switch>
          {/* </GAListener> */}
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

const query = ({ width }) => {
  if (width < 575) {
    return { breakpoint: 'xs' };
  }

  if (576 < width && width < 767) {
    return { breakpoint: 'sm' };
  }

  if (768 < width && width < 991) {
    return { breakpoint: 'md' };
  }

  if (992 < width && width < 1199) {
    return { breakpoint: 'lg' };
  }

  if (width > 1200) {
    return { breakpoint: 'xl' };
  }

  return { breakpoint: 'xs' };
};

export default componentQueries(query)(App);
