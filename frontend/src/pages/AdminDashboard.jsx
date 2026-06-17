import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    productId: "",
    name: "",
    price: "",
    rating: "",
    image: ""
  });

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  // Fetch products
  const getProducts = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API}/products`);
    setProducts(res.data);
  };

  useEffect(() => {
    getProducts();
  }, []);

  // Add product
  const addProduct = async () => {
    await axios.post(
      `${import.meta.env.VITE_API}/products`,
      product,
      {
        headers: {
          authorization: localStorage.getItem("token")
        }
      }
    );

    alert("Product Added");

    setProduct({
      productId: "",
      name: "",
      price: "",
      rating: "",
      image: ""
    });

    getProducts();
  };

  // Delete product
  const deleteProduct = async (id) => {
    await axios.delete(
      `${import.meta.env.VITE_API}/products/${id}`,
      {
        headers: {
          authorization: localStorage.getItem("token")
        }
      }
    );

    alert("Product Deleted");
    getProducts();
  };

  // Update price
  const updatePrice = async (id, oldPrice) => {
    const newPrice = prompt("Enter new price:", oldPrice);

    await axios.put(
      `${import.meta.env.VITE_API}/products/${id}`,
      { price: newPrice },
      {
        headers: {
          authorization: localStorage.getItem("token")
        }
      }
    );

    alert("Price Updated");
    getProducts();
  };

  return (
    <div className="min-h-screen bg-blue-50 p-8">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold text-blue-600">
          Admin Dashboard
        </h1>

        <div className="flex gap-3">

  <button
    onClick={() => navigate("/orders")}
    className="bg-green-500 text-white px-5 py-2 rounded-lg font-semibold hover:bg-green-600"
  >
    Orders List
  </button>

  <button
    onClick={logout}
    className="bg-red-500 text-white px-5 py-2 rounded-lg font-semibold hover:bg-red-600"
  >
    Logout
  </button>

</div>

      </div>

      {/* Add Product Form */}
      <div className="max-w-xl mx-auto bg-white shadow-xl rounded-xl p-6 mb-10">

        <h2 className="text-2xl font-bold text-blue-500 mb-6 text-center">
          Add Product
        </h2>

        <div className="space-y-4">

          <input
            value={product.productId}
            placeholder="Product ID"
            onChange={(e) =>
              setProduct({ ...product, productId: e.target.value })
            }
            className="w-full border p-3 rounded-lg"
          />

          <input
            value={product.name}
            placeholder="Product Name"
            onChange={(e) =>
              setProduct({ ...product, name: e.target.value })
            }
            className="w-full border p-3 rounded-lg"
          />

          <input
            value={product.price}
            placeholder="Product Price"
            onChange={(e) =>
              setProduct({ ...product, price: e.target.value })
            }
            className="w-full border p-3 rounded-lg"
          />

          <input
            value={product.rating}
            placeholder="Product Rating"
            onChange={(e) =>
              setProduct({ ...product, rating: e.target.value })
            }
            className="w-full border p-3 rounded-lg"
          />

          <input
            value={product.image}
            placeholder="Image URL"
            onChange={(e) =>
              setProduct({ ...product, image: e.target.value })
            }
            className="w-full border p-3 rounded-lg"
          />

          <button
            onClick={addProduct}
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            Add Product
          </button>

        </div>
      </div>

      {/* Product List */}
      <h2 className="text-3xl font-bold text-blue-600 text-center mb-8">
        All Products
      </h2>

      {/* Product Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {products.map((p) => (
          <div
            key={p._id}
            className="bg-white shadow-lg rounded-xl p-5"
          >
            <img
              src={p.image || "https://via.placeholder.com/250"}
              alt={p.name}
              className="w-full h-52 object-cover rounded-lg mb-4"
            />

            <h3 className="text-xl font-bold text-blue-600 mb-2">
              {p.name}
            </h3>

            <p className="text-green-600 font-semibold mb-2">
              Price: ₹{p.price}
            </p>

            <p className="text-yellow-500 font-semibold mb-4">
              ⭐ Rating: {p.rating}
            </p>

            <div className="flex gap-3">

              <button
                onClick={() => updatePrice(p._id, p.price)}
                className="flex-1 bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600"
              >
                Update
              </button>

              <button
                onClick={() => deleteProduct(p._id)}
                className="flex-1 bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"
              >
                Delete
              </button>

            </div>
          </div>
        ))}

      </div>

    </div>
  );
}

export default AdminDashboard;