import './styles.scss'
import button from "../../images/icons/button.svg"

const Button = ({onClick, children}) => {

  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  )
};

export default Button;
