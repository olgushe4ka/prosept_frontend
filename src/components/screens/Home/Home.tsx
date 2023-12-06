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
  MarkupButtonConfig,
  SelectedGoodConfig
} from './Home.interface'
import LeftWindow from './LeftWindow/LeftWindow'
import RightWindow from './RightWindow/RightWindow'

const Home: FC = () => {
  useEffect(() => {
    setIsDealersProductsLoading(true)
    setIsDisabled(true)
    Promise.all([
      api.getAllDealers().then(res => {
        setAllDealers(res.data)
      }),
      getAllDealersProducts().then(async res => {
        setDealersProductsList(res.data)
      })
    ])
      .catch(() => {
        setErrorText('Ошибка на сервере. Попробуйте перезагрузить страницу.')
      })
      .finally(() => setIsDealersProductsLoading(false))
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
  const [selectedGood, setSelectedGood] = useState<
    SelectedGoodConfig | Record<string, never>
  >({})
  const [errorText, setErrorText] = useState<string>('')
  const [isDisabled, setIsDisabled] = useState<boolean>(false) ///!!!
  const [isProductsCompanyLoading, setIsProductsCompanyLoading] =
    useState<boolean>(false)
  const [isDealersProductsLoading, setIsDealersProductsLoading] =
    useState<boolean>(false)
  const [history, setHistory] = useState<Array<DealerProductConfig>>([])

  useEffect(() => {
    setIsProductsCompanyLoading(true)
    if (dealersProductsList[0])
      onChangeCurrentDealersGood(dealersProductsList[0].id)
  }, [dealersProductsList])

  /**
   * Функция возвращает список наиболее подходящих товаров компании
   * при изменении текущего товара в карточке дилера
   * @param id параметр id продукта дилера
   */

  const onChangeCurrentDealersGood = (id: number) => {
    setIsDisabled(true)
    return api
      .getMachineMatching(id)
      .then(res => {
        setAllCompanyProducts(res.data)
        setSelectedGood({})
      })
      .catch(() => {
        setErrorText('Ошибка на сервере. Попробуйте перезагрузить страницу.')
      })
      .finally(() => {
        setIsProductsCompanyLoading(false)
        setIsDisabled(false)
      })
  }

  const onClickMarkup = ({ dealer_product_id, status }: MarkupButtonConfig) => {
    setIsProductsCompanyLoading(true)
    if (status === 'markup' && Object.keys(selectedGood).length === 0) {
      setIsProductsCompanyLoading(false)
      setErrorText(
        'Необходимо выбрать соответствующий товар среди позиций PROSEPT!'
      )
      setTimeout(() => setErrorText(''), 2000)
      return
    } else {
      return api
        .markupDealerProduct({
          company_product_id: selectedGood.productId,
          status,
          dealer_product_id,
          serial_number: selectedGood.serialNumber
        })
        .then(() => {
          setHistory([dealersProductsList[0], ...history])
          setDealersProductsList(dealersProductsList.slice(1))
        })
    }
  }

  const getAllDealersProducts = () => {
    return api.getAllDealersProducts().then(res => {
      setAllDealersProducts(res.data)
      return res
    })
  }

  const onResultClick = (type: 'result' | 'statistic') => {
    // LOADING
    getAllDealersProducts()
      .then(() => {
        type === 'result' ? setIsResultOpen(true) : setIsStatisticsOpen(true)
      })
      .catch(() => {
        setErrorText('Ошибка на сервере. Попробуйте перезагрузить страницу.')
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
            isProductCompanyLoading={isProductsCompanyLoading}
          />
          <RightWindow
            allDealers={allDealers}
            setDealersProductsList={setDealersProductsList}
            dealersProductsList={dealersProductsList}
            onClickMarkup={onClickMarkup}
            isDealersProductsLoading={isDealersProductsLoading}
            history={history}
            isDisabled={isDisabled}
            setHistory={setHistory}
          />
        </div>
        <div className={styles.buttonsResult}>
          <Button
            style="green"
            onClick={() => {
              onResultClick('result')
            }}
            text="Результаты"
            disabled={isDisabled}
          />
          <Button
            style="green"
            onClick={() => {
              onResultClick('statistic')
            }}
            text="Статистика"
            disabled={isDisabled}
          />
        </div>
        {isResultOpen && (
          <Popup setIsOpen={setIsResultOpen}>
            <Results
              allDealersProducts={allDealersProducts}
              onClickMarkup={onClickMarkup}
              allCompanyProducts={allCompanyProducts}
              onResultClick={onResultClick}
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
