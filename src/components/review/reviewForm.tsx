'use client'
import {FormEvent, useState} from "react";
import {StarIcon} from "lucide-react";
import {useReviewStore} from "@/service/review/reviewService";

type Props = {
  accountId: string,
}

export default function ReviewForm({accountId}: Props) {
  const [hoveredStar, setHoveredStar] = useState(0);
  const {createReview} = useReviewStore()
  const [formData, setFormData] = useState({
    rating: 1,
    comment: "",
    accountId,
  } as BodySetReview)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await createReview(formData)
    if(result) {
      setFormData({
        rating: 1,
        comment: "",
        accountId,
      })
    }
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
                onMouseEnter={() => setFormData((prev) => ({...prev, rating: star}))}
                onMouseLeave={() => setHoveredStar(0)}
                onClick={() => setFormData((prev) => ({...prev, rating: star}))}
              >
                <StarIcon
                  size={24}
                  fill={(hoveredStar || formData.rating) >= star ? "#FBBF24" : "none"}
                  stroke={(hoveredStar || formData.rating) >= star ? "#FBBF24" : "#9CA3AF"}
                />
              </button>
            ))}
            <span className="ml-2 text-sm text-gray-600 self-center">
              {formData.rating} sao
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
            value={formData.comment}
            onChange={(e) =>
              setFormData((prev) => ({...prev, comment: e.target.value}))
            }
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
          {/*<p className="ml-4 text-xs text-gray-500">*/}
          {/*  Đánh giá của bạn sẽ được kiểm duyệt trước khi hiển thị*/}
          {/*</p>*/}
        </div>
      </form>
    </div>
  )
}