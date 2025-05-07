import { useState } from "react";
import "./Product.css";

function Product({ product }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`product-card card h-100 ${isExpanded ? "expanded" : ""}`}
      onClick={() => setIsExpanded(!isExpanded)}
      style={{ cursor: "pointer" }}
    >
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text text-primary fs-5">${product.price}</p>

        {isExpanded && (
          <div className="additional-details">
            <h6 className="card-subtitle mb-2 text-muted">{product.brand}</h6>
            <p className="card-text text-secondary">{product.description}</p>
            <div className="mt-2">
              <span className="badge bg-info">{product.category}</span>
              <span className="badge bg-success ms-2">
                Stock: {product.quantity}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Product;
