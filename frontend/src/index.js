import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store.js";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

import App from "./App";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import SigninPage from "./pages/SigninPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import ShippingPage from "./pages/ShippingPage.jsx";
import PaymentPage from "./pages/PaymentPage.jsx";
import PlaceOrderPage from "./pages/PlaceOrderPage.jsx";
import OrderPage from "./pages/OrderPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import OrderListPage from "./pages/admin/OrderListPage.jsx";
import ProductListPage from "./pages/admin/ProductListPage.jsx";
import ProductEditPage from "./pages/admin/ProductEditPage.jsx";
import UserListPage from "./pages/admin/UserListPage.jsx";
import UserEditPage from "./pages/admin/UserEditPage.jsx";

import PrivateRoute from "./components/PrivateRoute.jsx";
import AdminRoute from "./components/AdminRoute.jsx";

import "./assets/styles/index.css";
import "./assets/styles/bootstrap.custom.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// removed because custom bootstrap styles are used

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomePage />}></Route>
      {/* index prevents multiple screens from showing at once */}
      <Route path="/search/:keyword" element={<HomePage />}></Route>
      <Route path="/page/:pageNumber" element={<HomePage />}></Route>
      <Route
        path="/search/:keyword/page/:pageNumber"
        element={<HomePage />}
      ></Route>
      <Route path="/products/:id" element={<ProductPage />}></Route>
      <Route path="/cart" element={<CartPage />}></Route>
      <Route path="/signin" element={<SigninPage />}></Route>
      <Route path="/signup" element={<SignupPage />}></Route>

      <Route path="" element={<PrivateRoute />}>
        <Route path="/shipping" element={<ShippingPage />}></Route>
        <Route path="/payment" element={<PaymentPage />}></Route>
        <Route path="/placeorder" element={<PlaceOrderPage />}></Route>
        <Route path="/order/:id" element={<OrderPage />}></Route>
        <Route path="/profile" element={<ProfilePage />}></Route>
      </Route>

      <Route path="" element={<AdminRoute />}>
        <Route path="/admin/orderlist" element={<OrderListPage />}></Route>
        <Route path="/admin/productlist" element={<ProductListPage />}></Route>
        <Route
          path="/admin/productlist/page/:pageNumber"
          element={<ProductListPage />}
        ></Route>
        <Route
          path="/admin/product/:id/edit"
          element={<ProductEditPage />}
        ></Route>
        <Route path="/admin/userlist" element={<UserListPage />}></Route>
        <Route path="/admin/user/:id/edit" element={<UserEditPage />}></Route>
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PayPalScriptProvider deferLoading={true}>
      <RouterProvider router={router} />
    </PayPalScriptProvider>
  </Provider>
);
