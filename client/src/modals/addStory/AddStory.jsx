import React, { useState } from "react";
import style from "./addStory.module.css";
import { ImCross } from "react-icons/im";
import { backend_api } from "../../utils/constant";
import { toast } from "react-toastify";

const AddStory = ({
  isOpen,
  handleIsOpen,
  storyData = null,
  isEditing = false,
}) => {
  console.log(storyData);
  const maxSlides = 6;

  const [formData, setFormData] = useState(
    storyData
      ? storyData.slides
      : [
          {
            heading: "",
            description: "",
            image: "",
          },
        ]
  );
  const [selectedCategory, setSelectedCategory] = useState(
    isEditing ? storyData.category : ""
  );
  const [currentSlide, setCurrentSlide] = useState(0);

  const createStory = async ({ category, slides }) => {
    try {
      const res = await fetch(`${backend_api}/stories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ category, slides }),
      });

      const data = await res.json();
      if (res.status === 401) {
        localStorage.removeItem("token");
        window.location.reload();
      }
      console.log("hello");
      if (res.ok) {
        toast.success(data.message);
        handleIsOpen(false);
      } else {
        toast.error(data.message);
      }
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  const editStory = async ({ category, slides, id }) => {
    try {
      const res = await fetch(`${backend_api}/stories/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ category, slides }),
      });

      const data = await res.json();
      if (res.status === 401) {
        localStorage.removeItem("token");
        window.location.reload();
      }
      console.log("hello");
      if (res.ok) {
        toast.success(data.message);
        handleIsOpen(false);
      } else {
        toast.error(data.message);
      }
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (index) => (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      const updatedFormData = [...prevFormData];
      updatedFormData[index] = { ...updatedFormData[index], [name]: value };
      return updatedFormData;
    });
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSubmit = (event) => {
    // Check if there are at least 3 slides
    if (formData.length < 3) {
      toast.error("Please add at least 3 slides.");
      return;
    }

    // Check if any slide is missing a key value
    const hasEmptyFields = formData.some(
      (slide) => !slide.heading || !slide.description || !slide.image
    );
    if (hasEmptyFields) {
      toast.error("All fields in each slide are required.");
      return;
    }
    // Validate image URLs
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

    const isValidURL = formData.every((slide) => urlRegex.test(slide.image));
    if (!isValidURL) {
      toast.error("Please enter valid image URLs.");
      return;
    }
    isEditing
      ? editStory({
          category: selectedCategory,
          slides: formData,
          id: storyData._id,
        })
      : createStory({ category: selectedCategory, slides: formData });
  };

  const handleAddSlide = () => {
    if (formData.length < maxSlides) {
      setFormData((prevFormData) => [
        ...prevFormData,
        { heading: "", description: "", image: "" },
      ]);
      setCurrentSlide(formData.length);
    }
  };

  const handleRemoveSlide = (index) => {
    setFormData((prevFormData) => {
      const updatedFormData = [...prevFormData];
      updatedFormData.splice(index, 1);
      setCurrentSlide(0); // Reset currentSlide after removal
      return updatedFormData;
    });
  };

  const handleNextSlide = () => {
    if (currentSlide < formData.length - 1) setCurrentSlide((prev) => prev + 1);
  };
  const handlePrevSlide = () => {
    if (currentSlide > 0) setCurrentSlide((prev) => prev - 1);
  };
  return (
    <div className={style.wrapper} onClick={() => handleIsOpen(false)}>
      <div className={style.modal} onClick={(e) => e.stopPropagation()}>
        <div className={style.slides}>
          {formData.map((slide, index) => (
            <div
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={style.slide}
              style={
                index === currentSlide ? { backgroundColor: "#80808056" } : null
              }
            >
              Slide {index + 1}
              <div
                onClick={() => handleRemoveSlide(index)}
                className={style.slideCross}
                style={formData.length == 1 ? { display: "none" } : null}
              >
                <ImCross />
              </div>
            </div>
          ))}
          {formData.length < maxSlides && (
            <div className={style.addSlide} onClick={handleAddSlide}>
              Add slide
            </div>
          )}
        </div>
        {formData.length > 0 && (
          <div className={style.storyInfo}>
            <div className={style.heading}>
              <label>Heading:</label>

              <input
                name="heading"
                value={formData[currentSlide]?.heading}
                onChange={handleChange(currentSlide)}
                type="text"
                placeholder="Your heading"
              />
            </div>
            <div className={style.description}>
              <label>Description:</label>
              <textarea
                className={style.description}
                name="description"
                value={formData[currentSlide]?.description}
                onChange={handleChange(currentSlide)}
                placeholder="Story description"
              />
            </div>
            <div className={style.image}>
              <label>Image:</label>
              <input
                className={style.image}
                name="image"
                onChange={handleChange(currentSlide)}
                value={formData[currentSlide]?.image}
                type="text"
                placeholder="Add Image URI"
              />
            </div>
            <div className={style.category}>
              <label>Category:</label>
              <select
                name="category"
                onChange={handleCategoryChange}
                value={selectedCategory}
              >
                <option value="">Select</option>
                <option value="education">Education</option>
                <option value="fashion">Fashion</option>
                <option value="fitness">Fitness</option>
                <option value="food">Food</option>
                <option value="movies">Movies</option>
                <option value="music">Music</option>
                <option value="sports">Sports</option>
                <option value="travel">Travel</option>
              </select>
            </div>
          </div>
        )}
        <div className={style.btns}>
          <div>
            <button onClick={handlePrevSlide}>prev</button>

            <button onClick={handleNextSlide}>next</button>
          </div>
          <div>
            <button onClick={handleSubmit}>
              {isEditing ? "Edit" : "Post"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddStory;
