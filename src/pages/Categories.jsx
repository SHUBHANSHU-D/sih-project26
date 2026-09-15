import { Link } from "react-router-dom";
import { categories } from "../data/categories";
import "./Categories.css";

function Categories() {
  return (
    <div className="categories-page">
      <header className="categories-header">
        <div>
          <span className="categories-label">FARMCONNECT MARKETPLACE</span>

          <h1>Product Categories</h1>

          <p>
            Explore agricultural products by category and discover products
            from trusted sources across the supply chain.
          </p>
        </div>

        <Link to="/buyer-dashboard" className="categories-back-button">
          ← Dashboard
        </Link>
      </header>

      <section className="categories-intro">
        <div>
          <h2>Browse by Category</h2>
          <p>
            Choose a category to explore available products.
          </p>
        </div>

        <span className="category-count">
          {categories.length} Categories
        </span>
      </section>

      <section className="categories-grid">
        {categories.map((category) => (
          <article className="category-card" key={category.id}>
            <div className="category-icon">
              {category.icon}
            </div>

            <div className="category-content">
              <h3>{category.name}</h3>

                <p>{category.description}</p>

                <div className="subcategory-list">
                    {category.subcategories.map((subcategory) => (
                        <Link
                            key={subcategory}
                            to={`/products?category=${encodeURIComponent(
                                category.name
                            )}&subcategory=${encodeURIComponent(subcategory)}`}
                            className="subcategory-link"
                        >
                            {subcategory}
                        </Link>
                    ))}
                </div>

                <Link
                to={`/products?category=${encodeURIComponent(category.name)}`}
                className="category-button"
                >
                View All {category.name} →
                </Link>
            </div>
          </article>
        ))}
      </section>

      <section className="categories-note">
        <div className="note-icon">🌱</div>

        <div>
          <h3>More categories can be added</h3>

          <p>
            FarmConnect is designed to support additional agricultural
            product categories as the marketplace grows.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Categories;