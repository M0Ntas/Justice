import './global.scss'
import Header from "./components/Header/Header";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import React, { useState } from "react";
import Home from "./pages/Home/Home";
import MyProducts from "./pages/MyProducts/MyProducts";
import MySales from "./pages/MySales/MySales";
import Personal from "./pages/Personal/Personal";
import SignIn from "./pages/Sign-In/Sign-in";
import SignUp from "./pages/Sign-up/Sign-up";

function App() {

  const [isAuth, setIsAuth] = useState(localStorage.getItem('token') || false)

  return (
    <Router>
      {isAuth
        ?
        <div className="app">
          <Header setIsAuth={setIsAuth}/>
          <Switch>
            <Route exact path="/">
              <Home/>
            </Route>
            <Route exact path="/my-products">
              <MyProducts/>
            </Route>
            <Route exact path="/my-sales">
              <MySales/>
            </Route>
            <Route exact path="/personal">
              <Personal/>
            </Route>
            <Redirect to="/"/>
          </Switch>
        </div>
        :
        <Switch>
          <Route exact path="/sign-in">
            <SignIn isAuth={isAuth} setIsAuth={setIsAuth}/>
          </Route>
          <Route exact path="/sign-up">
            <SignUp/>
          </Route>
          <Redirect to="/sign-in"/>
        </Switch>
      }
    </Router>
  );
}

export default App;
