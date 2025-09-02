import React, { useEffect, useState } from "react";

import { BASE_CATEGORY_URL } from "config/api";

interface Category {
  id: number;
  title: string;
  description: string;
}

interface Props {
  onCategorySelect: (category: Category | null) => void;
}

const CategoryDropdown: React.FC<Props> = ({ onCategorySelect }) => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchAllCategories = async () => {
      let url = BASE_CATEGORY_URL;
      let allCategories: Category[] = [];

      try {
        while (url) {
          const res = await fetch(url);
          const data = await res.json();
          allCategories = [...allCategories, ...(data.results || [])];
          url = data.next;
        }
        setCategories(allCategories);
      } catch (err) {
        console.error("Error loading categories:", err);
      }
    };

    fetchAllCategories();
  }, []);

  return (
    <div className="dropdown me-2">
      <button
        className="btn btn-primary dropdown-toggle px-3"
        type="button"
        id="categoryDropdown"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <i className="bi bi-list me-1"></i> All category
      </button>
      <ul className="dropdown-menu" aria-labelledby="categoryDropdown">
        <li>
          <button
            className="dropdown-item"
            onClick={() => onCategorySelect(null)}
          >
            All Products
          </button>
        </li>
        {categories.map((cat) => (
          <li key={cat.id}>
            <button
              className="dropdown-item"
              onClick={() => onCategorySelect(cat)}
            >
              {cat.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryDropdown;
