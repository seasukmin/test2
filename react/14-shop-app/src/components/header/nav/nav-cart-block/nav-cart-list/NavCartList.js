import React from "react";
import styles from "./NavCartList.module.scss";
import NavCartItem from "./nav-cart-item/NavCartItem";
import { useSelector } from "react-redux";

function NavCartList(props) {
  const { products } = useSelector((state) => state.cartSlice);
  return (
    <div className={styles.nav_cart_list}>
      {products.map((products) => {
        return <NavCartItem key={products.id} products={products} />;
      })}
      {/* <NavCartItem/> */}
      {/* <NavCartItem/> */}
    </div>
  );
}

export default NavCartList;

// 모바일 주민등록증?올해말출시ㄷㄷ
