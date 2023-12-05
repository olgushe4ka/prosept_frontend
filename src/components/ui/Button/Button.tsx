import { FC } from 'react'

import styles from './Button.module.scss'

interface ButtonConfig {
  style: 'green' | 'black'
  onClick: () => void
  text: string
  disabled: boolean
}

const Button: FC<ButtonConfig> = ({ style, onClick, text, disabled }) => {
  return (
    <button
      className={style === 'green' ? styles.greenButton : styles.blackButton}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  )
}

export default Button
