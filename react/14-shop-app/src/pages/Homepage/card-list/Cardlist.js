import React, { useEffect } from "react";
import CardItem from "./card-item/CardItem";
import styles from "./Cardlist.module.scss";
import { useDispatch, useSelector } from "react-redux";
import productsSlice, {
  fetchProducts,
} from "./../../../store/products/productsSlice";

function Cardlist() {
  // const limits = 6;
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.productsSlice);
  const category = "";
  useEffect(() => {
    const queryOptions = {
      conditions: [
        {
          field: "category",
          operator: category ? "==" : ">=",
          value: category.toLocaleLowerCase(),
        },
      ],
      // limits: limits,
    };
    dispatch(fetchProducts({ collectionName: "shop", queryOptions }));
  }, [category]);

  return (
    <ul className={styles.card_list}>
      {products.map((product) => {
        return <CardItem key={product.id} {...product} />;
      })}
    </ul>
  );
}

export default Cardlist;

// 프론트엔드 회사를 가면 firebase를 쓰긴하지만 .. 아니면 backend와 fecth 엑시오스? react콜??
