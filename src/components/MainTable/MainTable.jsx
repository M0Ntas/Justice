import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import editP from '../../images/icons/editP.svg'
import del from '../../images/icons/delete.svg';
import './style.scss'
import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import Input from "../Input/Input";
import { styled } from '@mui/material/styles';
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { removeCategory } from "../../api/category/removeCategory";
import { updateCategory } from "../../api/category/updateCategory";
import { createPosition } from "../../api/position/createPosition";
import { getUser } from "../../api/auth/getUser";

const testComp = ({onChange, handler, placeholder}) => {
  return (
    <div className='select'>
      <select
        onChange={onChange}
        handler={handler}
        placeholder={placeholder}
        defaultValue={'DEFAULT'}
      >
        <option value="DEFAULT" disabled>Select a day</option>
        <option value='Mon'>Mon</option>
        <option value='Tue'>Tue</option>
        <option value='Wed'>Wed</option>
        <option value='Thu'>Thu</option>
        <option value='Fri'>Fri</option>
        <option value='Sat'>Sat</option>
        <option value='Sun'>Sun</option>
      </select>
    </div>
  )
}

const MainTable = (
  {
    headTable,
    items,
  }) => {

  const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#2B3844",
      color: "white",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({theme}) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    [`&.${tableCellClasses.body}`]: {
      boxShadow: "none",
      borderRadius: "3",
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const [activeEl, setActiveEl] = useState({})
  const [sell, setSell] = useState(false);
  const [edit, setEdit] = useState(false);
  const history = useHistory();
  const [form, setForm] = useState({});
  const [deleted, setDeleted] = useState(false)
  const [update, setUpdate] = useState(false)
  const [address, setAddress] = useState('')
  const [isMount, setIsMount] = useState(true)

  const sellInputs = [
    {
      type: 'number',
      id: 0,
      placeholder: 'Number of products',
      handler: 'numberOfProducts',
    },
    {
      component: testComp,
      placeholder: 'Select day',
      handler: 'salesDate',
    },
  ];

  const editInputs = [
    {
      type: 'text',
      id: Date.now(),
      placeholder: 'Store',
      handler: 'store'
    },
    {
      type: 'number',
      id: Date.now(),
      placeholder: 'Price',
      handler: 'price'
    },
    {
      type: 'text',
      id: Date.now(),
      placeholder: 'Product name',
      handler: 'productName'
    },
    {
      type: 'text',
      id: Date.now(),
      placeholder: 'Product Category',
      handler: 'productCategory'
    },
    {
      type: 'number',
      id: Date.now(),
      placeholder: 'Quantity of goods',
      handler: 'quantityOfGoods'
    },
    {
      type: 'number',
      id: Date.now(),
      placeholder: 'Weight/Volume of one item',
      handler: 'weightOfItem'
    },
  ]

  const changeSaveHandler = event => {
    const key = event.target.getAttribute('handler')
    setForm((prevState) => ({
      ...prevState,
      [key]: event.target.value,
    }))
  };

  const deleteProduct = (item) => {
    items.filter(el => el._id !== item._id)
    removeCategory(item)
    setDeleted(prevState => !prevState)
  };

  const sellProduct = (item) => {
    const sellProduct = items.filter(el => el._id === item._id)
    setSell(true)
    setActiveEl(sellProduct[0])
  }
  const selectProduct = (item) => {
    const sellProduct = items.filter(el => el._id === item._id)
    setEdit(true)
    setActiveEl(sellProduct[0])
  }

  const countProduct = () => {
    const count = activeEl.quantityOfGoods - form.numberOfProducts
    if (count > 0) {
      const newCurrentProduct = {...activeEl, quantityOfGoods: count}
      updateCategory(newCurrentProduct)
    }
    if (count === 0) {
      removeCategory(activeEl)
    }
    if (count < 0) {
      alert('Fields cannot be empty')
    }
  }

  const handleEditProduct = () => {
    const obj = {
      ...activeEl,
      ...form
    }
    updateCategory(obj)
    setEdit(false)
    setUpdate(true)
    history.push('/my-products')
  }

  const handleSellProduct = () => {
    countProduct()
    const odj = {
      ...activeEl,
      ...form
    }
    createPosition(odj)
    setSell(false)
    setUpdate(true)
    history.push('/my-sales')
  }
  useEffect(() => {
      getUser().then(res => {
        isMount && setAddress(res.address)
      })
    }
    , [deleted, update,])

  useEffect(() => {
    return () => {
      setIsMount(false)
    }
  })

  return (
    <TableContainer component={Paper}>
      <Table sx={{minWidth: 700}} aria-label="customized table">
        <TableHead>
          <TableRow>
            {headTable.map((item, index) => {
              return (
                <StyledTableCell key={index + 100} className="table-header-row" align="center">{item}</StyledTableCell>
              )
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item, index) => (
            <StyledTableRow key={index + 32} id={item.id}>
              <StyledTableCell component="th" scope="row">
                {item.productName}
              </StyledTableCell>
              <StyledTableCell align="center">{item.store}</StyledTableCell>
              <StyledTableCell align="center">{address}</StyledTableCell>
              <StyledTableCell align="center">{item.productCategory}</StyledTableCell>
              <StyledTableCell align="center">{item.date}</StyledTableCell>
              <StyledTableCell align="center">{item.price}</StyledTableCell>
              <StyledTableCell
                align="center">{item.numberOfProducts ? item.numberOfProducts : item.quantityOfGoods}</StyledTableCell>
              <StyledTableCell align="center">{item.weightOfItem}</StyledTableCell>
              <StyledTableCell align="center">
                {item.salesDate
                  ? item.salesDate
                  : (
                    <div className="buttons">
                      <button className='table-button'
                              onClick={() => sellProduct(item)}
                      >Sell
                      </button>
                      <button className='table-button'
                              onClick={() => selectProduct(item)}><img src={editP} alt='edit'/></button>
                      <button className='table-button-delete' onClick={() => deleteProduct(item)}><img src={del}
                                                                                                       alt='close'/>
                      </button>
                    </div>
                  )
                }
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>

      {edit && <Modal
        onClick={setEdit}
        title="Editing a product">
        {editInputs.map((item, index) => {
          return (
            <div className="modal-input-wrap" key={index + 23}>
              <Input
                key={index + 54}
                placeholder={item.placeholder}
                type={item.type}
                handler={item.handler}
                onChange={changeSaveHandler}
              />
            </div>
          )
        })}
        <div className="modal-button">
          <Button onClick={handleEditProduct}>
            <span>Save changes</span>
          </Button>
        </div>
      </Modal>
      }

      {sell && <Modal
        onClick={setSell}
        title="Sell the product">
        {sellInputs.map((item, index) => {
          return (
            <div className="modal-input-wrap" key={index + 44}>
              {item.component
                ?
                <item.component
                  onChange={changeSaveHandler}
                  handler={item.handler}
                />
                : <Input
                  placeholder={item.placeholder}
                  type={item.type}
                  handler={item.handler}
                  onChange={changeSaveHandler}
                />
              }
            </div>
          )
        })}
        <div className="modal-button">
          <Button onClick={handleSellProduct}>
            <span>Sell product</span>
          </Button>
        </div>
      </Modal>
      }
    </TableContainer>
  );
};

export default MainTable;