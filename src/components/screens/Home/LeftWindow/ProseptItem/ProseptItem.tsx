import { FC } from 'react'

import styles from './ProseptItem.module.scss'

interface IProseptItem {
  article: string
  name: string
  setSelectedGood: (good: string) => void
  selectedGood: string
}

const ProseptItem: FC<IProseptItem> = ({
  article,
  name,
  setSelectedGood,
  selectedGood
}) => {
  return (
    <li>
      <input
        className={styles.radio}
        type="radio"
        name="item"
        id={article}
        onClick={evt => {
          setSelectedGood(article)
          const target = evt.target as HTMLInputElement
          if (selectedGood === article) {
            target.checked = false
            setSelectedGood('')
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
