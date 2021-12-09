import * as React from 'react';
import Paper from '@mui/material/Paper';
import {
  Chart,
  Legend,
  PieSeries,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';
import { useEffect, useState } from "react";
import './style.scss'
import { withStyles } from "@material-ui/core/styles";
import { getAllPosition1 } from "../../api/position/getAllPosition1";

const ChartOne = () => {

  const [data, setData] = useState([])
  const [products, setProducts] = useState([])

  const legendStyles = () => ({
    root: {
      display: 'flex',
      margin: 'auto',
      flexDirection: 'column',
    },
  });

  const legendStyles1 = () => ({
    root: {
      height: "197px",
    },
  });

  const legendLabelStyles = theme => ({
    label: {
      paddingTop: theme.spacing(1),
      whiteSpace: 'nowrap',
      fontSize: '13px'
    },
  });

  const legendItemStyles = () => ({
    item: {
      flexDirection: 'column',
      fontSize: '13px'
    },
  });

  const legendRootBase = ({classes, ...restProps}) => (
    <Legend.Root {...restProps} className={classes.root}/>
  );

  const legendLabelBase = ({classes, ...restProps}) => (
    <Legend.Label className={classes.label} {...restProps} />
  );
  const legendItemBase = ({classes, ...restProps}) => (
    <Legend.Item className={classes.item} {...restProps}  />
  );
  const Root = withStyles(legendStyles, {name: 'LegendRoot'})(legendRootBase);
  const Root1 = withStyles(legendStyles1, {name: 'LegendRoot'})(legendRootBase);
  const Label = withStyles(legendLabelStyles, {name: 'LegendLabel'})(legendLabelBase);
  const Item = withStyles(legendItemStyles, {name: 'LegendItem'})(legendItemBase);

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
        <Chart
          data={data}
          height='200'
          width="320"

        >
          <PieSeries
            valueField="area"
            argumentField="goods"
            height='197'
            width="197"
          />
          <Legend
            marginLeft='20'
            position="right"
            fontSize="13"
          />
          <Animation/>
        </Chart>
    </div>

  );
}
export default ChartOne;

