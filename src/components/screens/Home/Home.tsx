import { FC, useEffect, useState } from 'react'

import styles from './Home.module.scss'

import api from '../../../api/api'
import Layout from '../../layout/Layout'
import Button from '../../ui/Button/Button'
import Popup from '../../ui/Popup/Popup'
import Results from '../Results/Results'
import Statistics from '../Statistics/Statistics'

import {
  CompanyProductConfig,
  DealerConfig,
  DealerProductConfig,
  MarkupButtonConfig
} from './Home.interface'
import LeftWindow from './LeftWindow/LeftWindow'
import RightWindow from './RightWindow/RightWindow'

const Home: FC = () => {
  useEffect(() => {
    api
      .getAllDealers()
      .then(res => {
        setAllDealers(res.data)
      })
      .catch(console.error)
    api
      .getAllCompanyProducts()
      .then(res => {
        setAllCompanyProducts(res.data)
      })
      .catch(console.error)
  }, [])

  const [allCompanyProducts, setAllCompanyProducts] = useState<
    Array<CompanyProductConfig>
  >([])
  const [allDealers, setAllDealers] = useState<Array<DealerConfig>>([])
  const [allDealersProducts, setAllDealersProducts] = useState<
    Array<DealerProductConfig>
  >([])
  const [isResultOpen, setIsResultOpen] = useState<boolean>(false)
  const [isStatisticsOpen, setIsStatisticsOpen] = useState<boolean>(false)
  const [dealersProductsList, setDealersProductsList] = useState<
    Array<DealerProductConfig>
  >([])
  const [selectedGood, setSelectedGood] = useState<number | null>(null) //храним product_id

  const onClickMarkup = ({
    dealer_product_id,
    dealer_id,
    status
  }: MarkupButtonConfig) => {
    if (selectedGood !== null) {
      api.markupDealerProduct({
        product_id: selectedGood,
        status,
        dealer_product_id,
        dealer_id
      })
      api
        .getAllCompanyProducts()
        .then(res => {
          setAllCompanyProducts(res.data)
          setSelectedGood(null)
        })
        .catch(console.error)
    }
  }

  const getAllDealersProducts = () => {
    return api
      .getAllDealersProducts()
      .then(res => setAllDealersProducts(res.data))
  }

  return (
    <Layout>
      <>
        <div className={styles.main}>
          <LeftWindow
            allCompanyProducts={allCompanyProducts}
            selectedGood={selectedGood}
            setSelectedGood={setSelectedGood}
          />
          <RightWindow
            allDealers={allDealers}
            setDealersProductsList={setDealersProductsList}
            dealersProductsList={dealersProductsList}
            onClickMarkup={onClickMarkup}
          />
        </div>
        <div className={styles.buttonsResult}>
          <Button
            style="green"
            onClick={() => {
              getAllDealersProducts()
                .then(() => setIsResultOpen(true))
                .catch(console.error)
            }}
            text="Результаты"
          />
          <Button
            style="green"
            onClick={() => {
              getAllDealersProducts()
                .then(() => setIsStatisticsOpen(true))
                .catch(console.error)
            }}
            text="Статистика"
          />
        </div>
        {isResultOpen && (
          <Popup setIsOpen={setIsResultOpen}>
            <Results allDealersProducts={allDealersProducts} />
          </Popup>
        )}
        {isStatisticsOpen && (
          <Popup setIsOpen={setIsStatisticsOpen}>
            <Statistics allDealersProducts={allDealersProducts} />
          </Popup>
        )}
      </>
    </Layout>
  )
}

export default Home
