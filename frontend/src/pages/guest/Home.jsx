import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import HeroSection from "../../components/HeroSection";
import ServicesOverview from "../../components/ServiceOverview";
import WhyChooseUs from "../../components/WhyChooseUs";
import ThreeJSPreview from "../../components/ThreeJSPreview";
import Footer from "../../components/Footer";

export default function Home() {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate("/auth/login");
    };

    return (
        <div className="min-h-screen">
            <Header />

            <HeroSection
                title="Welcome to SecureBank"
                subtitle="Secure, Fast, and Personalized Banking"
                ctaText="Get Started"
                onCtaClick={handleGetStarted}
            />

            <ServicesOverview />

            <WhyChooseUs />

            <ThreeJSPreview />

            <Footer />
        </div>
    );
}
