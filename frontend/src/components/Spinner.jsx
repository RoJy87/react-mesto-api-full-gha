import spinner from '../image/loading.jpg';

function Spinner(props) {

  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen && "popup_opened"}`}>
      <div className="popup__spinner-container">
        <i><img src={spinner} alt="Картинка ожидания" className="popup__spiner-pic" /></i>
      </div>
    </div>
  )
}

export default Spinner;