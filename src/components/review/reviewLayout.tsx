'use client'
import {ReviewItem} from "@/components/review/reviewItem";
import ReviewForm from "@/components/review/reviewForm";
import {useUserStore} from "@/service/user/userService";
import Link from "next/link";

export default function ReviewLayout({reviews}: {reviews: Review[]}) {
  const {user} = useUserStore()

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">Đánh giá từ người mua</h2>
        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
          Xem tất cả
        </button>
      </div>
      {!user ? (
        <div className="flex flex-col gap-5">
          <h2 className="text-xl font-bold text-gray-900">Bạn chưa đăng nhập, đăng nhập để đánh giá</h2>
          <div>
            <Link href="/dang-nhap" className="text-gray-100 bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md font-medium">
              Đăng nhập
            </Link>
          </div>
        </div>
      ) : <ReviewForm/>
      }
      <div className="space-y-4">
        {reviews.map((review) => (
          <ReviewItem {...review} key={review.id} />
        ))}
      </div>
    </div>
  )
}