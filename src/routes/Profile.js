import { auth, signOut } from "fbase";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  let navigate = useNavigate();
  const onClickLogOut = () => {
    signOut(auth).then(() => null);
    navigate("/");
  };

  return (
    <div>
      프로필
      <div>
        <button onClick={onClickLogOut}>로그아웃</button>
      </div>
    </div>
  );
};

export default Profile;
