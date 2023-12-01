import * as XLSX from 'xlsx'

import { Item } from '../../screens/Home/RightWindow/fakeData'
import { MdDeleteOutline } from "react-icons/md";
import styles from './Table.module.css'

interface TableProps {
  data: Item[]
}

const Table: React.FC<TableProps> = ({ data }) => {
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
            <th>Номер</th>
            <th>Товар производителя</th>
            <th>Соответствие</th>
            <th>Статус</th>
            <th>Порядковый номер</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index: number) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.produtMap}</td>
              <td>{item.status}</td>
              <td>{item.numberInList}</td>
              <td className={styles.deleteIcon}>
                <MdDeleteOutline />
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
