import { useState } from 'react'
import LeftWindow from '../components/left-window/left-window'
import Popup from '../components/popup/popup'
import styles from './main.module.css'
import MyDropdown from '../components/drop-down/drop-down'
import { dillerProduct, dillers } from '../utils/fakeData'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

function MainPage() {
  const [isDropdownItemSelected, setIsDropdownItemSelected] = useState(false)

  const [isResultOpen, setIsResultOpen] = useState<boolean>(false) // по умолчанию false
  const [isStatisticsOpen, setIsStatisticsOpen] = useState<boolean>(false)

  const handleDropdownSelect = (items: string | string[] | null) => {
    setIsDropdownItemSelected(true)
  }

  return (
    <div className={styles.app}>
      <div className={styles.main}>
        <LeftWindow />

        <div className={styles.block2AndButtons}>
          <div className={styles.block2}>
            <MyDropdown
              items={dillers}
              onSelect={handleDropdownSelect}
              placeholder={'Выберите дилера'}
            />
            <div className={styles.arrows}>
              <FaArrowLeft />
              <FaArrowRight />
            </div>
            <a
              href={dillerProduct.link}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.productName}
            >
              {dillerProduct.name}
              <p> {dillerProduct.price}</p>
            </a>
            <div className={styles.buttons}>
              <button
                className={styles.button}
                onClick={() => console.log('Button pressed')}
              >
                Да
              </button>
              <button
                className={styles.button}
                onClick={() => console.log('Button pressed')}
              >
                Нет
              </button>
              <button
                className={styles.button}
                onClick={() => console.log('Button pressed')}
              >
                Отложить
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.buttonsResult}>
        <button
          className={styles.buttonResult}
          onClick={() => console.log('Button pressed')}
        >
          Результаты
        </button>
        <button
          className={styles.buttonResult}
          onClick={() => console.log('Button pressed')}
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
