import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './components/Dashboard';
import LearningModule from './components/LearningModule';
import UserProfile from './components/UserProfile';
import Login from './components/Login';
import Register from './components/Register';
import Onboarding from './components/Onboarding';
import AdminDashboard from './components/AdminDashboard';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <PrivateRoute exact path="/" component={Dashboard} />
          <PrivateRoute path="/module/:id" component={LearningModule} />
          <PrivateRoute path="/profile" component={UserProfile} />
          <PrivateRoute path="/onboarding" component={Onboarding} />
          <PrivateRoute path="/admin" component={AdminDashboard} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
