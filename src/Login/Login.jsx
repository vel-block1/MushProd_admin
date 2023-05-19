import "./Login.css";
import betapeak from "../assets/BetaPeak.png";
import { useState } from "react";

import { auth } from "../Firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
const Login = () => {
  const [NewUser, setNewUser] = useState(true);

  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const [error, seterror] = useState(false);
  const [Errormsg, setErrormsg] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    seterror(false);

    if (NewUser) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((UserDetails) => {
          localStorage.setItem("username", username);
        })
        .catch((error) => {
          seterror(true);
          const errorMessage = error.message;
          setErrormsg(errorMessage);
        });
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((UserDetails) => {})
        .catch((error) => {
          seterror(true);
          const errorMessage = error.message;
          setErrormsg(errorMessage);
        });
    }
  };

  return (
    <div className="login-page">
      <img className="logo" src={betapeak} alt="Logo" />
      <h2 className="title">MushProd Dashboard</h2>

      <form onSubmit={submit}>
        {NewUser && (
          <div className="username">
            <input
              onChange={(e) => setusername(e.target.value)}
              type="username"
              id="username"
              required
            />
            <label htmlFor="username">Username</label>
          </div>
        )}

        <div className="email">
          <input
            onChange={(e) => setemail(e.target.value)}
            type="email"
            id="email"
            required
          />
          <label htmlFor="email">Email</label>
        </div>

        <div className="password">
          <input
            onChange={(e) => setpassword(e.target.value)}
            type="password"
            id="password"
            required
          />
          <label htmlFor="password">Password</label>
        </div>
        {error && <span className="error">Process Failed</span>}
        {error && <span className="error">{Errormsg}</span>}

        <button type="submit">{NewUser ? "Sign Up" : "Log In"}</button>

        {NewUser ? (
          <span className="user-stat">
            Already have an account?{" "}
            <b
              onClick={() => {
                setNewUser(false);
                seterror(false);
              }}
            >
              Log In
            </b>{" "}
          </span>
        ) : (
          <span className="user-stat">
            Dont't have an account?{" "}
            <b
              onClick={() => {
                setNewUser(true);
                seterror(false);
              }}
            >
              Sign Up
            </b>{" "}
          </span>
        )}
      </form>
    </div>
  );
};

export default Login;
