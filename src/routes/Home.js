import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { db, collection, addDoc, onSnapshot } from "fbase";
import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
} from "firebase/storage";
import Dweet from "components/Dweet";

const storage = getStorage();

const Home = ({ userObj }) => {
  const newDate = new Date();
  const [dweet, setDweet] = useState("");
  const [dweets, setDweets] = useState([]);
  const [attach, setAttach] = useState("");

  const onChange = (e) => {
    e.preventDefault();
    const Dweet = e.target.value;
    setDweet(Dweet);
  };

  const onChangeImg = (e) => {
    const {
      target: { files },
    } = e;
    const theFile = files[0];
    if (theFile) {
      const reader = new FileReader();
      reader.onloadend = (f) => {
        const {
          target: { result },
        } = f;
        setAttach(result);
      };
      reader.readAsDataURL(theFile);
    }
  };

  const onClickImgClear = () => {
    setAttach(null);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    let imgUrl = "";
    if (attach !== "") {
      const fileRef = ref(storage, `${userObj.uid}/${uuidv4()}`);
      await uploadString(fileRef, attach, "data_url");
      imgUrl = await getDownloadURL(fileRef);
    }
    const upload = {
      text: dweet,
      date: newDate,
      user: userObj.uid,
      img: imgUrl,
    };
    await addDoc(collection(db, "dweets"), upload);
    setDweet("");
    setAttach(null);
  };

  const getDweets = () => {
    onSnapshot(collection(db, "dweets"), (snapshot) => {
      const dweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDweets(dweetArray);
    });
  };

  useEffect(() => {
    getDweets();
  }, []);

  return (
    <div>
      <div>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="dweet"
            placeholder="What's on your mind?"
            maxLength={120}
            value={dweet}
            onChange={onChange}
          />
          <input type="file" accept="images/*" onChange={onChangeImg} />
          <input type="submit" value="Dweet" />
          {attach && (
            <div>
              <img src={attach} alt="" width="50px" height="50px" />
              <button onClick={onClickImgClear}>Clear</button>
            </div>
          )}
        </form>
      </div>
      <div>
        {dweets.map((dweet) => (
          <Dweet
            key={dweet.id}
            dweetObj={dweet}
            isOwner={dweet.user === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
