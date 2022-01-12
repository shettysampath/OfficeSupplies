import React from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuthenticated, signout } from "../../helpers/authFetch";
import { getItemTotal } from "../../helpers/cart";

const Navbar = ({ history }) => {
  const isActive = (path) => {
    if (history.location.pathname === path) {
      return { color: "#6495ED" };
    } else {
      return { color: "#fff" };
    }
  };

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark sticky-top">
      <div className="navbar-brand d-flex align-items-center">
        <Link className="text-decoration-none text-white ml-3 d-flex" to="/">
          <h3> Dunder Mifflin </h3>
          &nbsp;<i className="fa fa-paper-plane"></i>
        </Link>
      </div>

      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbar"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbar">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to="/search" className="nav-link" style={isActive("/search")}>
              <i className="fa fa-search"></i> Search
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/cart" className="nav-link" style={isActive("/cart")}>
              <i className="fa fa-shopping-cart"></i>&nbsp;
              <sup>{getItemTotal()}</sup>
              &nbsp; Cart
            </Link>
          </li>

          {!isAuthenticated() && (
            <>
              <li className="nav-item">
                <Link
                  to="/register"
                  className="nav-link"
                  style={isActive("/register")}
                >
                  Register
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/signin"
                  className="nav-link"
                  style={isActive("/signin")}
                >
                  Sign In
                </Link>
              </li>
            </>
          )}

          {isAuthenticated() && isAuthenticated().user.role === 1 && (
            <>
              <li className="nav-item">
                <Link
                  to="/admin/dashboard"
                  className="nav-link"
                  style={isActive("/admin/dashboard")}
                >
                  <i className="fa fa-user"></i>&nbsp;Admin
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/signin"
                  className="nav-link"
                  style={isActive("/signout")}
                  onClick={() => signout()}
                >
                  <i className="fa fa-sign-out-alt"></i>
                </Link>
              </li>
            </>
          )}

          {isAuthenticated() && isAuthenticated().user.role === 0 && (
            <>
              <li className="nav-item">
                <Link
                  to="/user/dashboard"
                  className="nav-link"
                  style={isActive("/user/dashboard")}
                >
                  <i className="fa fa-user-circle"></i>&nbsp;
                  {isAuthenticated().user.name}
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/signin"
                  className="nav-link"
                  style={isActive("/signout")}
                  onClick={() => signout()}
                >
                  <i className="fa fa-sign-out-alt"></i>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default withRouter(Navbar);
