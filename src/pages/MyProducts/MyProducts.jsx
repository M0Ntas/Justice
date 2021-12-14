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
  const [deleted, setDeleted] = useState(false)
  const [update, setUpdate] = useState(false)

 console.log('====>items44444444444<====', items)
  useEffect(() => {
      getAllCategory()
        .then(res => {
          setItems(res)
          console.log('====>resPRODUCTS<====', res)
        })
    }
    , [trigger, deleted, update])

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
        items={items}
        setItems={setItems}
        deleted={deleted}
        setDeleted={setDeleted}
      />
    </div>
  );
};

export default MyProducts;