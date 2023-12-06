import { FC, useState } from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

import styles from './RightWindow.module.scss'

import preloader from '../../../../images/preloader.gif'
import Button from '../../../ui/Button/Button'
import DropDown from '../../../ui/DropDown/DropDown'
import { DealerProductConfig } from '../Home.interface'

import { IRightWindow } from './RightWindow.interface'

const RightWindow: FC<IRightWindow> = ({
  allDealers,
  setDealersProductsList,
  dealersProductsList,
  onClickMarkup,
  isLoading,
  history,
  setHistory
}) => {
  const [backHistory, setBackHistory] = useState<Array<DealerProductConfig>>([])
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
              <div className={styles.arrowContainer}>
                {history[0] && (
                  <button
                    className={styles.arrow}
                    onClick={() => {
                      setDealersProductsList([
                        history[0],
                        ...dealersProductsList
                      ])
                      setHistory(history.slice(1))
                      setBackHistory([dealersProductsList[0], ...backHistory])
                    }}
                  >
                    <FaArrowLeft />
                  </button>
                )}
              </div>
              <a
                href={dealersProductsList[0].product_url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.productNameBox}
                title="Открыть страницу товара"
              >
                <p   className={styles.productName}> {dealersProductsList[0].product_name} </p>
                <p>{dealersProductsList[0].price} ₽</p>
              </a>
              <div className={styles.arrowContainer}>
                {backHistory[0] && (
                  <button
                    className={styles.arrow}
                    onClick={() => {
                      setBackHistory(backHistory.slice(1))
                      setHistory([dealersProductsList[0], ...history])
                      setDealersProductsList(dealersProductsList.slice(1))
                    }}
                  >
                    <FaArrowRight />
                  </button>
                )}
              </div>
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
                disabled={isLoading}
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
                disabled={isLoading}
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
                disabled={isLoading}
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
