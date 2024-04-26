import React from "react";
import style from "./filterCard.module.css";

const FilterCard = ({ filterData, setSelectedFilters }) => {
  const { title, image } = filterData;
  const handleClick = () => {
    if (title === "all") {
      setSelectedFilters([]);
    } else {
      setSelectedFilters((prev) => {
        if (prev.some((item) => item.title === title)) {
          return prev.filter((item) => item.title !== title);
        }
        return [...prev, filterData];
      });
    }
  };
  return (
    <div className={style.wrapper} onClick={handleClick}>
      <img src={image} alt="" />
      <span className={style.title}> {title}</span>
    </div>
  );
};

export default FilterCard;
