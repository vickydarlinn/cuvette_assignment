import { useState } from "react";
import style from "./addStory.module.css";

const AddStory = () => {
  const [category, setCategory] = useState("");
  const [slides, setSlides] = useState([
    { heading: "", image: "", description: "" },
  ]);
  return (
    <div className={style.wrapper}>
      <div className={style.modal}>this will modal show</div>
    </div>
  );
};

export default AddStory;
