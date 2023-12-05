import { FC } from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

import styles from './RightWindow.module.scss'

import preloader from '../../../../images/preloader.gif'
import Button from '../../../ui/Button/Button'
import DropDown from '../../../ui/DropDown/DropDown'

import { IRightWindow } from './RightWindow.interface'

const RightWindow: FC<IRightWindow> = ({
  allDealers,
  setDealersProductsList,
  dealersProductsList,
  onClickMarkup,
  isLoading
}) => {
  return (
    <section className={styles.rightWindow}>
      <DropDown
        items={allDealers.map(dealer => ({
          value: dealer.name,
          label: dealer.name
        }))}
        onSelect={newValue => {
          setDealersProductsList(
            allDealers
              .filter(dealer => newValue?.includes(dealer.name))
              .map(dealer => dealer.dealer_product)
              .flat()
          )
        }}
        placeholder={'Выберите дилера'}
      />
      <div className={styles.card}>
        {isLoading && <img src={preloader} alt="preloader" />}
        {dealersProductsList[0] && !isLoading && (
          <>
            <div className={styles.good}>
              <button className={styles.arrow}>
                <FaArrowLeft />
              </button>
              <a
                href={dealersProductsList[0].product_url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.productName}
                title="Открыть страницу товара"
              >
                {dealersProductsList[0].product_name}
                <p>{dealersProductsList[0].price} ₽</p>
              </a>
              <button className={styles.arrow}>
                <FaArrowRight />
              </button>
            </div>

            <div className={styles.buttons}>
              <Button
                style="black"
                onClick={() => {
                  onClickMarkup({
                    dealer_product_id: dealersProductsList[0].id,
                    dealer_id: dealersProductsList[0].dealer_id,
                    status: 'markup'
                  })
                }}
                text="Да"
              />
              <Button
                style="black"
                onClick={() => {
                  onClickMarkup({
                    dealer_product_id: dealersProductsList[0].id,
                    status: 'unclaimed'
                  })
                }}
                text="Нет"
              />
              <Button
                style="black"
                onClick={() => {
                  onClickMarkup({
                    dealer_product_id: dealersProductsList[0].id,
                    status: 'postponed'
                  })
                }}
                text="Отложить"
              />
            </div>
          </>
        )}
        {!dealersProductsList[0] && !isLoading && (
          <p className={styles.endList}>
            Сейчас все товары размечены. Воспользуйтесь кнопкой результаты, если
            желаете внести изменения.
          </p>
        )}
      </div>
    </section>
  )
}

export default RightWindow
