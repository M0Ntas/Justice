import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom/cjs/react-router-dom";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import Input from "../Input/Input";

import { removeCategory } from "../../api/category/removeCategory";
import { updateCategory } from "../../api/category/updateCategory";
import { createPosition } from "../../api/position/createPosition";
import { getUser } from "../../api/auth/getUser";


import editP from '../../images/icons/editP.svg'
import del from '../../images/icons/delete.svg';

import './style.scss'
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategoryRedux } from "../../redux/store/categoryReducer";

const testComp = ({onChange, handler, placeholder}) => {
  return (
    <div className='select'>
      <select className='test-select'
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
    deleted,
    setDeleted,
    update,
    setUpdate
  }
  ) => {
  

  const [activeEl, setActiveEl] = useState({})
  const dispatch = useDispatch()
  const [sell, setSell] = useState(false);
  const [edit, setEdit] = useState(false);
  const history = useHistory();
  const location = useLocation()
  const [form, setForm] = useState({});
  const [address, setAddress] = useState('')
  const [formError, setFormError] = useState('Form cannot be empty')
  const [changeEdit, setChangeEdit] = useState('')
  const [validForm, setValidForm] = useState(false);
  const [editValid, setEditValid] = useState(false)
  const [, setEdits] = useState('')
  const store = useSelector(state => state)
  const items = location.pathname === '/my-products' ? store.categoryReducer.category : store.productReducer.products
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

  useEffect(() => {
    if (formError) {
      setValidForm(false)
    } else {
      setValidForm(true)
    }
  }, [formError])

  useEffect(() => {
    if (changeEdit) {
      setEditValid(false)
    } else {
      setEditValid(true)
    }
  }, [changeEdit])

  useEffect(() => {
      getUser().then(res => {
        setAddress(res.address)
      })
    }
    , [store, update,])

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

  const changeSaveHandler = event => {
    const key = event.target.getAttribute('handler')
    setForm((prevState) => ({
      ...prevState,
      [key]: event.target.value,
    }))
  };

  const changeHandler = (e) => {
    if (e.target.value > activeEl.quantityOfGoods) {
      setFormError('You cannot sell more than you have')
      if (!e.target.value) {
        setFormError('Form cannot be empty')
      }
    } else {
      setFormError('')
      changeSaveHandler(e)
    }
  };

  const changeHandlerEdit = (e) => {
    setEdits(e.target.value)
    if (e.target.value.length > 14) {
      setChangeEdit('Many letters')
      if (!e.target.value) {
        setChangeEdit('Form cannot be empty')
      }
    } else {
      setChangeEdit('')
      changeHandler(e)
    }
  };

  const deleteProduct = (item) => {
    const removeItem = items.filter(el => el._id !== item._id)
    dispatch(deleteCategoryRedux(removeItem))
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
  }

  const handleEditProduct = () => {
    const obj = {
      ...activeEl,
      ...form
    }
    updateCategory(obj)
    setEdit(false)
    setUpdate(prev => !prev)
    history.push('/my-products')
  }

  const handleSellProduct = async () => {
    await countProduct()
    if (validForm === true) {
      const odj = {
        ...activeEl,
        ...form
      }
      createPosition(odj)
      setSell(false)
      setUpdate(prev => !prev)
      history.push('/my-sales')
    } else {
      setFormError('Error')
    }
  }

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
                onChange={changeHandlerEdit}
              />
            </div>
          )
        })}
        {editValid ? (
          <div className="modal-button">
            <Button onClick={handleEditProduct}>
              <span>Save changes</span>
            </Button>
          </div>
        ) : (
          <div className='error'>
            {changeEdit}
          </div>
        )}
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
                  onChange={changeHandler}
                  handler={item.handler}
                />
                : <Input
                  placeholder={item.placeholder}
                  type={item.type}
                  handler={item.handler}
                  onChange={changeHandler}
                />
              }
            </div>
          )
        })}
        {validForm ? (
          <div className="modal-button">
            <Button onClick={handleSellProduct} disabled={!validForm}>
              <span>Sell product</span>
            </Button>
          </div>
        ) : (
          <div className='error'>
            {formError}
          </div>
        )}
      </Modal>
      }
    </TableContainer>
  );
};

export default MainTable;