import React, { useState } from "react";
import "../css/Welcome.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { Navigate } from "react-router-dom";
import welcomeImg from '../assets/welcome.jpg';

const Welcome = ({ user }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  const handleLogin = () => {
    if (!email || !password) return;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  if (user) {
    return <Navigate to="/home"></Navigate>;
  }

  return (
    <div className="welcome">
      <div className="contentForm">
        <div className="login-form">
          <h2>Welcome</h2>
          <p>Enter your Credentials to access your account</p>
          <form action="#" className="formContainer">
            <label htmlFor="Email">Email address</label>
            <input
              type="email"
              name="email"
              id="Email"
              placeholder="Enter your email"
              required
              onChange={handleEmailChange}
            />
            <label htmlFor="Pass">Password</label>
            <input
              type="password"
              name="pass"
              id="Pass"
              placeholder="Enter your password"
              required
              onChange={handlePasswordChange}
            />
          </form>
          <p><a href="/#">Forgot password</a></p>
          <button type="button" name="login" onClick={handleLogin}>
              Login
            </button>
        </div>
      </div>
      <div className="contentImg">
        <img src={welcomeImg} alt="Welcome" />
      </div>
    </div>
  );
};

export default Welcome;
