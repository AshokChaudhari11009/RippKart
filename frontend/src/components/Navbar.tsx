import { Link } from "react-router-dom";
import CategoryDropdown from "./CategoryDropdown";

interface Category {
  title: string;
  description: string;
}

interface NavbarProps {
  onCategorySelect: (category: Category | null) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onCategorySelect }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-lg sticky-top">
      <div className="container">
        <Link className="navbar-brand fw-bold fs-3 text-primary" to="/">
          Ripp<span className="text-dark">Kart</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex align-items-center">
            <li className="nav-item">
              <CategoryDropdown onCategorySelect={onCategorySelect} />
            </li>
            <li className="nav-item">
              <Link to="/add-product" className="btn btn-outline-success me-2">
                <i className="bi bi-plus-circle me-1"></i> Add New Product
              </Link>
            </li>
          </ul>

          <form
            className="d-flex ms-lg-3 mt-2 mt-lg-0"
            role="search"
            style={{ maxWidth: "400px", width: "100%" }}
          >
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-primary" type="submit">
              <i className="bi bi-search"></i>
            </button>
          </form>

          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About Us
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
