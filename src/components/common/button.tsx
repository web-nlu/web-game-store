import React, {JSX} from "react";

type Styles = {
  outline: string
}

const styles: Styles = {
  outline: "hover:bg-gray-50 border-gray-300 border text-gray-700"
}

export default function Button(props: {
  label: string,
  icon?: JSX.Element,
  style?: keyof Styles,
}) {
  return (
    <button
      className={`flex-1 py-2 ${styles[props.style || "outline"]} rounded-md flex items-center justify-center `}>
      {props.icon}
      {props.label}
    </button>
  )
}