import React from "react";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";

import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { useSigninMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";

const SigninPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [signin, { isLoading }] = useSigninMutation();
  // different destructuring as use<key>Query
  const { userInfo } = useSelector((state) => state.auth);

  // redirect from cart to shipping if user already signed in
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, navigate, redirect]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await signin({ email, password }).unwrap();
      // unwrap resolved promise
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (error) {
      toast.error(error.data.message || error.error);
    }
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email" className="my-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
            required
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password" className="my-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="off"
            required
          ></Form.Control>
        </Form.Group>

        <Button
          type="submit"
          variant="primary"
          className="mt-2"
          disabled={isLoading}
        >
          Sign In
        </Button>

        {isLoading && <Loader />}

        <Row className="py-3">
          <Col>
            New customer?{" "}
            <Link to={redirect ? `/signup?redirect=${redirect}` : "/signup"}>
              Sign Up
            </Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
};

export default SigninPage;
