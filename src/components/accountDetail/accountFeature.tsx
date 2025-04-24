import React from "react";

export default function AccountFeature(props: {
  title: string,
  value: string
}) {
  return (
    <div className="flex items-center">
      <span className="w-24 text-gray-600">{props.title}</span>
      <span className="font-medium">{props.value}</span>
    </div>
  )
}