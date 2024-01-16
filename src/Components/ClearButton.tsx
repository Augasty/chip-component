import styles from "./select.module.css";

const ClearButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button
    onClick={(e) => {
      e.stopPropagation();
      onClick();
    }}
    className={styles["clear-btn"]}
  >
    &times;
  </button>
);

export default ClearButton;
