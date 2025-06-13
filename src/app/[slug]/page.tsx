import AccountDetailSlide from "@/components/accountDetail/accountSlide";
import AccountInfo from "@/components/accountDetail/accountInfo";
import AccountDescription from "@/components/accountDetail/accountDescription";
import ReviewLayout from "@/components/review/reviewLayout";
import {redirect} from "next/navigation";
import {cookies} from "next/headers";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

export default async function AccountDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cookieStore = await cookies();
  const session = await getServerSession(authOptions)
  const [detailRes, checkOrderRes] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_FRONTEND_HOST}/api/accounts/${slug}`),
    fetch(`${process.env.NEXT_PUBLIC_FRONTEND_HOST}/api/s/order/check/${slug}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookieStore.get('token')?.value || session?.accessToken}`
      }
    })
  ])
  const { account } = await detailRes.json();
  const { haveOrder } = await checkOrderRes.json();
  if(!account) {
    redirect("/")
  }

  return (
    <main className="container mx-auto py-6 px-4 md:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <AccountDetailSlide imageGallery={account.imageGallery}/>
        <AccountInfo {...account} />
      </div>
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <AccountDescription {...account} />
          <ReviewLayout haveOrder={haveOrder} accountId={account.id} />
        </div>
      </div>
    </main>
)
}