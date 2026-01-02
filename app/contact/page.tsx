import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            <ContactSection />
            <Footer />
        </main>
    );
}
