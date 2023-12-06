import { FC, useState } from 'react'
import 'react-datepicker/dist/react-datepicker.css'

import styles from './Statistics.module.scss'

import Period from '../../ui/Period/Period'

import { StatisticAverageConfig, StatisticConfig } from './Statistic.interface'

interface statisticDataConfig {
  markup: number
  unclaimed: number
  postponed: number
  waiting: number
}

const Statistics: FC<StatisticConfig> = ({ allDealersProducts }) => {
  const d = new Date()
  const currentYear = d.getFullYear()
  const currentMonth = d.getMonth()
  const currentDate = d.getDate()

  const [startDate, setStartDate] = useState(
    new Date(currentYear, currentMonth, currentDate, 0, 0, 0)
  )
  const [endDate, setEndDate] = useState(
    new Date(currentYear, currentMonth, currentDate, 23, 59, 59)
  )

  const statisticData: statisticDataConfig = {
    markup: 0,
    unclaimed: 0,
    postponed: 0,
    waiting: 0
  }

  const searchRange = allDealersProducts.filter(item => {
    return (
      new Date(item.date_status).getTime() > startDate.getTime() &&
      new Date(item.date_status).getTime() < endDate.getTime()
    )
  })

  const statisticAverage: StatisticAverageConfig | Record<string, number> = {}

  for (const product of searchRange) {
    statisticData[product.status as keyof statisticDataConfig] += 1
    if (product.serial_number) {
      if (!statisticAverage[product.serial_number]) {
        statisticAverage[product.serial_number] = 0
      }
      statisticAverage[product.serial_number]++
    }
  }
  const statisticAverageForHTML = []
  for (const [itemNumber, itemCount] of Object.entries(statisticAverage)) {
    statisticAverageForHTML.push({
      itemNumber,
      itemCount
    })
  }

  const calculatePercentage = (value: number, total: number) =>
    (value / total) * 100

  const total =
    statisticData.unclaimed + statisticData.postponed + statisticData.markup

  const calculateAverage = (data: Record<string, number>): number => {
    let countNumber: number = 0
    let sumMarkups: number = 0
    for (const count of Object.keys(data)) {
      countNumber += Number(data[count]) * Number(count)
      sumMarkups += Number(data[count])
    }
    const average = countNumber / sumMarkups
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

  return (
    <div className={styles.main}>
      <h3>Статистика</h3>
      <Period
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />
      <table className={styles.table}>
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
              <td>
                {item.percent % 1 === 0
                  ? item.percent.toFixed(0)
                  : item.percent.toFixed(2)}
                %
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.average}>
        <p>Средний порядковый номер по ответу "Да":</p>
        <p>{calculateAverage(statisticAverage)}</p>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Порядковый №</th>
            <th>Количество выбранных раз</th>
          </tr>
        </thead>
        <tbody>
          {statisticAverageForHTML.map((item, index: number) => (
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
