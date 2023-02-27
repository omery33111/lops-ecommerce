import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, ListGroup, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Rating } from '@mui/material';
import { patchReviewAsync, selectSingleReview } from "./reviewsSlice";
import { getSingleReviewAsync, selectSingleUserReview } from "../admin_panel/panelSlice";
import { logoutAsync, reset } from "../authentication/authenticationSlice";



const ReviewUpdate = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const single_review = useAppSelector(selectSingleUserReview);

  const [name, setName] = useState<string>("");
  const [rating, setRating] = useState<number | undefined>(0);
  const [comment, setComment] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    if (rating) {
      formData.append("name", name);
      formData.append("rating", rating.toString());
      formData.append("comment", comment);
    }
    
    dispatch(patchReviewAsync({ reviewData: formData, id: Number(single_review.id) }));
      navigate(`/reviews/reviews_user`);
  };


  const { number } = useParams();

  useEffect(() => {
    if (number !== undefined) {
      dispatch(getSingleReviewAsync(number));
    }
  }, [number, dispatch]);

  
  const onLogout = () => {
    dispatch(logoutAsync());
    dispatch(reset());
    navigate("/");
  };
  


  return (
    <div>
      <Container>
            <br />
            <br />
            <h2>YOUR REVIEWS</h2>
            <br />
            <br />
            <h5>REVIEW DETAILS</h5>
        <Row className="justify-content-left mt-3">
          <Col md={7}>
          <Form onSubmit={handleSubmit} style={{ width: "43%" }}><br/>
            <div style={{ position: "absolute", transform: " translateX(0px) translateY(-30px) " }}>
              
            <b>Rating:</b>
            <Rating
              style={{ position: "absolute", transform: " translateX(10px) translateY(-2px) " }}
              value={rating}
              name="half-rating"
              defaultValue={2.5}
              precision={0.5}
              onChange={(e) => setRating(+((e.target as HTMLInputElement).value))}
            />
            </div>
            <Form.Group controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                onChange={(event) => setName(event.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formComment">
              <Form.Label>Comment</Form.Label>
              <Form.Control
                type="text"
                onChange={(event) => setComment(event.target.value)}
                required
              />
            </Form.Group>
            <br />
            <Button variant="warning" type="submit" style={{ width: "150px", position: "absolute", left: 190}}>
              SUBMIT REVIEW
            </Button>
            
          </Form>
          <Button
                  onClick={() => {
                    navigate(`/reviews/reviews_user`);
                  }}
                    variant="secondary"
                    style={{ width: "100px", position: "absolute", transform: " translateX(103px) translateY(50px) "}}
                  >
                    CANCLE
                  </Button>
          </Col>
        </Row>
      </Container>
      
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

      
      <div style = {{height: "134px"}}/>
    
    </div>
  );
};



export default ReviewUpdate;
