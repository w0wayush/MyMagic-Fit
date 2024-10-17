import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ArrowRight, ShoppingCart, Eye, Sparkles, Star } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { addToCart } from "@/redux/Slices/CartSlice";
import { toast, Toaster } from "react-hot-toast";
import products from "../../../../data";

function FeaturedProducts() {
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    toast.success(`✨ ${product.name} added to your magical wardrobe!`, {
      style: {
        border: "1px solid #e9d5ff",
        padding: "16px",
        color: "#6b21a8",
      },
      iconTheme: {
        primary: "#a855f7",
        secondary: "#ffffff",
      },
    });
  };

  return (
    <section className="py-24 bg-gradient-to-b from-white to-purple-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-center mb-16 text-center md:text-left"
        >
          <div className="mb-6 md:mb-0">
            <div className="flex items-center gap-3 mb-4">
              <Star className="text-purple-600 fill-purple-600" size={24} />
              <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Magical Selections
              </h2>
            </div>
            <p className="text-gray-600 max-w-xl">
              Discover pieces that perfectly fit your style and shape,
              handpicked by our style enchanting algorithm.
            </p>
          </div>
          <Link
            to="/products"
            className="group flex items-center text-purple-600 hover:text-purple-700 transition-colors duration-300"
          >
            <span className="text-lg font-semibold mr-2">
              Explore Collection
            </span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.slice(0, 4).map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-purple-100 group"
            >
              <div className="relative h-72 overflow-hidden">
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-white/90 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-medium text-purple-600 flex items-center gap-1">
                    <Sparkles size={14} className="text-purple-600" />
                    Perfect Fit
                  </span>
                </div>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 ease-in-out transform group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/70 via-purple-900/50 to-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="space-y-3 ">
                    <Link to={`/product-details/${product.id}`}>
                      <Button
                        size="lg"
                        variant="secondary"
                        className="w-full md:w-32 mr-2 bg-white/90 hover:bg-white text-purple-600 hover:text-purple-700"
                      >
                        <Eye size={18} className="mr-2" color="purple" /> Quick
                        View
                      </Button>
                    </Link>
                    <Button
                      size="lg"
                      onClick={() => handleAddToCart(product)}
                      className="w-full md:w-32 bg-purple-600 hover:bg-purple-700 text-white"
                    >
                      <ShoppingCart size={18} className="mr-2" /> Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h3>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-gray-600">Size: {product.defaultSize}</p>
                  <p className="text-purple-600 font-bold text-2xl">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-current" />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <Link
            to="/products"
            className="inline-flex items-center space-x-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl group"
          >
            <Sparkles size={20} />
            <span className="font-medium">Discover Your Perfect Fit</span>
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform duration-300"
            />
          </Link>
        </motion.div>
      </div>
      <Toaster position="bottom-right" />
    </section>
  );
}

export default FeaturedProducts;
