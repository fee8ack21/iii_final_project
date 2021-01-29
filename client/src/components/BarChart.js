import React from 'react'
import { Bar } from 'react-chartjs-2'

const BarChart = (props) => {
  // console.log(props)
  const year = props.year
  const lastyear = props.year - 1
  const time = props.time
  const type = props.type
  const typeName =
    type === 'REVENUE' ? '銷售金額' : type === 'ORDERCOUNT' ? '訂單數量' : ''
  const titleText = time === 'MONTH' ? '(月)' : time === 'QUARTER' ? '(季)' : ''
  const count = time === 'MONTH' ? 12 : time === 'QUARTER' ? 4 : 0
  const orderData = props.orderData

  // 今年月報表
  let sumAll =
    orderData.length > 0
      ? orderData
          .filter((item) => item.year === Number(year))
          .map((v) =>
            type === 'REVENUE' ? v.price : type === 'ORDERCOUNT' ? v.sum : ''
          )
      : ''
  // 季報表
  if (time === 'QUARTER') {
    sumAll = QUARTER(sumAll)
  }

  // 去年月報表
  let lastsumAll =
    orderData.length > 0
      ? orderData
          .filter((item) => item.year === Number(lastyear))
          .map((v) =>
            type === 'REVENUE' ? v.price : type === 'ORDERCOUNT' ? v.sum : ''
          )
      : 0
  // 去年季報表
  if (time === 'QUARTER') {
    let arr = []
    let s = 0
    lastsumAll.forEach((el, i) => {
      if (i % 3 === 2) {
        s += Number(el)
        arr.push(s)
        s = 0
      } else {
        s += Number(el)
      }
    })
    lastsumAll = QUARTER(lastsumAll)
  }

  const labels =
    time === 'MONTH'
      ? [
          'JAN',
          'FEB',
          'MAR',
          'APR',
          'MAY',
          'JUN',
          'JUL',
          'AUG',
          'SEP',
          'OCT',
          'NOV',
          'DEC',
        ]
      : time === 'QUARTER'
      ? ['Q1', 'Q2', 'Q3', 'Q4']
      : []
  const data = {
    labels: labels,
    datasets: [
      {
        label: `${typeName} ${year}`,
        data: sumAll,
        borderColor: countColor('rgba(255, 99, 132, 0.8)', count),
        backgroundColor: countColor('rgba(255, 99, 132, 0.2)', count),
        borderWidth: 1,
      },
      {
        label: `${typeName} ${lastyear}`,
        data: lastsumAll,
        borderColor: countColor('rgba(54, 162, 235, 0.8)', count),
        backgroundColor: countColor('rgba(54, 162, 235, 0.2)', count),
        borderWidth: 1,
      },
    ],
  }

  const options = {
    maintainAspectRatio: false,
    title: {
      display: true,
      text: titleText,
    },
    scales: {
      yAxes: [
        {
          ticks: {
            // min: 0,
            // max: time === 'MONTH' ? 100000 : time === 'QUARTER' ? 300000 : '',
            beginAtZero: true,
          },
        },
      ],
    },
  }

  return (
    <div className="col-6">
      <Bar data={data} options={options}></Bar>
    </div>
  )
}

function QUARTER(sum) {
  let arr = []
  let s = 0
  sum.forEach((el, i) => {
    if (i % 3 === 2) {
      s += Number(el)
      arr.push(s)
      s = 0
    } else {
      s += Number(el)
    }
  })
  return arr
}

function countColor(color, count) {
  let arr = []
  for (let i = 0; i < count; i++) {
    arr.push(color)
  }
  return arr
}

export default BarChart
