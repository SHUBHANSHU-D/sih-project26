import { useMemo, useState } from "react";
import { useCart } from "../context/CartContext";
import { Link, useSearchParams } from "react-router-dom";
import "./Products.css";
import { categories } from "../data/categories";

const products = [
  {
    id: 1,
    name: "Potatoes",
    category: "Vegetables",
    price: 30,
    unit: "kg",
    source: "Local Farmer",
    location: "Indore",
    stock: 250,
    grade: "Grade A",
    delivery: "1–2 days",
    image:
      "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=700&q=80",
    description:
      "Fresh farm potatoes suitable for household and bulk consumption.",
    farmerPrice: 24,
    supplyCost: 3,
    logisticsCost: 3,
  },
  {
    id: 2,
    name: "Tomatoes",
    category: "Vegetables",
    price: 40,
    unit: "kg",
    source: "Farmer Group",
    location: "Dewas",
    stock: 180,
    grade: "Grade A",
    delivery: "1–2 days",
    image:
      "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=700&q=80",
    description:
      "Fresh red tomatoes sourced directly from a local farmer group.",
    farmerPrice: 32,
    supplyCost: 4,
    logisticsCost: 4,
  },
  {
    id: 3,
    name: "Wheat",
    category: "Grains",
    price: 35,
    unit: "kg",
    source: "FPO",
    location: "Ujjain",
    stock: 500,
    grade: "Premium",
    delivery: "2–3 days",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=700&q=80",
    description:
      "Quality wheat supplied through a farmer producer organization.",
    farmerPrice: 29,
    supplyCost: 2,
    logisticsCost: 4,
  },
  {
    id: 4,
    name: "Onions",
    category: "Vegetables",
    price: 28,
    unit: "kg",
    source: "Local Farmer",
    location: "Indore",
    stock: 320,
    grade: "Grade A",
    delivery: "1–2 days",
    image:
      "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=700&q=80",
    description:
      "Fresh onions collected directly from local agricultural producers.",
    farmerPrice: 22,
    supplyCost: 3,
    logisticsCost: 3,
  },
  {
    id: 5,
    name: "Mangoes",
    category: "Fruits",
    price: 80,
    unit: "kg",
    source: "Farmer Group",
    location: "Khandwa",
    stock: 120,
    grade: "Premium",
    delivery: "2–3 days",
    image:
      "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=700&q=80",
    description:
      "Naturally ripened seasonal mangoes supplied directly by farmers.",
    farmerPrice: 68,
    supplyCost: 5,
    logisticsCost: 7,
  },
  {
    id: 6,
    name: "Pulses",
    category: "Pulses",
    price: 95,
    unit: "kg",
    source: "FPO",
    location: "Dhar",
    stock: 200,
    grade: "Premium",
    delivery: "2–3 days",
    image:
      "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?auto=format&fit=crop&w=700&q=80",
    description:
      "Clean and graded pulses sourced through a farmer producer organization.",
    farmerPrice: 82,
    supplyCost: 6,
    logisticsCost: 7,
  },
];

function Products() {
  const [searchParams] = useSearchParams();

  const initialCategory =
    searchParams.get("category") || "All";

  const initialSubcategory =
    searchParams.get("subcategory") || "All";

  const [category, setCategory] = useState(initialCategory);
  const [subcategory, setSubcategory] = useState(
    initialSubcategory
  );

  const selectedCategory = categories.find(
    (item) => item.name === category
  );

  const availableSubcategories =
    selectedCategory?.subcategories || [];

  
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("All");
  const [sort, setSort] = useState("default");

  const [quantities, setQuantities] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const {
  addToCart,
  totalItems,
  } = useCart();


  const locations = [
    "All",
    ...new Set(products.map((product) => product.location)),
  ];

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || product.category === category;

      const matchesSubcategory =
        subcategory === "All" ||
        product.subcategory === subcategory;

      const matchesLocation =
        location === "All" || product.location === location;

      return matchesSearch && matchesCategory && matchesLocation && matchesSubcategory;
    });

    if (sort === "low") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sort === "high") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [search, category, location, sort]);

  function getQuantity(productId) {
    return quantities[productId] || 1;
  }

  function increaseQuantity(product) {
    const current = getQuantity(product.id);

    if (current < product.stock) {
      setQuantities({
        ...quantities,
        [product.id]: current + 1,
      });
    }
  }

  function decreaseQuantity(product) {
    const current = getQuantity(product.id);

    if (current > 1) {
      setQuantities({
        ...quantities,
        [product.id]: current - 1,
      });
    }
  }

