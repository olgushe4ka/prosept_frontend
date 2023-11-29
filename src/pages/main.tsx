import { useState } from 'react'
import LeftWindow from '../components/left-window/left-window'
import MyDropdown from '../components/menu/menu'
import Popup from '../components/popup/popup'
import styles from './main.module.css'

interface SelectedItem {
  name: string
  link: string
}

function MainPage() {
  const items = [
    { value: 'Краска', label: 'Краска' },
    { value: 'Шампунь', label: 'Шампунь' },
    { value: 'Мыло', label: 'Мыло' },
    { value: 'Антисептик', label: 'Антисептик' },
  ]

  const [selectedItem, setSelectedItem] = useState<SelectedItem | null>(null)
  const [isDropdownItemSelected, setIsDropdownItemSelected] = useState(false)

  const [isResultOpen, setIsResultOpen] = useState<boolean>(true) // по умолчанию false
  const [isStatisticsOpen, setIsStatisticsOpen] = useState<boolean>(false)

  const handleSelectItem = (item: string, link: string) => {
    setSelectedItem({ name: item, link: link })
  }

  const handleDropdownSelect = (selectedValue: string) => {
    setIsDropdownItemSelected(true)
  }

  return (
    <div className={styles.app}>
      <div className={styles.main}>
        <LeftWindow />
        <div className={styles.block2AndButtons}>
          <div className={styles.block2}>
            <MyDropdown items={items} onSelect={handleDropdownSelect} />
            <a
              href={selectedItem?.link}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.block2}
            >
              Название товара с гипперссылкой на него
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
            </div>{' '}
          </div>
        </div>
      </div>
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
