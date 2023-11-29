import { FC, useState } from 'react'
import styles from './left-window.module.css'
import ProseptItem from './prosept-item/prosept-item'
import { goods } from './test-data/goods.js'

interface IGoods {
  article: string
  name: string
}

const LeftWindow: FC = () => {
  const [goodsQuantity, setGoodsQuantity] = useState<number>(5) //количество отображаемых товаров
  const [searchRequest, setSearchRequest] = useState<string>('') //поисковый запрос
  const [searchGoods, setSearchGoods] = useState<IGoods[]>(goods) //найденные товары
  const [selectedGood, setSelectedGood] = useState<string>('') //храним артикул
  return (
    <section className={styles.leftWindow}>
      <input
        className={styles.search}
        placeholder="Поиск по позициям PROSEPT"
        value={searchRequest}
        onInput={(evt) => {
          const target = evt.target as HTMLInputElement
          setSearchRequest(target.value)
          const newGoods = goods.filter(
            (good) =>
              good.article.toLowerCase().includes(target.value.toLowerCase()) ||
              good.name.toLowerCase().includes(target.value.toLowerCase()),
          )
          setSearchGoods(newGoods)
        }}
      />
      <label className={styles.blockFilter}>
        Показывать
        <select
          className={styles.filter}
          onChange={(evt) => {
            setGoodsQuantity(Number(evt.target.value))
          }}
        >
          <option value="1">1</option>
          <option value="3">3</option>
          <option value="5" selected>
            5
          </option>
          <option value="Infinity">Все</option>
        </select>
      </label>
      <ul className={styles.list}>
        {searchGoods.slice(0, goodsQuantity).map((good) => (
          <ProseptItem
            key={good.article}
            article={good.article}
            name={good.name}
            selectedGood={selectedGood}
            setSelectedGood={setSelectedGood}
          />
        ))}
      </ul>
    </section>
  )
}

export default LeftWindow
