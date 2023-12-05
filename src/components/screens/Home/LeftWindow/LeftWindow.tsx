import { FC, useEffect, useState } from 'react'

import styles from './LeftWindow.module.scss'

import preloader from '../../../../images/preloader.gif'
import { CompanyProductConfig } from '../Home.interface.js'

import { LeftWindowConfig } from './LeftWindow.interface.js'
import ProseptItem from './ProseptItem/ProseptItem.js'

const LeftWindow: FC<LeftWindowConfig> = ({
  allCompanyProducts,
  selectedGood,
  setSelectedGood,
  isLoading
}) => {
  const [goodsQuantity, setGoodsQuantity] = useState<number>(5) //количество отображаемых товаров
  const [searchRequest, setSearchRequest] = useState<string>('') //поисковый запрос
  const [searchGoods, setSearchGoods] =
    useState<Array<CompanyProductConfig>>(allCompanyProducts) //найденные товары

  useEffect(() => {
    setSearchGoods(allCompanyProducts)
  }, [allCompanyProducts])

  return (
    <section className={styles.leftWindow}>
      <input
        className={styles.search}
        placeholder="Поиск по позициям PROSEPT"
        value={searchRequest}
        onInput={evt => {
          const target = evt.target as HTMLInputElement
          setSearchRequest(target.value)
          const newGoods = allCompanyProducts.filter(
            good =>
              good.article.toLowerCase().includes(target.value.toLowerCase()) ||
              good.name.toLowerCase().includes(target.value.toLowerCase())
          )
          setSearchGoods(newGoods)
        }}
      />
      <label className={styles.blockFilter}>
        Показывать
        <select
          className={styles.filter}
          onChange={evt => {
            setGoodsQuantity(Number(evt.target.value))
          }}
          defaultValue={5}
        >
          <option value="1">1</option>
          <option value="3">3</option>
          <option value="5">5</option>
          <option value="Infinity">Все</option>
        </select>
      </label>
      <ul className={styles.list}>
        {isLoading ? (
          <div className={styles.preloaderWrapper}>
            <img src={preloader} alt="preloader" width="64px" />
          </div>
        ) : (
          searchGoods
            .slice(0, goodsQuantity)
            .map(good => (
              <ProseptItem
                key={good.article}
                article={good.article}
                name={good.name}
                selectedGood={selectedGood}
                productId={good.id}
                setSelectedGood={setSelectedGood}
              />
            ))
        )}
      </ul>
    </section>
  )
}

export default LeftWindow
