import { useEffect, useMemo, useState } from "react";
import axios from "axios";

function Shop() {
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState("popular");
  const [loading, setLoading] = useState(true);
  const [banner, setBanner] = useState(""); // success banner message
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/shop`);
      console.log("Fetched products:", res.data);

      setProducts(res.data || []);
    } catch (e) {
      setError("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };


  const addToCart = async (productId) => {
    try {
      setError("");
      const token = localStorage.getItem("token");
      await axios.post(
        `${import.meta.env.VITE_API_URL}/shop/cart/add`,
        { productId, quantity: 1 },
        {
          withCredentials: true,
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );

      setBanner("Added to cart!");
      setTimeout(() => setBanner(""), 1500);
    } catch (e) {
      console.log(e);

      setError(e.response?.data?.message || "Failed to add to cart.");
      setTimeout(() => setError(""), 2000);
    }
  };

  return (
    <>

      {/* Success Banner */}
      <div
        className={`fixed bottom-5 right-5 px-4 py-2 rounded-md bg-blue-500 text-white shadow-lg transform transition-all duration-500 ease-in-out
              ${banner ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
        {banner}
      </div>

      {/* Error Toast */}
      <div
        className={`fixed bottom-5 right-5 px-4 py-2 rounded-md bg-red-500 text-white shadow-lg transform transition-all duration-500 ease-in-out
              ${error ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
        {error}
      </div>



      <div className="w-full  flex items-start px-20 py-20">
        {/* Sidebar */}
        <div className="w-[25%] flex  flex-col items-start">
          <div className="flex items-center gap-2">
            <h3>sort by</h3>
            <select
              className="border-[1px] px-2 py-1"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="popular">Popular</option>
              <option value="newest">Newest</option>
            </select>
          </div>

          <div className="flex flex-col mt-20">
            <a className="block w-fit mb-2" href="#">New Collection</a>
            <a className="block w-fit mb-2" href="#">All Products</a>
            <a className="block w-fit mb-2" href="#">Discounted Products</a>
          </div>

          <div className="mt-32">
            <a className="block w-fit mb-2" href="#">Filter by :</a>
            <a className="block w-fit mb-2" href="#">Availability</a>
            <a className="block w-fit mb-2" href="#">Discount</a>
          </div>
        </div>

        {/* Grid */}
        <div className="w-[75%] flex flex-col gap-5 ">
          {loading ? (
            <p>Loading products...</p>
          ) : (
            <div className="flex flex-wrap items-start gap-5">
              {products.map((product) => {
                const imgSrc = product.image?.startsWith("data:")
                  ? product.image
                  : `data:image/jpeg;base64,${product.image}`;
                return (
                  <div key={product._id} className="w-60">
                    <div
                      className="w-full h-52 flex items-center justify-center"
                      style={{ backgroundColor: product.bgcolor }}
                    >
                      <img className="h-[12rem]" src={imgSrc} alt={product.name} />
                    </div>

                    <div
                      className="flex justify-between items-center px-4 py-4"
                      style={{
                        backgroundColor: product.panelcolor,
                        color: product.textcolor,
                      }}
                    >
                      <div>
                        <h3>{product.name}</h3>
                        <h4>₹ {product.price}</h4>
                      </div>
                      <button
                        onClick={() => addToCart(product._id)}
                        className="w-7 h-7 flex items-center justify-center rounded-full bg-white"
                        title="Add to cart"
                      >
                        <i className="ri-add-line" />
                      </button>
                    </div>
                  </div>
                );
              })}
              {products.length === 0 && <p>No products available.</p>}
            </div>
          )}
        </div>
      </div>

    </>
  );
}

export default Shop;
