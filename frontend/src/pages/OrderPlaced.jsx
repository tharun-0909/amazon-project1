import { Link } from "react-router-dom";

function OrderPlaced() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-green-100">

      <div className="bg-white shadow-xl rounded-xl p-8 text-center">

        <h1 className="text-3xl font-bold text-green-600 mb-4">
          Order Placed Successfully
        </h1>

        <p className="text-gray-600 mb-6">
          Your product has been ordered.
        </p>

        <Link
          to="/home"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          Back to Home
        </Link>

      </div>

    </div>
  );
}

export default OrderPlaced;