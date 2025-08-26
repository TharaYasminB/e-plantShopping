import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "./CartSlice";

const ProductList = ({ plants }) => {
  const dispatch = useDispatch();

  // Access cart items from Redux store
  const cartItems = useSelector((state) => state.cart.items);

  // Add product to cart
  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  // Calculate total quantity of items in cart
  const calculateTotalQuantity = () => {
    return cartItems
      ? cartItems.reduce((total, item) => total + item.quantity, 0)
      : 0;
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">🌱 Paradise Nursery</h2>
      <div className="mb-4">
        🛒 Cart Items: <span className="font-semibold">{calculateTotalQuantity()}</span>
      </div>

      <div className="product-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {plants.map((plant) => {
          const isAdded = cartItems.some((item) => item.name === plant.name);

          return (
            <div
              key={plant.name}
              className="border rounded-lg p-4 shadow-md bg-white"
            >
              <img
                src={plant.image}
                alt={plant.name}
                className="w-full h-40 object-cover rounded"
              />
              <h3 className="text-lg font-semibold mt-2">{plant.name}</h3>
              <p className="text-sm text-gray-600">{plant.description}</p>
              <p className="font-medium mt-1">{plant.cost}</p>

              <button
                onClick={() => handleAddToCart(plant)}
                disabled={isAdded}
                className={`mt-3 w-full py-2 rounded ${
                  isAdded
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-600 text-white"
                }`}
              >
                {isAdded ? "✅ Added to Cart" : "➕ Add to Cart"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;
