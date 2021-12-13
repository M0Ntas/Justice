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
  const [isMount, setIsMount] = useState(true)

  const history = useHistory();

  const changeHandler = event => {
    const key = event.target.getAttribute('handler')
    setForm({
      ...form,
      date: moment().format("DD-MM-YYYY"),
      [key]: event.target.value
    })
  };

  const handleAddProduct = () => {
    createCategory(form)
      .then(res => {
        if (res.status) {
          isMount && history.push('/sign-in')
        }
        history.push('/my-products')
      })
  };

  useEffect(() => {
    return () => {
      setIsMount(false)
    }
  })

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
                onChange={changeHandler}
              />
            </div>
          )
        })}
        <div className="modal-button">
          <Button onClick={handleAddProduct}>
            <span>Add products <img src={plus} alt='add'/></span>
          </Button>
        </div>
      </Modal>
      }
    </div>
  )
}

export default TitleHeader;