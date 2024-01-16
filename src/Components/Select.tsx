import { useEffect, useMemo, useRef, useState } from "react";
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
  
    useEffect(() => {
      if (isOpen) setHighlightedIndex(0);
    }, [isOpen]);
  
    useEffect(() => {
      const handler = (e: KeyboardEvent) => {
        if (!containerRef.current) return;
        switch (e.code) {
          case "Enter":
          case "Space":
            setIsOpen((prev) => !prev);
            if (isOpen) selectOption(memoizedOptions[highlightedIndex]);
            break;
          case "ArrowUp":
          case "ArrowDown": {
            if (!isOpen) {
              setIsOpen(true);
              break;
            }
  
            const newValue = highlightedIndex + (e.code === "ArrowDown" ? 1 : -1);
            if (newValue >= 0 && newValue < memoizedOptions.length) {
              setHighlightedIndex(newValue);
            }
            break;
          }
          case "Escape":
            setIsOpen(false);
            break;
        }
      };
      containerRef.current?.addEventListener("keydown", handler);
  
      return () => {
        containerRef.current?.removeEventListener("keydown", handler);
      };
    }, [isOpen, highlightedIndex, memoizedOptions]);
  
    function clearOptions() {
      if (value != null && value.length > 0) {
        onChange([]);
      }
    }
  
    function selectOption(option: SelectOption) {
      if (!value) {
        onChange([option]);
      } else if (value.includes(option)) {
        onChange(value.filter((o) => o !== option));
      } else {
        onChange([...value, option]);
      }
    }
  
    function isOptionSelected(option: SelectOption) {
      return value && value.includes(option);
    }
  
    return (
      <div
        ref={containerRef}
        onBlur={() => setIsOpen(false)}
        onClick={() => setIsOpen((prev) => !prev)}
        tabIndex={0}
        className={styles.container}
      >
        <span className={styles.value}>
          {value.map((v) => (
            <OptionBadge key={v.value} option={v} onSelect={() => selectOption(v)} />
          ))}
        </span>
        <ClearButton onClick={clearOptions} />
        <OptionList
          options={memoizedOptions}
          isOpen={isOpen}
          highlightedIndex={highlightedIndex}
          onOptionClick={selectOption}
          onOptionMouseEnter={setHighlightedIndex}
          isOptionSelected={isOptionSelected}
        />
      </div>
    );
  };
  
  

export default Select