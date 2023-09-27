import { useEffect, useState } from "react";
import { db, collection, addDoc, onSnapshot } from "fbase";
import Dweet from "components/Dweet";

const Home = ({ userObj }) => {
  const newDate = new Date();
  const [dweet, setDweet] = useState("");
  const [dweets, setDweets] = useState([]);
  const upload = {
    text: dweet,
    date: newDate,
    user: userObj.uid,
  };
  const onChange = (e) => {
    e.preventDefault();
    const Dweet = e.target.value;
    setDweet(Dweet);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "dweets"), upload);
    setDweet("");
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
          <input type="submit" value="Dweet" />
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
