import * as React from 'react';
import { Chart, LineSeries } from '@devexpress/dx-react-chart-material-ui';
import { useEffect, useState } from "react";
import './style.scss'
import { getAllPosition1 } from "../../api/position/getAllPosition1";
import empty from "../../images/icons/empty.svg";

const ChartTwo = () => {


  const [data, setData] = useState([])
  const [products, setProducts] = useState([])
  const [totalSales, setTotalSales] = useState('')


  useEffect(() => {
      getAllPosition1()
        .then(res => {
          setProducts(res)
        })
    }
    , [])

  useEffect(() => {
    const productData = () => {
      const array = []
      let totalPrice = 0
      products.forEach((element) => {
        const weekDay = products.filter(item => item.salesDate === element.salesDate)
        if (weekDay.length > 1) {
          const arrayWeek = []
          weekDay.forEach(week => {
            const test = week.numberOfProducts * week.price
            arrayWeek.push(test)
          })
          totalPrice = arrayWeek.reduce((totalPrice, amount) => totalPrice + amount)
        } else {
          totalPrice = element.price * element.numberOfProducts
        }
        const obj = {
          day: element.salesDate,
          sales: totalPrice,
        }
        array.push(obj)
      })
      return array.filter((v, i, a) => a.findIndex(t => (t.sales === v.sales)) === i)
    }
    setData(productData())

  }, [products])

  useEffect(() => {
    let total = 0
    data.forEach(i => total += i.sales)
    setTotalSales(total)
  }, [data])

  return (
    <div className="chart-two">
      <div className='total-title'>
        Total earned
      </div>
      {data.length <1 ? (
        <div className='empty'>
          <div>
            <img src={empty} alt='empty'/>
          </div>
          <div>
            <span>Go to "my products" and sell them</span>
          </div>
        </div>) : (
        <div>
          <Chart
            data={data}
            height={105}
          >
            <LineSeries
              valueField="sales"
              argumentField="day"
              color='#1CAF7F'
            />
          </Chart>
          <div className='total-sales'>
            $ {totalSales}
          </div>
        </div>
      )}

    </div>
  )
}

export default ChartTwo;