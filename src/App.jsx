import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import BuyerSignup from "./pages/BuyerSignup";
import SellerRegister from "./pages/SellerRegister";
import BuyerDashboard from "./pages/BuyerDashboard";
import SupplyPartnerRegister from "./pages/SupplyPartnerRegister";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import { CartProvider } from "./context/CartContext";
import { OrderProvider } from "./context/OrderContext";
import Orders from "./pages/Orders";
import TraceOrder from "./pages/TraceOrder";
import Delivery from "./pages/Delivery";
import Categories from "./pages/Categories";
import AIInsights from "./pages/AIInsights";
import Alerts from "./pages/Alerts";
import Profile from "./pages/Profile";
import SupplyPartnerDashboard from "./pages/SupplyPartnerDashboard";
import SupplyPartnerInventory from "./pages/SupplyPartnerInventory";
import SupplyPartnerOrders from "./pages/SupplyPartnerOrders";
import SupplyPartnerShipments from "./pages/SupplyPartnerShipments";
import SupplyPartnerProfile from "./pages/SupplyPartnerProfile";
import LogisticsDashboard from "./pages/LogisticsDashboard";
import LogisticsDeliveries from "./pages/LogisticsDeliveries";
import RoleRoute from "./components/RoleRoute";
import Payment from "./pages/Payment";


function App() {
  return (
    <OrderProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>

            <Route path="/" element={<Login />} />

            <Route path="/login" element={<Login />} />

            <Route
              path="/buyer-signup"
              element={<BuyerSignup />}
            />

            <Route
              path="/seller-register"
              element={<SellerRegister />}
            />

            <Route
              path="/supply-partner-register"
              element={<SupplyPartnerRegister />}
            />

            <Route
              path="/buyer-dashboard"
              element={
                <RoleRoute allowedRole="buyer">
                  <BuyerDashboard />
                </RoleRoute>
              }
            />

            <Route
              path="/products"
              element={<Products />}
            />

            
            <Route
              path="/checkout"
              element={<Checkout />}
            />

            <Route
              path="/orders"
              element={<Orders />}
            />

            <Route
              path="/trace-order"
              element={<TraceOrder />}
            />

            <Route 
              path="/delivery" 
              element={<Delivery />} 
            />

            <Route 
              path="/categories" 
              element={<Categories />} 
            />

            <Route 
              path="/ai-insights" 
              element={<AIInsights />} 
            />

            <Route 
              path="/cart" element={<Cart />} 
            />

            <Route 
            path="/alerts" 
            element={<Alerts />} 
            />

            <Route 
            path="/profile" 
            element={<Profile />} 
            />

            <Route
              path="/supply-partner-dashboard"
              element={
                <RoleRoute allowedRole="supply-partner">
                  <SupplyPartnerDashboard />
                </RoleRoute>
              }
            />

            <Route
              path="/supply-partner-inventory"
              element={<SupplyPartnerInventory />}
            />

            <Route
              path="/supply-partner-orders"
              element={<SupplyPartnerOrders />}
            />

            <Route
              path="/supply-partner-shipments"
              element={<SupplyPartnerShipments />}
            />

            <Route
              path="/supply-partner-profile"
              element={<SupplyPartnerProfile />}
            />

            <Route
              path="/logistics-dashboard"
              element={
                <RoleRoute allowedRole="logistics-partner">
                  <LogisticsDashboard />
                </RoleRoute>
              }
            />

            <Route
              path="/logistics-deliveries"
              element={<LogisticsDeliveries />}
            />

            <Route 
            path="/payment" 
            element={<Payment />} 
            />



          </Routes>
        </BrowserRouter>
      </CartProvider>
    </OrderProvider>
  );
}

export default App;