import React, { useState } from "react";
import emailIcon from "../img/email.svg";
import passwordIcon from "../img/password.svg";
import { useNavigate } from 'react-router-dom';
import "./style.css";
import { Link } from "react-router-dom";
import axios from "axios";


const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({email: "", password: ""});
  const [touched, setTouched] = useState({});

  const chaeckData = (obj) => {
    // const { email, password } = obj;
    // const urlApi = `https://lightem.senatorhost.com/login-react/index.php?email=${email.toLowerCase()}&password=${password}`;
    // const api = axios
    //   .get(urlApi)
    //   .then((response) => response.data)
    //   .then((data) => (data.ok ? alert("You login to your account successfully", "success") : alert("Your password or your email is wrong", "error")));
  };

  const changeHandler = (event) => {
    if (event.target.name === "IsAccepted") {
      setData({ ...data, [event.target.name]: event.target.checked });
    } else {
      setData({ ...data, [event.target.name]: event.target.value });
    }
  };

  const focusHandler = (event) => {
    setTouched({ ...touched, [event.target.name]: true });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    // chaeckData(data);
    navigate('/home');
  };

  return (
    <div className={'container'}>
      <form className={'formLogin'} onSubmit={submitHandler} autoComplete="off">
        <h2>Sign In</h2>
        <div>
          <div>
            <input type="text" name="email" value={data.email} placeholder="E-mail" onChange={changeHandler} onFocus={focusHandler} autoComplete="off" />
            <img src={emailIcon} alt="" />
          </div>
        </div>
        <div>
          <div>
            <input type="password" name="password" value={data.password} placeholder="Password" onChange={changeHandler} onFocus={focusHandler} autoComplete="off" />
            <img src={passwordIcon} alt="" />
          </div>
        </div>

        <div>
          <button type="submit">Login</button>
          <span style={{ color: "#a29494", textAlign: "center", display: "inline-block", width: "100%" }}>
            Don't have a account? <Link to="/register">Create account</Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Login;