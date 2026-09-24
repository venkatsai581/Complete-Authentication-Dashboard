function Toast({ message, type, onClose }) {
  return (
    <div className={`toast toast-${type}`}>
      <div className="toast-content">
        <span className="toast-icon">
          {type === "success" ? "OK" : "!"}
        </span>

        <span className="toast-message">
          {message}
        </span>
      </div>

      <button
        type="button"
        className="toast-close"
        onClick={onClose}
      >
        x
      </button>
    </div>
  );
}

export default Toast;