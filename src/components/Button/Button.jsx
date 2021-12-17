import button from "../../images/icons/button.svg"
import './styles.scss'

const Button = ({onClick, children, disabled}) => {

  return (
    <button className="button" disabled={disabled} onClick={onClick}>
      {children}
    </button>
  )
};

export default Button;
