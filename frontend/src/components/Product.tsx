import { Link } from "react-router-dom";
import "./Product.css";

interface ProductData {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  quantity: number;
}

interface ProductProps {
  product: ProductData;
  onDelete: (id: string) => void;
}

const Product: React.FC<ProductProps> = ({ product, onDelete }) => {
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      onDelete(product.id);
    }
  };

  return (
    <div className="product-card card h-100">
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text text-primary fs-5">${product.price}</p>
        <div className="additional-details">
          <h6 className="card-subtitle mb-2 text-muted">{product.brand}</h6>
          <p className="card-text text-secondary">{product.description}</p>
          <div className="mt-3">
            <p className="text-muted mb-1">
              <strong>Category:</strong> {product.category}
            </p>
            <p className="text-muted">
              <strong>Stock:</strong> {product.quantity}
            </p>
          </div>
          <div className="mt-3">
            <Link
              to={`/edit-product/${product.id}`}
              className="btn btn-primary"
            >
              Edit
            </Link>
            <button
              className="btn btn-outline-danger ms-2"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
