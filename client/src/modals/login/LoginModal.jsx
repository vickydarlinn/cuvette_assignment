import { useState } from "react";
import { toast } from "react-toastify";

import style from "./loginModal.module.css";
import { isUserLoggedInState } from "../../atom";
import { useRecoilState } from "recoil";
import { backend_api } from "../../utils/constant";

const LoginModal = ({ handleIsOpen }) => {
  const [_, setIsUserLoggedIn] = useRecoilState(isUserLoggedInState);
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  const loginFn = async ({ username, password }) => {
    console.log(username, password);
    try {
      const response = await fetch(`${backend_api}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        localStorage.setItem("token", data.data.token);
        setIsUserLoggedIn(true);
        handleIsOpen(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setUserData({
        username: "",
        password: "",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userData);
    loginFn(userData);
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  return (
    <div className={style.wrapper}>
      <form className={style.modal} onSubmit={handleSubmit}>
        <h2>Login to SwipTory</h2>
        <div>
          <div>
            <label htmlFor="username">Username</label>
            <input
              onChange={handleChange}
              type="text"
              placeholder="Enter username"
              value={userData.username}
              name="username"
            />
          </div>
          <div className={style.password}>
            <label htmlFor="password">Password</label>
            <input
              onChange={handleChange}
              type="password"
              placeholder="Enter password"
              value={userData.password}
              autoComplete="on"
              name="password"
            />
            <div className={style.eye}>Tes</div>
          </div>
        </div>
        <button type="submit">Login</button>
        <div
          onClick={() => {
            handleIsOpen(false);
          }}
          className={style.cross}
        >
          XX
        </div>
      </form>
    </div>
  );
};

export default LoginModal;
