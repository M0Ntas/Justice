import * as React from 'react';
import { useEffect, useState } from "react";

import {
  Chart,
  Legend,
  PieSeries,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';
import { getAllPosition1 } from "../../api/position/getAllPosition1";

import empty from '../../images/icons/empty.svg'

import './style.scss'



const ChartOne = () => {

  const [data, setData] = useState([])
  const [products, setProducts] = useState([])

  useEffect(() => {
      getAllPosition1()
        .then(res => {
          setProducts(res)
        })
    }
    , [])

  useEffect(() => {
    const dataProduct = () => {
      const array = []
      products.reverse().forEach((element, index) => {
        if (index >= 4) return
        const obj = {
          goods: element.productName,
          area: element.price
        }
        array.push(obj)
      })
      return array
    }
    setData(dataProduct())
  }, [products])

  return (
    <div className='chart-one'>
      <div className='total-title'>
        Sales schedule by day
      </div>

      {data.length < 1 ? (
        <div className='empty'>
          <div>
            <img src={empty} alt='empty'/>
          </div>
          <div>
            <span>Go to "my products" and sell them</span>
          </div>
        </div>) : (
        <Chart
          key={Date.now()}
          data={data}
          height='200'
          width="370"
        >
          <PieSeries
            key={Date.now()}
            valueField="area"
            argumentField="goods"
            height='200'
            width="200"
          />
          <Animation/>
          <Legend
            key={Date.now()}
            position="right"
            font="13"
          />
        </Chart>
      )
      }
    </div>

  );
}
export default ChartOne;

