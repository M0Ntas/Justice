import React, { useEffect, useState } from "react";

import { useHistory } from "react-router-dom/cjs/react-router-dom";

import { registerUser } from "../../api/auth/registerUser";
import Input from "../../components/Input/Input";


import img from '../../images/icons/signin.svg'
import './style.scss'

const SignUp = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [repeatPasswordDirty, setRepeatPasswordDirty] = useState(false);
  const [firstNameDirty, setFirstNameDirty] = useState(false);
  const [lastNameDirty, setLastNameDirty] = useState(false);
  const [companyNameDirty, setCompanyNameDirty] = useState(false);
  const [emailError, setEmailError] = useState('E-mail cannot be empty');
  const [passwordError, setPasswordError] = useState('Password cannot be empty');
  const [firstNameError, setFirstNameError] = useState('First Name cannot be empty')
  const [repeatPasswordError, setRepeatPasswordError] = useState('Password mismatch ');
  const [lastNameError, setLastNameError] = useState('Last Name cannot be empty')
  const [companyNameError, setCompanyNameError] = useState('Company Name cannot be empty');
  const [validForm, setValidForm] = useState(false);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    email: '',
    password: '',
    repeatPassword: '',
    id: Date.now(),
  });

  useEffect(() => {
    if (password !== repeatPassword){
      setRepeatPasswordError('Password mismatch')
    }
  },[repeatPassword])

  useEffect(() => {
    if (emailError || passwordError || firstNameError || lastNameError || companyNameError || repeatPasswordError) {
      setValidForm(false)
    } else {
      setValidForm(true)
    }
  }, [emailError, passwordError, firstNameError, lastNameError, companyNameError, repeatPasswordError])

  useEffect(() => {
    if (form.password === form.repeatPassword) {
      setValidForm(true)
    } else {
      setValidForm(false)
    }
  }, [form])

  const history = useHistory();

  const changeHandler = event => {
    const key = event.target.getAttribute('handler')
    setForm({
      ...form,
      [key]: event.target.value
    })
  };

  const handleCreateAccount = () => {
    if (form.email && form.password) {
      registerUser(form)
        .then(res => {
          if (res.status) {
            history.push('/sign-in')
          } else {
            setEmailError(res.text)
          }
        })
        .catch(err => console.log('====>err<====', err))
    }
  };

  const logIn = () => {
    history.push('/sign-in')
  };

  const emailHandler = (e) => {
    setEmail(e.target.value)
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(e.target.value).toLowerCase())) {
      setEmailError('Incorrect E-mail')
    } else {
      setEmailError('')
      changeHandler(e)
    }
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value)
    if (e.target.value.length < 3 || e.target.value.length > 8) {
      setPasswordError('Password must be longer than 3 and less than 8')
      if (!e.target.value) {
        setPasswordError('Password cannot be empty')
      }
    } else {
      setPasswordError('')
      changeHandler(e)
    }
  };

  const repeatPasswordHandler = (e) => {
    setRepeatPassword(e.target.value)
      if (!e.target.value) {
        setRepeatPasswordError('Password cannot be empty')
      } else {
      setRepeatPasswordError('')
      changeHandler(e)
    }
  };

  const firstNameHandler = (e) => {
    setFirstName(e.target.value)
    if (e.target.value.length < 1 || e.target.value.length > 8) {
      setFirstNameError('First Name must be longer than 1 and less than 8')
      if (!e.target.value) {
        setFirstNameError('First Name cannot be empty')
      }
    } else {
      setFirstNameError('')
      changeHandler(e)
    }
  };

  const lastNameHandler = (e) => {
    setLastName(e.target.value)
    if (e.target.value.length < 1 || e.target.value.length > 8) {
      setLastNameError('Last Name must be longer than 1 and less than 8')
      if (!e.target.value) {
        setLastNameError('Last Name cannot be empty')
      }
    } else {
      setLastNameError('')
      changeHandler(e)
    }
  };

  const companyNameHandler = (e) => {
    setCompanyName(e.target.value)
    if (e.target.value.length < 1 || e.target.value.length > 8) {
      setCompanyNameError('Company Name must be longer than 1 and less than 8')
      if (!e.target.value) {
        setCompanyNameError('Company Name cannot be empty')
      }
    } else {
      setCompanyNameError('')
      changeHandler(e)
    }
  };

  const blurHandler = (e) => {
    switch (e.target.name) {
      case 'email':
        setEmailDirty(true)
        break
      case 'password':
        setPasswordDirty(true)
        break
      case 'firstName':
        setFirstNameDirty(true)
        break
      case 'lastName':
        setLastNameDirty(true)
        break
      case 'companyName':
        setCompanyNameDirty(true)
        break
      case 'repeatPassword':
        setRepeatPasswordDirty(true)
        break
    }
  };

  return (
    <div className='sign-up-page'>
      <div className="left-side">
        <div className="sign-in">
          <div className='title'>
            <span>Create an account</span>
          </div>
          <div className="input-one">
            <div className="input-first">
              {(firstNameDirty && firstNameError) ?
                <label htmlFor="firstName" style={{color: 'red'}} className="label">{firstNameError}</label> :
                <label htmlFor="firstName" className="label">First Name</label>}
              <Input id="firstName"
                     value={firstName}
                     onChange={firstNameHandler}
                     onBlur={e => blurHandler(e)}
                     type='text'
                     placeholder='First name'
                     handler="firstName"
                     name='firstName'
              />
            </div>
            <div className="input-last">
              {(lastNameDirty && lastNameError) ?
                <label htmlFor="lastName" style={{color: 'red'}} className="label">{lastNameError}</label> :
                <label htmlFor="lastName" className="label">Last Name</label>}
              <Input id="lastName"
                     value={lastName}
                     name='lastName'
                     onChange={lastNameHandler}
                     onBlur={e => blurHandler(e)}
                     type='text'
                     placeholder='Last name'
                     handler="lastName"
              />
            </div>
          </div>
          <div className="input-two">
            {(companyNameDirty && companyNameError) ?
              <label htmlFor="companyName" style={{color: 'red'}} className="label">{companyNameError}</label> :
              <label htmlFor="companyName" className="label">Company Name</label>}
            <Input id="companyName"
                   value={companyName}
                   onChange={companyNameHandler}
                   onBlur={e => blurHandler(e)}
                   name='companyName'
                   type='text'
                   placeholder='Company name'
                   handler="companyName"
            />
          </div>
          <div className="input-two">
            {(emailDirty && emailError) ?
              <label style={{color: 'red'}} className="label">{emailError}</label> :
              <label htmlFor="email" className="label">E-mail</label>}
            <Input value={email}
                   onChange={emailHandler}
                   onBlur={e => blurHandler(e)}
                   name='email'
                   handler="email"
                   type='email'
                   placeholder='Email'
                   id="email"
            />
          </div>
          <div className="input-two">
            {(passwordDirty && passwordError) ?
              <label style={{color: 'red'}} className="label">{passwordError}</label> :
              <label htmlFor="password" className="label">Password</label>}
            <Input
              vvalue={password}
              onChange={passwordHandler}
              onBlur={e => blurHandler(e)}
              handler="password"
              name='password'
              type='password'
              placeholder='Enter password'
              id="password"
            />
          </div>
          <div className="input-two">
            {(repeatPasswordDirty && repeatPasswordError) ?
              <label style={{color: 'red'}} className="label">{repeatPasswordError}</label> :
            <label htmlFor="repeatPassword" className="label">Repeat password</label>}
            <Input
              vvalue={repeatPassword}
              onBlur={e => blurHandler(e)}
              onChange={repeatPasswordHandler}
              type='password'
              placeholder='Repeat password'
              handler="repeatPassword"
              name='repeatPassword'
            />
          </div>
          <button
            className='button-create-account'
            disabled={!validForm}
            onClick={handleCreateAccount}
          >
            Create account
          </button>
          <div className='forgot'>
            Already have an account?
            <button className="login" onClick={logIn}>Log in</button>
          </div>
        </div>
      </div>
      <div className="right-side">
        <img src={img} alt='img'/>
      </div>
    </div>
  )
};

export default SignUp;