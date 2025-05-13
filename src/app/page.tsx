import HeroBanner from "@/components/homePage/heroBanner";
import GameCategories from "@/components/homePage/gameCategories";
import FeaturedAccount from "@/components/homePage/featuredAccount";
import WhyChooseWe from "@/components/homePage/whyChooseWe";
import CustomerReview from "@/components/homePage/customerReview";
import Subscribe from "@/components/homePage/subscribe";
import Footer from "@/components/footer/footer";

export default async function HomePage (){
  return (
    <>
      <main className="container mx-auto px-4 py-8">
        <HeroBanner/>
        <GameCategories/>
        <FeaturedAccount/>
        <WhyChooseWe/>
        <CustomerReview/>
        <Subscribe/>
      </main>
      <Footer/>
    </>
  );
}