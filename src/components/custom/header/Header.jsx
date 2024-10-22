import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  ShoppingCart,
  Menu,
  X,
  ShoppingBasketIcon,
  Gift,
  Shirt,
  House,
} from "lucide-react";
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartTotalQuantity } from "@/redux/Slices/CartSlice";
import { motion, AnimatePresence } from "framer-motion";

function Header() {
  const { user, isSignedIn } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const totalQuantity = useSelector(selectCartTotalQuantity);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { icon: <House />, name: "Home", path: "/" },
    { icon: <Gift />, name: "Products", path: "/products" },
    { icon: <Shirt />, name: "MagicFit", path: "/magicFit" },
  ];

  const isHomePage = location.pathname === "/";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 overflow-hidden ${
        isScrolled || !isHomePage ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center p-4 md:p-6">
        <Link to="/" className="flex items-center">
          <h1
            className={`text-2xl md:text-3xl lg:text-4xl font-bold ${
              isScrolled || !isHomePage ? "text-gray-800" : "text-white"
            } transition-colors duration-300`}
          >
            Magic<span className="text-pink-500">Fit</span>
          </h1>
        </Link>

        <nav className="hidden md:flex gap-8 items-center">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`text-lg font-medium hover:text-pink-500 transition-colors ${
                location.pathname === item.path
                  ? "text-pink-500"
                  : isScrolled || !isHomePage
                  ? "text-gray-800"
                  : "text-white"
              }`}
            >
              {item.name}
            </Link>
          ))}
          <Link to="/cart" className="relative">
            <Button
              className={`${
                isScrolled || !isHomePage
                  ? "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  : "bg-white/20 text-white hover:bg-white/30"
              } rounded-full p-2`}
              aria-label="Cart"
            >
              <ShoppingCart size={24} />
            </Button>
            {totalQuantity > 0 && (
              <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {totalQuantity}
              </span>
            )}
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          {isSignedIn ? (
            <div className="hidden md:flex items-center gap-4">
              <span
                className={`font-medium ${
                  isScrolled || !isHomePage ? "text-gray-800" : "text-white"
                }`}
              >
                Welcome {user?.username || user?.firstName}!!
              </span>
              <UserButton />
            </div>
          ) : (
            <Link to="/auth/sign-in" className="hidden md:block">
              <Button className="bg-pink-500 text-white hover:bg-pink-600 rounded-full px-6 py-2">
                Get Started
              </Button>
            </Link>
          )}

          <button
            className={`md:hidden p-2 rounded-full ${
              isScrolled || !isHomePage
                ? "bg-gray-100 text-gray-800 hover:bg-gray-200"
                : "bg-white/20 text-white hover:bg-white/30"
            }`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile View */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full right-12 w-48 bg-white shadow-lg rounded-bl-lg overflow-hidden md:hidden rounded-xl "
          >
            <nav className="flex flex-col p-2 ">
              {isSignedIn ? (
                <div className="py-2 px-3 flex items-center gap-2 border-b border-gray-100">
                  <ClerkLoading>
                    <div className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-gray-500 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white" />
                  </ClerkLoading>
                  <ClerkLoaded>
                    <SignedIn>
                      <UserButton />
                      <span className="text-sm text-gray-700 truncate">
                        {user?.username || user?.firstName}
                      </span>
                    </SignedIn>
                  </ClerkLoaded>
                </div>
              ) : (
                <Link
                  to="/auth/sign-in"
                  className="py-2 px-3 text-pink-500 font-medium hover:bg-pink-50 rounded transition-colors"
                  onClick={toggleMenu}
                >
                  Get Started
                </Link>
              )}
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="py-2 px-3 flex items-center gap-3 text-gray-700 hover:bg-gray-50 rounded transition-colors"
                  onClick={toggleMenu}
                >
                  <span className="text-pink-500">{item.icon}</span>
                  <span className="text-sm">{item.name}</span>
                </Link>
              ))}
              <Link
                to="/cart"
                className="py-2 px-3 flex items-center gap-3 text-gray-700 hover:bg-gray-50 rounded transition-colors"
                onClick={toggleMenu}
              >
                <span className="text-pink-500 relative">
                  <ShoppingBasketIcon size={26} />
                  {totalQuantity > 0 && (
                    <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs font-bold w-4 h-4 flex items-center justify-center rounded-full">
                      {totalQuantity}
                    </span>
                  )}
                </span>
                <span className="text-sm">Cart</span>
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;
