import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, createUserWithEmailAndPassword } from "fbase";

const Join = () => {
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
      await createUserWithEmailAndPassword(auth, Email, Password);
      alert("회원가입에 성공하였습니다!\n로그인 페이지로 이동합니다");
      window.location.href = "/";
    } catch (err) {
      console.log(err);
    }
  };

  const navigate = useNavigate();

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <input type="text" name="name" placeholder="name" required />
        </div>
        <div>
          <input
            type="text"
            name="email"
            placeholder="email"
            required
            value={Email}
            onChange={onChange}
          />
        </div>
        <div>
          <input
            type="password"
            name="pw"
            placeholder="password"
            required
            value={Password}
            onChange={onChange}
          />
        </div>
        <div>
          <input type="submit" value="Join" />
        </div>
      </form>
      <div>
        <button
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default Join;
