import React, { useEffect, useState } from 'react';

import TitleHeader from "../../components/TitleHeader/TitleHeader";
import MainTable from "../../components/MainTable/MainTable";

import './styles.scss';
import { useDispatch, useSelector } from "react-redux";
import { asyncGetAllProducts } from "../../redux/store/productsReducer";

const MySales = () => {

  const dispatch = useDispatch()
  const products = useSelector(state => state?.productReducer.products)
  const [items, setItems] = useState([])
  const [, setOpen] = useState(false)
  const [trigger, setTrigger] = useState(false)
  const headTable = [
    'Product name',
    'Store',
    'Address',
    'Category',
    'Creation date',
    'Price',
    'Sold items',
    'Weight/Volume',
    'Last sale'
  ]

  useEffect(() => {
      // getAllPosition1()
      //   .then(res => {
      //     setItems(res)
      //   })
      setItems(products)
    }
    , [trigger])

  useEffect(() => {
    dispatch(asyncGetAllProducts())
  }, [])


  return (
    <div className="container">
      <TitleHeader
        title={"Editing a product"}
        subtitle={"Sales table"}
        onClick={() => setOpen(true)}
        button="Save changes"
        setTrigger={setTrigger}
      />
      <MainTable
        trigger={trigger}
        headTable={headTable}
        items={items}
        setItems={setItems}
      />
    </div>
  );
};

export default MySales;