import { useEffect, useState } from "react";
import { Button, Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectUser } from "../authentication/authenticationSlice";
import { getProfileAsync } from "./profileSlice";
import { BsFillPencilFill } from "react-icons/bs";
import { myServer } from "../../endpoints/endpoints";
import './profile.css';
import ProfileNavigator from "../navigators/ProfileNavigator";
import BurgerNav from "../navigators/BurgerNav";



const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const username = useAppSelector(selectUser);
  const { first_name, last_name, location, bio, picture } = useAppSelector((state) => state.profile);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    dispatch(getProfileAsync());
  }, [dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(window.pageYOffset > 110);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isTablet = window.innerWidth >= 0 && window.innerWidth <= 1024;

  return (
    <Container>

      {isTablet && (<BurgerNav />)}

      <div style = {{height: "10rem"}}/>
      <Row>
        <Col md={9}>
          <h2 className="mb-4">PROFILE</h2>
          <h5>YOUR PROFILE</h5>
          {!isTablet && (
                      <div className={isScrolling ? "profile-navigator scrolling" : "profile-navigator"}>
                      <ProfileNavigator />
                    </div>
          )}

          <div className="username-info">USERNAME: <b>{username}</b></div>
          <Card className="profile-card">
            <Card.Body>
              <Row className="align-items-center">
                <Col md={4} className="text-center">
                  {picture ? <img alt="mypicture" src={myServer + picture} className="profile-picture" /> : "UNKNOWN"}
                </Col>
                <Col md={4}>
                  <ListGroup variant="flush">
                    <ListGroup.Item><b>USERNAME:</b> {username}</ListGroup.Item>
                    <ListGroup.Item><b>FIRST NAME:</b> {first_name ? first_name : "UNKNOWN"}</ListGroup.Item>
                    <ListGroup.Item><b>LAST NAME:</b> {last_name ? last_name : "UNKNOWN"}</ListGroup.Item>
                    <ListGroup.Item><b>LOCATION:</b> {location ? location : "UNKNOWN"}</ListGroup.Item>
                  </ListGroup>
                </Col>
                <Col md={4}>
                  <ListGroup variant="flush">
                    <ListGroup.Item><b>BIO:</b><hr />{bio ? bio : "UNKNOWN"}</ListGroup.Item>
                  </ListGroup>
                </Col>
              </Row>
            </Card.Body>
          </Card>
          <Button onClick={() => navigate("/profile/profile_update")} variant="warning" className="edit-button">
            <BsFillPencilFill />
          </Button>
          <div style = {{height: "20rem"}}/>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
