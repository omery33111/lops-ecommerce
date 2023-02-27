import React, { useEffect } from "react";
import { Button, Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logoutAsync, reset, selectUser } from "../authentication/authenticationSlice";
import { getProfileAsync } from "./profileSlice";
import { BsFillPencilFill } from "react-icons/bs";



const Profile = () => {
  const myServer = "https://ecommerce-lops.onrender.com"
    const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const username = useAppSelector(selectUser);

  const storedIsStaff = JSON.parse(localStorage.getItem('is_staff') as string)

  useEffect(() => {
    dispatch(getProfileAsync());
  }, [dispatch]);

  const { first_name, last_name, location, bio, picture } = useAppSelector((state) => state.profile);
  
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
            <h2>PROFILE</h2>
            <br />
            <br />
            <h5>YOUR PROFILE</h5>
            <div style={{textAlign: 'right', position: "absolute", transform: " translateX(835px) translateY(-25px) "}}>USERNAME: <b>{username}</b></div>
            <Card style = {{ width: "63.55%", height: "250px", position: "absolute", transform: " translateX(0px) translateY(0px) "}}>
                <Card.Body>
                    <Row style = {{display: "flex", alignItems: "center", height: "100%"}}>
                    <Col md={4}>
                    {picture ? (<img alt="mypicture" height = {200} width = {200} src = {myServer + picture}/>) : ("UNKNOWN")}
                    </Col>
                    <Col md={4}>
                    <ListGroup variant="flush">
                        <ListGroup.Item><b>USERNAME:</b> {username}</ListGroup.Item>
                        <ListGroup.Item><b>FIRST NAME:</b> {first_name? (`${first_name}`) : ("UNKNOWN")}</ListGroup.Item>

                        <ListGroup.Item><b>LAST NAME:</b> {last_name? (`${last_name}`) : ("UNKNOWN")}</ListGroup.Item>
                        <ListGroup.Item><b>LOCATION:</b> {location? (`${location}`) : ("UNKNOWN")}</ListGroup.Item>
                    </ListGroup>
                        </Col>
                        <Col md={4}>
                        <ListGroup variant="flush">
                        <ListGroup.Item><b>BIO:</b><hr/>
                        {bio? (`${bio}`) : ("UNKNOWN")}</ListGroup.Item>
                        
                    </ListGroup>
                    
                        </Col>
                    </Row>
                </Card.Body>
            </Card><br/>
            <Button
              onClick={() => navigate("/profile/profile_update")}
              variant="warning"
              style = {{ position: "absolute", transform: " translateX(912px) translateY(-13px) "}}
            >
             <h6> <BsFillPencilFill /> </h6>
            </Button>
          </Col>



  



          <Col md={3}><br/><br/><br/><br/><br/><br/><br/><br/>
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
    </div>
  );
};

export default Profile;
