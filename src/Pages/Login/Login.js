import React from "react";

import { useNavigate } from "react-router-dom";

import "./Login.scss";

import Textfield from "../../Components/Textfield";
import Button from "../../Components/Button";

import bgLogin from "../Login/images/bg-login.png";

import {
  RiShieldUserFill,
  RiShieldUserLine,
  RiLockFill,
  RiLockLine,
} from "react-icons/ri";

const defaultVal = { email: "rami@gmail.com", password: "123456" };
const initialVal = { email: "", password: "" };

const Login = (props) => {
  const { keyLogin } = props;

  const [val, setVal] = React.useState(initialVal);

  const [errorLogin, setErrorLogin] = React.useState(false);

  const navigate = useNavigate();

  React.useEffect(() => {
    const isLogin = JSON.parse(localStorage.getItem(keyLogin));
    if (isLogin) {
      navigate("/");
    }
  }, [navigate, keyLogin]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      val.email === defaultVal.email &&
      val.password === defaultVal.password
    ) {
      localStorage.setItem(keyLogin, JSON.stringify(true));
      navigate("/");
    } else {
      setErrorLogin(true);
    }
  };

  const onChange = (e, key) => {
    setVal((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));
    setErrorLogin(false);
  };

  return (
    <div className="login-page">
      <div className="left-col">
        <div className="logo">Logo</div>
        <div className="content-form">
          <h1 className="title">
            Welcome To <span>Todo</span>
          </h1>
          <p className="sub-title">Please enter your details.</p>

          <form className="login-form" onSubmit={handleSubmit}>
            <Textfield
              label="Email"
              name="email"
              type="text"
              placeholder="Enter your email"
              size="large"
              value={val.email}
              onChange={(e) => onChange(e, "email")}
              rightIcon={({ isHovered, isFocused }) => {
                return isHovered || isFocused ? (
                  <RiShieldUserFill />
                ) : (
                  <RiShieldUserLine />
                );
              }}
            />
            <Textfield
              label="Password"
              name="password"
              type="password"
              placeholder="Enter your password"
              size="large"
              value={val.password}
              onChange={(e) => onChange(e, "password")}
              rightIcon={({ isHovered, isFocused }) => {
                return isHovered || isFocused ? <RiLockFill /> : <RiLockLine />;
              }}
            />
            {errorLogin && (
              <div className="error-password">Incorrect email or password.</div>
            )}
            <Button
              color="green"
              type="submit"
              borderRadius="borderRadius4"
              size="large"
            >
              Sign in
            </Button>
          </form>
        </div>
      </div>
      <div className="right-col">
        <img src={bgLogin} alt="Login" className="bg-img" />
      </div>
    </div>
  );
};

export default Login;
