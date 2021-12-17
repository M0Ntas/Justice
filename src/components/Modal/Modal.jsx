import React from 'react';

import close from "../../images/icons/close.svg"

import './styles.scss'

const Modal = ({onClick, title, children}) => {

  const CloseIcon = () => {
    return <div className="close" onClick={() => onClick(false)}>
      <img src={close} alt={'close'}/>
    </div>
  };

  return (
    <div className="wrapper">
      <div className="modal">
        <div className="modal-title">
          {title}
        </div>
        {children}
        <CloseIcon/>
      </div>
    </div>
  );
};

export default Modal;