"use client"
import {useState} from "react";
import AccountDetailSlide from "@/components/accountDetail/accountSlide";
import AccountInfo from "@/components/accountDetail/accountInfo";
import AccountDescription from "@/components/accountDetail/accountDescription";
import ReviewLayout from "@/components/review/reviewLayout";

const accountDetail: AccountDetail = {
  id: 1,
  title: 'Tài khoản Liên Minh Huyền Thoại Rank Thách Đấu',
  price: 2500000,
  salePrice: 2300000,
  category: 'moba',
  game: 'Liên Minh Huyền Thoại',
  server: 'Việt Nam',
  image: '/images/account-lol-1.jpg',
  imageGallery: [
    '/images/account-lol-1.jpg',
    '/images/account-lol-1-detail-1.jpg',
    '/images/account-lol-1-detail-2.jpg',
    '/images/account-lol-1-detail-3.jpg'
  ],
  info: 'Rank Thách Đấu, 150 tướng, 200 trang phục',
  description: 'Tài khoản Liên Minh Huyền Thoại đã đạt rank Thách Đấu mùa hiện tại. Sở hữu bộ sưu tập đầy đủ 150 tướng và 200 trang phục bao gồm nhiều skin hiếm, giới hạn. Tài khoản không bị khóa chat, không bị phạt, lịch sử đấu rank ổn định.',
  features: [
    'Rank: Thách Đấu (Challenger)',
    'Số tướng: 150/150',
    'Trang phục: 200+',
    'Trang phục hiếm: 25',
    'Điểm tinh hoa: 50000+',
    'Xanh: 100000+'
  ],
  level: 350,
  status: 'available',
  warranty: '30 ngày',
  createdAt: '2025-04-20T08:00:00Z',
  updatedAt: '2025-04-24T10:30:00Z',
  viewCount: 156,
  saleCount: 0,
  tags: ['thách đấu', 'full tướng', 'skin hiếm', 'mùa 15'],
  rating: 4.9,
  reviews: [
    {
      id: 1,
      user: 'game_master123',
      rating: 5,
      comment: 'Tài khoản chất lượng, đúng như mô tả, giao dịch nhanh chóng.',
      date: '2025-04-22T15:30:00Z'
    },
    {
      id: 2,
      user: 'lol_player456',
      rating: 5,
      comment: 'Đã mua và chơi thử, tài khoản rất tốt, nhiều skin hiếm như mô tả.',
      date: '2025-04-23T10:15:00Z'
    }
  ]
};

export default function AccountDetailPage() {

  return (
    <main className="container mx-auto py-6 px-4 md:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <AccountDetailSlide imageGallery={accountDetail.imageGallery}/>
        <AccountInfo {...accountDetail} />
      </div>
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <AccountDescription {...accountDetail} />
          <ReviewLayout reviews={accountDetail.reviews} />
        </div>
      </div>
    </main>
)
}