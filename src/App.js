import './App.css';

import React, {useState} from "react";
import {
  BrowserRouter as Router,
  Routes ,
  Route,
} from "react-router-dom"

import Home from './components/Home';
import Navbar from './components/Navbar';
import About from './components/About'
import NoteState from './context/notes/NoteState';
import Login from './components/Login';
import Signup from './components/Signup';
import Alert from './components/Alert';

function App() {

  const [alert, setAlert] = useState(null);

  const changeAlert = (message , type) => {
    setAlert ({
      msg : message,
      type: type
    })
    setTimeout(() => {
      setAlert();
    }, 3000)
  }
  return (
      <div className="App">
        <NoteState>
        <Router>
          <Navbar />
          <Alert alert = {alert} />
          <div className="container">
            <Routes>
              <Route exact path="/" element={localStorage.getItem('token') ? <Home /> : <Login changeAlert = {changeAlert} />} >
              </Route>
              <Route exact path="/about" element={<About />}>
              </Route>
              <Route exact path="/login" element={<Login changeAlert = {changeAlert} />} >
              </Route>
              <Route exact path="/signup" element={<Signup changeAlert = {changeAlert} />} >
              </Route>
            </Routes>
          </div>
        </Router>
      </NoteState>
    </div>
  );
}

export default App;
