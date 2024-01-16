import React, { useEffect, useMemo, useRef, useState } from "react";
import { SelectOption, SelectProps } from "./Types";
import styles from "./select.module.css";
import ClearButton from "./ClearButton";
import OptionList from "./OptionList";
import { OptionBadge } from "./OptionBadge";

const Select: React.FC<SelectProps> = ({ value = [], onChange, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const memoizedOptions = useMemo(() => options, [options]);
  const [inputValue, setInputValue] = useState("");
  const [isHighlighted, setIsHighlighted] = useState(false);

  useEffect(() => {
    if (isOpen) setHighlightedIndex(0);
  }, [isOpen]);

  function clearOptions() {
    if (value.length > 0) onChange([]);
  }

  function selectOption(option: SelectOption) {
    const updatedValue = value.includes(option)
      ? value.filter((o) => o !== option)
      : [...value, option];
    onChange(updatedValue);
  }

  function handleOptionClick(option: SelectOption) {
    selectOption(option);
    setIsOpen(false);
    setInputValue("");
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value);
    setIsOpen(true);
    setHighlightedIndex(0);
    setIsHighlighted(event.target.value === "" && value.length > 0);
  }

  function handleInputKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Backspace" && inputValue === "" && value.length > 0) {
      setIsHighlighted(!isHighlighted);

      if (isHighlighted) {
        const lastIndex = value.length - 1;
        const updatedValue = [...value.slice(0, lastIndex), ...value.slice(lastIndex + 1)];
        onChange(updatedValue);
      }
    }
  }

  function filterOptions() {
    return memoizedOptions.filter((option) =>
      option.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  }

  return (
    <div className={styles.container}>
      <div ref={containerRef} onBlur={() => setIsOpen(false)} onClick={() => setIsOpen(true)} tabIndex={0} className={styles.topbox}>
        <span className={styles.value}>
          {value.map((v, index) => (
            <OptionBadge key={v.value} option={v} onSelect={() => selectOption(v)} isHighlighted={isHighlighted && index === value.length - 1} />
          ))}
        </span>
        <ClearButton onClick={clearOptions} />
        <OptionList
          options={filterOptions()}
          isOpen={isOpen}
          highlightedIndex={highlightedIndex}
          onOptionClick={handleOptionClick}
          onOptionMouseEnter={setHighlightedIndex}
          isOptionSelected={(option) => value.includes(option)}
        />
      </div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        onMouseDown={() => setIsOpen(true)}
        placeholder="Type to filter..."
        className={styles.input}
      />
    </div>
  );
};

export default Select;
