import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Checkout.css";
import { useOrders } from "../context/OrderContext";

function Checkout() {
    const navigate = useNavigate();
    
    const {
        cart,
        totalItems,
        totalPrice,
        clearCart,
    } = useCart();
    
    const { placeOrder } = useOrders();

  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const deliveryCharge = totalPrice >= 500 ? 0 : 40;
  const finalTotal = totalPrice + deliveryCharge;

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handlePlaceOrder(event) {
  event.preventDefault();

  const order = placeOrder({
    customer: formData,
    items: cart,
    productTotal: totalPrice,
    deliveryCharge,
    finalTotal,
  });

  console.log("Order Created:", order);

  clearCart();

  alert(`Order ${order.id} placed successfully!`);

  navigate("/orders");
}

  if (cart.length === 0) {
    return (
      <div className="checkout-page">
        <div className="empty-checkout">
          <h1>Your cart is empty</h1>

          <p>
            Add some agricultural products before proceeding
            to checkout.
          </p>

          <Link to="/products" className="checkout-shop-button">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">

      {/* Header */}
      <header className="checkout-header">
        <div>
          <h1>Checkout</h1>
          <p>Complete your delivery details to place your order.</p>
        </div>

        <Link to="/cart" className="back-cart-link">
          ← Back to Cart
        </Link>
      </header>

      <div className="checkout-layout">

        {/* Delivery Information */}
        <section className="delivery-form">

          <h2>Delivery Information</h2>

          <form onSubmit={handlePlaceOrder}>

            <label>Full Name</label>

            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />

            <label>Mobile Number</label>

            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Enter your mobile number"
              required
            />

            <label>Delivery Address</label>

            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="House number, street, area..."
              rows="4"
              required
            />

            <div className="location-row">

              <div>
                <label>City</label>

                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                  required
                />
              </div>

              <div>
                <label>State</label>

                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="State"
                  required
                />
              </div>

            </div>

            <label>PIN Code</label>

            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              placeholder="Enter PIN code"
              maxLength="6"
              required
            />

            <button
              type="submit"
              className="place-order-button"
            >
              Place Order — ₹{finalTotal}
            </button>

          </form>

        </section>

        {/* Order Summary */}
        <aside className="checkout-summary">

          <h2>Order Summary</h2>

          <div className="checkout-items">

            {cart.map((item) => (
              <div
                className="checkout-item"
                key={item.id}
              >

                <div>
                  <strong>{item.name}</strong>

                  <p>
                    {item.quantity} kg × ₹{item.price}
                  </p>
                </div>

                <strong>
                  ₹{item.quantity * item.price}
                </strong>

              </div>
            ))}

          </div>

          <div className="checkout-divider"></div>

          <div className="checkout-row">
            <span>Items</span>
            <span>{totalItems} kg</span>
          </div>

          <div className="checkout-row">
            <span>Product Total</span>
            <span>₹{totalPrice}</span>
          </div>

          <div className="checkout-row">
            <span>Delivery</span>

            <span>
              {deliveryCharge === 0
                ? "FREE"
                : `₹${deliveryCharge}`}
            </span>
          </div>

          <div className="checkout-divider"></div>

          <div className="checkout-total">
            <span>Total</span>
            <strong>₹{finalTotal}</strong>
          </div>

          <p className="checkout-note">
            Delivery charges are calculated based on the
            current order value. Final charges will come from
            the backend later.
          </p>

        </aside>

      </div>
    </div>
  );
}

export default Checkout;