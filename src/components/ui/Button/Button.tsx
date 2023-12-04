import { FC } from 'react'

import styles from './Button.module.scss'

interface ButtonConfig {
  style: 'green' | 'black'
  onClick: () => void
  text: string
}

const Button: FC<ButtonConfig> = ({ style, onClick, text }) => {
  return (
    <button
      className={style === 'green' ? styles.greenButton : styles.blackButton}
      onClick={onClick}
    >
      {text}
    </button>
  )
}

export default Button
