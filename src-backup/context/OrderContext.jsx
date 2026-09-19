import { createContext, useContext, useState } from "react";

const OrderContext = createContext();

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState([]);

  function placeOrder(orderData) {
    const newOrder = {
      id: `ORD-${Date.now()}`,
      date: new Date().toLocaleDateString("en-IN"),
      status: "Order Placed",
      ...orderData,
    };

    setOrders((currentOrders) => [
      newOrder,
      ...currentOrders,
    ]);

    return newOrder;
  }

  function updateOrderStatus(orderId, status) {
    setOrders((currentOrders) =>
      currentOrders.map((order) =>
        order.id === orderId
          ? { ...order, status }
          : order
      )
    );
  }

  return (
    <OrderContext.Provider
      value={{
        orders,
        placeOrder,
        updateOrderStatus,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  return useContext(OrderContext);
}