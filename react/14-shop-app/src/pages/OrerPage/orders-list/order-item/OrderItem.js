import React from "react";
import styles from "./OrderItem.module.scss";
import { Link } from "react-router-dom";

function OrderItem({
  category,
  price,
  image,
  title,
  total,
  rating,
  quantity,
  id,
}) {
  return (
    <li className={styles.order_item}>
      <Link to={`/product/${id}`}>
        <img src={image} />
      </Link>
      <div className={styles.order_description}>
        <h4>{category}</h4>
        <h3>{title}</h3>
      </div>
      <div className={styles.order_price}>
        <h4>가격: </h4>
        <span>
          $ {price}x {quantity}
        </span>
      </div>
      <div className={styles.order_total}>
        <h4>합계: </h4>
        <span>$ {total}</span>
      </div>
    </li>
  );
}

export default OrderItem;
