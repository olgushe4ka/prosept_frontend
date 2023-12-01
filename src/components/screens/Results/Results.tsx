import Table from '../../ui/Table/table'
import { itemsList } from '../Home/RightWindow/fakeData'

import styles from './Results.module.css'

function Results() {

// Function to format the current date as "25.12.2023"
const formatDate = () => {
  const today = new Date();
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' } as Intl.DateTimeFormatOptions;
  return new Intl.DateTimeFormat('ru-RU', options).format(today);
};

  return (
    <div className={`${styles.resultPage}`}>
      <div className={styles.datePickerContainer}>
        <p>Результаты за сегодня ({formatDate()})</p>
      </div>
      <div className={styles.datePickerContainer}></div>
      <Table data={itemsList} />
    </div>
  )
}

export default Results
