import React, { useEffect, useState } from "react";
//Icon
import userIcon from "../img/user.svg";
import emailIcon from "../img/email.svg";
import passwordIcon from "../img/password.svg";
// Validate
import { validate } from "./validate";
// Styles
import "./style.css";
//
import { Link } from "react-router-dom";
// Axios
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    IsAccepted: false,
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    setErrors(validate(data, "signUp"));
  }, [data, touched]);

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

  const submitHandler = async (event) => {
    event.preventDefault();
    if (!Object.keys(errors).length) {
      console.log("data", data)
      const urlApi = `http://localhost:4000`;
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${urlApi}/api/auth/signup`,
        headers: { 'Content-Type': 'application/json'},
        data : JSON.stringify({
          "name": data.name,
          "email": data.email,
          "phone": data.phone
        })
      };
      console.log("config", config)
      try {
        axios
        .request(config)
        .then((response) => response.data)
        .then((data) => {
          console.log("data", data)
          if(data?.userid){
            localStorage.setItem('userToken', JSON.stringify(data?.token));
            navigate('/home');
          }else{
            alert(data?.error)
          }
        })
        .catch((error) => {
          console.log("api error", error)
        });
      }catch(e){
        console.log("api error", e)
      }
    } else {
      setTouched({
        name: true,
        email: true,
        password: true,
        confirmPassword: true,
        IsAccepted: false,
      });
    }
  };

  return (
    <div className={'container'}>
      <form className={'formLogin'} onSubmit={submitHandler} autoComplete="off">
        <h2>Sign Up</h2>
        <div>
          <div className={errors.name && touched.name ? 'unCompleted' : !errors.name && touched.name ? 'completed' : undefined}>
            <input type="text" name="name" value={data.name} placeholder="Name" onChange={changeHandler} onFocus={focusHandler} autoComplete="off" />
            <img src={userIcon} alt="" />
          </div>
          {errors.name && touched.name && <span className={'error'}>{errors.name}</span>}
        </div>
        <div>
          <div className={errors.email && touched.email ? 'unCompleted' : !errors.email && touched.email ? 'completed' : undefined}>
            <input type="text" name="email" value={data.email} placeholder="E-mail" onChange={changeHandler} onFocus={focusHandler} autoComplete="off" />
            <img src={emailIcon} alt="" />
          </div>
          {errors.email && touched.email && <span className={'error'}>{errors.email}</span>}
        </div>
        <div>
          <div className={errors.phone && touched.phone ? 'unCompleted' : !errors.phone && touched.phone ? 'completed' : undefined}>
            <input type="text" name="phone" value={data.phone} placeholder="Phone" onChange={changeHandler} onFocus={focusHandler} autoComplete="off" />
            <img src={passwordIcon} alt="" />
          </div>
          {errors.phone && touched.phone && <span className={'error'}>{errors.phone}</span>}
        </div>
        <div>
          <div className={'terms'}>
            <input type="checkbox" name="IsAccepted" value={data.IsAccepted} id="accept" onChange={changeHandler} onFocus={focusHandler} />
            <label htmlFor="accept">I accept terms of privacy policy</label>
          </div>
          {errors.IsAccepted && touched.IsAccepted && <span className={'error'}>{errors.IsAccepted}</span>}
        </div>
        <div>
          <button type="submit">Create Account</button>
          <span style={{ color: "#a29494", textAlign: "center", display: "inline-block", width: "100%" }}>
            Already have a account? <Link to="/">Sign In</Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default SignUp;