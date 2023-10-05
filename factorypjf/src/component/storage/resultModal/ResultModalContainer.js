import React from "react";
import ResultModal from "./ResultModal";
import styles from "./ResultModalContaier.module.css";
const ResultModalContainer = ({ setModalstate, linkTo }) => {
  return (
    <div
      className={styles.backdrop}
      onClick={() => (setModalstate(false), window.location.reload())}
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <ResultModal setModalstate={setModalstate} linkTo={linkTo} />
      </div>
    </div>
  );
};
export default ResultModalContainer;
