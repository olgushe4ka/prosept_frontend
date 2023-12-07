import { MdDeleteOutline } from 'react-icons/md'

import styles from './Table.module.scss'

import { MarkupButtonConfig } from '../../screens/Home/Home.interface'

import { TableConfig } from './Table.interface'

interface TableProps {
  data: Array<TableConfig>
  onClickMarkup: ({
    dealer_product_id,
    status
  }: MarkupButtonConfig) => Promise<void> | undefined
  startDate: Date
  endDate: Date
  onResultClick: (type: 'result' | 'statistic') => void
}

const Table: React.FC<TableProps> = ({
  data,
  onClickMarkup,
  startDate,
  endDate,
  onResultClick
}) => {
  return (
    <>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.tableNumber}>№</th>
            <th>Товар дилера</th>
            <th>Соответствие</th>
            <th className={styles.tableStatus}>Статус</th>
            <th className={styles.tableNumberInList}>Порядковый номер</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data
            .filter(item => {
              return (
                item.date_status.getTime() > startDate.getTime() &&
                item.date_status.getTime() < endDate.getTime()
              )
            })
            .map((item, index: number) => {
              return (
                <tr key={index}>
                  <td className={styles.tableNumber}>{index + 1}</td>
                  <td className={styles.tableGood}>{item.name}</td>
                  <td className={styles.tableGood}>
                    {item.productMap === 'undefined'
                      ? 'не установлено'
                      : item.productMap}
                  </td>
                  <td className={styles.tableStatus}>{item.status}</td>
                  <td className={styles.tableNumberInList}>
                    {item.numberInList === 0 ? '—' : item.numberInList}
                  </td>
                  <td className={styles.deleteIcon}>
                    <button
                      title='Изменить статус товара на "Отложить"'
                      onClick={() => {
                        onClickMarkup({
                          dealer_product_id: item.id,
                          status: 'postponed'
                        })?.then(() => {
                          onResultClick('result')
                        })
                      }}
                    >
                      <MdDeleteOutline />
                    </button>
                  </td>
                </tr>
              )
            })}
        </tbody>
      </table>
    </>
  )
}

export default Table
