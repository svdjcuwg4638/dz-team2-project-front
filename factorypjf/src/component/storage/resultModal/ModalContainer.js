import React from "react";
import ResultModal from "./ResultModal";
import styles from "./ModalContaier.module.css";
const ModalContainer = ({ setModalstate, type, linkTo }) => {
  return (
    <div
      className={styles.backdrop}
      onClick={() =>
        type === "result"
          ? (setModalstate(false), window.location.reload())
          : setModalstate(false)
      }
    >
      {type === "result" && (
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
          <ResultModal setModalstate={setModalstate} linkTo={linkTo} />
        </div>
      )}
    </div>
  );
};
export default ModalContainer;
