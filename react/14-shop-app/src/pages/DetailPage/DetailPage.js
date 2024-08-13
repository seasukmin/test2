import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import styles from "./DetailPage.module.scss";
import { fetchProducts } from "../../store/products/productsSlice";

function DetailPage() {
  const { id } = useParams();
  const productId = Number(id);
  const dispatch = useDispatch();
  const { products, isLoading } = useSelector((state) => state.cartSlice);

  useEffect(() => {
    const queryOptions = {
      conditions: [{ field: "id", operator: "==", value: productId }],
    };
    dispatch(fetchProducts({ collectionName: "shop", queryOptions }));
  }, []);

  return (
    <div className="page">
      {isLoading ? (
        "Loading..."
      ) : (
        <div className={styles.card_wrapper}>
          <div className={styles.card_img}>
            <img src={products.image} />
          </div>
          <div className={styles.card_description}>
            <h3>{products.category}</h3>
            <h1>{products.title}</h1>
            <h4>{products.price}</h4>
            <p>{products.description}</p>
            <div>
              <button>장바구니에 담기</button>
              <Link>장바구니로 이동</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DetailPage;
