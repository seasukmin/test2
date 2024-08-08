import React from "react";
import FiltersCategory from "./filter-category/FiltersCategory";
import CountProducts from "./count-products/CountProducts";
import Cardlist from "./card-list/Cardlist";

function HomePage(props) {
  return (
    <div className="page">
      <div className="container">
        <h1>Products</h1>
        <FiltersCategory />
        <CountProducts />
        <Cardlist />
      </div>
    </div>
  );
}

export default HomePage;
