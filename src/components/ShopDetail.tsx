type ShopDetailProps = {
    shopID: string;
  };
  
  const ShopDetail: React.FC<ShopDetailProps> = ({ shopID }) => {
    return <h3>Details für Artikel mit ID: {shopID}</h3>;
  };
  
  export default ShopDetail;
    