import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/home/Home";
import { ArrowRight } from "lucide-react";
import React, { useState } from "react";

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Signed up with email: ${email}`);
    setEmail("");
  };

  return (
    <AnimatedSection className="bg-gray-900 py-10">
      <div className="container mx-auto px-5 text-center">
        <h2 className="title-font sm:text-3xl text-3xl mb-4 font-extrabold text-white">
          Subscribe to Our {/* <br className="hidden lg:inline-block" /> */}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            Newsletter
          </span>
        </h2>
        {/* <h2 className="text-3xl font-bold mb-6 text-white">
          Subscribe to Our Newsletter
        </h2> */}
        <p className="text-white mb-6">
          Stay updated with our latest news and special offers.
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row justify-center items-center gap-4"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="p-3 rounded-lg border border-gray-300 w-full md:w-1/2"
            required
          />
          <Button
            type="submit"
            className="bg-gradient-to-r from-purple-400 to-pink-600 text-white px-6 py-6 rounded-lg hover:bg-indigo-700 transition duration-300 sm:w-26 gap-1 text-center"
          >
            Subscribe
            <ArrowRight size={18} />
          </Button>
        </form>
      </div>
    </AnimatedSection>
  );
};

export default NewsletterSignup;
