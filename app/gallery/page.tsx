import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GallerySection from "@/components/GallerySection";

export default function GalleryPage() {
    return (
        <main className="min-h-screen bg-[#FCF8F8]">
            <Navbar />
            <div className="w-[90%] max-w-[1200px] mx-auto pt-10">
                <GallerySection />
            </div>
            <Footer />
        </main>
    );
}
