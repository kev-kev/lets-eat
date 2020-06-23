import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { Redirect } from "react-router-dom";

export const Home = () => {
  const { user } = useContext(GlobalContext);
  if (user) {
    return (
        <Redirect to="/home"/>
    )
  } else {
    return (
        <Redirect to="/login" />
    );
  }
};

export default Home;