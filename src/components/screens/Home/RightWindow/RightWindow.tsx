import { FC } from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

import styles from './RightWindow.module.scss'

import DropDown from '../../../ui/DropDown/DropDown'
import { dealers, dealersProduct } from './fakeData'



const RightWindow: FC = () => {

  // const [isDropdownItemSelected, setIsDropdownItemSelected] =
  //   useState<boolean>(false)

  // const handleDropdownSelect = (items: string | string[] | null) => {
  //   setIsDropdownItemSelected(true)
  // }

  
  return (
    <section className={styles.rightWindow}>
      <DropDown
        items={dealers}
        onSelect={() => console.log()}
        placeholder={'Выберите дилера'}
      />
      <div className={styles.card}>
        <div className={styles.good}>
          <button className={styles.arrow}>
            <FaArrowLeft />
          </button>
          <a
            href={dealersProduct.link}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.productName}
            title="Открыть страницу товара"
          >
            {dealersProduct.name}
            <p> {dealersProduct.price}</p>
          </a>
          <button className={styles.arrow}>
            <FaArrowRight />
          </button>
        </div>

        <div className={styles.buttons}>
          <button
            className={styles.button}
            onClick={() => {
              console.log('Button pressed')
            }}
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
    </section>
  )
}

export default RightWindow
