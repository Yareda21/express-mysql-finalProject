"use client";

export default function HeroSection({ title, subtitle, ctaText, onCtaClick }) {
    return (
        <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
            <div className="absolute inset-0 bg-black opacity-20"></div>
            <div
                className="relative min-h-[600px] flex items-center justify-center bg-cover bg-center"
                style={{
                    backgroundImage:
                        "url('/placeholder.svg?height=600&width=1200')",
                }}
            >
                <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                        {title || "Welcome to SecureBank"}
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 text-blue-100">
                        {subtitle || "Secure, Fast, and Personalized Banking"}
                    </p>
                    <button
                        onClick={onCtaClick}
                        className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transform hover:scale-105 transition-all duration-200 shadow-lg"
                    >
                        {ctaText || "Get Started"}
                    </button>
                </div>
            </div>
        </section>
    );
}
