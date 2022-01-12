import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import ProductsPage from "./components/ProductsPage/ProductsPage";
import Register from "./components/Register/Register";
import SignIn from "./components/SignIn/SignIn";
import Navbar from "./components/Navbar/Navbar";
import UserDashboard from "./components/UserDashboard/UserDashboard";

import Search from "./components/Search/Search";
import Product from "./components/Product/Product";
import Cart from "./components/Cart/Cart";

//PrivateRoutes folder
import PrivateRoute from "./PrivateRoutes/PrivateRoute";
import Profile from "./components/UserDashboard/Profile";

//AdminDashboard folder
import AdminRoute from "./PrivateRoutes/AdminRoute";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import CreateCategory from "./components/AdminDashboard/CreateCategory";
import CreateProduct from "./components/AdminDashboard/CreateProduct";
import Orders from "./components/AdminDashboard/Order";
import ManageProducts from "./components/AdminDashboard/ManageProducts";
import UpdateProduct from "./components/AdminDashboard/UpdateProduct";
import Home from "./components/Home/Home";
import Footer from "./components/Navbar/Footer";

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <div style={{ minHeight: "83vh" }}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/signin" component={SignIn} />

            <Route exact path="/search" component={Search} />
            <Route
              exact
              path="/searchCategory/:categoryId"
              component={ProductsPage}
            />
            <Route exact path="/product/:productId" component={Product} />
            <Route exact path="/cart" component={Cart} />

            <PrivateRoute
              exact
              path="/user/dashboard"
              component={UserDashboard}
            />
            <PrivateRoute exact path="/profile/:userId" component={Profile} />

            <AdminRoute
              exact
              path="/admin/dashboard"
              component={AdminDashboard}
            />
            <AdminRoute
              exact
              path="/create/category"
              component={CreateCategory}
            />
            <AdminRoute
              exact
              path="/create/product"
              component={CreateProduct}
            />
            <AdminRoute exact path="/admin/orders" component={Orders} />
            <AdminRoute
              exact
              path="/admin/products"
              component={ManageProducts}
            />
            <AdminRoute
              exact
              path="/admin/product/update/:productId"
              component={UpdateProduct}
            />
          </Switch>
        </div>
        <Footer />
      </Router>
    </>
  );
};

export default App;
