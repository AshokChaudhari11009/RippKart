import { useState, useEffect, useCallback } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "components/Header";
import Navbar from "components/Navbar";
import ProductList from "components/ProductList";
import Pagination from "components/Pagination";
import AddProduct from "components/AddProduct";
import EditProduct from "components/EditProduct";
import Footer from "components/Footer";

import { BASE_PRODUCT_URL } from "config/api";

// const BASE_PRODUCT_URL = "http://127.0.0.1:8000/api/products/";
const PAGE_SIZE = 6;

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  quantity: number;
  created_at: string;
  updated_at: string;
}

interface Category {
  title: string;
  description: string;
}

const App = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const categoryParam = selectedCategory
        ? `&category=${selectedCategory.title}`
        : "";
      const response = await fetch(
        `${BASE_PRODUCT_URL}?page=${currentPage}&page_size=${PAGE_SIZE}${categoryParam}`
      );
      const data = await response.json();
      setProducts(data.results);
      setTotalPages(Math.ceil(data.count / PAGE_SIZE));
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  }, [currentPage, selectedCategory]);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`${BASE_PRODUCT_URL}${id}/`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete product.");
      fetchProducts(); // Refresh list
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  return (
    <>
      <Navbar onCategorySelect={setSelectedCategory} />
      <Routes>
        <Route
          path="/"
          element={
            loading ? (
              <p className="text-center mt-4">Loading products...</p>
            ) : error ? (
              <p className="text-danger text-center mt-4">Error: {error}</p>
            ) : (
              <>
                <Header category={selectedCategory} />
                <ProductList products={products} onDelete={handleDelete} />
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </>
            )
          }
        />
        <Route
          path="/add-product"
          element={<AddProduct onProductCreated={fetchProducts} />}
        />
        <Route
          path="/edit-product/:id"
          element={<EditProduct onProductCreated={fetchProducts} />}
        />
      </Routes>
      <Footer />

    </>
  );
};

export default App;
