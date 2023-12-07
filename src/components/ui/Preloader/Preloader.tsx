import { FC } from 'react'

import styles from './Preloader.module.scss'

import preloader from '../../../images/preloader.gif'

const Preloader: FC = () => {
  return (
    <div className={styles.preloaderWrapper}>
      <img src={preloader} alt="preloader" />
    </div>
  )
}

export default Preloader
