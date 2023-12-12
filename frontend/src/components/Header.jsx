import React from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Container, Badge } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useSignoutMutation } from "../slices/usersApiSlice";
import { resetCredentials } from "../slices/authSlice";
import { resetCart } from "../slices/cartSlice";

import logo from "../assets/logo.png";
import Search from "./Search";

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  // state.cart: cart obtained from store.js (i.e. what you named your state)
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [signout] = useSignoutMutation();

  const signoutHandler = async () => {
    try {
      await signout().unwrap();
      dispatch(resetCredentials());
      dispatch(resetCart());
      navigate("/signin");
    } catch (error) {
      console.log(error.data.message);
    }
  };

  return (
    <header>
      <Navbar bg="primary" variant="dark" expand="md" collapseOnSelect>
        {/* menu collapses to hamburger menu for screen size smaller than md */}
        <Container>
          <LinkContainer to="/">
            {/* <LinkContainer> is bootstrap equivalent of <Link> from react router */}
            <Navbar.Brand>
              <img src={logo} alt="logo" width="35" height="35" />
              ProShop
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Search />

              {/* me-auto shifts menu to LHS */}
              {/* ms-auto shifts menu to RHS */}
              <LinkContainer to="/cart">
                <Nav.Link>
                  <FaShoppingCart /> Cart
                  {cartItems.length > 0 && (
                    <Badge pill bg="success" style={{ marginLeft: "5px" }}>
                      {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                    </Badge>
                  )}
                </Nav.Link>
              </LinkContainer>

              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={signoutHandler}>
                    Sign Out
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/signin">
                  <Nav.Link>
                    <FaUser /> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}

              {/* admin links */}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu">
                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
