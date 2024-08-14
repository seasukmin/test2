import React from "react";
import styles from "./OrdersList.module.scss";
import OrderItem from "./order-item/OrderItem";
import mockData from "../../../orderMock.json";

function OrdersList() {
  return (
    <div className={styles.orders}>
      {mockData.map((order, idx) => (
        <div key={idx}>
          <div className={styles.order_header}>
            <h3>주문 번호_{order.createdAt}</h3>
            <h3>주문 날짜_{order.createdAt}</h3>
            <p>합계: $ {order.totalPrice.toFixed(2)}</p>
          </div>
          <ul>
            {order.products.map((product) => (
              <OrderItem key={product.id} {...product} />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default OrdersList;
