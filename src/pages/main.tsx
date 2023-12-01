import { useState } from 'react'
import LeftWindow from '../components/left-window/left-window'
import Popup from '../components/popup/popup'
import RightWindow from '../components/right-window/right-window'
import styles from './main.module.css'

function MainPage() {
  const [isResultOpen, setIsResultOpen] = useState<boolean>(false)
  const [isStatisticsOpen, setIsStatisticsOpen] = useState<boolean>(false)

  return (
    <div className={styles.app}>
      <div className={styles.main}>
        <LeftWindow />
        <RightWindow />
      </div>
      <div className={styles.buttonsResult}>
        <button
          className={styles.buttonResult}
          onClick={() => setIsResultOpen(true)}
        >
          Результаты
        </button>
        <button
          className={styles.buttonResult}
          onClick={() => setIsStatisticsOpen(true)}
        >
          Статистика
        </button>
      </div>{' '}
      {isResultOpen && (
        <Popup setIsOpen={setIsResultOpen}>{<p>Result Popup</p>}</Popup>
      )}
      {isStatisticsOpen && (
        <Popup setIsOpen={setIsStatisticsOpen}>{<p>Statistics Popup</p>}</Popup>
      )}
    </div>
  )
}

export default MainPage
