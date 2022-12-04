import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Home";
import AuthService from "./services/auth.service";

import "./styles.css";


function App() {
  // React States
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [salt, setSalt] = useState("");

  useEffect(() => {
    AuthService.salt().then(resp => {
      if (resp.data.error || !resp.data.data.salt || resp.data.data.salt == "") {
        console.log(e)
        return;
      }
      setSalt(resp.data.data.salt);
    })
    .catch(e => {
      console.log(e)
    });
  });

  const onChangedInputs = () => {
    setErrorMessage("");
  }
  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { uname, pass } = document.forms[0];
    AuthService.signin(uname.value, pass.value)
      .then(resp => {
        // Compare user info
        if (resp.error || !resp.data.data.accessToken || resp.data.data.accessToken == "") {
          if (resp.message) {
            setErrorMessage(resp.message);
          } else {
            setErrorMessage("Failed to login");
          }
        } else {
          setUserId(resp.data.data.id);
          setUsername(resp.data.data.username);
          setAccessToken(resp.data.data.accessToken);
          setIsSubmitted(true);
        }
      })
      .catch(e => {
        if (e && e.response && e.response.status && e.response.data) {
          switch (e.response.status - 0) {
          case 401:
          case 404:
          case 500:
            setErrorMessage(e.response.data.message);
            break;
          }
        } else {
          console.log(e);
        }
      });
  };

  // Generate JSX code for error message
  const RenderErrorMessage = (props) => {
    const { message } = props;
    return (
      <div className="error">{message}</div>
    );
  }

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="uname" className="form-control" onChange={onChangedInputs} required />
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" className="form-control" onChange={onChangedInputs} required />
        </div>
        <RenderErrorMessage message={errorMessage} />
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );

  return (
    <>
    {
      isSubmitted ?
        <Home userId={userId} username={username} token={accessToken} />:
        <div className="app">
          <div className="login-form">
            <div className="title">Sign In</div>
            {renderForm}
          </div>
        </div>
    }
    </>
  );
}

export default App;