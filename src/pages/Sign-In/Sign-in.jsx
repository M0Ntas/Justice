import './style.scss'
import Input from "../../components/Input/Input";
import img from '../../images/icons/signin.svg'
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { authUser } from "../../api/auth/authUser";

const SignIn = ({setIsAuth}) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [emailError, setEmailError] = useState('E-mail не может быть пустым');
  const [passwordError, setPasswordError] = useState('Пароль не может быть пустым');
  const [validForm, setValidForm] = useState(false);
  const history = useHistory();

  const [formUsers, setFormUsers] = useState({
    email: '',
    password: '',
  });

  const changeHandler = event => {
    const key = event.target.getAttribute('handler')
    setFormUsers({
      ...formUsers,
      [key]: event.target.value
    })
  };

  const handleLogIn = () => {
    if (formUsers.email && formUsers.password) {
      authUser(formUsers)
        .then(res => {
          if (res.status) {
            localStorage.setItem('token', res.token)
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
      setPasswordError('Пароль должен быть длиннее 3 и менее 8')
      if (!e.target.value) {
        setPasswordError('Пароль не может быть пустым')
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

  useEffect(() => {
    if (emailError || passwordError) {
      setValidForm(false)
    } else {
      setValidForm(true)
    }
  }, [emailError, passwordError])

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