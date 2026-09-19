import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Orders.css";
import { getOrders, getProducts } from "../services/api";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const consumerId = 3;

  useEffect(() => {
    async function loadOrders() {
      try {
        const [ordersData, productsData] = await Promise.all([
          getOrders(consumerId),
          getProducts(),
        ]);

        setOrders(Array.isArray(ordersData) ? ordersData : []);
        setProducts(Array.isArray(productsData) ? productsData : []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadOrders();
  }, []);

  function getProduct(productId) {
    return products.find(
      (product) => product.product_id === productId
    );
  }

  function formatDate(date) {
    if (!date) {
      return "Date unavailable";
    }

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  function handleTrackOrder(orderId) {
    localStorage.setItem(
      "lastOrderId",
      String(orderId)
    );
  }

  if (loading) {
    return (
      <div className="orders-page">
        <div className="empty-orders">
          <h1>Loading Orders...</h1>
          <p>Fetching your orders from सीधा-SAUDA.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="orders-page">
        <div className="empty-orders">
          <h1>Unable to Load </h1>
          <h1>Orders</h1>
          <br></br>
          <p>{error}</p>

          <Link
            to="/products"
            className="browse-products-button"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="orders-page">
        <div className="empty-orders">
          <div className="empty-orders-icon">
            <span className="material-symbols-outlined">
              inventory_2
            </span>
          </div>

          <h1>No Orders Yet</h1>
          <br></br>
          <p>
            Your placed orders will appear here.
          </p>

          <Link
            to="/products"
            className="browse-products-button"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <header className="orders-header">
        <div>
          <h1>My Orders</h1>

          <p>
            Track your purchases and delivery status.
          </p>
        </div>

        <Link
          to="/products"
          className="shop-more-link"
        >
          ← Continue Shopping
        </Link>
      </header>

      <section className="orders-list">
        {orders.map((order) => {
          const product = getProduct(order.product_id);

          return (
            <article
              className="order-card"
              key={order.order_id}
            >
              <div className="order-top">
                <div>
                  <span className="order-label">
                    Order ID
                  </span>

                  <h2 style={{ color: "black" }}>
                    #{order.order_id}
                  </h2>
                </div>

                <div className="order-date">
                  <span className="order-label">
                    Order Date
                  </span>

                  <p>
                    {formatDate(order.created_at)}
                  </p>
                </div>

                <span className="order-status">
                  {order.order_status}
                </span>
              </div>

              <div className="order-products">
                <div className="order-product">
                  <img
                    src="/logo.jpeg"
                    alt={
                      product?.product_name ||
                      "Agricultural Product"
                    }
                  />

                  <div className="order-product-info">
                    <h3>
                      {product?.product_name ||
                        `Product #${order.product_id}`}
                    </h3>

                    <p>
                      {order.quantity_ordered}{" "}
                      {product?.unit_type || "kg"} × ₹
                      {Number(order.unit_price).toFixed(2)}
                    </p>

                    <p>
                      Source: Farmer / FPO
                    </p>
                  </div>

                  <strong>
                    ₹
                    {Number(
                      order.total_amount
                    ).toFixed(2)}
                  </strong>
                </div>
              </div>

              <div className="order-bottom">
                <div>
                  <span>
                    Delivery to
                  </span>

                  <p>
                    {order.delivery_address},{" "}
                    {order.delivery_city} -{" "}
                    {order.delivery_pincode}
                  </p>
                </div>

                <div className="order-total">
                  <span>Total</span>

                  <strong>
                    ₹
                    {Number(
                      order.total_amount
                    ).toFixed(2)}
                  </strong>
                </div>

                <Link
                  to="/trace-order"
                  className="track-order-button"
                  onClick={() =>
                    handleTrackOrder(
                      order.order_id
                    )
                  }
                >
                  Track Order
                </Link>

                <Link
                  to="/delivery"
                  className="delivery-track-button"
                  onClick={() =>
                    handleTrackOrder(
                      order.order_id
                    )
                  }
                >
                  Track Delivery
                </Link>
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}

export default Orders;