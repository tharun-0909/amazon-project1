import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});

  // Fetch single product
  const getProduct = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API}/products/${id}`
      );
      setProduct(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  // Confirm Purchase and save order
  const confirmPurchase = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API}/orders`,
        {
          productId: product._id,
          quantity: 1
        },
        {
          headers: {
            authorization: localStorage.getItem("token")
          }
        }
      );

      alert("Order Placed Successfully");

      // Navigate to order placed page
      navigate("/orderplaced");

    } catch (error) {
      console.log(error);
      alert("Purchase Failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">

      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8">

        {/* Product Image */}
        <img
          src={product.image || "https://via.placeholder.com/300"}
          alt={product.name}
          className="w-full h-64 object-cover rounded-xl mb-6"
        />

        {/* Product Name */}
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-4">
          {product.name}
        </h1>

        {/* Product Price */}
        <p className="text-green-600 text-lg font-semibold mb-2">
          Price: ₹{product.price}
        </p>

        {/* Product Rating */}
        <p className="text-yellow-500 text-lg mb-6">
          ⭐ Rating: {product.rating}
        </p>

        {/* Confirm Button */}
        <button
          onClick={confirmPurchase}
          className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700"
        >
          Confirm Purchase
        </button>

      </div>

    </div>
  );
}

export default ProductDetails;