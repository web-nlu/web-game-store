import HeroBanner from "@/components/homePage/heroBanner";
import GameCategories from "@/components/homePage/gameCategories";
import FeaturedAccount from "@/components/homePage/featuredAccount";
import WhyChooseWe from "@/components/homePage/whyChooseWe";
import CustomerReview from "@/components/homePage/customerReview";
import Subscribe from "@/components/homePage/subscribe";
import Footer from "@/components/footer/footer";

export default async function HomePage (){
  const [requestCategories, requestAccounts] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_FRONTEND_HOST}/api/categories`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'force-cache',
      next: {revalidate: 60}
    }),
    fetch(`${process.env.NEXT_PUBLIC_FRONTEND_HOST}/api/accounts?${new URLSearchParams({size: "5"})}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    }),
  ]);
  const { categories } = (await requestCategories.json());
  const { accounts } = (await requestAccounts.json());
  return (
    <>
      <main className="container mx-auto px-4 py-8">
        <HeroBanner/>
        <GameCategories categories={categories} />
        <FeaturedAccount accounts={accounts} />
        <WhyChooseWe/>
        <CustomerReview/>
        <Subscribe/>
      </main>
      <Footer/>
    </>
  );
}