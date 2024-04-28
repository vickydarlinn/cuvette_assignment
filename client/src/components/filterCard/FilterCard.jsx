import React from "react";
import style from "./filterCard.module.css";

const FilterCard = ({ filterData, setSelectedFilters, selectedFilters }) => {
  const { title, image } = filterData;
  const isSelected = selectedFilters.some((item) => item.title === title);
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
    <div
      className={style.wrapper}
      onClick={handleClick}
      style={{
        border: isSelected ? "4px solid #ff7373" : "4px solid transparent",
      }}
    >
      <img src={image} alt="" />
      <span className={style.title}> {title}</span>
    </div>
  );
};

export default FilterCard;
