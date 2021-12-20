import * as React from 'react';
import { useEffect, useState } from "react";

import { Chart, BarSeries } from '@devexpress/dx-react-chart-material-ui';
import { ArgumentAxis, ValueAxis } from '@devexpress/dx-react-chart';
import { Animation } from '@devexpress/dx-react-chart';
import { getAllPosition1 } from "../../api/position/getAllPosition1";

import empty from "../../images/icons/empty.svg";

import './style.scss'
import { useSelector } from "react-redux";

const ChartThree = () => {

  const [data, setData] = useState([])
  const [product, setProduct] = useState([])
  const products = useSelector(state => state?.productReducer.products)

  useEffect(() => {
    // getAllPosition1()
    //   .then(res => {
    //     setProducts(res)
    //   })
    setProduct(products)
  }, [])

  useEffect(() => {
    const dataProducts = () => {
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
          day: element.salesDate, sales: totalPrice,
        }
        array.push(obj)
      })
      return array.filter((v, i, a) => a.findIndex(t => (t.sales === v.sales)) === i)
    }
    setData(dataProducts())
  }, [products])

  return (<div className='chart-three-style'>
    <div className='total-title'>
      Sales Overview
    </div>
    <div className='sub-title'>
      Graph sales for all days
    </div>
    {products.length <1 ? (
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
        height='450'
      >
        <ArgumentAxis
        />
        <ValueAxis
          max={7}
        />
        <BarSeries
          valueField="sales"
          argumentField="day"
        />
        <Animation/>
      </Chart>
    </div>)}
  </div>);

}

export default ChartThree;
