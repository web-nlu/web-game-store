import {ReviewItem} from "@/components/review/reviewItem";
import ReviewForm from "@/components/review/reviewForm";

export default function ReviewLayout({reviews}: {reviews: Review[]}) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">Đánh giá từ người mua</h2>
        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
          Xem tất cả
        </button>
      </div>
      <ReviewForm />
      <div className="space-y-4">
        {reviews.map((review) => (
          <ReviewItem {...review} key={review.id} />
        ))}
      </div>
    </div>
  )
}