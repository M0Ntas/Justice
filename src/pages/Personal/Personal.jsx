import React, { useEffect, useState } from 'react';
import './styles.scss'
import TitleHeader from "../../components/TitleHeader/TitleHeader";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { getUser } from "../../api/auth/getUser";
import { updateUser } from "../../api/auth/updateUser";

const Personal = () => {

  const [open, setOpen] = useState(false);
  const [isMount, setIsMount] = useState(true)
  const [trigger, setTrigger] = useState(false)

  const [inputsLeft, setInputsLeft] = useState([
    {
      type: 'text',
      id: Date.now(),
      placeholder: 'First name',
      handler: 'firstName',
      value: '',
    },
    {
      type: 'text',
      id: Date.now(),
      placeholder: 'Company name',
      handler: 'companyName',
      value: '',
    },
    {
      type: 'text',
      id: Date.now(),
      placeholder: 'Address',
      handler: 'address',
    },
    {
      type: 'password',
      id: Date.now(),
      placeholder: 'Enter old password',
      handler: 'oldPassword',
      error: ''
    },
  ])

  const [inputsRight, setInputsRight] = useState([
    {
      type: 'text',
      id: Date.now(),
      placeholder: 'Last name',
      handler: 'lastName',
      value: '',
    },
    {
      type: 'email',
      id: Date.now(),
      placeholder: 'Email',
      handler: 'email',
      value: '',
    },
    {
      type: 'password',
      id: Date.now(),
      placeholder: 'Enter a new password',
      handler: 'newPassword',
    },
  ])

  const [form, setForm] = useState({
    firstName: '',
    companyName: '',
    address: '',
    oldPassword: '',
    lastName: '',
    email: '',
    newPassword: '',
    value: ''
  });

  const changeHandler = event => {
    const key = event.target.getAttribute('handler')
    setForm({
      ...form,
      [key]: event.target.value
    })
  };

  const handleSaveChanges = () => {
    const obj = {
      ...form
    }
    updateUser(obj)
      .then(res => {
        if (res.error) {
          isMount && setInputsLeft(prev => {
            prev.map(item => {
              if (item.handler === 'oldPassword') {
                item.error = res.error
                return item
              }
              return item
            })
            console.log('====><====', prev)
            return [
              ...prev
            ]
          })
        }
      })
  }

  useEffect(() => {
    getUser().then((res) => isMount && setForm({
      firstName: res.firstName,
      companyName: res.companyName,
      address: res.address,
      oldPassword: '',
      lastName: res.lastName,
      email: res.email,
      newPassword: '',
      _id: res._id
    }))
  }, [])

  useEffect(() => {
    return () => {
      setIsMount(false)
    }
  })

  return (
    <div className="container">
      <TitleHeader
        title={"Personal Cabinet"}
        subtitle={"Information about your account"}
        onClick={() => setOpen(true)}
        button="btn"
        setTrigger={setTrigger}
      />
      <div className="personal-form">
        <div className="input-left">
          {inputsLeft.map((item, index) => {
            return (
              <div className="personal-input" key={index + 2}>
                <label
                  className={item.error ? 'error' : ''}
                >
                  {item.error ? item.error : item.placeholder}
                </label>
                <Input
                  id={item.id}
                  value={form[item.handler]}
                  placeholder={item.placeholder}
                  type={item.type}
                  handler={item.handler}
                  onChange={changeHandler}
                />
              </div>
            )
          })}
        </div>
        <div className="input-right">
          {inputsRight.map((item, index) => {
            return (
              <div className="personal-input" key={index + 5}>
                <label>{item.placeholder}</label>
                <Input
                  id={item.id}
                  value={form[item.handler]}
                  placeholder={item.placeholder}
                  type={item.type}
                  handler={item.handler}
                  onChange={changeHandler}
                />
              </div>
            )
          })}
        </div>
      </div>
      <div className='personal-button'>
        <Button onClick={handleSaveChanges}>
          <span>Save changes</span>
        </Button>
      </div>
    </div>
  );
};

export default Personal;