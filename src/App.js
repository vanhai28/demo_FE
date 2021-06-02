import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AdminLayout from "./layout/admin/AdminLayout";
import MapPage from "./Components/Map/MapPage";
import MapAdmin from "./Components/MapAdmin/MapAdmin";
import QuizAdmin from "./Components/QuizAdmin/QuizAdminHome"
import QuizSample from "./Components/QuizSample"
import ThankYou from "./Components/QuizSamples/ThankYouComponent"
import HomePage from "./Components/HomePage";
import UserLayout from "./layout/User/UserLayout";
import Login from "./Components/Login/Login";
import AdminPageLayout from "./layout/admin/AdminPageLayout";
import { createBrowserHistory } from 'history';
import { connect } from 'react-redux'
import { checkIsLogin } from './store/actions/login.action'
import { Switch } from "react-router-dom"

if (!localStorage.getItem('isCheck')) localStorage.setItem("isCheck", false);;
if (!localStorage.getItem('isLogin')) localStorage.setItem("isLogin", false);;

const RouteWrapper = ({ isCheck:IsCheck,checkIsLogin: CheckIsLogin, component: Component, layout: Layout, ...rest }) => {
  var token = localStorage.getItem('token');
  var history = createBrowserHistory();
  
   var isLogin = localStorage.getItem('isLogin') !== 'false';;
  var isCke = localStorage.getItem('isCheck') !== 'false';

  if (!isCke) {
   
      CheckIsLogin(token, history.location.pathname)
      localStorage.setItem("isCheck", true);
      return (
        <Route
          {...rest}
          render={(props) => (
            <div></div>
          )}
        />
      );
    
  }
  localStorage.setItem("isCheck", false);
  return (
    <Route
      {...rest}
      render={(props) => (
        <Layout isLogin={isLogin}>
          <Component {...props} />
        </Layout>
      )}
    />
  );
};
class App extends React.Component {
  render() {

    return (
      <Router>
        <Switch>
          <Route path="/map">
            <RouteWrapper path="/map"
            
              checkIsLogin={this.props.checkIsLogin}
              component={MapPage}
              layout={UserLayout} />
          </Route>

          <Route path="/login">
            <RouteWrapper path="/login" exact 
              checkIsLogin={this.props.checkIsLogin}
              component={Login}
              layout={UserLayout} />
          </Route>
          <Route path="/survey">
            <RouteWrapper
              path="/survey"
              exact 
              checkIsLogin={this.props.checkIsLogin}
              component={QuizSample}
              layout={UserLayout}
            />
          </Route>
          <Route path="/thankyou">
            <RouteWrapper
              path="/thankyou"
              exact 
              checkIsLogin={this.props.checkIsLogin}
              component={ThankYou}
              layout={UserLayout}
            />
          </Route>
          <Route path="/admin/dashboard">
            <RouteWrapper
              path="/admin/dashboard" 
              exact 
              checkIsLogin={this.props.checkIsLogin}
              component={HomePage}
              layout={AdminPageLayout}
            />
          </Route>
          <Route path="/admin/survey">
            <RouteWrapper
              path="/admin/survey"
              exact 
              checkIsLogin={this.props.checkIsLogin}
              component={QuizAdmin}
              layout={AdminPageLayout}
            />
          </Route>
          <Route path="/admin/map">
            <RouteWrapper
              path="/admin/map"
              exact 
              checkIsLogin={this.props.checkIsLogin}
              component={MapAdmin}
              layout={AdminPageLayout}
            />
          </Route>

          <Route path="/admin">
            <RouteWrapper
              path="/admin"
              exact 
              checkIsLogin={this.props.checkIsLogin}
              component={HomePage}
              layout={AdminLayout}
            />
          </Route>
      
          <Route path="/">
            <RouteWrapper path="/" exact 
              checkIsLogin={this.props.checkIsLogin}
              component={HomePage}
              layout={UserLayout} />
          </Route>
          
        </Switch>
      </Router>
    );
  }
}


const mapDispatchToProps = dispatch => {
  return {
    checkIsLogin: (token, url) => dispatch(checkIsLogin(token, url)),

  }
}
export default connect(null, mapDispatchToProps)(App);
