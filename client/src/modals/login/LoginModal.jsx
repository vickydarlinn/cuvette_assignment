import { useState } from "react";
import { toast } from "react-toastify";
import { GrClose } from "react-icons/gr";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";

import style from "./loginModal.module.css";
import { isUserLoggedInState } from "../../atom";
import { useRecoilState } from "recoil";
import { backend_api } from "../../utils/constant";

const LoginModal = ({ handleIsOpen }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [_, setIsUserLoggedIn] = useRecoilState(isUserLoggedInState);
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });
  const [isShowingPassword, setIsShowingPassword] = useState(false);

  const loginFn = async ({ username, password }) => {
    setIsLoading(true);
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
        localStorage.setItem("userId", data.data.user.id);
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
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    loginFn(userData);
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  return (
    <div className={style.wrapper} onClick={() => handleIsOpen(false)}>
      <form
        className={style.modal}
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className={style.heading}>Login to SwipTory</h2>
        <div className={style.formData}>
          <div className={style.username}>
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
            <div className={style.passwordInput}>
              <input
                onChange={handleChange}
                type={isShowingPassword ? "text" : "password"}
                placeholder="Enter password"
                value={userData.password}
                autoComplete="on"
                name="password"
              />
              {isShowingPassword ? (
                <div className={style.eye}>
                  <IoMdEyeOff
                    onClick={() => setIsShowingPassword(false)}
                    className={style.eye}
                  />
                </div>
              ) : (
                <div className={style.eye}>
                  <IoMdEye
                    onClick={() => setIsShowingPassword(true)}
                    className={style.eye}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        {isLoading ? (
          <button className={style.loginBtn}>Loading...</button>
        ) : (
          <button type="submit" className={style.loginBtn}>
            Login
          </button>
        )}
        <div
          onClick={() => {
            handleIsOpen(false);
          }}
          className={style.cross}
        >
          <GrClose />
        </div>
      </form>
    </div>
  );
};

export default LoginModal;
