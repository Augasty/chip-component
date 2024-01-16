export type SelectOption = {
  label: string;
  value: string | number;
};

export type MultipleSelectProps = {
  value: SelectOption[];
  onChange: (value: SelectOption[]) => void;
};

export type SelectProps = {
  options: SelectOption[];
} & MultipleSelectProps;
