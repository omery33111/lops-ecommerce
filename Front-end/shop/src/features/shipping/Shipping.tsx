import React, { useEffect } from "react";
import { Container, Table, Row, Col, Button, ListGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logoutAsync, reset } from "../authentication/authenticationSlice";
import {
  deleteAddressAsync,
  getAddressesAsync,
  selectAddress,
} from "./shippingSlice";

const Shipping = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const addresses = useAppSelector(selectAddress);

  useEffect(() => {
    dispatch(getAddressesAsync());
  }, []);

  const onLogout = () => {
    dispatch(logoutAsync());
    dispatch(reset());
    navigate("/")
  };

  return (
    <div>
      <Container>
        <br />
        <br />
        <h2>YOUR ADDRESSES</h2>
        <br />
        <br />
        <h5>ADDRESSES</h5>
        <Row>
          <Col xs={9}>
            <Table striped bordered hover>
              <thead>
                <tr style={{ backgroundColor: "#5A5A5A", color: "white" }}>
                  <th style={{ textAlign: "center" }}>First name</th>
                  <th style={{ textAlign: "center" }}>Last name</th>
                  <th style={{ textAlign: "center" }}>Address</th>
                  <th style={{ textAlign: "center" }}>City</th>
                  <th style={{ textAlign: "center" }}>State</th>
                  <th style={{ textAlign: "center" }}>Country</th>
                  <th style={{ textAlign: "center" }}>Postal Code</th>
                  <th style={{ textAlign: "center" }}></th>
                </tr>
              </thead>
              <tbody>
                {addresses.map((address) => (
                  <tr key={address.id} style={{ backgroundColor: "white" }}>
                    <td style={{ textAlign: "center" }}>
                      {address.first_name}
                    </td>
                    <td style={{ textAlign: "center" }}>{address.last_name}</td>
                    <td style={{ textAlign: "center" }}>{address.address}</td>
                    <td style={{ textAlign: "center" }}>{address.city}</td>
                    <td style={{ textAlign: "center" }}>{address.state}</td>
                    <td style={{ textAlign: "center" }}>{address.country}</td>
                    <td style={{ textAlign: "center" }}>
                      {address.postal_code}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <button
                        style={{
                          color: "blue",
                          border: "none",
                          background: "none",
                          padding: 0,
                        }}
                        onClick={() =>
                          navigate("shipping_update/" + address.id)
                        }
                      >
                        Edit
                      </button>{" "}
                      |{" "}
                      <a
                        style={{ color: "red", textDecoration: "none" }}
                        href="#"
                        onClick={() =>
                          address.id && dispatch(deleteAddressAsync(address.id))
                        }
                      >
                        Delete
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <Button
              onClick={() => navigate("/shipping/shipping_post")}
              variant="warning"
              style={{ float: "right" }}
            >
              NEW ADDRESS
            </Button>
          </Col>

        <Col xs={3}>
          <ListGroup variant="flush" style = {{position: "fixed", width: "25%"}}>

          <Link to="/profile" style={{ textDecoration: "none" }}>
          <ListGroup.Item><b>My profile</b></ListGroup.Item>
          </Link>
          
          <Link to="/shipping" style={{ textDecoration: "none" }}>
          <ListGroup.Item><b>Shipping addresses</b></ListGroup.Item>
          </Link>

          <Link to="/reviews/reviews_user" style={{ textDecoration: "none" }}>
          <ListGroup.Item><b>Reviews</b></ListGroup.Item>
          </Link>

          <Link to="/order/orders_user" style={{ textDecoration: "none" }}>
                <ListGroup.Item><b>Recent orders</b></ListGroup.Item>
              </Link>

          <ListGroup.Item style={{ textDecoration: "none" }}><Button variant = "none" onClick={() => onLogout()} >Logout</Button></ListGroup.Item><br/>

          </ListGroup>
        </Col>

        </Row>
      </Container>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default Shipping;
