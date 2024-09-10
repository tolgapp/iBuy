type Products = {
  id: number;
  images: string[];
  brand: string;
  description: string;
  price: number;
};

type Product = {
  product: Products;
};

const ProductCard: React.FC<Product> = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.images[0]} alt={product.brand} />
      {product.images[1] && (
        <img
          src={product.images[1]}
          alt={product.brand}
          className="product-image-hover"
        />
      )}
      <h3 className="product-name">{product.brand}</h3>
      <p className="product-description">{product.description}</p>
      <p className="product-card-price">{product.price} €</p>
    </div>
  );
};
export default ProductCard;
