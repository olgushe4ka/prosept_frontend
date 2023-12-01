import styles from './Statistics.module.scss'

import { statisticAverage, statisticData } from './statistic-test-data'

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
      percent: calculatePercentage(statisticData.yes, total)
    },
    {
      name: 'Нет',
      number: statisticData.no,
      percent: calculatePercentage(statisticData.no, total)
    },
    {
      name: 'Отложить',
      number: statisticData.later,
      percent: calculatePercentage(statisticData.later, total)
    },
    {
      name: 'Всего',
      number: total,
      percent: 100
    }
  ]

  return (
    <div className={styles.main}>
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
