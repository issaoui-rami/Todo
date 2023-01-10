import React from "react";

import {
    useNavigate
  } from "react-router-dom";

import Button from "../../Components/Button";

const Logout = (props) => {

    const {keyLogin} = props;

    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem(keyLogin);
        navigate("/login");
    }

  return (
    <>
      <Button
        color="green"
        type="submit"
        borderRadius="borderRadius4"
        onClick={logout}
      >
        Logout
      </Button>
    </>
  );
};

export default Logout;
