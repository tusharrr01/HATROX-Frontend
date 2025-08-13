import { useEffect, useState } from "react";
import axios from "axios";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/cart`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCartItems(res.data.items || []);
    } catch (err) {
      console.error("Error fetching cart:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId, change) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/cart/update`,
        { productId, change },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchCart();
    } catch (err) {
      console.error("Error updating quantity:", err);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading cart...</p>;

  if (cartItems.length === 0) {
    return (
      <>
        <Header />
        <div className="flex justify-center items-center h-[70vh]">
          <h2>Your cart is empty 🛒</h2>
        </div>
        <Footer />
      </>
    );
  }

  const firstItem = cartItems[0]; // In your EJS, it's only showing the first item
  const base64Image = firstItem?.image?.startsWith("data:")
    ? firstItem.image
    : `data:image/jpeg;base64,${firstItem?.image}`;

  return (
    <>
      <div className="w-full h-screen flex items-start px-20 py-20 gap-10">
        
        {/* Left side - Product Card */}
        <div className="w-[30%] rounded-md overflow-hidden">
          <div
            className="w-full h-80"
            style={{ backgroundColor: firstItem.bgcolor }}
          >
            <img
              className="h-[18rem] mx-auto object-contain"
              src={base64Image}
              alt={firstItem.name}
            />
          </div>

          <div
            className="w-full flex justify-between px-5 py-4"
            style={{ backgroundColor: firstItem.panelcolor }}
          >
            <h3 className="text-2xl">{firstItem.name}</h3>
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(firstItem._id, -1)}
                className="w-7 h-7 bg-white flex rounded-full items-center justify-center"
              >
                <i className="ri-subtract-line"></i>
              </button>
              <div className="px-2 py-1 rounded-md bg-white text-black">
                {firstItem.quantity || 1}
              </div>
              <button
                onClick={() => updateQuantity(firstItem._id, 1)}
                className="w-7 h-7 bg-white flex rounded-full items-center justify-center"
              >
                <i className="ri-add-line"></i>
              </button>
            </div>
          </div>

          <div
            className="flex text-white items-center justify-between px-5 py-3"
            style={{ backgroundColor: firstItem.textcolor }}
          >
            <h4 className="text-lg">Net Total</h4>
            <h2 className="text-lg">₹ {firstItem.price * (firstItem.quantity || 1)}</h2>
          </div>
        </div>

        {/* Right side - Price Breakdown */}
        <div className="w-[70%]">
          <h3 className="text-xl">Price Breakdown</h3>
          <div className="px-10 mt-5">
            <div className="flex mt-2">
              <h4 className="w-1/3">Total MRP</h4>
              <h4>₹ {firstItem.mrp || firstItem.price}</h4>
            </div>
            <div className="flex mt-2">
              <h4 className="w-1/3">Discount on MRP</h4>
              <h4>₹ {firstItem.discount || 0}</h4>
            </div>
            <div className="flex mt-2">
              <h4 className="w-1/3">Platform Fee</h4>
              <h4>₹ 20</h4>
            </div>
            <div className="flex mt-2">
              <h4 className="w-1/3">Shipping Fee</h4>
              <h4>FREE</h4>
            </div>
          </div>

          <div className="w-full h-[1px] bg-black mt-10"></div>
          <div className="flex mt-5">
            <h3 className="w-1/3 text-xl">Total Amount</h3>
            <h3 className="font-semibold text-xl text-green-600">
              ₹ {(firstItem.price * (firstItem.quantity || 1)) + 20}
            </h3>
          </div>
        </div>
      </div>

    </>
  );
}

export default Cart;
