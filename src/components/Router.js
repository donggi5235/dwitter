import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "routes/Home";
import Join from "routes/Join";
import Auth from "routes/Auth";
import Profile from "routes/Profile";

const AppRouter = ({ isLogin, userObj }) => {
  return (
    <Routes>
      {isLogin ? (
        <>
          <Route path="/" exact element={<Home userObj={userObj} />} />
          <Route
            path="/profile"
            exact
            element={<Profile userObj={userObj} />}
          />
        </>
      ) : (
        <Route path="/" exact element={<Auth />} />
      )}
      <Route path="/join" exact element={<Join />} />
    </Routes>
  );
};

export default AppRouter;
