import './styles.scss'
import button from "../../images/icons/button.svg"

const Button = ({onClick, children, disabled}) => {

  return (
    <button className="button" disabled={disabled} onClick={onClick}>
      {children}
    </button>
  )
};

export default Button;
