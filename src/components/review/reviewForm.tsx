'use client'
import {FormEvent, useState} from "react";
import {StarIcon} from "lucide-react";

export default function ReviewForm() {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [hoveredStar, setHoveredStar] = useState(0);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(`Đã gửi đánh giá: ${rating} sao, Nội dung: ${comment}`);
    setComment('');
  };

  return(
    <div className="my-6 pt-6 border-t border-gray-200">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Viết đánh giá của bạn</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Đánh giá của bạn
          </label>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className="p-1"
                onMouseEnter={() => setHoveredStar(star)}
                onMouseLeave={() => setHoveredStar(0)}
                onClick={() => setRating(star)}
              >
                <StarIcon
                  size={24}
                  fill={(hoveredStar || rating) >= star ? "#FBBF24" : "none"}
                  stroke={(hoveredStar || rating) >= star ? "#FBBF24" : "#9CA3AF"}
                />
              </button>
            ))}
            <span className="ml-2 text-sm text-gray-600 self-center">
              {rating} sao
            </span>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
            Nội dung đánh giá
          </label>
          <textarea
            id="comment"
            rows={4}
            className="w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Chia sẻ trải nghiệm của bạn khi sử dụng tài khoản..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </div>

        <div className="flex items-center">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium"
          >
            Gửi đánh giá
          </button>
          <p className="ml-4 text-xs text-gray-500">
            Đánh giá của bạn sẽ được kiểm duyệt trước khi hiển thị
          </p>
        </div>
      </form>
    </div>
  )
}