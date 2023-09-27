import { useEffect, useState } from "react";
import AppRouter from "components/Router";
import Nav from "../components/Nav";
import Footer from "components/Footer";
import { auth } from "fbase";

const App = () => {
  const [Init, setInit] = useState(false);
  const [isLogin, setisLogin] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      // console.log(user);
      if (user) {
        setisLogin(true);
        setUserObj(user);
      } else {
        setisLogin(false);
      }
      setInit(true);
    });
  }, []);
  return (
    <div className="App">
      <Nav />
      <img src="/logo512.png" alt="logo" />
      {Init ? (
        <AppRouter isLogin={isLogin} userObj={userObj} />
      ) : (
        "Initializing..."
      )}
      <Footer />
    </div>
  );
};

export default App;
