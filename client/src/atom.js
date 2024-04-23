import { atom } from "recoil";

export const isUserLoggedInState = atom({
  key: "isUserLoggedInState",
  default: localStorage.getItem("token") ? true : false,
});
