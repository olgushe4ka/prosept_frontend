import { MdDeleteOutline } from 'react-icons/md'

import styles from './Table.module.scss'

import { MarkupButtonConfig } from '../../screens/Home/Home.interface'

import { TableConfig } from './Table.interface'

interface TableProps {
  data: Array<TableConfig>
  onClickMarkup: ({
    dealer_product_id,
    dealer_id,
    status
  }: MarkupButtonConfig) => void
}

const Table: React.FC<TableProps> = ({
  data
  // onClickMarkup
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
            <th className={styles.tableNumberInList}>Порядковый №</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index: number) => (
            <tr key={index}>
              <td className={styles.tableNumber}>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.productMap}</td>
              <td className={styles.tableStatus}>{item.status}</td>
              <td className={styles.tableNumberInList}>{item.numberInList}</td>
              <td className={styles.deleteIcon}>
                <button
                  onClick={() => {
                    // onClickMarkup()
                  }}
                >
                  <MdDeleteOutline />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Table
