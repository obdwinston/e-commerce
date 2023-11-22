import React from "react";
import { Row, Col } from "react-bootstrap";

import Loader from "../components/Loader";
import Message from "../components/Message";
import Product from "../components/Product";
import { useGetProductsQuery } from "../slices/productsApiSlice";

const HomePage = () => {
  const { data: products, isLoading, isError, error } = useGetProductsQuery();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">{error.data.message || error.error}</Message>
      ) : (
        <>
          <h1>Latest Products</h1>
          <Row>
            {products.map((product) => (
              // screen split into 12 columns
              <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default HomePage;
