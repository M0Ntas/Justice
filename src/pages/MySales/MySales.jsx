import React, { useEffect, useState } from 'react';
import './styles.scss'
import TitleHeader from "../../components/TitleHeader/TitleHeader";
import MainTable from "../../components/MainTable/MainTable";
import { getAllPosition1 } from "../../api/position/getAllPosition1";

const MySales = () => {

  const [items, setItems] = useState([])
  const [open, setOpen] = useState(false)
  const [trigger, setTrigger] = useState(false)
  const [isMount, setIsMount] = useState(true)


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
      getAllPosition1()
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
        title={"Editing a product"}
        subtitle={"Sales table"}
        onClick={() => setOpen(true)}
        button="Save changes"
        setTrigger={setTrigger}
      />
      <MainTable headTable={headTable} items={items} setItems={setItems}/>
    </div>
  );
};

export default MySales;