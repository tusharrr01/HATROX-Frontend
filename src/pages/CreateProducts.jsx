import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function CreateProducts() {
  const [image, setImage] = useState(null);
  const [form, setForm] = useState({
    name: "",
    price: "",
    discount: "",
    bgcolor: "",
    panelcolor: "",
    textcolor: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  // Optionally read ?success= message from query (if coming from redirect)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const msg = params.get("success");
    if (msg) setSuccess(msg);
  }, [location.search]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFile = e => {
    setImage(e.target.files?.[0] || null);
  };

  const onSubmit = async e => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    setSuccess("");

    try {
      const data = new FormData();
      if (image) data.append("image", image);
      data.append("name", form.name);
      data.append("price", form.price);
      data.append("discount", form.discount);
      data.append("bgcolor", form.bgcolor);
      data.append("panelcolor", form.panelcolor);
      data.append("textcolor", form.textcolor);

      const token = localStorage.getItem("token");
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/products/create`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Show success and reset form
      setSuccess("Product created successfully");
      setForm({
        name: "",
        price: "",
        discount: "",
        bgcolor: "",
        panelcolor: "",
        textcolor: "",
      });
      setImage(null);
      // Optionally navigate to admin list:
      // navigate("/admin?success=Product%20created%20successfully");
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.message ||
        "Failed to create product";
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>

      {/* Success banner */}
      {success && (
        <div className="absolute top-5 left-1/2 -translate-x-1/2 -translate-y-1/2 p-3 rounded-md bg-blue-500">
          <span className="inline-block mt-1 mb-1 text-white">{success}</span>
        </div>
      )}
      {error && (
        <div className="absolute top-5 left-1/2 -translate-x-1/2 -translate-y-1/2 p-3 rounded-md bg-red-500">
          <span className="inline-block mt-1 mb-1 text-white">{error}</span>
        </div>
      )}

      <div className="min-h-screen flex flex-col">
        <div className="container px-10 py-20 flex flex-grow">
          {/* Sidebar */}
          <div className="w-[25%] flex h-screen flex-col items-start">
            <div className="flex flex-col">
              <Link className="block w-fit mb-2" to="/admin">
                All Products
              </Link>
              <Link className="block w-fit mb-2" to="/admin/create-products">
                Create new product
              </Link>
            </div>
          </div>

          {/* Main */}
          <main className="w-3/4 bg-white p-8 shadow ml-4">
            <h2 className="text-xl font-bold mb-4">Create New Product</h2>

            <form autoComplete="off" onSubmit={onSubmit}>
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Product Details</h3>

                <div className="mb-4">
                  <label className="block mb-2 font-medium">
                    Product Image <sup>size must be 8x10</sup>
                  </label>
                  <input
                    name="image"
                    type="file"
                    className="py-2 px-4 rounded"
                    onChange={handleFile}
                    accept="image/*"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <input
                    name="name"
                    type="text"
                    placeholder="Product Name"
                    className="border p-2 rounded w-full"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                  <input
                    name="price"
                    type="number"
                    step="0.01"
                    placeholder="Product Price"
                    className="border p-2 rounded w-full"
                    value={form.price}
                    onChange={handleChange}
                    required
                  />
                  <input
                    name="discount"
                    type="number"
                    step="0.01"
                    placeholder="Discount Price"
                    className="border p-2 rounded w-full"
                    value={form.discount}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Panel Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    name="bgcolor"
                    type="text"
                    placeholder="Background Color (e.g. #f5f5f5 or rgb(...))"
                    className="border p-2 rounded w-full"
                    value={form.bgcolor}
                    onChange={handleChange}
                  />
                  <input
                    name="panelcolor"
                    type="text"
                    placeholder="Panel Color"
                    className="border p-2 rounded w-full"
                    value={form.panelcolor}
                    onChange={handleChange}
                  />
                  <input
                    name="textcolor"
                    type="text"
                    placeholder="Text Color"
                    className="border p-2 rounded w-full"
                    value={form.textcolor}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="px-5 py-2 rounded mt-3 bg-blue-500 text-white disabled:opacity-60"
                disabled={submitting}
              >
                {submitting ? "Creating..." : "Create New Product"}
              </button>
            </form>
          </main>
        </div>
      </div>

    </>
  );
}

export default CreateProducts;
