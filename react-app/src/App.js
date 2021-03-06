import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import { authenticate } from "./services/auth";
import HomePage from './components/HomePage';
import CreateCommentForm from './components/auth/CreateCommentForm'
import UpdateCommentForm from './components/auth/UpdateCommentForm'
import UpdateListForm from './components/auth/UpdateListForm'
import {ThemeContext} from './ThemeContext';


function App() {
  const [value, setValue] = useState('title-1')
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async() => {
      const user = await authenticate();
      if (!user.errors) {
        setAuthenticated(true);
      }
      setLoaded(true);
    })();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      {/* <NavBar setAuthenticated={setAuthenticated} /> */}
      <Switch>
        <Route path="/login" exact={true}>
          <LoginForm
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
          />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm authenticated={authenticated} setAuthenticated={setAuthenticated} />
        </Route>
        <ProtectedRoute path="/users" exact={true} authenticated={authenticated}>
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true} authenticated={authenticated}>
          <User />
        </ProtectedRoute>
        <ThemeContext.Provider value={{value, setValue}}>
        <Route path="/" exact={true} authenticated={authenticated} setAuthenticated={setAuthenticated}>
          <HomePage />
        </Route>
        <ProtectedRoute path="/create-comment" exact={true} authenticated={authenticated}>
        <CreateCommentForm />
      </ProtectedRoute>
        <ProtectedRoute path="/update-comment" exact={true} authenticated={authenticated}>
        <UpdateCommentForm />
      </ProtectedRoute>
        <ProtectedRoute path="/edit-list" exact={true} authenticated={authenticated}>
        <UpdateListForm />
      </ProtectedRoute>
        </ThemeContext.Provider>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
