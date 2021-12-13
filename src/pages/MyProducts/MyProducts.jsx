import React, { useEffect, useState } from 'react';
import './styles.scss'
import TitleHeader from "../../components/TitleHeader/TitleHeader";
import MainTable from "../../components/MainTable/MainTable";
import { getAllCategory } from "../../api/category/getAllCategory";

const MyProducts = () => {

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

  const [open, setOpen] = useState(false);
  const [trigger, setTrigger] = useState(false)
  const [items, setItems] = useState([]);
  const [isMount, setIsMount] = useState(true)

  useEffect(() => {
      getAllCategory()
        .then(res => {
          isMount && setItems(res)
        })
    }
    , [])

  useEffect(() => {
    return () => {
      setIsMount(false)
    }
  })

  return (
    <div className="container">
      <TitleHeader
        title={"My product"}
        subtitle={"Product table"}
        onClick={() => setOpen(true)}
        setTrigger={setTrigger}
      />
      <MainTable
        headTable={headTable}
        items={items}
        setItems={setItems}
      />
    </div>
  );
};

export default MyProducts;