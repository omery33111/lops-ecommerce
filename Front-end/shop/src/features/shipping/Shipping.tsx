import { useEffect, useState } from "react";
import { Container, Table, Row, Col, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import ProfileNavigator from "../navigators/ProfileNavigator";
import { deleteAddressAsync, getAddressesAsync, selectAddress } from "./shippingSlice";
import BurgerNav from "../navigators/BurgerNav";

const Shipping = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const addresses = useAppSelector(selectAddress);

  useEffect(() => {
    dispatch(getAddressesAsync());
  }, [dispatch]);



  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 110) {
        setIsScrolling(true);
      } else {
        setIsScrolling(false);
      }
    });
  }, [dispatch]);

  const isTablet = window.innerWidth >= 0 && window.innerWidth <= 1024;


  return (
    <div>
            {isTablet && (<BurgerNav />)}
      <Container>
        <br />
        <br />
        <h2>YOUR ADDRESSES</h2>
        <br />
        <br />
        <h5>ADDRESSES</h5>

        {!isTablet && (
        <div>
        { isScrolling ? (
        <div style = {{position: "absolute", top: 299}}><ProfileNavigator /></div>) : (<div style = {{position: "absolute"}}><ProfileNavigator /></div>) }
        </div>)}

        <Row>
          <Col xs={9}>
          <Button
              onClick={() => navigate("/shipping/shipping_post")}
              variant="warning"
              style={{ float: "right", position: "absolute", transform: " translateX(844px) translateY(-40px) " }}
            >
              NEW ADDRESS
            </Button>
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
              {addresses.length === 0 ? (
                <Alert variant="info" style = {{position: "absolute", width: "965px"}}><br/>
                  <Alert.Heading>USER HAS NO ADDRESSES YET!</Alert.Heading>
                  <b>The requested user has no addresses yet.</b>
                </Alert>
              ) : ("")}
              <tbody>
                {addresses.map((address) => (
                  <tr key={address.id}>
                  <td>{address.first_name}</td>
                  <td>{address.last_name}</td>
                  <td>{address.address}</td>
                  <td>{address.city}</td>
                  <td>{address.state}</td>
                  <td>{address.country}</td>
                  <td>{address.postal_code}</td>
                  <td>
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
                        href=""
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

           
          </Col>

          

        </Row>
      </Container>
      <div style = {{height: "470px"}}/>
    </div>
  );
};

export default Shipping;
