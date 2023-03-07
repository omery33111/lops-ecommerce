import React, { useEffect, useState } from 'react';
import { Alert, Button, Container, Form } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getOrdersUserAsync, selectOrdersUser} from './orderSlice';
import { Rating } from '@mui/material';
import { postReviewAsync } from '../reviews/reviewsSlice';
import ProfileNavigator from '../navigators/ProfileNavigator';



const OrdersUser = () => {
    const dispatch = useAppDispatch();

  const user_orders = useAppSelector(selectOrdersUser);


  useEffect(() => {
    dispatch(getOrdersUserAsync());
  }, [dispatch]);



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



  return (
    <div>
      <Container>
        <br />
        <br />
        <h2>ORDERS</h2>
        <br />
        <br />
        <h5>YOUR ORDERS</h5>
        { isScrolling ? (<div style = {{position: "absolute", top: 299}}><ProfileNavigator /></div>) : (<div style = {{position: "absolute"}}><ProfileNavigator /></div>) }
        {user_orders.length === 0 ? ("") : (<div style={{ position: "absolute", float: "left", transform: "translateX(732px) translateY(-30px)", width: "40.5%"}}>CLICK TO POST REVIEW</div>)}
        <div style={{ width: "75%" }}>
          
        </div>
            
        <table style={{ width: "70%", height: "100px" }}>
  <thead>
    <tr style={{ backgroundColor: "#5A5A5A", color: "white" }}>
      <th style={{ textAlign: "center" }}>Product ID</th>
      <th style={{ textAlign: "center" }}>Price</th>
    </tr>
  </thead>
  {user_orders.length === 0 ? (
    <Alert
      variant="info"
      className="d-none d-lg-block"
      style={{ position: "absolute", width: "908px" }}
    >
      <Alert.Heading>You have not placed any orders yet.</Alert.Heading>
      <b>You are welcome to browse the collections and find your item.</b>
    </Alert>
  ) : (
    ""
  )}
  <tbody style={{ overflowY: "auto" }}>
    {[...user_orders].reverse().map((order) => (
      <tr key={order.id}>
        <td style={{ width: "70%", textAlign: "center" }}>
          <div
            style={{
              backgroundColor: "#f5f5f5",
              borderRadius: "5px",
              padding: "10px",
              cursor: "pointer",
              width: "100%",
            }}
            onClick={() => {
              handleProductSelect(order.product);
              setShowReviews(true);
              if (selectedOrder && selectedOrder.id === order.id) {
                setSelectedOrder(null);
              } else {
                setSelectedOrder(order);
              }
            }}
          >
            {order.product}
          </div>
        </td>
        <td style={{ width: "30%", textAlign: "center" }}>
          <div
            style={{
              backgroundColor: "#f5f5f5",
              borderRadius: "5px",
              padding: "10px",
              cursor: "pointer",
              width: "100%",
            }}
            onClick={() => {
              handleProductSelect(order.product);
              setShowReviews(true);
              if (selectedOrder && selectedOrder.id === order.id) {
                setSelectedOrder(null);
              } else {
                setSelectedOrder(order);
              }
            }}
          >
            ${order.price}
          </div>
        </td>
      </tr>
    ))}
  </tbody>
</table>





  

                {selectedOrder && (
  <div style={{ textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
    <Form onSubmit={handleSubmit} encType="multipart/form-data" style={{ width: "43%" }}>
    <div style = {{height: "50px"}}/>
      <div style={{ position: "absolute", transform: "translateX(-70px)" }}>
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

  <div style = {{height: "400px"}} />


  </Container>
</div>

  );
};

export default OrdersUser;
