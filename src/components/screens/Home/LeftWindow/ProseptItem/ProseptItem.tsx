import { FC } from 'react'

import styles from './ProseptItem.module.scss'

interface IProseptItem {
  article: string
  name: string
  setSelectedGood: (good: number | null) => void
  selectedGood: number | null
  productId: number
}

const ProseptItem: FC<IProseptItem> = ({
  article,
  name,
  setSelectedGood,
  selectedGood,
  productId
}) => {
  return (
    <li>
      <input
        className={styles.radio}
        type="radio"
        name="item"
        id={article}
        checked={selectedGood === productId ? true : false}
        onChange={evt => {
          setSelectedGood(productId)
          const target = evt.target as HTMLInputElement
          if (selectedGood === productId) {
            target.checked = false
            setSelectedGood(null)
          }
        }}
      />
      <label htmlFor={article} className={styles.proseptItem}>
        <span>{article}</span>
        <span>{name}</span>
      </label>
    </li>
  )
}

export default ProseptItem
