import { useState } from 'react'

import styles from './Home.module.scss'

import Layout from '../../layout/Layout'
import Popup from '../../ui/Popup/Popup'
import Statistics from '../Statistics/Statistics'

import LeftWindow from './LeftWindow/LeftWindow'
import RightWindow from './RightWindow/RightWindow'

function Home() {
  const [isResultOpen, setIsResultOpen] = useState<boolean>(false)
  const [isStatisticsOpen, setIsStatisticsOpen] = useState<boolean>(false)

  return (
    <Layout>
      <>
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
        </div>
        {isResultOpen && (
          <Popup setIsOpen={setIsResultOpen}>{<p>Result Popup</p>}</Popup>
        )}
        {isStatisticsOpen && (
          <Popup setIsOpen={setIsStatisticsOpen}>
            <Statistics />
          </Popup>
        )}
      </>
    </Layout>
  )
}

export default Home
