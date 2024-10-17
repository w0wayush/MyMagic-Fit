import React, { useEffect, useState } from "react";
import {
  Sparkles,
  ArrowRight,
  Heart,
  Eye,
  ShoppingBag,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import products from "../../../../data";

function CollectionCard({ collection, index }) {
  const [isLiked, setIsLiked] = React.useState(false);
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
    <div className="group relative bg-white rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-2xl">
      <div className="aspect-[4/5] relative overflow-hidden">
        <img
          src={collection.image}
          alt={collection.title}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Floating category badge */}
        <div className="absolute top-6 left-6">
          <Badge className="bg-white/90 text-purple-700 backdrop-blur-sm border-none px-4 py-1.5">
            {collection.category}
          </Badge>
        </div>

        {/* Quick action buttons */}
        <div className="absolute top-6 right-6 flex flex-col gap-3">
          <button
            onClick={() => setIsLiked(!isLiked)}
            className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-300"
          >
            <Heart
              className={`w-5 h-5 transition-colors ${
                isLiked ? "fill-red-500 text-red-500" : "text-gray-700"
              }`}
            />
          </button>
          <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-300">
            <Share2 className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        {/* Overlay content */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {collection.name}
                  </h3>
                  <p className="text-white/90 text-lg font-semibold">
                    {collection.price}
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="flex items-center gap-1 text-white/90">
                    <Eye className="w-4 h-4" />
                    <span className="text-sm">{collection.stats.views}</span>
                  </div>
                  <div className="flex items-center gap-1 text-white/90">
                    <Heart className="w-4 h-4" />
                    <span className="text-sm">{collection.stats.likes}</span>
                  </div>
                </div>
              </div>
              <p className="text-white/80 line-clamp-2">
                {collection.description}
              </p>
              <div className="flex gap-3">
                <Button
                  className="flex-1 bg-white text-purple-700 hover:bg-white/90"
                  size="lg"
                  onClick={() => handleAddToCart(collection)}
                >
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
                <Link to={"/products"}>
                  <Button
                    variant="outline"
                    className="bg-transparent border-white text-white hover:bg-white/20 hover:text-white"
                    size="lg"
                  >
                    Details
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Gallery() {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const data = products.slice(-3);
    setCollections(data);
  }, []);
  return (
    <section className="py-20 bg-gradient-to-b from-purple-50 to-pink-50">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <Badge className="bg-purple-200 text-purple-700 hover:text-white hover:bg-black border-none px-4 py-1.5 mb-6">
            New Collection
          </Badge>
          <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
            Discover Your Perfect Style
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Experience the perfect blend of comfort and style with our magical
            collection. Each piece is crafted to transform your wardrobe and
            enhance your confidence.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map((collection, index) => (
            <CollectionCard key={index} collection={collection} index={index} />
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-20 text-center">
          <Link to="/products">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              View All Collections
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
