import AccountDetailSlide from "@/components/accountDetail/accountSlide";
import AccountInfo from "@/components/accountDetail/accountInfo";
import AccountDescription from "@/components/accountDetail/accountDescription";
import ReviewLayout from "@/components/review/reviewLayout";
import {redirect} from "next/navigation";

export default async function AccountDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const res = await fetch(`http://localhost:3000/api/accounts/${slug}`);
  const { account } = await res.json();
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
          <ReviewLayout reviews={account.reviews} />
        </div>
      </div>
    </main>
)
}