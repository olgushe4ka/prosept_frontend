import { useState } from 'react'
import LeftWindow from '../components/left-window/left-window'
import styles from './main.module.css'
import MyDropdown from '../components/drop-down/drop-down'
import { dillerProduct, dillers } from '../utils/fakeData'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

interface SelectedItem {
  name: string
  link: string
}

function MainPage() {
  const [selectedItem, setSelectedItem] = useState<SelectedItem | null>(null)
  const [isDropdownItemSelected, setIsDropdownItemSelected] = useState(false)

  const handleSelectItem = (item: string, link: string) => {
    setSelectedItem({ name: item, link: link })
  }

  const handleDropdownSelect = (items: string | string[] | null) => {
    setIsDropdownItemSelected(true)
  }

  return (
    <div className={styles.app}>
      <div className={styles.main}>
        <LeftWindow />

        <div className={styles.block2AndButtons}>
          <div className={styles.block2}>
            <MyDropdown items={dillers} onSelect={handleDropdownSelect} />
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
    </div>
  )
}

export default MainPage
