import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import Profile from '../pages/Profile';
import Login from '../pages/Login';
import Layout from '../layout/Layout';
import Home from '../pages/Home';
import Contact from '../pages/Contact';

const App: React.FC = () => {
  return (
    <>
      <Router>
        <Switch>
          {/* Routes without layout */}
          <Route path="/login" component={Login} />
          {/* Routes with layout */}
          <Layout>
            <Route path="/" exact render={() => <Redirect to="/home" />} />
            <Route path="/home" component={Home} />
            <Route
              path="/profile"
              exact
              render={() => <Redirect to="/profile/bio" />}
            />
            <Route path="/profile/:tab" component={Profile} />
            <Route
              path="/contact"
              exact
              render={() => <Redirect to="/contact/tel" />}
            />
            <Route path="/contact/:tab" component={Contact} />
          </Layout>
        </Switch>
      </Router>
    </>
  );
};

export default App;
