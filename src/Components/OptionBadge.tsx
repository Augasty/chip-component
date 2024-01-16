
import { SelectOption } from "./Types";
import styles from "./select.module.css";

export const OptionBadge: React.FC<{
  option: SelectOption;
  onSelect: () => void;
  isHighlighted: boolean
}> = ({ option, onSelect ,  isHighlighted }) => (
  <button
    onClick={(e) => {
      e.stopPropagation();
      onSelect();
    }}
    className={`${styles["option-badge"]} ${isHighlighted && styles.isHighlighted}`}
  >
    {option.label}
    <span className={styles["remove-btn"]}>&times;</span>
  </button>
);
