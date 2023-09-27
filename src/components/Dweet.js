import { useState } from "react";
import { db, doc, deleteDoc, updateDoc } from "fbase";

const Dweet = ({ dweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newDweet, setNewDweet] = useState(dweetObj.text);
  const onClickDelete = async () => {
    const ok = window.confirm("정말 삭제 하시겠습니까?");
    if (ok) {
      // true
      await deleteDoc(doc(db, "dweets", dweetObj.id));
    }
  };
  const toggleEditing = () => {
    setEditing((prev) => !prev);
  };
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewDweet(value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    await updateDoc(doc(db, "dweets", dweetObj.id), { text: newDweet });
    setEditing(false);
  };
  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              name=""
              id=""
              placeholder="Edit your text"
              value={newDweet}
              required
              onChange={onChange}
            />
            <input type="submit" value="수정완료" />
          </form>
          <button onClick={toggleEditing}>취소</button>
        </>
      ) : (
        <>
          <h4>{dweetObj.text}</h4>
          {isOwner && (
            <>
              <button onClick={toggleEditing}>수정</button>
              <button onClick={onClickDelete}>삭제</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Dweet;
