import { useEffect, useState } from "react";
import AppRouter from "components/Router";
import Nav from "components/Nav";
import Footer from "components/Footer";
import { auth } from "fbase";

const App = () => {
  const [Init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      // console.log(user);
      if (user) {
        setUserObj(user);
      }
      setInit(true);
    });
  }, []);
  return (
    <div className="App">
      <Nav userObj={userObj} />
      {Init ? (
        <AppRouter isLogin={userObj} userObj={userObj} />
      ) : (
        "Initializing..."
      )}
      <Footer />
    </div>
  );
};

export default App;
