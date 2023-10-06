import { auth, signOut, deleteUser } from "fbase";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  db,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  updateProfile,
} from "fbase";

const Profile = ({ userObj }) => {
  const [modify, setModify] = useState(false);
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  let navigate = useNavigate();
  const onClickMemberEnd = async () => {
    const ok = window.confirm("정말 탈퇴 하시겠습니까?");
    if (ok) {
      // await deleteDoc(doc(db, "dweets", dweetObj.id));
      // const fileRef = ref(storage, dweetObj.img);
      // await deleteObject(fileRef);
      await deleteUser(userObj);
      navigate("/");
    }
  };
  const onClickLogOut = () => {
    signOut(auth).then(() => null);
    navigate("/");
  };
  const onClickModify = () => {
    setModify(true);
  };
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewDisplayName({ value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await updateProfile(userObj, { displayName: newDisplayName });
      setNewDisplayName(newDisplayName);
    }
    setModify(false);
  };

  const getMyDweets = async () => {
    const Query = query(
      collection(db, "dweets"),
      where("user", "==", userObj.uid),
      orderBy("date")
    );
    const querySnapshot = await getDocs(Query);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  };

  useEffect(() => {
    getMyDweets();
  });

  return (
    <div className="content profile">
      {modify ? (
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Display name"
            value={newDisplayName}
            onChange={onChange}
          />
          <input type="submit" placeholder="Update Profile" />
        </form>
      ) : (
        <h3>{newDisplayName} 님 안녕하세요!</h3>
      )}
      <div className="btnWrap">
        <button onClick={onClickModify}>회원정보수정</button>
        <button onClick={onClickLogOut}>로그아웃</button>
        <button onClick={onClickMemberEnd}>회원탈퇴</button>
      </div>
    </div>
  );
};

export default Profile;
