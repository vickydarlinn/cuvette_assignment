import { useEffect, useState } from "react";
import { backend_api } from "../../utils/constant";
import { useParams } from "react-router-dom";
import ShowStory from "../../modals/showStory";

const SingleStoryPage = () => {
  const { id } = useParams();
  const [storyData, setStoryData] = useState();

  const fetchStory = async (id) => {
    const url = `${backend_api}/stories/${id}`;
    const response = await fetch(url);
    const data = await response.json();
    setStoryData(data.data);
  };
  console.log(storyData);

  useEffect(() => {
    fetchStory(id);
  }, []);

  return (
    <div>
      <ShowStory storyData={storyData} />
    </div>
  );
};

export default SingleStoryPage;
