const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
export async function apiRequest(endpoint, options = {}) {
    const response = await fetch(`${API_URL}${endpoint}`, {
        headers: {
            "Content-Type": "application/json",
            ...(options.headers || {})
        },
        ...options
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.detail || data.message || "API request failed");
    }

    return data;
}

export async function getProducts() {
    return apiRequest("/products/");
}

export async function predictDemand(productName, historicalDemand, forecastDays = 7) {
    return apiRequest("/ai/demand-prediction", {
        method: "POST",
        body: JSON.stringify({
            product_name: productName,
            historical_demand: historicalDemand,
            forecast_days: forecastDays
        })
    });
}

export async function optimizeRoute(start, destinations) {
    return apiRequest("/ai/route-optimization", {
        method: "POST",
        body: JSON.stringify({
            start,
            destinations
        })
    });
}

export async function createOrder(orderData) {
  return apiRequest("/orders/", {
    method: "POST",
    body: JSON.stringify(orderData),
  });
}

export async function createPayment(orderId, paymentMethod) {
  return apiRequest("/payments/", {
    method: "POST",
    body: JSON.stringify({
      order_id: orderId,
      payment_method: paymentMethod,
    }),
  });
}

export async function getTracking(orderId) {
  return apiRequest(`/tracking/order/${orderId}`);
}

export async function getOrders(consumerId) {
  return apiRequest(`/orders/consumer/${consumerId}`);
}