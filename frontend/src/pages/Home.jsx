import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getProducts();
  }, []);

  // Fetch products
  const getProducts = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API}/products`);
    setProducts(res.data);
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

        <button
          onClick={logout}
          className="bg-red-500 text-white px-5 py-2 rounded-lg font-semibold hover:bg-red-600"
        >
          Logout
        </button>

      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white shadow-lg rounded-xl p-5 text-center"
          >
            {/* Product Image */}
            <img
              src={
                product.image ||
                "https://via.placeholder.com/200"
              }
              alt={product.name}
              className="w-full h-52 object-cover rounded-lg mb-4"
            />

            {/* Product Name */}
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

            {/* Buy Button */}
            <button
              onClick={() => navigate(`/product/${product._id}`)}
              className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600"
            >
              Buy Now
            </button>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Home;