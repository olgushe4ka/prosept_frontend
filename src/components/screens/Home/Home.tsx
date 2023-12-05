import { FC, useEffect, useState } from 'react'

import styles from './Home.module.scss'

import api from '../../../api/api'
import Layout from '../../layout/Layout'
import Button from '../../ui/Button/Button'
import ModalError from '../../ui/ModalError/ModalError'
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
    setIsLoading(true)
    Promise.all([
      api.getAllDealers().then(res => {
        setAllDealers(res.data)
      }),
      api.getAllCompanyProducts().then(res => {
        setAllCompanyProducts(res.data)
      }),
      getAllDealersProducts().then(res => {
        setDealersProductsList(res.data)
      })
    ])
      .catch(() => {
        setErrorText('Ошибка на сервере. Попробуйте перезагрузить страницу.')
      })
      .finally(() => setIsLoading(false))
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
  const [selectedGood, setSelectedGood] = useState<number | null>(null)
  const [errorText, setErrorText] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [history, setHistory] = useState<Array<DealerProductConfig>>([])

  const onClickMarkup = ({
    dealer_product_id,
    dealer_id,
    status
  }: MarkupButtonConfig) => {
    if (selectedGood !== null) {
      setIsLoading(true)
      api
        .markupDealerProduct({
          product_id: selectedGood,
          status,
          dealer_product_id,
          dealer_id
        })
        .then(() => {
          setHistory([dealersProductsList[0], ...history])
          setDealersProductsList(dealersProductsList.slice(1))
          api
            .getAllCompanyProducts()
            .then(res => {
              setAllCompanyProducts(res.data)
              setSelectedGood(null)
            })
            .catch(console.error)
        })
        .finally(() => setIsLoading(false))
    } else {
      if (status === 'markup') {
        setIsLoading(false)
        setErrorText(
          'Необходимо выбрать соответствующий товар среди позиций PROSEPT!'
        )
        setTimeout(() => setErrorText(''), 2000)
        return
      }
      api
        .markupDealerProduct({
          status,
          dealer_product_id
        })
        .then(() => {
          setHistory([dealersProductsList[0], ...history])
          setDealersProductsList(dealersProductsList.slice(1))
          api
            .getAllCompanyProducts()
            .then(res => {
              setAllCompanyProducts(res.data)
              setSelectedGood(null)
            })
            .catch(console.error)
        })
        .finally(() => setIsLoading(false))
    }
  }

  const getAllDealersProducts = () => {
    return api.getAllDealersProducts().then(res => {
      setAllDealersProducts(res.data)
      return res
    })
  }

  return (
    <Layout>
      <>
        <div className={styles.main}>
          <LeftWindow
            allCompanyProducts={allCompanyProducts}
            selectedGood={selectedGood}
            setSelectedGood={setSelectedGood}
            isLoading={isLoading}
          />
          <RightWindow
            allDealers={allDealers}
            setDealersProductsList={setDealersProductsList}
            dealersProductsList={dealersProductsList}
            onClickMarkup={onClickMarkup}
            isLoading={isLoading}
            history={history}
            setHistory={setHistory}
          />
        </div>
        <div className={styles.buttonsResult}>
          <Button
            style="green"
            onClick={() => {
              setIsLoading(true)
              getAllDealersProducts()
                .then(() => setIsResultOpen(true))
                .catch(() => {
                  setErrorText(
                    'Ошибка на сервере. Попробуйте перезагрузить страницу.'
                  )
                })
                .finally(() => {
                  setIsLoading(false)
                })
            }}
            text="Результаты"
            disabled={isLoading}
          />
          <Button
            style="green"
            onClick={() => {
              setIsLoading(true)
              getAllDealersProducts()
                .then(() => {
                  setIsStatisticsOpen(true)
                })
                .catch(() => {
                  setErrorText(
                    'Ошибка на сервере. Попробуйте перезагрузить страницу.'
                  )
                })
                .finally(() => {
                  setIsLoading(false)
                })
            }}
            text="Статистика"
            disabled={isLoading}
          />
        </div>
        {isResultOpen && (
          <Popup setIsOpen={setIsResultOpen}>
            <Results
              allDealersProducts={allDealersProducts}
              onClickMarkup={onClickMarkup}
            />
          </Popup>
        )}
        {isStatisticsOpen && (
          <Popup setIsOpen={setIsStatisticsOpen}>
            <Statistics allDealersProducts={allDealersProducts} />
          </Popup>
        )}
        <ModalError text={errorText} />
      </>
    </Layout>
  )
}

export default Home
