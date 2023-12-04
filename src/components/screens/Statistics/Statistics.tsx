import ru from 'date-fns/locale/ru'
import { useState } from 'react'
import DatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import styles from './Statistics.module.scss'

import { statisticAverage, statisticData } from './statistic-test-data'

registerLocale('ru', ru)

const Statistics = () => {
  const calculatePercentage = (value: number, total: number) =>
    (value / total) * 100

  const total = statisticData.no + statisticData.later + statisticData.yes

  const calculateAverage = (
    data: { itemNumber: number; itemCount: number }[]
  ): number => {
    const sumProducts = data.reduce(
      (acc, { itemNumber, itemCount }) => acc + itemNumber * itemCount,
      0
    )
    const sumCount = data.reduce((acc, { itemCount }) => acc + itemCount, 0)
    const average = sumProducts / sumCount
    return Number(average.toFixed(2))
  }

  const statistic = [
    {
      name: 'Да',
      number: statisticData.yes,
      percent: calculatePercentage(statisticData.yes, total),
      confidenceLevel: 'Bысокий',
      weight: 1.5
    },
    {
      name: 'Нет',
      number: statisticData.no,
      percent: calculatePercentage(statisticData.no, total),
      confidenceLevel: 'Средний',
      weight: 1
    },
    {
      name: 'Отложить',
      number: statisticData.later,
      percent: calculatePercentage(statisticData.later, total),
      confidenceLevel: 'Низкий',
      weight: 0.5
    },
    {
      name: 'Всего',
      number: total,
      percent: 100,
      confidenceLevel: '',
      weight: 4
    }
  ]

  // const weightedTotal = statistic.reduce((acc, item) => acc + item.weight, 0)

  const percentageData = statistic.map(item => item.percent)

  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())

  return (
    <div className={styles.main}>
      <h3>Статистика</h3>
      <div className={styles.datePickers}>
        <p>Выберите дату "от" и "до"</p>
        <div className={styles.datePickerDateBox}>
          <DatePicker
            selected={startDate}
            onChange={(date: Date | null) => setStartDate(date || new Date())}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            locale="ru"
            dateFormat="d MMMM, yyyy"
            wrapperClassName={styles.datePicker}
            placeholderText="от"
            maxDate={new Date()}
          />

          <DatePicker
            selected={endDate}
            onChange={(date: Date | null) => setEndDate(date || new Date())}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            locale="ru"
            dateFormat="d MMMM, yyyy"
            wrapperClassName={styles.datePicker}
            placeholderText="до"
            maxDate={new Date()}
          />
        </div>
      </div>

      <table className={styles.statistic}>
        <thead>
          <tr>
            <th></th>
            <th>Количество</th>
            <th>Процент</th>
            {/* <th>Уровень достоверности</th>
            <th>Вес</th>
            <th>Взвешенное количество</th>
            <th>Взвешенный процент</th> */}
          </tr>
        </thead>
        <tbody>
          {statistic.map((item, index: number) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.number}</td>
              <td>{item.percent}%</td>
              {/* <td>{item.confidenceLevel}</td>
              <td>{item.weight}</td>
              <td>{item.weight * item.number}</td>
              <td>
                {calculatePercentage(
                  item.weight * item.number,
                  weightedTotal
                ).toFixed(2)}
                %
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.chartContainer}>
        <div className={styles.chart}>
          <div className={styles.text}>{percentageData[0]}%</div>
        </div>
      </div>

      <div className={styles.average}>
        <p>Средний порядковый номер по ответу "Да"</p>
        <p>{calculateAverage(statisticAverage)}</p>
      </div>

      <table className={styles.statisticAverage}>
        <thead>
          <tr>
            <th>Порядковый № </th>
            <th>Кол-во выбранных раз</th>
          </tr>
        </thead>
        <tbody>
          {statisticAverage.map((item, index: number) => (
            <tr key={index}>
              <td>{item.itemNumber} </td>
              <td>{item.itemCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Statistics
