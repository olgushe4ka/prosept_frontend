import { endOfDay, startOfDay } from 'date-fns'
import { utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz'
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

  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

  return (
    <div className={styles.datePickers}>
      <p>Период с</p>
      <DatePicker
        selected={zonedTimeToUtc(startDate, userTimeZone)}
        onChange={(newDate: Date) => {
          const zonedStartDate = utcToZonedTime(newDate, userTimeZone);
          setStartDate(startOfDay(zonedStartDate));
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
        selected={zonedTimeToUtc(endDate, userTimeZone)}
        onChange={(newDate: Date) => {
          const zonedEndDate = utcToZonedTime(newDate,  userTimeZone)
          setEndDate(endOfDay(zonedEndDate))
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
