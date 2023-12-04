import { FC, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import styles from './Statistics.module.scss'

import { StatisticConfig } from './Statistic.interface'
import { statisticAverage } from './statistic-test-data'

interface statisticDataConfig {
  markup: number
  unclaimed: number
  postponed: number
  waiting: number
}

const Statistics: FC<StatisticConfig> = ({ allDealersProducts }) => {
  const statisticData: statisticDataConfig = {
    markup: 0,
    unclaimed: 0,
    postponed: 0,
    waiting: 0
  }
  for (const product of allDealersProducts) {
    statisticData[product.status as keyof statisticDataConfig] += 1
  }

  const calculatePercentage = (value: number, total: number) =>
    (value / total) * 100

  const total =
    statisticData.unclaimed + statisticData.postponed + statisticData.markup

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
      number: statisticData.markup,
      percent: calculatePercentage(statisticData.markup, total)
    },
    {
      name: 'Нет',
      number: statisticData.unclaimed,
      percent: calculatePercentage(statisticData.unclaimed, total)
    },
    {
      name: 'Отложить',
      number: statisticData.postponed,
      percent: calculatePercentage(statisticData.postponed, total)
    },
    {
      name: 'Всего',
      number: total,
      percent: 100
    }
  ]

  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())

  return (
    <div className={styles.main}>
      <div className={styles.datePicker}>
        Выберите дату:
        <DatePicker
          selected={startDate}
          onChange={(date: Date | null) => setStartDate(date || new Date())}
          selectsStart
          startDate={startDate}
          endDate={endDate}
        />
        <DatePicker
          selected={endDate}
          onChange={(date: Date | null) => setEndDate(date || new Date())}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
        />
      </div>

      <table className={styles.statistic}>
        <thead>
          <tr>
            <th></th>
            <th>Количество</th>
            <th>Процент</th>
          </tr>
        </thead>
        <tbody>
          {statistic.map((item, index: number) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.number}</td>
              <td>{item.percent}%</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.average}>
        <p>Средний порядковый номер по ответу "Да"</p>
        <p>{calculateAverage(statisticAverage)}</p>
      </div>

      <table className={styles.statisticAverage}>
        <tbody>
          {statisticAverage.map((item, index: number) => (
            <tr key={index}>
              <td>Выбран раз товар №</td>
              <td>{item.itemNumber}</td>
              <td>{item.itemCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Statistics
