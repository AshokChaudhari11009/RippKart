import React from "react";

interface Category {
  title: string;
  description: string;
}

interface Props {
  category: Category | null;
}

const Header: React.FC<Props> = ({ category }) => {
  const title = category?.title || "All Products";
  const description = category?.description || "Browse our latest collection.";

  return (
    <div className="container text-center my-4">
      <h1 className="display-5 fw-bold">{title}</h1>
      <p className="text-muted">{description}</p>
    </div>
  );
};

export default Header;
