import { useState } from "react";
import style from "./registerModal.module.css";
import { toast } from "react-toastify";

import { isUserLoggedInState } from "../../atom";
import { useRecoilState } from "recoil";
import { backend_api } from "../../utils/constant";

const RegisterModal = ({ handleIsOpen }) => {
  const [_, setIsUserLoggedIn] = useRecoilState(isUserLoggedInState);
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  const registerFn = async ({ username, password }) => {
    try {
      const response = await fetch(`${backend_api}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        toast.success(data.message);
        localStorage.setItem("token", data?.data?.token);
        localStorage.setItem("userId", data?.data?.user?.id);

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
    registerFn(userData);
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  return (
    <div className={style.wrapper}>
      <form className={style.modal} onSubmit={handleSubmit}>
        <h2>Register to SwipTory</h2>
        <div>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              placeholder="Enter username"
              value={userData.username}
              name="username"
              onChange={handleChange}
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
        <button type="submit">Register</button>
        <div onClick={() => handleIsOpen(false)} className={style.cross}>
          XX
        </div>
      </form>
    </div>
  );
};

export default RegisterModal;
