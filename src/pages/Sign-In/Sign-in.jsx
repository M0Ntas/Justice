import React, { useEffect, useState } from "react";

import { useHistory } from "react-router-dom/cjs/react-router-dom";

import Input from "../../components/Input/Input";
import { authUser } from "../../api/auth/authUser";

import img from '../../images/icons/signin.svg'

import './style.scss'
import { useDispatch } from "react-redux";
import { asyncGetUser } from "../../redux/store/userReducer";
import { asyncGetAllProducts } from "../../redux/store/productsReducer";
import { asyncGetAllCategory } from "../../redux/store/categoryReducer";

const SignIn = ({setIsAuth}) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [emailError, setEmailError] = useState('E-mail cannot be empty');
  const [passwordError, setPasswordError] = useState('Password cannot be empty');
  const [validForm, setValidForm] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch()

  const [formUsers, setFormUsers] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    if (emailError || passwordError) {
      setValidForm(false)
    } else {
      setValidForm(true)
    }
  }, [emailError, passwordError])

  const changeHandler = event => {
    const key = event.target.getAttribute('handler')
    setFormUsers({
      ...formUsers,
      [key]: event.target.value
    })
  };

  const handleLogIn = async () => {
    if (formUsers.email && formUsers.password) {
      const test = async () => {
        await authUser(formUsers)
          .then(res => {
            if (res.status) {
              localStorage.setItem('token', res.token)
              ////////redux store
              // dispatch(writeToken(res.token))
              setIsAuth(true)
              history.push('/')
            } else {
              if (res.label === 'password') {
                ////password error
                setPasswordError(res.text)
              } else {
                ////email err
                setEmailError(res.text)
              }
              setEmailError(res.text)
            }
          })
      }
      test()
        .then(res =>
          dispatch(asyncGetUser())
          )
        .then(res =>
        dispatch(asyncGetAllProducts()))
        .then(res =>
        dispatch(asyncGetAllCategory()))
    }
  };

  const handleRegistration = () => {
    history.push('/sign-up')
  };

  const emailHandler = (e) => {
    setEmail(e.target.value)
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(e.target.value).toLowerCase())) {
      setEmailError('Неккорректный E-mail')
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

  const blurHandler = (e) => {
    switch (e.target.name) {
      case 'email':
        setEmailDirty(true)
        break
      case 'password':
        setPasswordDirty(true)
        break
    }
  };

  return (
    <div className='sign-in-page'>
      <div className="left-side">
        <div className="sign-in">
          <div className='title'>
            <span>Sign in</span>
          </div>
          <div className="email">
            {(emailDirty && emailError) ? <label style={{color: 'red'}} className="label">{emailError}</label> :
              <label className="label">E-mail</label>}
            <Input value={email}
                   onChange={emailHandler}
                   onBlur={e => blurHandler(e)}
                   name='email'
                   handler="email"
                   type='email'
                   placeholder='Email'/>
          </div>
          <div className="password">
            {(passwordDirty && passwordError) ?
              <label style={{color: 'red'}} className="label">{passwordError}</label> :
              <label className="label">Password</label>}
            <Input value={password}
                   onChange={passwordHandler}
                   onBlur={e => blurHandler(e)}
                   handler="password"
                   name='password'
                   type='password'
                   placeholder='Enter password'/>
          </div>
          <button className='button-login' disabled={!validForm} onClick={handleLogIn}>Log in</button>
          <div className='forgot'>
            <div>
              <span onClick={handleRegistration}>Create account</span>
            </div>
          </div>
        </div>
      </div>
      <div className="right-side">
        <img src={img} alt='img'/>
      </div>
    </div>
  )
};

export default SignIn;