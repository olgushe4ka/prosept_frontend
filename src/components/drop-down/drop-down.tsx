import styles from './drop-down.module.css'

import Select from 'react-select';
import ValueType from 'react-select';

interface SelectProps {
  items: { value: string; label: string }[];
  onSelect: (items: string | string[] | null) => void;
}

const MyDropdown: React.FC<SelectProps> = ({ items, onSelect }) => {
  const handleSelect = (
    selectedOptions: ValueType<{ value: string; label: string }, true>,
    actionMeta: any
  ) => {
    if (selectedOptions) {
      if (Array.isArray(selectedOptions)) {
        const selectedValues = selectedOptions.map((option) => option.value);
        onSelect(selectedValues);
      } else {
        onSelect(selectedOptions.value);
      }
    } else {
      onSelect(null);
    }
  };

  return (
    <Select
      className={styles.main}
      options={items}
      onChange={handleSelect}
      placeholder="Выберите диллера"
      isMulti
    />
  );
};

export default MyDropdown;