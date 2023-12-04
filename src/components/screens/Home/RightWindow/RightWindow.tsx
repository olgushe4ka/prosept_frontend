import { FC } from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

import styles from './RightWindow.module.scss'

import Button from '../../../ui/Button/Button'
import DropDown from '../../../ui/DropDown/DropDown'

import { IRightWindow } from './RightWindow.interface'

const RightWindow: FC<IRightWindow> = ({
  allDealers,
  setDealersProductsList,
  dealersProductsList,
  onClickMarkup
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
        {dealersProductsList[0] && (
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
              <p>{dealersProductsList[0].price}</p>
            </a>
            <button className={styles.arrow}>
              <FaArrowRight />
            </button>
          </div>
        )}
        <div className={styles.buttons}>
          <Button
            style="black"
            onClick={() => {
              onClickMarkup({
                dealer_product_id: dealersProductsList[0].id,
                dealer_id: dealersProductsList[0].dealer_id,
                status: 'markup'
              })
              setDealersProductsList(dealersProductsList.slice(1))
            }}
            text="Да"
          />
          <Button
            style="black"
            onClick={() => {
              onClickMarkup({
                dealer_product_id: dealersProductsList[0].id,
                dealer_id: dealersProductsList[0].dealer_id,
                status: 'unclaimed'
              })
              setDealersProductsList(dealersProductsList.slice(1))
            }}
            text="Нет"
          />
          <Button
            style="black"
            onClick={() => {
              onClickMarkup({
                dealer_product_id: dealersProductsList[0].id,
                dealer_id: dealersProductsList[0].dealer_id,
                status: 'postponed'
              })
              setDealersProductsList(dealersProductsList.slice(1))
            }}
            text="Отложить"
          />
        </div>
      </div>
    </section>
  )
}

export default RightWindow
