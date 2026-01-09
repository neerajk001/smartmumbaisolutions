import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            <div className="w-[90%] max-w-[1200px] mx-auto mt-8 mb-16">
                <ContactSection />
            </div>
            <Footer />
        </main>
    );
}
