import React, { useEffect, useRef } from "react"
import clsx from "clsx"
import { PiWarningCircleFill } from "react-icons/pi"
interface Props extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
  onKeyUp?: React.KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement>
  value: React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>["value"]
  name: string
  className?: string
  element?: "input" | "textarea"
  id?: string
  errorMessage?: string | null
}
/**
 * TextInput component
 *
 * A reusable input component for text and textarea fields in a React application.
 *
 * @component
 * @example
 * <TextInput
 *   value={value}
 *   onChange={handleChange}
 *   placeholder="Enter text"
 *   type="text"
 *   name="text-input"
 *   className="custom-class"
 *   element="input"
 *   id="text-input"
 *   errorMessage="Invalid input"
 * />
 *
 * @param {object} props - The component props
 * @param {function} props.onChange - The change event handler for the input field
 * @param {string} props.placeholder - The placeholder text for the input field
 * @param {string} props.type - The type of the input field
 * @param {string} props.value - The value of the input field
 * @param {string} props.name - The name of the input field
 * @param {string} props.className - The additional CSS class for the input field
 * @param {string} props.element - The type of the input element (input or textarea)
 * @param {string} props.id - The ID of the input field
 * @param {string} props.errorMessage - The error message to display for invalid input
 * @param {function} props.onKeyUp - The key up event handler for the input field
 * @param {function} props.onKeyPress - The key press event handler for the input field
 * @param {function} props.onBlur - The blur event handler for the input field
 * @param {string} props.pattern - The pattern attribute for input validation
 * @param {function} props.onInvalid - The invalid event handler for the input field
 * @returns {JSX.Element} The rendered TextInput component
 */
const TextInput: React.FC<Props> = ({
  onChange,
  placeholder,
  type,
  value,
  name,
  className,
  element,
  id,
  errorMessage,
  onKeyUp,
  onKeyPress,
  onBlur,
  pattern,
  onInvalid,
}: Props): JSX.Element => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  useEffect(() => {
    if (element === "textarea" && textAreaRef.current) {
      textAreaRef.current.style.height = "0px"
      const scrollHeight = textAreaRef.current.scrollHeight
      textAreaRef.current.style.height = `${Math.max(scrollHeight, 60)}px`
    }
  }, [textAreaRef.current, value])

  return (
    <div className="relative flex flex-col items-start w-full">
      {!element || element === "input" ? (
        <input
          onKeyUp={onKeyUp}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          type={type}
          name={name}
          id={id}
          className={clsx(
            ` w-full   shadow-sm px-[12px] py-[9px] flex flex-row items-center focus:outline-none   ${className}`,
            errorMessage ? "border-red-500/55 focus:border-red-500/55 focus:shadow-red-500/55" : ""
          )}
          onKeyPress={onKeyPress}
          onBlur={onBlur}
          autoComplete="off"
          spellCheck={false}
          pattern={pattern}
          onInvalid={onInvalid}
        />
      ) : (
        <textarea
          onKeyUp={onKeyUp}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          name={name}
          id={id}
          className={clsx(
            ` w-full  border-[0.01px]  px-[12px] py-[9px] flex flex-row items-center focus:outline-none   ${className}`,
            errorMessage ? "border-accent_red focus:border-accent_red " : ""
          )}
          onKeyPress={onKeyPress}
          onBlur={onBlur}
          autoComplete="off"
          spellCheck={false}
          onInvalid={onInvalid}
          ref={textAreaRef}
        ></textarea>
      )}
      {errorMessage ? (
        <span className="flex gap-1 p-1 text-accent_red text-[12px] items-center">
          <PiWarningCircleFill />
          <div>{errorMessage}</div>
        </span>
      ) : null}
    </div>
  )
}

export default TextInput
