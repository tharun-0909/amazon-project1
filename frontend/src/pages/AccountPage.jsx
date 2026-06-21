import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AccountPage() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL || ""}/api/auth/me`,
        {
          headers: {
            authorization: localStorage.getItem("token")
          }
        }
      );

      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-xl p-8 w-96">
        <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
          My Account
        </h1>

        <p className="mb-4 text-gray-700">
          <span className="font-semibold">Username:</span> {user.name}
        </p>

        <p className="mb-6 text-gray-700">
          <span className="font-semibold">Email:</span> {user.email}
        </p>

        <button
          onClick={() => navigate("/home")}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default AccountPage;