import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavBar from "./components/sections/NavBar";
import Home from './components/layouts/Home';
import Landing from './components/layouts/Landing';
import { useDispatch } from 'react-redux';
import * as sessionActions from './store/actions/session';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  const dispatch = useDispatch()
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(setLoaded(true))
      .catch(error => console.error(error))
  }, [dispatch]);

  return loaded && (
      <BrowserRouter>
          <NavBar />
        <Switch>
          <Route path='/' exact component={Landing} />
          <Route path="/home" component={Home} />
        </Switch>
      </BrowserRouter>
  );
}

export default App;
