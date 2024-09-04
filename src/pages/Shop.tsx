import React from "react";
import { Link, useParams } from "react-router-dom";
import ShopDetail from "../components/ShopDetail";

const Shop: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Example data
  const items = [
    { id: "1", name: "Artikel 1" },
    { id: "2", name: "Artikel 2" },
    { id: "3", name: "Artikel 3" },
  ];

  return (
    <div>
      {id ? (
        <ShopDetail shopID={id} />
      ) : (
        <div>
          <h2>Willkommen im Shop</h2>
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                <Link to={`/shop/${item.id}`}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Shop;
