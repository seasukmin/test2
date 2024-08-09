import React from "react";
import styles from "./CategoryTab.module.scss";
import { setActiveCategory } from "../../../../store/categories/categoriesSlice";
import { useDispatch, useSelector } from "react-redux";
import categoriesSlice from "./../../../../store/categories/categoriesSlice";
function CategoryTab({ text, categoryName }) {
  const category = useSelector((state) => state.categoriesSlice);
  const dispatch = useDispatch();
  return (
    <button
      className={
        categoryName === category
          ? styles.active_category
          : styles.category_button
      }
      onClick={() => dispatch}
    >
      {text}
    </button>
  );
}

export default CategoryTab;
