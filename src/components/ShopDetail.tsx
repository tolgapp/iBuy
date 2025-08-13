type ShopDetailProps = {
    shopID: string;
  };
  
  const ShopDetail: React.FC<ShopDetailProps> = ({ shopID }) => {
    return <h3>Details for product with: {shopID}</h3>;
  };
  
  export default ShopDetail;
    