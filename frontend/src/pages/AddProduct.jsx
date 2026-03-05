import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function AddProduct() {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const fetchProducts = async () => {
    const res = await api.get("/products");
    setProducts(res.data.product);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      description: "",
      imageUrl: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name required"),
      price: Yup.number().required("Price required"),
      description: Yup.string().required("Description required"),
      imageUrl: Yup.string().required("Image required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        if (editingId) {
          await api.put(`/products/${editingId}`, values);
        } else {
          await api.post("/products", values);
        }

        resetForm();
        setEditingId(null);
        fetchProducts();
      } catch (err) {
        console.error(err);
      }
    },
  });

  const handleEdit = (product) => {
    formik.setValues(product);
    setEditingId(product._id);
  };

  const handleDelete = async (id) => {
    await api.delete(`/products/${id}`);
    fetchProducts();
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Add / Manage Products</h1>

      <form
        onSubmit={formik.handleSubmit}
        className="grid grid-cols-2 gap-4 bg-white p-6 rounded shadow mb-8"
      >
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          className="border p-2 rounded"
          {...formik.getFieldProps("name")}
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          className="border p-2 rounded"
          {...formik.getFieldProps("price")}
        />

        <input
          type="text"
          name="imageUrl"
          placeholder="Image URL"
          className="border p-2 rounded col-span-2"
          {...formik.getFieldProps("imageUrl")}
        />

        <textarea
          name="description"
          placeholder="Description"
          className="border p-2 rounded col-span-2"
          {...formik.getFieldProps("description")}
        />

        <button
          type="submit"
          className="bg-black text-white py-2 rounded col-span-2 hover:bg-gray-800"
        >
          {editingId ? "Update Product" : "Add Product"}
        </button>
      </form>

      <div className="grid grid-cols-3 gap-6">
        {products.map((p) => (
          <div key={p._id} className="bg-white p-4 rounded shadow">
            <div className="h-32 bg-gray-200 flex items-center justify-center mb-3 rounded">
              {p.imageUrl}
            </div>

            <h2 className="font-bold">{p.name}</h2>

            <p className="text-gray-600 text-sm">{p.description}</p>

            <p className="font-semibold mt-2">₹{p.price}</p>

            <div className="flex gap-2 mt-3">
              <button
                onClick={() => handleEdit(p)}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(p._id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
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
