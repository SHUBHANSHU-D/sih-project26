import { Link } from "react-router-dom";
import { categories } from "../data/categories";
import "./Categories.css";

function Categories() {
  return (
    <div className="categories-page">


        <header className="categories-header">

          <div className="categories-header-content">

            <div className="categories-brand">

              <img
                src="/logo.jpeg"
                alt="सीधा-SAUDA Logo"
                className="categories-brand-logo"
              />

              <div>
                <h1>सीधा-SAUDA</h1>
                <p className="categories-tagline">
                  किसान से सीधे बाजार तक
                </p>
              </div>

            </div>

            <div className="categories-title">

              <span className="categories-label">
                सीधा-SAUDA MARKETPLACE
              </span>

              <h2>Product Categories</h2>

              <p>
                Browse fresh agricultural products by category.
                Select a category to see available products,
                prices, and suppliers.
              </p>

            </div>

          </div>

          <Link
            to="/buyer-dashboard"
            className="categories-back-button"
          >
            ← Back to Dashboard
          </Link>

        </header>



      <section className="categories-intro">

        <div>
          <h2>Browse Categories</h2>

          <p>
            Choose a category to find the products you need.
          </p>
        </div>

        <span className="category-count">
          {categories.length} categories
        </span>

      </section>



      <section className="categories-grid">

        {categories.map((category) => (

          <article
            className="category-card"
            key={category.id}
          >

            <div className="category-card-top">

              <div className="category-icon">
                {category.icon}
              </div>

              <div className="category-content">

                <h3>{category.name}</h3>

                <p>
                  {category.description}
                </p>

              </div>

            </div>



            <div className="subcategory-section">

              <span className="subcategory-title">
                Browse by type
              </span>

              <div className="subcategory-list">

                {category.subcategories.map(
                  (subcategory) => (

                    <Link
                      key={subcategory}
                      to={`/products?category=${encodeURIComponent(
                        category.name
                      )}&subcategory=${encodeURIComponent(
                        subcategory
                      )}`}
                      className="subcategory-link"
                    >
                      {subcategory}
                    </Link>

                  )
                )}

              </div>

            </div>



            <Link
              to={`/products?category=${encodeURIComponent(
                category.name
              )}`}
              className="category-button"
            >
              View {category.name}
              <span>→</span>
            </Link>

          </article>

        ))}

      </section>



      <section className="categories-note">

        <div className="note-icon">
          +
        </div>

        <div>

          <h3>Looking for something else?</h3>

          <p>
            More agricultural categories can be added as the
            marketplace expands.
          </p>

        </div>

      </section>



      <div className="categories-footer">

        <Link to="/products">
          View all products →
        </Link>

      </div>

    </div>
  );
}

export default Categories;