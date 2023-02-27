import React, { useState } from "react";
import { Button, Card, Col, Container, Form, ListGroup, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logoutAsync, reset, selectUser } from "../authentication/authenticationSlice";
import { patchProfileAsync } from "./profileSlice";

const ProfileUpdate = () => {
  const username = useAppSelector(selectUser);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [picture, setPicture] = useState<any>(null);
  const [bio, setBio] = useState<string>("");
  const [first_name, setFirstName] = useState<string>("");
  const [last_name, setLastName] = useState<string>("");
  const [location, setLocation] = useState<string>("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    if (picture) {
      formData.append("picture", picture);
    }
    formData.append("bio", bio);
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("location", location);

    dispatch(patchProfileAsync(formData));
  };


  const handlePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPicture(event.target.files ? event.target.files[0] : undefined);
  }

  const onLogout = () => {
    dispatch(logoutAsync());
    dispatch(reset());
    navigate("/");
  };

  return (
    <div>
      <Container>
        <Row>
          <Col md={9}>
            <br />
            <br />
            <h2>YOUR PROFILE</h2>
            <br />
            <br />
            <h5>PROFILE DETAILS</h5>
            <div style={{textAlign: 'right', position: "absolute", transform: " translateX(835px) translateY(-25px) "}}>USERNAME: <b>{username}</b></div>
            <Card style = {{ width: "63.52%", height: "250px", position: "absolute", transform: " translateX(0px) translateY(0px) "}}>
              <Form onSubmit={handleSubmit}>
                <Card.Body>
                  <Row
                    style={{
                      display: "flex",
                      alignItems: "center",
                      height: "100%",
                    }}
                  >
                    <Col md={4}>
                    <Form.Group controlId="formPicture">
                    <Form.Label>Picture</Form.Label>
                    <Form.Control
                      type="file"
                      onChange = {handlePictureChange}
                    />
                  </Form.Group>
                    </Col>
                    <Col md={4}>
                      <ListGroup variant="flush">
                        <ListGroup.Item>
                          <b>FIRST NAME:</b>{" "}
                          <input type="text" onChange={(event) => setFirstName(event.target.value)} />
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <b>LAST NAME:</b>{" "}
                          <input type="text" onChange={(event) => setLastName(event.target.value)} />
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <b>LOCATION:</b>{" "}
                          <input type="text" onChange={(event) => setLocation(event.target.value)} />
                        </ListGroup.Item>
                      </ListGroup>
                    </Col>
                    <Col md={4}>
                      <ListGroup variant="flush" >
                        <ListGroup.Item>
                          <b>BIO:</b>
                          <hr />
                          <input type="text" onChange={(event) => setBio(event.target.value)} />
                        </ListGroup.Item>
                      </ListGroup>
                    </Col>
                  </Row>
                </Card.Body>
                <br />
            <br />
            <div>
              <Button
                onClick={() => {
                  window.location.href = "/profile";
                }}
                variant="warning"
                type="submit"
                style={{ float: "right", transform: "translateY(-30px)" }}
              >
                COMPLETE EDITING
              </Button>
            </div>
            <Link to="/profile">
                  <br />
                  <Button
                    variant="secondary"
                    style={{ float: "right", transform: "translateY(-54px) translateX(-15px)" }}>
                    CANCEL
                  </Button>
                </Link>

                </Form>
            </Card>
            
          </Col>

          <Col md={3}>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br/>
            <div style = {{ position: "fixed", width: "380px", top: 305, right: 38 }}>
            <ListGroup variant="flush">
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
            </div>
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

export default ProfileUpdate;
