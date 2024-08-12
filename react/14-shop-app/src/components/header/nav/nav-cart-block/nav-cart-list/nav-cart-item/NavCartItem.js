import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import styles from "./NavCartItem.module.scss";

function NavCartItem({ products }) {
  const { category, title, price, image, quantity, total } = products;
  return (
    <div className={styles.nav_cart_item}>
      <Link>
        <img src={image} />
      </Link>
      <div className={styles.nav_cart_description}>
        <h3>{category}</h3>
        <h2>{title}</h2>
        <span>
          {price} x {quantity} = $ {price * total}
          {/* $ {total.toFixed(2)} */}
          {/* toFixed는 반올림(안에 숫자 2이면 2번쨰 숫자까지 표시) */}
        </span>
      </div>
      <button className={styles.nav_cart_delete}>
        <AiOutlineDelete size={32} />
      </button>
    </div>
  );
}

export default NavCartItem;
