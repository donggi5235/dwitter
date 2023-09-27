import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  auth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "fbase";

const Auth = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
    } else if (name === "pw") {
      setPassword(value);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, Email, Password);
      alert("로그인에 성공하였습니다!");
    } catch (err) {
      console.log(err);
    }
  };

  const onSocialClick = async (e) => {
    e.preventDefault();
    const socialType = e.target.name;
    let provider;
    if (socialType === "google") {
      // 구글
      provider = new GoogleAuthProvider();
    } else if (socialType === "github") {
      // 깃헙
      provider = new GithubAuthProvider();
    }
    const data = await signInWithPopup(auth, provider);
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="email"
          placeholder="Email"
          required
          value={Email}
          onChange={onChange}
        />
        <input
          type="password"
          name="pw"
          placeholder="Password"
          required
          value={Password}
          onChange={onChange}
        />
        <input type="submit" value="Log In" />
      </form>
      <div>
        <button name="google" onClick={onSocialClick}>
          Continue with Google
        </button>
        <button name="github" onClick={onSocialClick}>
          Continue with Github
        </button>
        <button>
          <Link to="/Join">New Account</Link>
        </button>
      </div>
    </div>
  );
};

export default Auth;
