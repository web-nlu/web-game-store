'use client'
import {formatPrice, routePage} from "@/utils";
import {JSX} from "react";
import {CldImage} from "next-cloudinary";
import {ImageIcon} from "lucide-react";

type Props = {
  accounts: Account[];
  title?: string;
  direction?: {[key: string]: string};
}

export default function FeaturedAccount({accounts, title, direction}: Props): JSX.Element {
  return (
    <section className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">{title || "Tài khoản mới nhất"}</h2>
        <div onClick={() => routePage(`/san-pham?${new URLSearchParams(direction || {})}`)} className="cursor-pointer text-blue-600 hover:text-blue-800 font-medium">
          Xem tất cả
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {accounts.map((account) => (
          <div onClick={() => routePage(`/${account.id}`)} key={account.id}
                className="cursor-pointer bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-40 bg-gray-300 relative">
              {/* Placeholder for account image */}
              { account.image ? (
                  <CldImage alt={"Hình ảnh tài khoản"} src={account.image} fill />
              ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                    <ImageIcon className="w-6 h-6 text-gray-400"/>
                  </div>
              )}

              <div className="absolute top-0 left-0 bg-yellow-500 text-white text-xs font-bold px-2 py-1">
                Mới nhất
              </div>
            </div>
            <div className="p-4">
              <div className="text-xs text-gray-500 mb-1">{account.game}</div>
              <h3 className="font-bold text-gray-800 mb-2 line-clamp-2">{account.title}</h3>
              <div className="flex items-center space-x-2">
                <div className="text-red-600 font-bold">{formatPrice(account.salePrice || account.price)}</div>
                {account.salePrice ? (
                  <div className="text-gray-500 text-sm line-through">{formatPrice(account.price)}</div>
                ) : <></>}
              </div>

              {/* Additional info based on game type */}
              {/*<div className="mt-2 text-sm">*/}
              {/*  {account.rank &&*/}
              {/*      <div className="text-gray-600">Rank: <span className="font-medium">{account.rank}</span></div>}*/}
              {/*  {account.level &&*/}
              {/*      <div className="text-gray-600">Level: <span className="font-medium">{account.level}</span></div>}*/}
              {/*  {account.skins &&*/}
              {/*      <div className="text-gray-600">Skin: <span className="font-medium">{account.skins}</span></div>}*/}
              {/*  {account.diamonds &&*/}
              {/*      <div className="text-gray-600">Rank: <span className="font-medium">{account.diamonds}</span></div>}*/}
              {/*</div>*/}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}