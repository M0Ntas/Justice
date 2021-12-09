import React from 'react';
import './styles.scss'

const Input = (props) => {
  return <input {...props} id={props.id} placeholder={props.placeholder} type={props.type} className="modal-input"/>
};

export default Input;