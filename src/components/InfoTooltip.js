import okIcon from "../images/ok-icon.svg";
import errorIcon from "../images/error-icon.svg";

function InfoTooltip(props) {
  return (
    <div
      className={`popup popup_content_info ${
        props.isOpen ? "popup_opened" : ""
      }`}
    >
      <div className="popup__container popup__container_type_info">
        <button
          onClick={props.onClose}
          type="button"
          aria-label="Закрыть"
          className="popup__close-button"
        />
        <img
          src={props.isOk ? okIcon : errorIcon}
          alt={props.isOk ? "Галочка." : "Крестик."}
          className="popup__icon"
        />
        <p className="popup__text">
          {props.isOk
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."
          }
        </p>
      </div>
    </div>
  );
}

export default InfoTooltip;
