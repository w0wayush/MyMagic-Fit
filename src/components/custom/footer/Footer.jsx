import { FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";
import NewsletterSignup from "../newsletter/NewsLetter";
import { AnimatedSection } from "@/home/Home";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <AnimatedSection className="bg-gray-800 text-gray-300 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between gap-8 mb-8">
          <div className="w-full md:w-1/3 mb-8 md:mb-0">
            <h2 className="text-3xl font-semibold text-white mb-4">WeOffer</h2>
            <p className="mb-4 text-gray-400">
              At WeOffer, we're dedicated to bringing you the latest in fashion
              with a touch of excellence. Our curated collections blend style,
              quality, and comfort to ensure that every piece you choose is a
              perfect fit for your wardrobe.
            </p>
          </div>
          <div className="w-full md:w-1/3 mb-8 md:mb-0">
            <h2 className="text-xl font-semibold text-white mb-4">
              Quick Links
            </h2>
            <ul className="space-y-2">
              {["Home", "Products", "MagicFit", "Contact"].map((link) => (
                <li key={link}>
                  <Link
                    to={`/${link.toLowerCase()}`}
                    className="hover:text-indigo-400 transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full md:w-1/3">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Follow Us
            </h2>
            <div className="flex space-x-4">
              {[
                { Icon: FaGithub, url: "https://github.com" },
                { Icon: FaInstagram, url: "https://instagram.com" },
                { Icon: FaTwitter, url: "https://twitter.com" },
              ].map(({ Icon, url }) => (
                <a
                  key={url}
                  href={url}
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6">
          <div className="container mx-auto text-center">
            <p>&copy; 2024 WeOffer. All rights reserved.</p>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default Footer;
