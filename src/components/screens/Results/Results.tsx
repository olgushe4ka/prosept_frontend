import { FC } from 'react'

import styles from './Results.module.scss'

import Table from '../../ui/Table/Table'
import { DealerProductConfig, MarkupButtonConfig } from '../Home/Home.interface'

interface ResultsConfig {
  allDealersProducts: Array<DealerProductConfig>
  onClickMarkup: ({
    dealer_product_id,
    dealer_id,
    status
  }: MarkupButtonConfig) => void
}

const Results: FC<ResultsConfig> = ({ allDealersProducts, onClickMarkup }) => {
  // Function to format the current date as "25.12.2023"
  const formatDate = () => {
    const today = new Date()
    const options = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    } as Intl.DateTimeFormatOptions
    return new Intl.DateTimeFormat('ru-RU', options).format(today)
  }

  const itemsList = allDealersProducts.map(product => ({
    id: product.id,
    name: product.product_name,
    link: product.product_url,
    status: product.status,
    productMap: '—',
    numberInList: '—'
  }))

  return (
    <div className={`${styles.resultPage}`}>
      <div className={styles.datePickerContainer}>
        <h3>Результаты за сегодня ({formatDate()})</h3>
      </div>
      <div className={styles.datePickerContainer}></div>
      <Table data={itemsList} onClickMarkup={onClickMarkup} />
    </div>
  )
}

export default Results
