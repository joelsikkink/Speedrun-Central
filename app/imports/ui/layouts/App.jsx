import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import 'semantic-ui-css/semantic.css';
import { Roles } from 'meteor/alanning:roles';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NavBar from '../components/NavBar';
import GamesDash from '../pages/GamesDash';
import Footer from '../components/Footer';
import Landing from '../pages/Landing';
import ListStuff from '../pages/ListStuff';
import ListStuffAdmin from '../pages/ListStuffAdmin';
import AddStuff from '../pages/AddStuff';
import EditStuff from '../pages/EditStuff';
import NotFound from '../pages/NotFound';
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import Signout from '../pages/Signout';
import ForumsLanding from '../pages/ForumsLanding';
import Minecraft from '../pages/Minecraft';
import SuperMario from '../pages/SuperMario';
import Roblox from '../pages/Roblox';
import UserPage from '../pages/UserPage';
import SubmitRun from '../pages/SubmitRun';
import AdminDash from '../pages/AdminDash';
import GeneralForums from '../pages/GeneralForums';
import ForumComment from '../pages/ForumComment';
import MinecraftForums from '../pages/MinecraftForums';
import SuperMario64Forums from '../pages/SuperMario64Forums';
import RobloxSpeedrun4Forums from '../pages/RobloxSpeedrun4Forums';
import OffTopicForums from '../pages/OffTopicForums';
import AccountManagement from '../pages/AccountManagement';
/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
class App extends React.Component {
  render() {
    return (
        <Router>
          <div>
            <NavBar/>
            <Switch>
              <Route exact path="/" component={Landing}/>
              <Route exact path="/minecraft" component={Minecraft}/>
              <Route exact path="/supermario" component={SuperMario}/>
              <Route exact path="/roblox" component={Roblox}/>
              <Route path="/signin" component={Signin}/>
              <Route path="/signup" component={Signup}/>
              <Route path="/signout" component={Signout}/>
              <Route path="/profile" component={UserPage}/>
              <Route path ="/games" component={GamesDash}/>
              <ProtectedRoute path="/list" component={ListStuff}/>
              <ProtectedRoute path="/add" component={AddStuff}/>
              <ProtectedRoute path="/edit/:_id" component={EditStuff}/>
              <ProtectedRoute path="/forums" component={ForumsLanding}/>
			        <ProtectedRoute path='/submitRun' component={SubmitRun}/>
              <ProtectedRoute path="/generalForums" component={GeneralForums}/>
              <ProtectedRoute path="/minecraftForums" component={MinecraftForums}/>
              <ProtectedRoute path="/superMario64Forums" component={SuperMario64Forums}/>
              <ProtectedRoute path="/robloxSpeedrun4Forums" component={RobloxSpeedrun4Forums}/>
              <ProtectedRoute path="/offTopicForums" component={OffTopicForums}/>
              <ProtectedRoute path="/forumComment" component={ForumComment}/>
              <AdminProtectedRoute path="/admin" component={AccountManagement}/>
              <AdminProtectedRoute path="/admindash" component={AdminDash}/>
              <Route component={NotFound}/>
            </Switch>
            <Footer/>
          </div>
        </Router>
    );
  }
}

/**
 * ProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const isLogged = Meteor.userId() !== null;
      return isLogged ?
          (<Component {...props} />) :
          (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
      );
    }}
  />
);

/**
 * AdminProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const AdminProtectedRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) => {
          const isLogged = Meteor.userId() !== null;
          const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
          return (isLogged && isAdmin) ?
              (<Component {...props} />) :
              (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
              );
        }}
    />
);

/** Require a component and location to be passed to each ProtectedRoute. */
ProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  location: PropTypes.object,
};

/** Require a component and location to be passed to each AdminProtectedRoute. */
AdminProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  location: PropTypes.object,
};

export default App;
