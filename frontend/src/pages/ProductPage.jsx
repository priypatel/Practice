import React, { useEffect, useState } from "react";
import api from "../api/axios";
export default function ProductPage() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data.product);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-4"
            >
              <div className="h-40 bg-gray-200 flex items-center justify-center rounded-md mb-4">
                {" "}
                <span className="text-gray-500 text-sm">{item.imageUrl}</span>
              </div>
              <h2 className="text-lg font-semibold">{item.name}</h2>

              <p className="text-gray-600 text-sm mt-1">{item.description}</p>

              <div className="flex justify-between items-center mt-4">
                <span className="text-xl font-bold text-green-600">
                  ₹{item.price}
                </span>

                <button className="bg-black text-white px-3 py-1 rounded hover:bg-gray-800">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