function handleAddToCart(product) {
  const quantity = getQuantity(product.id);

  addToCart(product, quantity);

  alert(`${quantity} kg of ${product.name} added to cart.`);
}


  return (
    <div className="products-page">

      {/* Header */}
      <header className="products-header">
        <div>
          <h1>Farm Products</h1>
          <p>
            Fresh agricultural products from farmers and verified
            supply partners.
          </p>
        </div>

        <div className="header-actions">
            <Link to="/buyer-dashboard" className="dashboard-link">
                ← Dashboard
            </Link>

            <Link to="/cart" className="cart-button">
            🛒 Cart
            {totalItems > 0 && (
                <span>{totalItems}</span>
            )}
            </Link>
        </div>
      </header>

      {/* Filters */}
      <section className="product-filters">

        <div className="search-box">
          <input
            type="text"
            placeholder="Search vegetables, fruits, grains..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setSubcategory("All");
          }}
        >
          <option value="All">All Categories</option>

          {categories.map((item) => (
            <option key={item.id} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>

        {category !== "All" && (
          <select
            value={subcategory}
            onChange={(e) => setSubcategory(e.target.value)}
          >
            <option value="All">All {category}</option>

            {availableSubcategories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        )}

        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        >
          {locations.map((item) => (
            <option key={item} value={item}>
              {item === "All" ? "All Locations" : item}
            </option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="default">Sort By</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
        </select>

      </section>

      {/* Results */}
      <section className="products-section">

        <div className="products-title">
          <div>
            <h2>Available Products</h2>
            <p>
              {filteredProducts.length} products available
            </p>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="no-products">
            <h3>No products found</h3>
            <p>
              Try changing your search or filters.
            </p>
          </div>
        ) : (
          <div className="products-grid">

            {filteredProducts.map((product) => {
              const quantity = getQuantity(product.id);

              return (
                <article
                  className="product-card"
                  key={product.id}
                >

                  {/* Image */}
                  <div className="product-image">
                    <img
                      src={product.image}
                      alt={product.name}
                    />

                    <span className="grade-badge">
                      {product.grade}
                    </span>
                  </div>

                  {/* Information */}
                  <div className="product-info">

                    <span className="product-category">
                      {product.category}
                    </span>

                    <h3>{product.name}</h3>

                    <div className="price-row">
                      <strong>
                        ₹{product.price}
                      </strong>

                      <span>
                        / {product.unit}
                      </span>
                    </div>

                    <div className="product-meta">

                      <p>
                        <strong>Source:</strong>{" "}
                        {product.source}
                      </p>

                      <p>
                        <strong>Location:</strong>{" "}
                        {product.location}
                      </p>

                      <p>
                        <strong>Available:</strong>{" "}
                        {product.stock} kg
                      </p>

                      <p>
                        <strong>Delivery:</strong>{" "}
                        {product.delivery}
                      </p>

                    </div>

                    {/* Quantity */}
                    <div className="quantity-section">

                      <span>Quantity</span>

                      <div className="quantity-control">

                        <button
                          onClick={() =>
                            decreaseQuantity(product)
                          }
                        >
                          −
                        </button>

                        <span>
                          {quantity} kg
                        </span>

                        <button
                          onClick={() =>
                            increaseQuantity(product)
                          }
                        >
                          +
                        </button>

                      </div>

                    </div>

                    {/* Buttons */}
                    <div className="product-actions">

                      <button
                        className="details-button"
                        onClick={() =>
                          setSelectedProduct(product)
                        }
                      >
                        View Details
                      </button>

                      <button
                        className="add-cart-button"
                        onClick={() =>
                            handleAddToCart(product)
                        }
                        
                      >
                        Add to Cart
                      </button>

                    </div>

                  </div>
                </article>
              );
            })}

          </div>
        )}

      </section>

      {/* Product Details Modal */}
      {selectedProduct && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedProduct(null)}
        >

          <div
            className="product-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="close-modal"
              onClick={() => setSelectedProduct(null)}
            >
              ×
            </button>

            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
            />

            <div className="modal-content">

              <span className="product-category">
                {selectedProduct.category}
              </span>

              <h2>{selectedProduct.name}</h2>

              <div className="modal-price">
                ₹{selectedProduct.price} / kg
              </div>

              <p>
                {selectedProduct.description}
              </p>

              <div className="modal-details">

                <p>
                  <strong>Source:</strong>{" "}
                  {selectedProduct.source}
                </p>

                <p>
                  <strong>Location:</strong>{" "}
                  {selectedProduct.location}
                </p>

                <p>
                  <strong>Quality:</strong>{" "}
                  {selectedProduct.grade}
                </p>

                <p>
                  <strong>Available:</strong>{" "}
                  {selectedProduct.stock} kg
                </p>

                <p>
                  <strong>Expected delivery:</strong>{" "}
                  {selectedProduct.delivery}
                </p>

              </div>

              <div className="price-transparency">

                <h3>Price Transparency</h3>

                <div>
                  <span>Farmer receives</span>
                  <strong>
                    ₹{selectedProduct.farmerPrice}
                  </strong>
                </div>

                <div>
                  <span>Supply-chain services</span>
                  <strong>
                    ₹{selectedProduct.supplyCost}
                  </strong>
                </div>

                <div>
                  <span>Logistics</span>
                  <strong>
                    ₹{selectedProduct.logisticsCost}
                  </strong>
                </div>

                <div className="total-price">
                  <span>Buyer price</span>
                  <strong>
                    ₹{selectedProduct.price}
                  </strong>
                </div>

              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default Products;