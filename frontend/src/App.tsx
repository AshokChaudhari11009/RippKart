import Header from "components/Header";
import Navbar from "components/Navbar";
import ProductList from "components/ProductList";
import products from "data";

const App = () => {
  return (
    <>
      <Navbar />
      <Header />
      <ProductList products={products} />
    </>
  );
};

export default App;
