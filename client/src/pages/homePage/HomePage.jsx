import React from "react";

import FilterCard from "../../components/filterCard";
import StoriesWrapper from "../../components/storiesWrapper";
import StoryCard from "../../components/storyCard";

const HomePage = () => {
  const filters = [
    {
      image: "https://images.unsplash.com/photo-1603855873822-0931a843ee3a",
      title: "All",
    },
    {
      image:
        "https://plus.unsplash.com/premium_photo-1663858367001-89e5c92d1e0e",
      title: "food",
    },
    {
      image: "https://images.unsplash.com/photo-1597452485668-2b8ae3b8daa7",
      title: "health and fitness",
    },
    {
      image: "https://images.unsplash.com/photo-1528543606781-2f6e6857f318",
      title: "travel",
    },
    {
      image: "https://images.unsplash.com/photo-1584905066893-7d5c142ba4e1",
      title: "movies",
    },
    {
      image: "https://images.unsplash.com/photo-1424115087662-5845efc6b366",
      title: "education",
    },
  ];

  return (
    <>
      <div className="">
        {filters.map((filter, index) => (
          <FilterCard key={index} image={filter.image} title={filter.title} />
        ))}
      </div>
      <StoriesWrapper />
      <StoriesWrapper />
      <StoriesWrapper />
      <StoriesWrapper />
    </>
  );
};

export default HomePage;
