import React from 'react'
import { Line } from 'react-chartjs-2'

const LineChart = (props) => {
  // console.log(props)
  const year = props.year
  const lastyear = props.year - 1
  const time = props.time
  const type = props.type
  const typeName =
    type === 'REVENUE' ? '銷售金額' : type === 'ORDERCOUNT' ? '訂單數量' : ''
  const titleText = time === 'MONTH' ? '(月)' : time === 'QUARTER' ? '(季)' : ''

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
        fill: true,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
      },
      {
        label: `${typeName} ${lastyear}`,
        data: lastsumAll,
        fill: false,
        backgroundColor: 'rgba(45,15,45,0.2)',
        borderColor: 'rgba(45,15,45,1)',
      },
    ],
  }

  const options = {
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
            // stepSize: 1,
          },
        },
      ],
    },
  }

  return (
    <div className="col-6">
      <Line data={data} options={options}></Line>
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

export default LineChart
