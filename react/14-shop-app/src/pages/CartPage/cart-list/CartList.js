import React from "react";
import { useSelector } from "react-redux";
import CartItem from "./cart-item/CartItem";
import styles from "./CartList.module.scss";

function CartList(props) {
  const { products } = useSelector((state) => state.cartSlice);
  return (
    <div className={styles.nav_cart_list}>
      {products.map((products) => {
        return <CartItem key={products.id} products={products} />;
      })}
    </div>
  );
}

export default CartList;
