
import { SelectOption } from "./Types";
import styles from "./select.module.css";

const OptionList: React.FC<{
  options: SelectOption[];
  isOpen: boolean;
  highlightedIndex: number;
  onOptionClick: (option: SelectOption) => void;
  onOptionMouseEnter: (index: number) => void;
  isOptionSelected: (option: SelectOption) => boolean;
}> = ({
  options,
  isOpen,
  highlightedIndex,
  onOptionClick,
  onOptionMouseEnter,
  isOptionSelected,
}) => {
  const filteredOptions = options.filter((option) => !isOptionSelected(option));



  return (
    <ul className={`${styles.options} ${isOpen ? styles.show : ""}`}>
      {filteredOptions.map((option, index) => {

        return (<li
          onClick={() => onOptionClick(option)}
          onMouseEnter={() => onOptionMouseEnter(index)}
          key={option.value}
          className={`${styles.option} ${
            index === highlightedIndex ? styles.highlighted : ""
          }`}
        >
          {option.label}
        </li>
      )})}
    </ul>
  );
};

export default OptionList;
