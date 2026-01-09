
import ServiceCard from "./ServiceCard";
import { Wallet, CreditCard, ArrowRightLeft, PiggyBank } from "lucide-react";

export default function ServicesOverview() {
    const services = [
        {
            icon: <PiggyBank className="w-8 h-8 text-blue-600" />,
            title: "Savings Accounts",
            description:
                "High-yield savings accounts with competitive interest rates and no monthly fees.",
        },
        {
            icon: <Wallet className="w-8 h-8 text-blue-600" />,
            title: "Checking Accounts",
            description:
                "Free checking accounts with unlimited transactions and nationwide ATM access.",
        },
        {
            icon: <ArrowRightLeft className="w-8 h-8 text-blue-600" />,
            title: "Online Transfers",
            description:
                "Instant transfers between accounts and to other banks with advanced security.",
        },
        {
            icon: <CreditCard className="w-8 h-8 text-blue-600" />,
            title: "Credit Cards",
            description:
                "Reward credit cards with cashback, travel points, and fraud protection.",
        },
    ];

    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Our Banking Services
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Comprehensive financial solutions designed to meet all
                        your banking needs
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, index) => (
                        <ServiceCard
                            key={index}
                            icon={service.icon}
                            title={service.title}
                            description={service.description}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
