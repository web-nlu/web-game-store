import React, {useState} from "react";

export default function AmountForm() {

  const [quantity, setQuantity] = useState(1);
  const decreaseQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  return (
    <div className="flex items-center mb-6">
      <div className="flex items-center border rounded-md">
        <button
          className="px-3 py-2 text-gray-600 hover:bg-gray-100"
          onClick={decreaseQuantity}
        >
          -
        </button>
        <div className="px-3 py-2 border-x">{quantity}</div>
        <button
          className="px-3 py-2 text-gray-600 hover:bg-gray-100"
          onClick={increaseQuantity}
        >
          +
        </button>
      </div>
    </div>
  )
}