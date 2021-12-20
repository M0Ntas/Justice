import React, { useEffect, useState } from 'react';

import TitleHeader from "../../components/TitleHeader/TitleHeader";
import MainTable from "../../components/MainTable/MainTable";
import { getAllCategory } from "../../api/category/getAllCategory";

import './styles.scss'
import { asyncGetAllCategory } from "../../redux/store/categoryReducer";
import { useDispatch, useSelector } from "react-redux";

const MyProducts = () => {
  const dispatch = useDispatch()
  // const category = useSelector(state => state?.categoryReducer.category)
  const [, setOpen] = useState(false);
  const [trigger, setTrigger] = useState(false)
  // const [items, setItems] = useState([]);
  const [deleted, setDeleted] = useState(false)
  const [update, setUpdate] = useState(false)
  const headTable = [
    'Product name',
    'Store',
    'Address',
    'Category',
    'Creation date',
    'Price',
    'Remains',
    'Weight/Volume',
    'Action'
  ]
  //
  // useEffect(() => {
  //     // getAllCategory()
  //     //   .then(res => {
  //     //     setItems(res)
  //     //   })
  //     setItems(category)
  //   }
  //   , [trigger, deleted, update])

  useEffect(() => {
    dispatch(asyncGetAllCategory())
  }, [deleted])

  return (
    <div className="container">
      <TitleHeader
        title={"My product"}
        subtitle={"Product table"}
        onClick={() => setOpen(true)}
        setTrigger={setTrigger}
      />
      <MainTable
        update={update}
        setUpdate={setUpdate}
        trigger={trigger}
        headTable={headTable}
        deleted={deleted}
        setDeleted={setDeleted}
      />
    </div>
  );
};

export default MyProducts;