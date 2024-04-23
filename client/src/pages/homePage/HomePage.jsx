import React from "react";

import FilterCard from "../../components/filterCard";
import StoriesWrapper from "../../components/storiesWrapper";
import { filters } from "../../utils/constant";
import style from "./homePage.module.css";

const HomePage = () => {
  return (
    <>
      <div className={style.filterWrapper}>
        {filters.map((filter, index) => (
          <FilterCard key={index} image={filter.image} title={filter.title} />
        ))}
      </div>
      <StoriesWrapper category={"movies"} />
      <StoriesWrapper category={"food"} />
      <StoriesWrapper category={"health_and_fitness"} />
      <StoriesWrapper category={"travel"} />
      <StoriesWrapper category={"education"} />
    </>
  );
};

export default HomePage;
