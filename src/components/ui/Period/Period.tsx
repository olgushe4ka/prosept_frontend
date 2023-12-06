import ru from 'date-fns/locale/ru'
import { FC } from 'react'
import DatePicker, { registerLocale } from 'react-datepicker'

import styles from './Period.module.scss'

interface PeriodConfig {
  setStartDate: (date: Date) => void
  setEndDate: (date: Date) => void
  startDate: Date
  endDate: Date
}

const Period: FC<PeriodConfig> = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate
}) => {
  registerLocale('ru', ru)
  return (
    <div className={styles.datePickers}>
      <p>Период с</p>
      <DatePicker
        selected={startDate}
        onChange={(newDate: Date) => {
          const d = new Date(newDate)
          const year = d.getFullYear()
          const month = d.getMonth()
          const date = d.getDate()
          setStartDate(new Date(year, month, date, 0, 0, 0))
        }}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        locale="ru"
        dateFormat="d MMMM, yyyy"
        wrapperClassName={styles.datePicker}
        maxDate={new Date()}
      />
      <p>по</p>
      <DatePicker
        selected={endDate}
        onChange={(newDate: Date) => {
          const d = new Date(newDate)
          const year = d.getFullYear()
          const month = d.getMonth()
          const date = d.getDate()
          setEndDate(new Date(year, month, date, 23, 59, 59))
        }}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        locale="ru"
        dateFormat="d MMMM, yyyy"
        wrapperClassName={styles.datePicker}
        maxDate={new Date()}
      />
    </div>
  )
}

export default Period
