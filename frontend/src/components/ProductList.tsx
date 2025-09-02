import Product from "./Product";

interface ProductData {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  quantity: number;
}

interface ProductListProps {
  products: ProductData[];
  onDelete: (id: string) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onDelete }) => {
  return (
    <div className="container">
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {products.map((product) => (
          <div className="col" key={product.id}>
            <Product product={product} onDelete={onDelete} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
