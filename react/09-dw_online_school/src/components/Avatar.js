import React from "react";
import styles from "./Avatar.module.css";

function Avatar({ photoUrl, name }) {
  console.log(photoUrl);
  return <img className={styles.avatar} src={photoUrl} title={name} />;
}

export default Avatar;
