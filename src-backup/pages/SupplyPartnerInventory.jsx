import { useState } from "react";
import { Link } from "react-router-dom";
import { supplyInventory } from "../data/supplyInventory";
import "./SupplyPartnerInventory.css";

function SupplyPartnerInventory() {
  const [products, setProducts] = useState(supplyInventory);

  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "Vegetables",
    grade: "Grade A",
    price: "",
    unit: "kg",
    stock: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function openAddForm() {
    setEditingProduct(null);

    setFormData({
      name: "",
      category: "Vegetables",
      grade: "Grade A",
      price: "",
      unit: "kg",
      stock: "",
    });

    setShowForm(true);
  }

  function openEditForm(product) {
    setEditingProduct(product);

    setFormData({
      name: product.name,
      category: product.category,
      grade: product.grade,
      price: product.price,
      unit: product.unit,
      stock: product.stock,
    });

    setShowForm(true);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const stock = Number(formData.stock);
    const price = Number(formData.price);

    const productData = {
      name: formData.name,
      category: formData.category,
      grade: formData.grade,
      price,
      unit: formData.unit,
      stock,
      status:
        stock === 0
          ? "Out of Stock"
          : stock < 100
          ? "Low Stock"
          : "Available",
    };

    if (editingProduct) {
      setProducts((currentProducts) =>
        currentProducts.map((product) =>
          product.id === editingProduct.id
            ? {
                ...product,
                ...productData,
              }
            : product
        )
      );
    } else {
      setProducts((currentProducts) => [
        ...currentProducts,
        {
          id: Date.now(),
          ...productData,
        },
      ]);
    }

    setShowForm(false);
    setEditingProduct(null);
  }

  return (
    <div className="inventory-page">

      {/* HEADER */}

      <header className="inventory-header">

        <div>
          <Link
            to="/supply-partner-dashboard"
            className="inventory-back"
          >
            ← Dashboard
          </Link>

          <p className="inventory-eyebrow">
            SUPPLY PARTNER
          </p>

          <h1>Inventory</h1>

          <p className="inventory-subtitle">
            Manage products and available stock.
          </p>
        </div>

        <button
          className="add-product-button"
          onClick={openAddForm}
        >
          + Add Product
        </button>

      </header>

      {/* INVENTORY */}

      <section className="inventory-card">

        <div className="inventory-card-header">
          <div>
            <p>PRODUCTS</p>
            <h2>Listed Products</h2>
          </div>

          <span>
            {products.length} products
          </span>
        </div>

        <div className="inventory-table-wrapper">

          <table className="inventory-table">

            <thead>
              <tr>
                <th>PRODUCT</th>
                <th>CATEGORY</th>
                <th>GRADE</th>
                <th>PRICE</th>
                <th>STOCK</th>
                <th>STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>

            <tbody>

              {products.map((product) => (
                <tr key={product.id}>

                  <td>
                    <strong>{product.name}</strong>
                  </td>

                  <td>
                    {product.category}
                  </td>

                  <td>
                    {product.grade}
                  </td>

                  <td>
                    ₹{product.price}/{product.unit}
                  </td>

                  <td>
                    {product.stock} {product.unit}
                  </td>

                  <td>
                    <span
                      className={`inventory-status ${
                        product.status === "Available"
                          ? "available"
                          : product.status === "Low Stock"
                          ? "low"
                          : "out"
                      }`}
                    >
                      {product.status}
                    </span>
                  </td>

                  <td>
                    <button
                      className="edit-button"
                      onClick={() =>
                        openEditForm(product)
                      }
                    >
                      Edit
                    </button>
                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </section>

      {/* ADD / EDIT FORM */}

      {showForm && (
        <div className="inventory-modal">

          <div className="inventory-modal-content">

            <div className="modal-header">

              <div>
                <p>
                  {editingProduct
                    ? "UPDATE PRODUCT"
                    : "NEW PRODUCT"}
                </p>

                <h2>
                  {editingProduct
                    ? "Edit Product"
                    : "Add Product"}
                </h2>
              </div>

              <button
                className="close-button"
                onClick={() => setShowForm(false)}
              >
                ×
              </button>

            </div>

            <form onSubmit={handleSubmit}>

              <div className="form-group">
                <label>Product Name</label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Fresh Potatoes"
                  required
                />
              </div>

              <div className="form-row">

                <div className="form-group">
                  <label>Category</label>

                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                  >
                    <option>Vegetables</option>
                    <option>Fruits</option>
                    <option>Grains</option>
                    <option>Pulses</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Grade</label>

                  <select
                    name="grade"
                    value={formData.grade}
                    onChange={handleChange}
                  >
                    <option>Grade A</option>
                    <option>Grade B</option>
                    <option>Premium</option>
                  </select>
                </div>

              </div>

              <div className="form-row">

                <div className="form-group">
                  <label>Price</label>

                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="₹ per unit"
                    min="0"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Unit</label>

                  <select
                    name="unit"
                    value={formData.unit}
                    onChange={handleChange}
                  >
                    <option value="kg">kg</option>
                    <option value="quintal">
                      quintal
                    </option>
                    <option value="ton">
                      ton
                    </option>
                  </select>
                </div>

              </div>

              <div className="form-group">
                <label>Available Stock</label>

                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="Enter stock quantity"
                  min="0"
                  required
                />
              </div>

              <div className="form-actions">

                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-button"
                >
                  {editingProduct
                    ? "Update Product"
                    : "Add Product"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}

export default SupplyPartnerInventory;