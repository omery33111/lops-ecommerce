import React, { useState, useEffect } from "react";
import { Button, Card, Col, Container, Form, ListGroup, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logoutAsync, reset, selectUser } from "../authentication/authenticationSlice";
import ProfileNavigator from "../navigators/ProfileNavigator";
import { patchProfileAsync } from "./profileSlice";
import BurgerNav from "../navigators/BurgerNav";

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

  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      setIsScrolling(window.pageYOffset > 110);
    });
  }, []);

  const isTablet = window.innerWidth >= 0 && window.innerWidth <= 1024;

  
  return (
    <Container>
            {isTablet && (<BurgerNav />)}

            <div style = {{height: "10rem"}}/>
      <Row>
        <Col md={9}>
          <h2 className="mb-4">YOUR PROFILE</h2>
          <h5>PROFILE DETAILS</h5>
          {!isTablet && (
                      <div className={isScrolling ? "profile-navigator scrolling" : "profile-navigator"}>
                      <ProfileNavigator />
                    </div>
          )}
          <div className="username-info">USERNAME: <b>{username}</b></div>
          <Card className="profile-card">
            <Form onSubmit={handleSubmit}>
              <Card.Body>
                <Row className="align-items-center">
                  <Col md={4}>
                    <Form.Group controlId="formPicture">
                      <Form.Label>Picture</Form.Label>
                      <Form.Control type="file" onChange={handlePictureChange} />
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
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <b>BIO:</b>
                        <hr />
                        <input type="text" onChange={(event) => setBio(event.target.value)} />
                      </ListGroup.Item>
                    </ListGroup>
                  </Col>
                </Row>
              </Card.Body>
              <div className="buttons-wrapper">
                <Button variant="warning" type="submit">COMPLETE EDITING</Button>
                <Link to="/profile">
                  <Button variant="secondary">CANCEL</Button>
                </Link>
              </div>
            </Form>
          </Card>
          <div style = {{height: "20rem"}}/>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileUpdate;
