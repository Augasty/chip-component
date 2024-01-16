import { SelectOption } from "./Types";
import styles from "./select.module.css";

export const OptionBadge: React.FC<{
  option: SelectOption;
  onSelect: () => void;
}> = ({ option, onSelect }) => (
  <button
    onClick={(e) => {
      e.stopPropagation();
      onSelect();
    }}
    className={styles["option-badge"]}
  >
    {option.label}
    <span className={styles["remove-btn"]}>&times;</span>
  </button>
);
