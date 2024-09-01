import ImageSlider from "../components/ImageSlider";

const Home = () => {
  const images = [
    { url: "https://picsum.photos/1024/800?random=1", 
      alt: "Random Image 1" },
    { url: "https://picsum.photos/1024/800?random=2", 
      alt: "Random Image 2" },
    { url: "https://picsum.photos/1024/800?random=3", 
      alt: "Random Image 3" },
    { url: "https://picsum.photos/1024/800?random=4", 
      alt: "Random Image 4" }
  ];

  return (
    <div className="home-container">
      {/* TODO: Slider */}
      <ImageSlider images={images.map(image => image.url)} />
    </div>
  );
};
export default Home;
