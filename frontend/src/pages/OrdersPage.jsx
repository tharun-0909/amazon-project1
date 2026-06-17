import axios from "axios";
import { useEffect, useState } from "react";

function OrdersPage() {
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_API}/orders`,
      {
        headers: {
          authorization: localStorage.getItem("token")
        }
      }
    );

    setOrders(res.data);
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
  <div className="min-h-screen bg-gray-100 p-8">

    <h1 className="text-4xl font-bold text-blue-600 text-center mb-8">
      Orders List
    </h1>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      {orders.map((order) => (
        <div
          key={order._id}
          className="bg-white shadow-lg rounded-xl p-6"
        >
          <h2 className="text-xl font-bold text-blue-600 mb-3">
            User: {order.userId?.name}
          </h2>

          <p className="mb-2">
            Product ID: {order.productId?.productId}
          </p>

          <p className="mb-2">
            Product Name: {order.productId?.name}
          </p>

          <p className="text-green-600 font-semibold">
            Price: ₹{order.productId?.price}
          </p>
        </div>
      ))}

    </div>

  </div>
);
}

export default OrdersPage;