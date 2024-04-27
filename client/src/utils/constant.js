import allImage from "../assets/images/all.jpeg";
import foodImage from "../assets/images/food.jpeg";
import healthAndFitnessImage from "../assets/images/health_and_fitness.jpeg";
import travelImage from "../assets/images/travel.jpeg";
import moviesImage from "../assets/images/movies.jpeg";
import educationImage from "../assets/images/education.jpeg";

export const backend_api = "http://localhost:3500/api/v1";

export const filters = [
  {
    image: allImage,
    name: "All",
    title: "all",
  },
  {
    image: foodImage,
    name: "Food",
    title: "food",
  },
  {
    image: healthAndFitnessImage,
    name: "Health and Fitness",
    title: "health_and_fitness",
  },
  {
    image: travelImage,
    name: "Travel",
    title: "travel",
  },
  {
    image: moviesImage,
    name: "Movies",
    title: "movies",
  },
  {
    image: educationImage,
    name: "Education",
    title: "education",
  },
];
export const categories = [
  {
    name: "Food",
    title: "food",
  },
  {
    name: "Health and Fitness",
    title: "health_and_fitness",
  },
  {
    name: "Travel",
    title: "travel",
  },
  {
    name: "Movies",
    title: "movies",
  },
  {
    name: "Education",
    title: "education",
  },
];
