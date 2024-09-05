import imagesData from "../data/images.json";
import Slides from "../components/Slides";
import ImageText from "../components/ImageText";
import imageAndText from "../data/imageandtext.json";
import "../index.css"

const Home = () => {

  const imageTextComponents = imageAndText.images.map((data, index) => {

    const isReverse = index % 2 !== 0;
    const className = isReverse ? "reverse" : "";

    return (
      <ImageText key={index} text={data.text} url={data.url} reverse={className}  />
    );
  });

  return (
    <main className="home-container">
      <Slides images={imagesData.images} interval={3000} />
      <h2 className="home-h2">Special offers for members and free delivery for over 20 Euro orders! Sign up now!</h2>
      {imageTextComponents}
    </main>
  );
};

export default Home;