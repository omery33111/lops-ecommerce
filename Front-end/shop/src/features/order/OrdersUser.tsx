import React, { useEffect, useState } from 'react';
import { Alert, Button, Container, Form, ListGroup } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Link, useNavigate } from 'react-router-dom';
import { logoutAsync, reset } from '../authentication/authenticationSlice';
import { getOrdersUserAsync, selectOrdersUser} from './orderSlice';
import { Rating } from '@mui/material';
import { postReviewAsync } from '../reviews/reviewsSlice';



const OrdersUser = () => {
    const myServer = "https://ecommerce-lops.onrender.com"
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

  const user_orders = useAppSelector(selectOrdersUser);


  useEffect(() => {
    dispatch(getOrdersUserAsync());
  }, [dispatch]);



const onLogout = () => {
  dispatch(logoutAsync());
  dispatch(reset());
  navigate("/")
};

const [selectedOrder, setSelectedOrder] = useState<any>(null);
const [showReviews, setShowReviews] = useState(false);

const [product, setProduct] = useState<string | null>(null);
const [name, setName] = useState<string>('');
const [comment, setComment] = useState<string>('');
const [rating, setRating] = useState<number>(0)
const [picture, setPicture ] = useState<any>(null);

const handleSubmit = async (event: any) => {
  event.preventDefault();
  

  const formData = new FormData();
  formData.append('product', String(product));
  formData.append('name', name);
  formData.append('comment', comment);
  formData.append('rating', Math.round(rating).toString());
  if (picture) {
      formData.append('picture', picture);
  }
console.log(formData)
  dispatch(postReviewAsync(formData));
};

const handlePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setPicture(event.target.files ? event.target.files[0] : undefined);
}

const handleProductSelect = (id: any) => {
  if (product === id) {
    setProduct(null);
  } else {
    setProduct(id);
  }
};



  return (
    <div>
      <Container>
        <br />
        <br />
        <h2>ORDERS</h2>
        <br />
        <br />
        <h5>YOUR ORDERS</h5>
        <div style={{ position: "absolute", float: "left", transform: "translateX(732px) translateY(-30px)", width: "40.5%"}}>CLICK TO POST REVIEW</div>
        <div style={{ width: "75%" }}>
          {user_orders.length === 0 ? (
            <Alert variant="info" className="d-none d-lg-block">
              <Alert.Heading>
                You have not placed any orders yet.
              </Alert.Heading>
              <b>
                You are welcome to browse the collections and find your item.
              </b>
            </Alert>
          ) : (
            ""
          )}
        </div>
            
        <table style={{ width: "70%", height: "100px" }}>
  <thead>
    <tr>
      <th style={{ textAlign: "center" }}>Product ID</th>
      <th style={{ textAlign: "center" }}>Price</th>
    </tr>
  </thead>
  <tbody style={{ overflowY: "auto"}}>
    {[...user_orders].reverse().map((order) => (
      <tr
        key={order.id}
        style={{
          backgroundColor: "#f5f5f5",
          borderRadius: "5px",
          padding: "10px",
          cursor: "pointer",
        }}
        onClick={() => {
          handleProductSelect(order.product)
          setShowReviews(true)
          if (selectedOrder && selectedOrder.id === order.id) {
            setSelectedOrder(null)
          } else {
            setSelectedOrder(order)
          }
        }}
      >
        <td style={{ width: "70%", textAlign: "center" }}>{order.product}</td>
        <td style={{ width: "30%", textAlign: "center" }}>${order.price}</td>
      </tr>
    ))}
  </tbody>
</table>



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
          <Link to="" style={{ textDecoration: "none" }}>
            <ListGroup.Item><b>Recent orders</b></ListGroup.Item>
          </Link>
          <ListGroup.Item style={{ textDecoration: "none" }}>
            <Button variant="none" onClick={() => onLogout()}>Logout</Button>
          </ListGroup.Item><br/>
        </ListGroup>
        </div>
  </Container>

                {selectedOrder && (
  <div style={{ textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
    <Form onSubmit={handleSubmit} encType="multipart/form-data" style={{ width: "43%" }}>
      <div style={{ position: "absolute", transform: " translateX(-30px) translateY(2px) " }}>
        
      <b>Rate This Product:</b>
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
      <Form.Group controlId="formPicture">
        <Form.Label>Picture (optional)</Form.Label>
        <Form.Control type="file" onChange={handlePictureChange} />
      </Form.Group>
      <br />
      <Button variant="warning" type="submit">
        SUBMIT REVIEW
      </Button>
    </Form>
  </div>
)}
                    <br /><br />
                    <br /><br />
  
  
  
  
  <br/><br/><br/><br/><br/><br/><br/><br/>
</div>
  );
};

export default OrdersUser;
