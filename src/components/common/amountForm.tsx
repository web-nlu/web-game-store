'use client'
import React, {useState} from "react";

type Props = {
  amount: number;
  setAmount: (amount: number) => void;
}

export default function AmountForm({ amount, setAmount }: Props) {

  const [quantity, setQuantity] = useState(amount);
  const decreaseQuantity = () => {
    const value = Math.max(1, quantity - 1)
    setQuantity(value);
    setAmount(value);
  };

  const increaseQuantity = () => {
    const value = Math.max(quantity + 1)
    setQuantity(value);
    setAmount(value);
  };

  return (
    <div className="flex items-center mb-6">
      <div className="flex items-center border rounded-md">
        <button
          className="cursor-pointer px-3 py-2 text-gray-600 hover:bg-gray-100"
          onClick={decreaseQuantity}
        >
          -
        </button>
        <div className="px-3 py-2 border-x">{quantity}</div>
        <button
          className="cursor-pointer px-3 py-2 text-gray-600 hover:bg-gray-100"
          onClick={increaseQuantity}
        >
          +
        </button>
      </div>
    </div>
  )
}