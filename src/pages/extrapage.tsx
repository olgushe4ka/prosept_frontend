import Table from '../components/table/table'
import { itemsList } from '../utils/fakeData'
import styles from './pages-styles.module.css'
import {} from 'react-icons/fa'

function Extrapage() {
  return (
    <>
      <div className={`${styles.resultPage} `}>
        <Table data={itemsList} />
      </div>
    </>
  )
}

export default Extrapage
