import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Admin() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/products`);
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products", err);
    }
  };

  const deleteAllProducts = async () => {
    if (!window.confirm("Are you sure you want to delete all products?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/admin/products`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts([]);
    } catch (err) {
      console.error("Error deleting products", err);
    }
  };

  return (
    <>

      <div className="w-full h-screen flex items-start px-20 py-20">
        {/* Sidebar */}
        <div className="w-[25%] flex h-screen flex-col items-start">
          <div className="flex flex-col">
            <Link className="block w-fit mb-2" to="/admin">All Products</Link>
            <Link className="block w-fit mb-2" to="/admin/create-products">Create new product</Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-[75%] flex flex-col gap-5 h-screen">
          <button
            onClick={deleteAllProducts}
            className="text-red-500 text-left"
          >
            Delete all
          </button>

          {/* Product cards */}
          <div className="flex flex-wrap gap-5">
            {products.length === 0 ? (
              <p>No products found</p>
            ) : (
              products.map((product) => (
                <div key={product._id} className="w-60 bg-red-500">
                  <div
                    className="w-full h-52 bg-yellow-500"
                    style={{
                      backgroundImage: `url(${product.imageUrl})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  ></div>
                  <div className="flex justify-between items-center px-4 py-4">
                    <div>
                      <h3>{product.name}</h3>
                      <h4>₹ {product.price}</h4>
                    </div>
                    <button
                      onClick={() => navigate(`/admin/edit/${product._id}`)}
                      className="w-7 h-7 flex items-center justify-center rounded-full bg-white"
                    >
                      <i className="ri-add-line"></i>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

    </>
  );
}

export default Admin;
