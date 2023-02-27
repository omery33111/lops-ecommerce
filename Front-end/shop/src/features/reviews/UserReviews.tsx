  import React, { useEffect, useRef, useState } from 'react';
  import { Alert, Button, Card, Container, ListGroup, Modal } from 'react-bootstrap';
  import { useAppDispatch, useAppSelector } from '../../app/hooks';
  import { deleteReviewUserAsync, getReviewsUserAsync, selectUserReviews } from './reviewsSlice';
  import { BsTrash } from "react-icons/bs";
  import { BsStarFill } from "react-icons/bs";
  import { Link, useNavigate } from 'react-router-dom';
  import { logoutAsync, reset } from '../authentication/authenticationSlice';
  import { BsFillPencilFill } from "react-icons/bs";



  const UserReviews = () => {
      const myServer = "https://ecommerce-lops.onrender.com"
      const dispatch = useAppDispatch();
      const navigate = useNavigate();


    const user_reviews = useAppSelector(selectUserReviews);

      const [showModal, setShowModal] = useState(false);
      const handleClose = () => setShowModal(false);
      const handleShow = () => setShowModal(true);



    useEffect(() => {
      dispatch(getReviewsUserAsync());
    }, [dispatch]);


  const onLogout = () => {
    dispatch(logoutAsync());
    dispatch(reset());
    navigate("/")
  };


  const observer = useRef<IntersectionObserver | null>(null);
  const myDivRef = useRef<HTMLDivElement>(null);

  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(6);

  const [showSpinner, setShowSpinner] = useState(false)

  useEffect(() => {
    if (observer.current) {
      observer.current.disconnect();
    }
    
    observer.current = new IntersectionObserver(entries => {
      const firstEntry = entries[0];
      if (firstEntry.isIntersecting) {
        setShowSpinner(true);
        setTimeout(() => {
          setLimit(limit + 6);
          setShowSpinner(false)
        }, 300);
      }
    });
    
    if (myDivRef.current) {
      observer.current.observe(myDivRef.current);
    }
  }, [myDivRef, limit]);


    return (
  <div>
    <Container>
        <br />
        <br />
        <h2>REVIEWS</h2>
        <br />
        <br />
        <h5>YOUR RATINGS <BsStarFill/></h5>
  <div style = {{width: "75%"}}>
    {user_reviews.length === 0 ? (
      <Alert variant="info" className="d-none d-lg-block">
        <Alert.Heading>You haven't posted any reviews yet. </Alert.Heading>
        <b>You are welcome to browse the site and leave reviews for the products you've purchased.</b>
      </Alert>
    ) : (
      <p>You have posted {user_reviews.length} reviews</p>
    )}
  </div>



  {[...user_reviews].reverse().slice(0, offset + limit).map((review) => (
            <div key={review.id}>
              <Card style={{ height: '240px', width: "74.5%"}}>
                <Card.Title style={{ position: 'absolute', transform: ' translateX(15px) translateY(10px) ' }}>
                  <b>RATING: </b>{review.rating.toFixed(1)} &#9733;
                </Card.Title>
                <Card.Body style={{ position: 'absolute', transform: ' translateX(0px) translateY(30px) ' }}>
                  {review.name}:
                </Card.Body>
                <Card.Body style={{ position: 'absolute', transform: ' translateX(0px) translateY(60px) ' }}>
                  {review.comment}
                </Card.Body>
                <Card.Body style={{ position: 'absolute', transform: ' translateX(685px) translateY(6px) ' }}>
                  {review.picture && <img height = {200} width = {230} alt = "reviewPicture" src={myServer + review.picture} />}
                </Card.Body>
                <Card.Body style={{ position: 'absolute', bottom: -4, left: -18, transform: 'translateX(15px)' }}>
                  <Button variant="danger" onClick={handleShow}>
                    <h4><BsTrash /></h4>
                  </Button>
                  <Button variant="warning" style = {{position: "absolute", transform: ' translateX(570px)'}}
                  onClick = {() => navigate(`/reviews/review_update/${review.id}/`)}>
                    <h4><BsFillPencilFill /></h4>
                  </Button>
                  <Modal show={showModal} onHide={handleClose} animation={false}>
                    <Modal.Header closeButton>
                      <Modal.Title><BsTrash /> Delete Warning</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to delete your review?</Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Close
                      </Button>
                      <Button variant="danger" onClick={() => review.id && dispatch(deleteReviewUserAsync(review.id))}>
                        Delete
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </Card.Body>
              </Card><br />
            </div>
          ))}


          <div style = {{ position: "fixed", width: "380px", top: 305, right: 38 }}>
          <ListGroup>
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
            <ListGroup.Item style={{ textDecoration: "none" }}>
              <Button variant="none" onClick={() => onLogout()}>Logout</Button>
            </ListGroup.Item><br/>
          </ListGroup>
          </div>



    </Container><br/><br/><br/><br/><br/><br/><br/><br/><br/>
  </div>
    );
  };

  export default UserReviews;
