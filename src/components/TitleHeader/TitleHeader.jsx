import Title from "../Title/Title";
import Button from "../Button/Button";
import React, { useEffect, useState } from "react";
import './style.scss'
import button from "../../images/icons/button.svg";
import Modal from "../Modal/Modal";
import { inputsRender } from "../../utils/inputsRender";
import Input from "../Input/Input";
import plus from "../../images/icons/plus.svg";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import moment from "moment";
import { createCategory } from "../../api/category/createCategory";

const TitleHeader = ({title, subtitle, setTrigger}) => {

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({});
  const [create, setCreate] = useState('')
  const [validForm, setValidForm] = useState(false);
  const [formError, setFormError] = useState('Form cannot be empty')

  const history = useHistory();

  const changeHandler = event => {
    const key = event.target.getAttribute('handler')
    setForm({
      ...form,
      date: moment().format("DD-MM-YYYY"),
      [key]: event.target.value
    })
  };

  useEffect(() => {
    if (formError) {
      setValidForm(false)
    } else {
      setValidForm(true)
    }
  }, [formError])

  const handleAddProduct = (e) => {
    createCategory(form)
      .then(res => {
        if (res.status) {
          history.push('/sign-in')
        }
        setTrigger(prev => !prev)
        setOpen(false)
        history.push('/my-products')
      })
  };

  const changeHandlerEdit = (e) => {
    setCreate(e.target.value)
    if (e.target.value.length > 14) {
      setFormError('Many letters')
      if (!e.target.value) {
        setFormError('Form cannot be empty')
      }
    } else {
      setFormError('')
      changeHandler(e)
    }
  };

  return (
    <div className="header-title">
      <Title
        title={title}
        subtitle={subtitle}
      />
      <div className="title-btn">
        <Button onClick={() => setOpen(true)}>
          <img src={button} alt="button"/>
          <span>Create a product</span>
        </Button>
      </div>
      {open && <Modal
        onClick={setOpen}
        title="Creating a product">
        {inputsRender.map((item, index) => {
          return (
            <div className="modal-input-wrap" key={index + 56}>
              <Input
                placeholder={item.placeholder}
                type={item.type}
                handler={item.handler}
                onChange={changeHandlerEdit}
              />
            </div>
          )
        })}
        {validForm ? (
          <div className="modal-button">
            <Button onClick={handleAddProduct}>
              <span>Add products <img src={plus} alt='add'/></span>
            </Button>
          </div>
        ) : (
          <div className='error'>
            {formError}
          </div>
        )}

      </Modal>
      }
    </div>
  )
}

export default TitleHeader;