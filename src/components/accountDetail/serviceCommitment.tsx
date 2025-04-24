import {ShieldCheckIcon} from "lucide-react";
import React, {JSX} from "react";

export default function ServiceCommitment(props: {
  icon?: JSX.Element;
  title: string;
  value: string;
}) {
  return (
    <div className="flex items-center">
      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
        {props.icon || <ShieldCheckIcon size={20} className="text-blue-600"/>}
      </div>
      <div>
        <p className="font-medium">{props.title}</p>
        <p className="text-sm text-gray-600">{props.value}</p>
      </div>
    </div>
  )
}