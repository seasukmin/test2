import React from "react";
import styles from "./CartItem.module.scss";
import { AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

function CartItem({ products }) {
  const { category, title, price, image, quantity, total, id } = products;
  const dispatch = useDispatch();
  const incrementCount = () => {
    dispatch(incrementCount(id));
  };
  const decrementCount = () => {
    dispatch(decrementCount(id));
  };
  return (
    <div className={styles.cart_item}>
      <Link>
        <img src={image} />
      </Link>
      <div className={styles.cart_description}>
        <h3>{category}</h3>
        <h2>{title}</h2>
        <span>
          {price} x {quantity} = $ {price * total}
          {/* $ {total.toFixed(2)} */}
          {/* toFixed는 반올림(안에 숫자 2이면 2번쨰 숫자까지 표시) */}
        </span>
      </div>
      <div className={styles.cart_count}>
        <div>
          <button onClick={decrementCount}>-</button>
          <span>{quantity}</span>
          <button onClick={incrementCount}>+</button>
        </div>
      </div>
      <button className={styles.cart_delete}>
        <AiOutlineDelete size={32} />
      </button>
    </div>
  );
}

export default CartItem;
