import Product from "./Product";

function ProductList({ products }) {
  return (
    <div className="container">
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {products.map((product) => (
          <div className="col" key={product.id}>
            <Product product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
