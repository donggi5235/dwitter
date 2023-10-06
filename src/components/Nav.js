import { Link } from "react-router-dom";
import Logo from "../images/logo.jpg";
import Mypage from "../images/i-user.svg";

const Nav = ({ userObj }) => {
  return (
    <>
      <nav>
        <ul>
          <li className="logo">
            <Link to="/">
              <img src={Logo} alt="" />
            </Link>
          </li>
          <li className="user">
            {userObj && (
              <Link to="/profile">
                <img src={Mypage} alt="" />
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Nav;
