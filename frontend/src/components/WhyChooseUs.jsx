import { Shield, Clock, TrendingUp, Smartphone } from "lucide-react";

export default function WhyChooseUs({ features }) {
    const defaultFeatures = [
        {
            icon: <Shield className="w-12 h-12 text-blue-600" />,
            title: "Security",
            description: "256-bit encryption & fraud monitoring",
        },
        {
            icon: <Clock className="w-12 h-12 text-blue-600" />,
            title: "24/7 Support",
            description: "Live chat and phone support, anytime",
        },
        {
            icon: <TrendingUp className="w-12 h-12 text-blue-600" />,
            title: "Competitive Rates",
            description: "High-yield savings & low fees",
        },
        {
            icon: <Smartphone className="w-12 h-12 text-blue-600" />,
            title: "Easy Access",
            description: "Online, mobile, and branch banking",
        },
    ];

    const displayFeatures = features || defaultFeatures;

    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Why Choose SecureBank?
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        We're committed to providing you with the best banking
                        experience
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {displayFeatures.map((feature, index) => (
                        <div key={index} className="text-center group">
                            <div className="flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
