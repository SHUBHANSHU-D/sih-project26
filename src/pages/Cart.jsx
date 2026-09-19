import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Cart.css";

function Cart() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    totalItems,
    totalPrice,
  } = useCart();

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>
          <br></br>

          <h1>Your Cart is Empty</h1>
          <br></br>

          <p>
            Add fresh products from farmers and verified
            supply partners to your cart.
          </p>

          <Link to="/products" className="shop-button">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">

      <header className="cart-header">
        <div>
          <h1>Your Cart</h1>
          <p>{totalItems} item(s) in your cart</p>
        </div>

        <Link to="/products" className="continue-link">
          ← Continue Shopping
        </Link>
      </header>

      <div className="cart-layout">

        <section className="cart-items">

          {cart.map((item) => (
            <div className="cart-item" key={item.id}>

              <img
                src={item.image}
                alt={item.name}
                className="cart-item-image"
              />

              <div className="cart-item-info">

                <span className="cart-category">
                  {item.category}
                </span>

                <h2>{item.name}</h2>

                <p className="cart-source">
                  Source: {item.source}
                </p>

                <p className="cart-location">
                  Location: {item.location}
                </p>

                <p className="cart-price">
                  ₹{item.price} / kg
                </p>

              </div>

              <div className="cart-quantity">

                <span>Quantity</span>

                <div className="quantity-control">

                  <button
                    onClick={() =>
                      updateQuantity(
                        item.id,
                        item.quantity - 1
                      )
                    }
                  >
                    −
                  </button>

                  <strong>
                    {item.quantity} kg
                  </strong>

                  <button
                    onClick={() =>
                      updateQuantity(
                        item.id,
                        item.quantity + 1
                      )
                    }
                  >
                    +
                  </button>

                </div>

              </div>

              <div className="item-total">

                <strong>
                  ₹{item.price * item.quantity}
                </strong>

                <button
                  className="remove-button"
                  onClick={() =>
                    removeFromCart(item.id)
                  }
                >
                  Remove
                </button>

              </div>

            </div>
          ))}

        </section>

        <aside className="cart-summary">

          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Items</span>
            <span>{totalItems}</span>
          </div>

          <div className="summary-row">
            <span>Product total</span>
            <span>₹{totalPrice}</span>
          </div>

          <div className="summary-row">
            <span>Delivery</span>
            <span>Calculated at checkout</span>
          </div>

          <div className="summary-divider"></div>

          <div className="summary-total">
            <span>Total</span>
            <strong>₹{totalPrice}</strong>
          </div>

          <Link to="/checkout" className="checkout-button">
            Proceed to Checkout
          </Link>

        </aside>

      </div>
    </div>
  );
}

export default Cart;