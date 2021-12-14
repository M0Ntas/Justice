import React from 'react';
import { NavLink } from "react-router-dom";
import logo from "../../images/icons/Logo.svg"
import home from "../../images/icons/home.svg"
import doc from "../../images/icons/doc.svg"
import sales from "../../images/icons/sales.svg"
import user from "../../images/icons/user.svg"
import logout from "../../images/icons/logout.svg"
import './styles.scss'
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const Header = ({setIsAuth}) => {

  const history = useHistory();

  const menu = [{
    icon: home, title: 'Main page', link: '/'
  }, {
    icon: doc, title: 'My Products', link: '/my-products'
  }, {
    icon: sales, title: 'My Sales', link: '/my-sales'
  }, {
    icon: user, title: 'Personal', link: '/personal'
  },]

  const handleLogOut = () => {
    localStorage.clear()
    setIsAuth(false)
    history.push('/sign-in')
  }

  const handleHome = () => history.push('/')

  return (<div className="header">
    <div onClick={handleHome} className="logo">
      <img src={logo} alt="logo"/>
    </div>
    <div className="menu">
      {menu.map((item, index) => {
        return (<NavLink key={index + 3} exact activeClassName="active" to={item.link}>
          <img key={index + 7} src={item.icon} alt="list-item"/>
          {item.title}
        </NavLink>)
      })}
    </div>
    <div onClick={handleLogOut} className="logout">
      <img src={logout} alt="logout"/>
      <span>Log out</span>
    </div>
  </div>);
};

export default Header;