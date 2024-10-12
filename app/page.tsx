import Hero from "./_components/home/Hero";
import ProductCarousel from "./_components/home/ProductCarousel";
import Categories from "./_components/home/Categories";
import Deals from "./_components/home/Deals";
import BrandsPage from "./_components/home/BrandsPage";
import BlogPosts from "./_components/home/BlogPosts";

export default async function Home() {
  return (
    <div className="w-full">
      <Hero />
      <Categories />
      <Deals />
      <ProductCarousel />
      <BrandsPage />
      <BlogPosts />
    </div>
  );
}
