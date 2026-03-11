import Navbar from "@/components/Navbar";
import HeroSlider from "@/components/HeroSlider";
import Introduction from "@/components/Introduction";
import ProductShowcase from "@/components/ProductShowcase";
import WhyChooseUs from "@/components/WhyChooseUs";
import VisionMission from "@/components/VisionMission";
import FeaturedImages from "@/components/FeaturedImages";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FCF8F8]">
      <Navbar />
      <HeroSlider />
      <Introduction />
      <ProductShowcase />
      <WhyChooseUs />
      <VisionMission />

      <FAQSection />
      <Footer />
    </main>
  );
}
