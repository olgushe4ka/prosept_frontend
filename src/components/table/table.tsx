import styles from './table.module.css'

import * as XLSX from 'xlsx'

const Table = ({ data }: any) => {
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
            <th>Товар</th>
            <th>Ссылка</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item: any, index: number) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.link}</td>
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
