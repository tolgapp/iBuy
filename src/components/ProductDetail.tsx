import { useParams } from "react-router-dom";
import products from "../data/products.json";

const ProductDetail = () => {
  
    const { id } = useParams(); 
    const product = products.find((product) => product.id === parseInt(id));
  
    if (!product) {
      return <div>Product not found</div>;
    }

  return (
    <div className="product-detail">
      <div className="image-container">
        <img src="" alt="" />
        <img src="" alt="" />
      </div>
      <div className="big-image">
        <img src="" alt="" />
      </div>
      <div className="product-info">
        <h1>Apple</h1>
        
      </div>
    </div>
  );
};
export default ProductDetail;
