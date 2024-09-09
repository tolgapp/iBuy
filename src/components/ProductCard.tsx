type Products = {
  id: number
  url: string
  brand: string
  price: number
}

type Product = {
  product: Products
}

const ProductCard: React.FC<Product> = ({product}) => {
  return (
    <div className="product-card">
      <img src={product.url} alt="" />
      <h3 className="product-name">{product.brand}</h3>
      <p className="product-description">
        Unisex Sneaker from <span className="brand">{product.brand}</span>
      </p>
      <p className="product-card-price">{product.price}</p>
    </div>
  );
};
export default ProductCard;
