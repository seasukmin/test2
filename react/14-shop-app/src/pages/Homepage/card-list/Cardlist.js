import React from "react";
import CardItem from "./card-item/CardItem";
import styles from "./Cardlist.module.scss";

const products = [
  {
    id: 1,
    title:
      "가방이올시다하하하하하하하하하하하하하하하하하핳하하하가방이올시다하하하하하하하하하하하하하하하하하핳하하하",
    price: "109.95",
    description:
      "숲에서 하루종일 걷고 난리쳐도 좋은 가방. 15인치가 넘는 노트북도 들어감",
    category: "Men`s clothing",
    image: "/back.jpg",
    rating: {
      rate: 3.9,
      count: 120,
    },
  },
  {
    id: 2,
    title:
      "가방이올시다하하하하하하하하하하하하하하하하하핳하하하가방이올시다하하하하하하하하하하하하하하하하하핳하하하",
    price: "109.95",
    description:
      "숲에서 하루종일 걷고 난리쳐도 좋은 가방. 15인치가 넘는 노트북도 들어감",
    category: "Men`s clothing",
    image: "/back.jpg",
    rating: {
      rate: 3.9,
      count: 120,
    },
  },
  {
    id: 3,
    title:
      "가방이올시다하하하하하하하하하하하하하하하하하핳하하하가방이올시다하하하하하하하하하하하하하하하하하핳하하하",
    price: "109.95",
    description:
      "숲에서 하루종일 걷고 난리쳐도 좋은 가방. 15인치가 넘는 노트북도 들어감",
    category: "Men`s clothing",
    image: "/back.jpg",
    rating: {
      rate: 3.9,
      count: 120,
    },
  },
  {
    id: 4,
    title:
      "가방이올시다하하하하하하하하하하하하하하하하하핳하하하가방이올시다하하하하하하하하하하하하하하하하하핳하하하",
    price: "109.95",
    description:
      "숲에서 하루종일 걷고 난리쳐도 좋은 가방. 15인치가 넘는 노트북도 들어감",
    category: "Men`s clothing",
    image: "/back.jpg",
    rating: {
      rate: 3.9,
      count: 120,
    },
  },
  {
    id: 5,
    title:
      "가방이올시다하하하하하하하하하하하하하하하하하핳하하하가방이올시다하하하하하하하하하하하하하하하하하핳하하하",
    price: "109.95",
    description:
      "숲에서 하루종일 걷고 난리쳐도 좋은 가방. 15인치가 넘는 노트북도 들어감",
    category: "Men`s clothing",
    image: "/back.jpg",
    rating: {
      rate: 3.9,
      count: 120,
    },
  },
  {
    id: 6,
    title:
      "가방이올시다하하하하하하하하하하하하하하하하하핳하하하가방이올시다하하하하하하하하하하하하하하하하하핳하하하",
    price: "109.95",
    description:
      "숲에서 하루종일 걷고 난리쳐도 좋은 가방. 15인치가 넘는 노트북도 들어감",
    category: "Men`s clothing",
    image: "/back.jpg",
    rating: {
      rate: 3.9,
      count: 120,
    },
  },
];

function Cardlist() {
  return (
    <ul className={styles.card_list}>
      {products.map((item) => {
        return <CardItem key={item.id} {...item} />;
      })}
    </ul>
  );
}

export default Cardlist;

// 프론트엔드 회사를 가면 firebase를 쓰긴하지만 .. 아니면 backend와 fecth 엑시오스? react콜??
