import { useState } from "react";
import style from "./registerModal.module.css";
import { toast } from "react-toastify";
import { GrClose } from "react-icons/gr";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { isUserLoggedInState } from "../../atom";
import { useRecoilState } from "recoil";
import { backend_api } from "../../utils/constant";

const RegisterModal = ({ handleIsOpen }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [_, setIsUserLoggedIn] = useRecoilState(isUserLoggedInState);
  const [isShowingPassword, setIsShowingPassword] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  const registerFn = async ({ username, password }) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${backend_api}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
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
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    registerFn(userData);
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  return (
    <div
      className={style.wrapper}
      onClick={(e) => {
        handleIsOpen(false);
      }}
    >
      <form
        className={style.modal}
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className={style.heading}>Register to SwipTory</h2>
        <div className={style.formData}>
          <div className={style.username}>
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
          <button className={style.registerBtn}>Loading...</button>
        ) : (
          <button type="submit" className={style.registerBtn}>
            Register
          </button>
        )}
        <div onClick={() => handleIsOpen(false)} className={style.cross}>
          <GrClose />
        </div>
      </form>
    </div>
  );
};

export default RegisterModal;
