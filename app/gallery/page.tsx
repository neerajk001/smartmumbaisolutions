import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GallerySection from "@/components/GallerySection";

export default function GalleryPage() {
    return (
        <main className="min-h-screen bg-[#FCF8F8]">
            <Navbar />
            <div className="pt-10">
                <GallerySection />
            </div>
            <Footer />
        </main>
    );
}
