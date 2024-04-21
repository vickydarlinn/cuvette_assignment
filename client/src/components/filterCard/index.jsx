import React from "react";
import style from "./filterCard.module.css";

const FilterCard = ({ image, title }) => {
  return (
    <div className={style.wrapper}>
      <img src={image} alt="" />
      <span className={style.title}> {title}</span>
    </div>
  );
};

export default FilterCard;
