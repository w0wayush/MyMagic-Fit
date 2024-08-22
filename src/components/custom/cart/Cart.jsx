import { useSelector, useDispatch } from "react-redux";
import {
  clearCart,
  removeFromCart,
  updateQuantity,
} from "@/redux/Slices/CartSlice";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
const stripePromise = loadStripe(PUBLISHABLE_KEY);

const CartItem = ({ item, onRemove, onUpdateQuantity }) => {
  const handleDecrement = () => onUpdateQuantity(item.id, item.quantity - 1);
  const handleIncrement = () => onUpdateQuantity(item.id, item.quantity + 1);

  return (
    <div className="md:flex items-stretch py-8 md:py-10 lg:py-8 border-t border-gray-50">
      <div className="md:w-4/12 2xl:w-1/4 w-full">
        <img
          src={item.image}
          alt={item.name}
          className="h-full object-center object-cover md:block hidden"
        />
        <img
          src={item.image}
          alt={item.name}
          className="md:hidden w-full h-full object-center object-cover"
        />
      </div>
      <div className="md:pl-3 md:w-8/12 2xl:w-3/4 flex flex-col justify-center">
        <p className="text-xs leading-3 text-gray-800 md:pt-0 pt-4">
          {item.code}
        </p>
        <div className="flex items-center justify-between w-full">
          <p className="text-base font-black leading-none text-gray-800">
            {item.name}
          </p>
          <div className="flex items-center">
            <button onClick={handleDecrement} className="px-2 py-1 border">
              -
            </button>
            <span className="mx-2">{item.quantity}</span>
            <button onClick={handleIncrement} className="px-2 py-1 border">
              +
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between pt-5">
          <Button
            className="text-xs leading-3 bg-red-500 pl-5 cursor-pointer hover:bg-red-700"
            onClick={() => onRemove(item.id)}
          >
            Remove
          </Button>
          <p className="text-base font-black leading-none text-gray-800">
            ${(item.price * item.quantity).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

function Cart() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const {
    items: cartItems,
    totalQuantity,
    totalPrice,
  } = useSelector((state) => state.cart);

  const [shippingCost, setShippingCost] = useState(10.0);

  const handleRemoveFromCart = (id) => dispatch(removeFromCart(id));
  const handleClearCart = () => dispatch(clearCart());
  const handleUpdateQuantity = (id, quantity) =>
    dispatch(updateQuantity({ id, quantity: Math.max(1, quantity) }));

  const handleShippingChange = (event) => {
    const selectedOption = event.target.value;
    switch (selectedOption) {
      case "Standard shipping - $10.00":
        setShippingCost(10.0);
        break;
      case "Expedited shipping - $20.00":
        setShippingCost(20.0);
        break;
      case "Overnight shipping - $30.00":
        setShippingCost(30.0);
        break;
      default:
        setShippingCost(10.0);
    }
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    setLoading(true);
    const stripe = await stripePromise;

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_URL}/api/v1/payment`,
        {
          items: cartItems,
          shippingCost,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const session = response.data;

      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        toast.error(result.error.message);
      }
    } catch (error) {
      toast.error("Error during checkout. Please try again.");
      console.error("Error during checkout:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <div className="sm:flex shadow-md my-10">
        <div className="w-full sm:w-3/4 bg-white px-10 py-10">
          <div className="flex justify-between border-b pb-8">
            <h1 className="font-semibold text-2xl">Shopping Cart</h1>
            <h2 className="font-semibold text-2xl">{totalQuantity} Items</h2>
          </div>

          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onRemove={handleRemoveFromCart}
                onUpdateQuantity={handleUpdateQuantity}
              />
            ))
          ) : (
            <p className="text-center py-6 text-gray-600">
              Your cart is empty.
            </p>
          )}

          <Link
            to={"/"}
            className="flex font-semibold text-indigo-600 text-sm mt-10"
          >
            <ArrowLeft />
            Continue Shopping
          </Link>
        </div>

        <div
          id="summary"
          className="w-full sm:w-1/4 md:w-1/2 px-8 py-10 bg-gray-100"
        >
          <h1 className="font-semibold text-2xl border-b pb-8">
            Order Summary
          </h1>
          <div className="flex justify-between mt-10 mb-5">
            <span className="font-semibold text-sm uppercase">
              Items {totalQuantity}
            </span>
            <span className="font-semibold text-sm">
              ${totalPrice.toFixed(2)}
            </span>
          </div>
          <div>
            <label className="font-medium inline-block mb-3 text-sm uppercase">
              Shipping
            </label>
            <select
              className="block p-2 text-gray-600 w-full text-sm"
              onChange={handleShippingChange}
            >
              <option value="Standard shipping - $10.00">
                Standard shipping - $10.00
              </option>
              <option value="Expedited shipping - $20.00">
                Expedited shipping - $20.00
              </option>
              <option value="Overnight shipping - $30.00">
                Overnight shipping - $30.00
              </option>
            </select>
          </div>

          <div className="border-t mt-8">
            <div className="flex font-semibold justify-between py-6 text-sm uppercase">
              <span>Total cost</span>
              <span>${(totalPrice + shippingCost).toFixed(2)}</span>
            </div>
            <button
              className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full"
              onClick={handleCheckout}
              disabled={loading}
            >
              {loading ? <div>Loading...</div> : "Checkout"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
