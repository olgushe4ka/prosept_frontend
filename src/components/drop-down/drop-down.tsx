import React, { useRef, useState } from 'react'
import Select from 'react-select'
import styles from './drop-down.module.css'

interface SelectProps {
  items: { value: string; label: string }[]
  onSelect: (items: string | string[] | null) => void
}

const MyDropdown: React.FC<SelectProps> = ({ items, onSelect }) => {
  const valueRef = useRef<string[]>([])
  const [isSelectAllSelected, setIsSelectAllSelected] = useState<boolean>(false)

  const selectAllOption = {
    value: '<SELECT_ALL>',
    label: 'Выбрать все',
  }

  const getOptions = () => {
    if (isSelectAllSelected) {
      return [selectAllOption]
    }
    return [selectAllOption, ...items]
  }

  const handleSelect = (selectedOptions: any) => {
    if (selectedOptions) {
      const selectedValues = Array.isArray(selectedOptions)
        ? selectedOptions.map((option) => option.value)
        : [selectedOptions.value]

      if (selectedValues.includes(selectAllOption.value)) {
        setIsSelectAllSelected(true)
        onSelect(items.map((item) => item.value))
      } else {
        setIsSelectAllSelected(false)
        onSelect(selectedValues)
      }

      valueRef.current = selectedValues
    } else {
      setIsSelectAllSelected(false)
      onSelect(null)
      valueRef.current = []
    }
  }

  // Стили для React Select
  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      borderColor: state.isFocused ? '#b5e0c3' : provided.borderColor,
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
      options={getOptions()}
      onChange={handleSelect}
      placeholder="Выберите диллера"
      isClearable
      isMulti
      styles={customStyles}
    />
  )
}

export default MyDropdown
