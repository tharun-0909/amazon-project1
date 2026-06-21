import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getProducts();
  }, []);

  // Fetch products
  const getProducts = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL || ""}/api/products`
      );

      setProducts(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to fetch products:", err);
      setError(
        "Failed to load products. Please check your connection and try again."
      );
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600">
          Amazon Products
        </h1>

        <div className="flex gap-3">
            <button
    onClick={() => navigate("/account")}
    className="bg-purple-500 text-white px-5 py-2 rounded-lg font-semibold hover:bg-purple-600"
  >
    My Account
  </button>
          <button
            onClick={() => navigate("/orders")}
            className="bg-green-500 text-white px-5 py-2 rounded-lg font-semibold hover:bg-green-600"
          >
            My Orders
          </button>

          <button
            onClick={logout}
            className="bg-red-500 text-white px-5 py-2 rounded-lg font-semibold hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-500 text-lg">Loading products...</p>
          </div>
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="flex flex-col items-center justify-center h-64">
          <p className="text-red-500 text-lg font-semibold mb-4">
            {error}
          </p>

          <button
            onClick={getProducts}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      )}

      {/* Empty */}
      {!loading && !error && products.length === 0 && (
        <div className="flex flex-col items-center justify-center h-64">
          <p className="text-gray-400 text-xl">
            No products available yet.
          </p>
        </div>
      )}

      {/* Products */}
      {!loading && !error && products.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white shadow-lg rounded-xl p-5 text-center"
            >
              {/* Image */}
              <img
                src={product.image || "https://via.placeholder.com/200"}
                alt={product.name}
                className="w-full h-52 object-cover rounded-lg mb-4"
              />

              {/* Name */}
              <h2 className="text-xl font-bold text-blue-600 mb-2">
                {product.name}
              </h2>

              {/* Price */}
              <p className="text-green-600 text-lg font-semibold mb-2">
                ₹{product.price}
              </p>

              {/* Rating */}
              <p className="text-yellow-500 font-semibold mb-4">
                ⭐ {product.rating}
              </p>

              {/* Buy */}
              <button
                onClick={() => navigate(`/product/${product._id}`)}
                className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600"
              >
                Buy Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;