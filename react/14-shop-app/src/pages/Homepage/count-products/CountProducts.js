import React from "react";
import styles from "./CountProducts.module.scss";
import { useSelector } from "react-redux";
import productsSlice from "./../../../store/products/productsSlice";

function CountProducts() {
  const { products } = useSelector((state) => state.productsSlice);
  return (
    <div className={styles.count_products}>
      <p>showing: {products.length}items</p>
    </div>
  );
}

export default CountProducts;
