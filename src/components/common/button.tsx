import React, {JSX} from "react";

type Styles = {
  outline: string,
  filled: string,
}

const styles: Styles = {
  outline: "hover:bg-gray-50 border-gray-300 border text-gray-700",
  filled: "hover:bg-blue-500 bg-blue-600 border text-gray-100"
}

export default function Button(props: {
  label: string,
  icon?: JSX.Element,
  style?: keyof Styles,
  className?: string
}) {
  return (
    <button
      className={`flex-1 py-2 ${styles[props.style || "outline"]} cursor-pointer rounded-md flex items-center justify-center ${props.className}`}>
      {props.icon}
      {props.label}
    </button>
  )
}