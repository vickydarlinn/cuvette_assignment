import React from "react";
import style from "./filterCard.module.css";

const FilterCard = () => {
  return (
    <div className={style.wrapper}>
      <img
        src="https://swiptory001.netlify.app/static/media/All.a62ea23f0360c2a06f3d.jpg"
        alt=""
      />
      <span className={style.title}> Title</span>
    </div>
  );
};

export default FilterCard;
