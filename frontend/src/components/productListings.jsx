import { Link } from "react-router-dom";

const ProductListings = ({ products }) => {
  return (
    <div className="product-list">
      {products.map((product) => (
        <div className="product-preview" key={product._id}>
          <Link to={`/products/${product._id}`}>
            <h2>{product.title}</h2>
          </Link>
          <p>Category: {product.category}</p>
          <p>Price: ${product.price}</p>
          <p>Stock: {product.stockQuantity}</p>
          <p>Supplier: {product.supplier.name}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductListings;