import React, { useState, useEffect } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import SignIn from './Login';
import EnhancedTable from './Datatable';
import SignUp from './Register';
import AuthService from './services/auth.service';
import BoardUser from './BoardUser';

const App = () => {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };

  return (
    <Switch>
      <Route exact path={['/', '/login']} component={SignIn} />
      <Route path="/user" component={BoardUser} />
      <Route path="/signup" component={SignUp} />
      <Route path="/table" component={EnhancedTable} />
    </Switch>
  );
};

export default App;
