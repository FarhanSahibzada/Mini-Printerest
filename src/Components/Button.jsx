
const Button = ({ Children, type = "button", className = "", ...props }) => {
  return (
    <button
      type={type}
      className={`px-4 py-1.5 ${className}`}
      {...props}
    >
      {Children}
    </button>
  )
}

export default Button;