import React from "react"

const variants = {
  primary: "",
  secondary: "",
  link: "",
  pill: "",
  nav: "px-6 py-2 rounded-lg hover:opacity-90",
  shimmer:"inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-white transition-colors focus:outline-none ",
  blackNwhite:"flex gap-2 px-6 py-3 mt-4 text-black bg-white hover:bg-white/85 transition duration-200 w-fit rounded-md items-center ripple-bg-gray-50",
 
}

interface ButtonProperties extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title?: string
  textClassName?: string
  variant?: keyof typeof variants

}

const Button = ({
  title,
  onClick,
  className = "",
  disabled = false,
  textClassName = "",
  variant = "primary",
  children,
  type,
  style,
  ...properties
}: ButtonProperties) => {
  const BASE_CLASS = "transition-all"

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={style}
      className={`${BASE_CLASS} ${variant && variants[variant]} ${className}`}
      {...properties}
      aria-label={"Name"}
    >
      {children && children}
      {title && <div className={` ${textClassName}`}>{title}</div>}
    </button>
  )
}

export default Button
