import React from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";

function App() {
  const { storeId } = useParams(); // Extract the storeId from the URL

  return (
    <div className="catch-of-the-day">
      <div className="menu">
        <Header tagline="Fresh Seafood Market" age={100} />
        <h2>Store ID: {storeId}</h2> {/* Display the storeId */}
      </div>
      <Order />
      <Inventory />
    </div>
  );
}

export default App;
