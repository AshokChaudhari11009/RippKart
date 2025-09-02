import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { BASE_PRODUCT_URL } from "config/api";

interface Category {
  id: number;
  title: string;
}

interface EditProductProps {
  onProductCreated: () => void;
}

const EditProduct: React.FC<EditProductProps> = ({ onProductCreated }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    brand: "",
    quantity: "",
    category: "",
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`${BASE_PRODUCT_URL}${id}/`);
      const data = await res.json();
      setFormData({
        name: data.name,
        description: data.description,
        price: data.price,
        brand: data.brand,
        quantity: data.quantity,
        category: data.category,
      });
    };

    const fetchCategories = async () => {
      let url = "http://127.0.0.1:8000/api/categories/";
      let all: Category[] = [];
      while (url) {
        const res = await fetch(url);
        const data = await res.json();
        all = [...all, ...(data.results || [])];
        url = data.next;
      }
      setCategories(all);
    };

    fetchProduct();
    fetchCategories();
  }, [id]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${BASE_PRODUCT_URL}${id}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Update failed");
      onProductCreated();
      navigate("/");
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4">Edit Product</h2>
      <form onSubmit={handleSubmit}>
        {["name", "description", "price", "brand", "quantity"].map((field) => (
          <div className="mb-3" key={field}>
            <label className="form-label">
              {field[0].toUpperCase() + field.slice(1)}
            </label>
            <input
              type={
                field === "price" || field === "quantity" ? "number" : "text"
              }
              name={field}
              className="form-control"
              value={(formData as any)[field]}
              onChange={handleChange}
              required
            />
          </div>
        ))}

        <div className="mb-3">
          <label className="form-label">Category</label>
          <select
            name="category"
            className="form-select"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.title}>
                {cat.title}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-success" disabled={loading}>
          {loading ? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
