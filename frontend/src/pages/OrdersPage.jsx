import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Get role
  const role = localStorage.getItem("role");

  // Dynamic API URL based on role
  const url =
    role === "admin"
      ? `${import.meta.env.VITE_API_URL || ""}/api/orders/all`
      : `${import.meta.env.VITE_API_URL || ""}/api/orders/myorders`;

  // Fetch orders
  const getOrders = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await axios.get(url, {
        headers: {
          authorization: localStorage.getItem("token")
        }
      });

      setOrders(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
      setError("Failed to load orders. Please try again.");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600">
          {role === "admin" ? "TOTAL ORDERS" : "MY ORDERS"}
        </h1>

        <button
          onClick={() =>
            navigate(role === "admin" ? "/Admin" : "/Home")
          }
          className="bg-blue-500 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-600"
        >
          ← {role === "admin" ? "Back to Products" : "Back to Home"}
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center items-center h-64">
          <p className="text-lg text-gray-500">Loading orders...</p>
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="text-center">
          <p className="text-red-500 font-semibold mb-4">{error}</p>
          <button
            onClick={getOrders}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg"
          >
            Retry
          </button>
        </div>
      )}

      {/* Empty */}
      {!loading && !error && orders.length === 0 && (
        <div className="text-center">
          <p className="text-gray-400 text-xl">No orders found.</p>
        </div>
      )}

      {/* Orders */}
      {!loading && !error && orders.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white shadow-lg rounded-xl p-6"
            >
              <h2 className="text-xl font-bold text-blue-600 mb-3">
                Order #{order._id?.slice(-6).toUpperCase()}
              </h2>

              {/* Show user details only for admin */}
              {role === "admin" && (
                <>
                  <p className="mb-2 text-gray-700">
                    <span className="font-semibold">User:</span>{" "}
                    {order.userId?.name || "N/A"}
                  </p>

                  <p className="mb-2 text-gray-700">
                    <span className="font-semibold">Email:</span>{" "}
                    {order.userId?.email || "N/A"}
                  </p>
                </>
              )}

              <p className="mb-2 text-gray-700">
                <span className="font-semibold">Product:</span>{" "}
                {order.productId?.name || "N/A"}
              </p>

              <p className="mb-2 text-gray-700">
                <span className="font-semibold">Quantity:</span>{" "}
                {order.quantity}
              </p>

              <p className="text-green-600 font-semibold">
                Price: ₹{order.productId?.price || "N/A"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrdersPage;