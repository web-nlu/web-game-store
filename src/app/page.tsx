import HeroBanner from "@/components/homePage/heroBanner";
import GameCategories from "@/components/homePage/gameCategories";
import FeaturedAccount from "@/components/homePage/featuredAccount";
import WhyChooseWe from "@/components/homePage/whyChooseWe";
import Footer from "@/components/footer/footer";
import _ from "lodash";

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
    fetch(`${process.env.NEXT_PUBLIC_FRONTEND_HOST}/api/home`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    }),
  ]);
  const { categories } = (await requestCategories.json());
  const { data } = (await requestAccounts.json());
  return (
    <>
      <main className="container mx-auto px-4 py-8">
        <HeroBanner/>
        <GameCategories categories={categories} />
        <FeaturedAccount accounts={(data as HomeData).newAccounts} />
        {(data as HomeData).topAccountAllGames.map((wrappedData) => {
          if (_.isEmpty(wrappedData)) {
            return;
          }
          return <FeaturedAccount
            key={wrappedData.gameId}
            accounts={wrappedData.accounts}
            title={`Tài khoản ${wrappedData.gameName}`}
            direction={{categoryId: wrappedData.categoryId.toString(), gameId: wrappedData.gameId.toString()}}
          />
        })}
        <WhyChooseWe/>
      </main>
      <Footer/>
    </>
  );
}