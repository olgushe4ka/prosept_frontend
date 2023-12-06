import { FC, useState } from 'react'

import styles from './Results.module.scss'

import Period from '../../ui/Period/Period'
import Table from '../../ui/Table/Table'
import {
  CompanyProductConfig,
  DealerProductConfig,
  MarkupButtonConfig
} from '../Home/Home.interface'

interface ResultsConfig {
  allDealersProducts: Array<DealerProductConfig>
  onClickMarkup: ({
    dealer_product_id,
    status
  }: MarkupButtonConfig) => Promise<void> | undefined
  allCompanyProducts: Array<CompanyProductConfig>
  onResultClick: (type: 'result' | 'statistic') => void
}

const Results: FC<ResultsConfig> = ({
  allDealersProducts,
  onClickMarkup,
  onResultClick
}) => {
  const d = new Date()
  const currentYear = d.getFullYear()
  const currentMonth = d.getMonth()
  const currentDate = d.getDate()

  const [startDate, setStartDate] = useState(
    new Date(currentYear, currentMonth, currentDate, 0, 0, 0)
  )
  const [endDate, setEndDate] = useState(
    new Date(currentYear, currentMonth, currentDate, 23, 59, 59)
  )

  const mapStatusToText = (status: string) => {
    switch (status) {
      case 'markup':
        return 'Да'
      case 'postponed':
        return 'Отложить'
      case 'unclaimed':
        return 'Нет'
      default:
        return 'Неизвестно'
    }
  }

  const itemsList = allDealersProducts.map(product => ({
    id: product.id,
    name: product.product_name,
    link: product.product_url,
    status: mapStatusToText(product.status),
    productMap: String(product.product_id),
    numberInList: Number(product.serial_number),
    date_status: new Date(product.date_status)
  }))

  return (
    <div className={styles.resultPage}>
      <h3>Результаты</h3>
      <Period
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />
      <div className={styles.datePickerContainer}></div>
      <Table
        startDate={startDate}
        endDate={endDate}
        data={itemsList}
        onClickMarkup={onClickMarkup}
        onResultClick={onResultClick}
      />
    </div>
  )
}

export default Results
