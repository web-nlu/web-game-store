import {StarIcon} from "lucide-react";

export function ReviewItem(review: Review) {
  return (
    <div className="border-b pb-4 last:border-b-0 last:pb-0">
      <div className="flex items-center mb-1 gap-10">
        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
          <span className="text-xs">{review.user.charAt(0).toUpperCase()}</span>
        </div>
        <span className="font-medium">{review.user}</span>
        <div className="ml-3 flex">
          {[...Array(5)].map((_, i) => (
            <StarIcon
              key={i}
              fill={i < review.rating ? "#FBBF24" : "none"}
              stroke={i < review.rating ? "#FBBF24" : "#9CA3AF"}
              size={14}
            />
          ))}
        </div>
      </div>
      <p className="text-gray-700 text-sm mb-1">{review.comment}</p>
      <p className="text-gray-500 text-xs">
        {new Date(review.date).toLocaleDateString('vi-VN')}
      </p>
    </div>
  )
}