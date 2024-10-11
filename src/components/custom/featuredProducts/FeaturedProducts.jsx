import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ArrowRight, ShoppingCart, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { addToCart } from "@/redux/Slices/CartSlice";
import { toast, Toaster } from "react-hot-toast";
import products from "../../../../data";

function FeaturedProducts() {
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    toast.success(`${product.name} added to your cart!`);
  };

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-between items-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900">
            Featured Products
          </h2>
          <Link
            to="/products"
            className="flex items-center text-pink-500 hover:text-pink-600 transition-colors duration-300"
          >
            <span className="text-lg font-semibold mr-2">View More</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.slice(0, 4).map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <Link to={`/product-details/${product.id}`}>
                    <Button size="sm" variant="secondary" className="mr-2">
                      <Eye size={18} className="mr-1" /> View
                    </Button>
                  </Link>
                  <Button size="sm" onClick={() => handleAddToCart(product)}>
                    <ShoppingCart size={18} className="mr-1" /> Add to Cart
                  </Button>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 mb-2">
                  Size: {product.defaultSize}
                </p>
                <p className="text-pink-500 font-bold text-2xl">
                  ${product.price.toFixed(2)}
                </p>
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
            className="inline-flex items-center space-x-2 bg-pink-500 text-white px-8 py-3 rounded-full hover:bg-pink-600 transition-colors duration-300"
          >
            <span>Explore All Products</span>
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
      <Toaster />
    </section>
  );
}

export default FeaturedProducts;
