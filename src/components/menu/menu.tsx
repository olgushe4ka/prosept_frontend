import styles from "./menu.module.css";

import Select from "react-select";

interface SelectProps {
  items: { value: string; label: string }[];
  onSelect: (items: string) => void;
}

const MyDropdown: React.FC<SelectProps> = ({ items, onSelect }) => {
  const handleSelect = (
    selectedOption: { value: string; label: string } | null
  ) => {
    if (selectedOption) {
      onSelect(selectedOption.value);
    }
  };

  return (
    <Select
      className={styles.main}
      options={items}
      onChange={handleSelect}
      placeholder="Выберите товар"
    />
  );
};

export default MyDropdown;
