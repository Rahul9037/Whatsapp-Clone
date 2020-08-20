import React from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import Chat from './components/Chat/Chat';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './components/Login/Login';
import { useStateValue } from './contextAPI/StateProvider';
import './App.css';

function App() {
  const [{user} , dispatch] = useStateValue();
  return (
    //BEM naming convention!!
    <div className="app">
     { !user ? 
     ( <Login />) 
     : (<div className="app__body">
        <Router>
          <Sidebar />
          <Switch>
            <Route path="/rooms/:roomId">
              <Chat />
            </Route>
          </Switch>
        </Router>
      </div>)}
    </div>

  );
}

export default App;
