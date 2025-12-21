const ToastMessage = ({ msg, color }) => {
  return (
    <div className="toast">
      <div className="toast-box" style={{ backgroundColor: color }}>
        <p>{msg}</p>
      </div>
    </div>
  )
}

export { ToastMessage }