import Select from 'react-select'
import styles from './drop-down.module.css'

interface SelectProps {
  placeholder: string
  items: { value: string; label: string }[]
  onSelect: (items: string | string[] | null) => void
}

const MyDropdown: React.FC<SelectProps> = ({
  items,
  onSelect,
  placeholder,
}) => {
  const handleSelect = (selectedOptions: any) => {
    if (selectedOptions) {
      if (Array.isArray(selectedOptions)) {
        const selectedValues = selectedOptions.map((option) => option.value)
        onSelect(selectedValues)
      } else {
        onSelect(selectedOptions.value)
      }
    } else {
      onSelect(null)
    }
  }

  // Стили для React Select
  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      borderColor: state.isFocused ? '#b5e0c3' : provided.borderColor,
      boxShadow: 'none',
      '&:hover': {
        borderСolor: state.isFocused ? '#b5e0c3' : provided.borderColor,
      },
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#b5e0c3' : 'white',
    }),
    multiValue: (provided: any) => ({
      ...provided,
      backgroundColor: '#b5e0c3',
    }),
  }

  return (
    <Select
      className={styles.main}
      options={items}
      onChange={handleSelect}
      placeholder={placeholder}
      styles={customStyles}
      isClearable
      isMulti
    />
  )
}

export default MyDropdown
