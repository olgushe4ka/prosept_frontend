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
    productMap: '—',
    numberInList: '—'
  }))

  return (
    <div className={styles.resultPage}>
      <h3 className={styles.title}>Результаты за сегодня ({formatDate()})</h3>
      <div className={styles.datePickerContainer}></div>
      <Table data={itemsList} onClickMarkup={onClickMarkup} />
    </div>
  )
}

export default Results
