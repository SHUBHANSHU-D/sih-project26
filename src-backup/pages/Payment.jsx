import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Payment.css";
import { createPayment } from "../services/api";

function Payment() {
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [paymentStatus, setPaymentStatus] = useState("");

  const [formData, setFormData] = useState({
    upiId: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const orderId = localStorage.getItem("latestOrderId");
  const orderAmount = Number(
    localStorage.getItem("latestOrderAmount") || 0
  );

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  async function handlePayment(event) {
    event.preventDefault();

    if (!orderId) {
      setPaymentStatus("No pending order found");
      return;
    }

    if (paymentMethod === "cod") {
      localStorage.setItem("lastOrderId", orderId);
      localStorage.removeItem("latestOrderId");
      localStorage.removeItem("latestOrderAmount");

      setPaymentStatus("Order placed successfully");

      setTimeout(() => {
        navigate("/orders");
      }, 800);

      return;
    }

    setPaymentStatus("Payment processing...");

    try {
      const result = await createPayment(
        Number(orderId),
        paymentMethod
      );

      if (result.payment_status === "success") {
        localStorage.setItem("lastOrderId", orderId);

        localStorage.removeItem("latestOrderId");
        localStorage.removeItem("latestOrderAmount");

        setPaymentStatus("Payment successful");

        setTimeout(() => {
          navigate("/orders");
        }, 800);
      } else {
        setPaymentStatus("Payment failed");
      }
    } catch (err) {
      setPaymentStatus(`Payment failed: ${err.message}`);
    }
  }

  return (
    <div className="payment-page">
      <header className="payment-header">
        <div className="payment-brand">
          <img
            src="/logo.jpeg"
            alt="सीधा-SAUDA Logo"
            className="payment-brand-logo"
          />

          <div>
            <h1>सीधा-SAUDA</h1>
            <p>किसान से सीधे बाजार तक</p>
          </div>
        </div>

        <Link
          to="/buyer-dashboard"
          className="payment-back-button"
        >
          ← Dashboard
        </Link>
      </header>

      <main className="payment-content">
        <div className="payment-title">
          <p className="payment-eyebrow">
            सीधा-SAUDA CHECKOUT
          </p>

          <h2>Payment</h2>

          <p>
            Choose a payment method to complete your order.
          </p>
        </div>

        <div className="payment-layout">
          <section className="payment-card">
            <div className="payment-card-heading">
              <div className="payment-heading-icon">
                <span className="material-symbols-outlined">
                  payments
                </span>
              </div>

              <div>
                <h3>Payment Method</h3>
                <p>Select your preferred payment option.</p>
              </div>
            </div>

            <div className="payment-methods">
              <button
                type="button"
                className={`payment-method ${
                  paymentMethod === "upi" ? "selected" : ""
                }`}
                onClick={() => setPaymentMethod("upi")}
              >
                <span className="material-symbols-outlined">
                  account_balance_wallet
                </span>

                <div>
                  <strong>UPI</strong>
                  <small>Pay using UPI</small>
                </div>

                <span className="payment-radio">
                  {paymentMethod === "upi" ? "●" : "○"}
                </span>
              </button>

              <button
                type="button"
                className={`payment-method ${
                  paymentMethod === "card" ? "selected" : ""
                }`}
                onClick={() => setPaymentMethod("card")}
              >
                <span className="material-symbols-outlined">
                  credit_card
                </span>

                <div>
                  <strong>Debit / Credit Card</strong>
                  <small>Pay securely using your card</small>
                </div>

                <span className="payment-radio">
                  {paymentMethod === "card" ? "●" : "○"}
                </span>
              </button>

              <button
                type="button"
                className={`payment-method ${
                  paymentMethod === "cod" ? "selected" : ""
                }`}
                onClick={() => setPaymentMethod("cod")}
              >
                <span className="material-symbols-outlined">
                  local_atm
                </span>

                <div>
                  <strong>Cash on Delivery</strong>
                  <small>Pay when your order arrives</small>
                </div>

                <span className="payment-radio">
                  {paymentMethod === "cod" ? "●" : "○"}
                </span>
              </button>
            </div>

            <form
              className="payment-form"
              onSubmit={handlePayment}
            >
              {paymentMethod === "upi" && (
                <>
                  <label htmlFor="upiId">UPI ID</label>

                  <input
                    id="upiId"
                    type="text"
                    name="upiId"
                    value={formData.upiId}
                    onChange={handleChange}
                    placeholder="example@upi"
                    required
                  />
                </>
              )}

              {paymentMethod === "card" && (
                <>
                  <label htmlFor="cardNumber">
                    Card Number
                  </label>

                  <input
                    id="cardNumber"
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    placeholder="1234 5678 9012 3456"
                    maxLength="19"
                    required
                  />

                  <div className="payment-form-row">
                    <div>
                      <label htmlFor="expiry">
                        Expiry Date
                      </label>

                      <input
                        id="expiry"
                        type="text"
                        name="expiry"
                        value={formData.expiry}
                        onChange={handleChange}
                        placeholder="MM/YY"
                        maxLength="5"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="cvv">
                        CVV
                      </label>

                      <input
                        id="cvv"
                        type="password"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleChange}
                        placeholder="•••"
                        maxLength="4"
                        required
                      />
                    </div>
                  </div>
                </>
              )}

              {paymentMethod === "cod" && (
                <div className="cod-message">
                  <span className="material-symbols-outlined">
                    local_shipping
                  </span>

                  <div>
                    <strong>Cash on Delivery</strong>

                    <p>
                      You will pay when your order is delivered.
                    </p>
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="payment-submit-button"
                disabled={!orderId}
              >
                <span className="material-symbols-outlined">
                  lock
                </span>

                {paymentMethod === "cod"
                  ? "Place Order"
                  : "Proceed to Payment"}
              </button>

              {paymentStatus && (
                <div
                  className={`payment-status ${
                    paymentStatus === "Payment successful" ||
                    paymentStatus === "Order placed successfully"
                      ? "success"
                      : ""
                  }`}
                >
                  <span className="material-symbols-outlined">
                    {paymentStatus === "Payment successful" ||
                    paymentStatus === "Order placed successfully"
                      ? "check_circle"
                      : "sync"}
                  </span>

                  {paymentStatus}
                </div>
              )}
            </form>
          </section>

          <aside className="payment-summary">
            <div className="payment-summary-icon">
              <span className="material-symbols-outlined">
                receipt_long
              </span>
            </div>

            <p className="payment-summary-label">
              ORDER SUMMARY
            </p>

            <h3>Your Order</h3>

            <div className="summary-row">
              <span>Products</span>
              <strong>₹{orderAmount.toFixed(2)}</strong>
            </div>

            <div className="summary-row">
              <span>Delivery</span>
              <strong>₹0</strong>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-total">
              <span>Total</span>
              <strong>₹{orderAmount.toFixed(2)}</strong>
            </div>

            <div className="payment-security">
              <span className="material-symbols-outlined">
                verified_user
              </span>

              <p>
                Payment details will be securely handled by the
                payment service when integrated.
              </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

export default Payment;