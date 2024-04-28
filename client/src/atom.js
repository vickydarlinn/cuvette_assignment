import { atom } from "recoil";

export const isUserLoggedInState = atom({
  key: "isUserLoggedInState",
  default: localStorage.getItem("token") ? true : false,
});

export const userInfoState = atom({
  key: "userInfoState",
  default: undefined,
});
