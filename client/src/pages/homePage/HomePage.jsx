import { useState } from "react";

import FilterCard from "../../components/filterCard";
import StoriesWrapper from "../../components/storiesWrapper";
import { filters, categories } from "../../utils/constant";
import style from "./homePage.module.css";

const HomePage = () => {
  const [selectedFilters, setSelectedFilters] = useState([]);

  // const checkFilterSelection = (filter) => {
  //   if (
  //     filter.title === "all" &&
  //     selectedFilters.length === categories.length
  //   ) {
  //     return true;
  //   } else {
  //     return (
  //       selectedFilters.length !== categories.length &&
  //       selectedFilters.some(
  //         (selectedFilter) => selectedFilter.title === filter.title
  //       )
  //     );
  //   }
  // };
  // const handleFilters = (filterName) => {
  //   if (filterName === "all") {
  //     setSelectedFilters(categories);
  //   } else {
  //     if (selectedFilters.some((filter) => filter.name === filterName)) {
  //       setSelectedFilters((prev) =>
  //         prev.filter((item) => item.name !== filterName)
  //       );
  //     } else {
  //       const newFilterItem = categories.find(
  //         (item) => item.name === filterName
  //       );
  //       setSelectedFilters((prev) => [...prev, newFilterItem]);
  //     }
  //   }
  // };
  return (
    <>
      <div className={style.filterWrapper}>
        {filters.map((filter, index) => (
          <FilterCard
            key={index}
            filterData={filter}
            setSelectedFilters={setSelectedFilters}
          />
        ))}
      </div>
      {selectedFilters.length == 0
        ? categories.map((filter, index) => (
            <StoriesWrapper
              key={index}
              category={filter.title}
              name={filter.name}
            />
          ))
        : selectedFilters.map((filter, index) => (
            <StoriesWrapper
              key={index}
              category={filter.title}
              name={filter.name}
            />
          ))}
    </>
  );
};

export default HomePage;
