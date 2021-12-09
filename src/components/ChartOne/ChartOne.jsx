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
import { createMuiTheme, withStyles } from "@material-ui/core/styles";
import { getAllPosition1 } from "../../api/position/getAllPosition1";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { makeStyles } from "@material-ui/core";

const ChartOne = () => {

  const styles = {
    backgroundColor: "grey",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px",
    color: "black",
    height: 48,
    padding: "0 30px",
    margin: 10
  };

  const useStyles = makeStyles({
    button: {
      backgroundColor: "grey",
      border: 0,
      borderRadius: 3,
      boxShadow: "0 3px 5px 2px",
      color: "black",
      height: 48,
      padding: "0 30px",
      margin: 10
    }
  });

  const classes = useStyles();
  const LegendComp = styled(Legend)({ ...styles });

  const [data, setData] = useState([])
  const [products, setProducts] = useState([])

  const legendStyles = () => ({
    root: {
      display: 'flex',
      margin: 'auto',
      flexDirection: 'column',
      justifyContent: 'space-between',
      fontSize: '13px',
    },
  });

  const legendRootBase = ({classes, ...restProps}) => (
    <Legend.Root {...restProps} className={classes.root}/>
  );
  const Root = withStyles(legendStyles, {name: 'LegendRoot'})(legendRootBase);

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
        width="370"
      >
        <PieSeries
          valueField="area"
          argumentField="goods"
          height='200'
          width="200"
        />
        <Animation/>
        <Legend
          position="right"
          font="13"
        />
      </Chart>
    </div>

  );
}
export default ChartOne;

