/*IMPORTS*/
import React, { useState, useEffect } from "react";
import "./App.css";
import {
  Redirect,
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from "./components/home/Home";
import Join from "./components/join-match/join";
import New from "./components/new-match/new";
import Play from "./components/play/Play";
import SinglePlayer from "./components/single-player/SinglePlayer";
import NavBar from "./components/navBar/NavBar";
import { UserContext } from "./UserContext";
import NickName from "./components/auth/Nickname";
import Cookies from "universal-cookie";

function App() {
  const cookies = new Cookies();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const verifyUser = () => {
      const verifiedUser = cookies.get("user");
      console.log("DONE", verifiedUser);
      if (verifiedUser !== null && verifiedUser !== undefined) {
        setUser(verifiedUser);
      }
    };
    verifyUser();
  }, []);

  return (
    <Router>
      <div className='App'>
        <UserContext.Provider value={{ user, setUser }}>
          <NavBar />
          <Switch>
            <Route exact path='/' component={NickName} />
            <Route exact path='/home' component={Home} />
            <Route exact path='/join' component={Join} />
            <Route exact path='/new' component={New} />
            <Route exact path='/Play/:room_id' component={Play} />
            <Route exact path='/PlayComputer' component={SinglePlayer} />
            <Redirect from='*' to='/' />
          </Switch>
        </UserContext.Provider>
      </div>
    </Router>
  );
}

export default App;
