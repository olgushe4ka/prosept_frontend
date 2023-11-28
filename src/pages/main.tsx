import MyDropdown from '../components/drop-down/drop-down'
import styles from './main.module.css'
import ItemFromItemsList from '../components/items-list/items-list'
import { itemsList } from '../utils/fakeData'
import { useState } from 'react'

interface SelectedItem {
  name: string
  link: string
}

function MainPage() {
  const dillers = [
    { value: 'Ozon', label: 'Ozon' },
    { value: 'Wb', label: 'Wb' },
  ]

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
        <div className={styles.block1}>
          <h3>Список позиций Просепт:</h3>
          <input placeholder="Поиск" />
          {itemsList.map((item) => (
            <div
              key={item.id}
              onClick={() => handleSelectItem(item.name, item.link)}
              className={
                selectedItem?.name === item.name ? styles.selectedItem : ''
              }
            >
              <ItemFromItemsList item={item.name} />
            </div>
          ))}
        </div>
        <div className={styles.block2AndButtons}>
          <div className={styles.block2}>
            <MyDropdown items={dillers} onSelect={handleDropdownSelect} />
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
    </div>
  )
}

export default MainPage
