import { Link } from "react-router-dom";
import { useOrders } from "../context/OrderContext";
import "./Orders.css";

function Orders() {
  const { orders } = useOrders();

  if (orders.length === 0) {
    return (
      <div className="orders-page">

        <div className="empty-orders">

          <div className="empty-orders-icon">
            📦
          </div>

          <h1>No Orders Yet</h1>

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

      {/* Header */}
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

      {/* Orders */}
      <section className="orders-list">

        {orders.map((order) => (

          <article
            className="order-card"
            key={order.id}
          >

            {/* Order Header */}
            <div className="order-top">

              <div>
                <span className="order-label">
                  Order ID
                </span>

                <h2>{order.id}</h2>
              </div>

              <div className="order-date">

                <span className="order-label">
                  Order Date
                </span>

                <p>{order.date}</p>

              </div>

              <span className="order-status">
                {order.status}
              </span>

            </div>

            {/* Products */}
            <div className="order-products">

              {order.items.map((item) => (

                <div
                  className="order-product"
                  key={item.id}
                >

                  <img
                    src={item.image}
                    alt={item.name}
                  />

                  <div className="order-product-info">

                    <h3>{item.name}</h3>

                    <p>
                      {item.quantity} kg × ₹{item.price}
                    </p>

                    <p>
                      Source: {item.source}
                    </p>

                  </div>

                  <strong>
                    ₹{item.quantity * item.price}
                  </strong>

                </div>

              ))}

            </div>

            {/* Bottom */}
            <div className="order-bottom">

              <div>

                <span>
                  Delivery to
                </span>

                <p>
                  {order.customer.address},{" "}
                  {order.customer.city},{" "}
                  {order.customer.state} -{" "}
                  {order.customer.pincode}
                </p>

              </div>

              <div className="order-total">

                <span>Total</span>

                <strong>
                  ₹{order.finalTotal}
                </strong>

              </div>

              <Link
                to="/trace-order"
                className="track-order-button"
              >
                Track Order
              </Link>

              <Link to="/delivery" className="delivery-track-button">
                 Track Delivery
              </Link>

            </div>

          </article>

        ))}

      </section>

    </div>
  );
}

export default Orders;