import { MdDeleteOutline } from 'react-icons/md'
import * as XLSX from 'xlsx'

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

const Table: React.FC<TableProps> = ({ data, onClickMarkup }) => {
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
    XLSX.writeFile(wb, 'table.xlsx')
  }

  return (
    <>
      <table className={styles.main}>
        <thead>
          <tr>
            <th>№</th>
            <th>Товар производителя</th>
            <th>Соответствие</th>
            <th>Статус</th>
            <th>Порядковый №</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index: number) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.productMap}</td>
              <td>{item.status}</td>
              <td>{item.numberInList}</td>
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
      <button className={styles.button} onClick={exportToExcel}>
        Export to Excel
      </button>
    </>
  )
}

export default Table
