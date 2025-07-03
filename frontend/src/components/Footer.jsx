import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
    const quickLinks = [
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
        { name: "Contact", path: "/contact" },
        { name: "Privacy", path: "/privacy" },
        { name: "Terms", path: "/terms" },
    ];

    const socialLinks = [
        { icon: <FaFacebook size={20} />, href: "#", label: "Facebook" },
        { icon: <FaTwitter size={20} />, href: "#", label: "Twitter" },
        { icon: <FaInstagram size={20} />, href: "#", label: "Instagram" },
        { icon: <FaLinkedin size={20} />, href: "#", label: "LinkedIn" },
    ];

    return (
        <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Logo and Description */}
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center mb-4">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-2">
                                <span className="text-white font-bold text-lg">
                                    B
                                </span>
                            </div>
                            <span className="text-xl font-bold">
                                SecureBank
                            </span>
                        </div>
                        <p className="text-gray-400 mb-4 max-w-md">
                            Your trusted financial partner providing secure,
                            innovative banking solutions for individuals and
                            businesses since 1995.
                        </p>
                        <div className="flex space-x-4">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    aria-label={social.label}
                                    className="text-gray-400 hover:text-blue-400 transition-colors"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">
                            Quick Links
                        </h3>
                        <ul className="space-y-2">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.path}
                                        className="text-gray-400 hover:text-white transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contact</h3>
                        <div className="space-y-2 text-gray-400">
                            <p>1-800-SECURE-1</p>
                            <p>support@securebank.com</p>
                            <p>
                                123 Banking Street
                                <br />
                                Financial District
                                <br />
                                New York, NY 10001
                            </p>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                    <p>&copy; 2024 SecureBank. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
