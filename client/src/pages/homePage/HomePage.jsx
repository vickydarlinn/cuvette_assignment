import { useState } from "react";
import FilterCard from "../../components/filterCard";
import StoriesWrapper from "../../components/storiesWrapper";
import { filters, categories } from "../../utils/constant";
import style from "./homePage.module.css";

const HomePage = () => {
  const [selectedFilters, setSelectedFilters] = useState([]);

  return (
    <>
      <div className={style.filterWrapper}>
        {filters.map((filter) => (
          <FilterCard
            key={filter.title}
            filterData={filter}
            setSelectedFilters={setSelectedFilters}
          />
        ))}
      </div>
      {selectedFilters.length == 0
        ? categories.map((filter) => (
            <StoriesWrapper
              key={filter.title}
              category={filter.title}
              name={filter.name}
            />
          ))
        : selectedFilters.map((filter) => (
            <StoriesWrapper
              key={filter.title}
              category={filter.title}
              name={filter.name}
            />
          ))}
    </>
  );
};

export default HomePage;
