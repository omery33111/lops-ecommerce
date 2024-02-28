import React, { useEffect, useState } from 'react';
import { Alert, Button, Card, Col, Container, Form, ListGroup, Row } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getOrdersUserAsync, selectOrdersUser, selectSingleOrder} from './orderSlice';
import { Rating } from '@mui/material';
import { postReviewAsync } from '../reviews/reviewsSlice';
import ProfileNavigator from '../navigators/ProfileNavigator';
import { Order } from '../../models/Order';
import { Link } from 'react-router-dom';
import BurgerNav from '../navigators/BurgerNav';



const OrdersUser = () => {
  const dispatch = useAppDispatch();

  const user_orders = useAppSelector(selectOrdersUser);
  const singleOrder = useAppSelector(selectSingleOrder);


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
  dispatch(postReviewAsync(formData));
};

const handlePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setPicture(event.target.files ? event.target.files[0] : undefined);
}

const handleProductSelect = (id: any) => {
  if (singleOrder.product.id === id) {
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


const isTablet = window.innerWidth >= 0 && window.innerWidth <= 1024;


  return (
    <div>
            {isTablet && (<BurgerNav />)}
      <Container>
        <br />
        <br />
        <h2>ORDERS</h2>
        <br />
        <br />
        <h5>YOUR ORDERS</h5>

        {!isTablet && (
        <div>
        { isScrolling ? (
        <div style = {{position: "absolute", top: 299}}><ProfileNavigator /></div>) : (<div style = {{position: "absolute"}}><ProfileNavigator /></div>) }
        </div>)}

        {user_orders.length === 0 ? ("") : (<div style={{ position: "absolute", float: "left", transform: "translateX(780px) translateY(-30px)", width: "40.5%"}}>CLICK TO POST REVIEW</div>)}
        <div style={{ width: "75%" }}>
          
        </div>
            
    {user_orders.length === 0 ? (
      <Alert variant="info" className="d-none d-lg-block" style={{ position: "absolute", width: "908px" }}>
        <Alert.Heading>You have not placed any orders yet.</Alert.Heading>
        <b>You are welcome to browse the collections and find your item.</b>
      </Alert>
    ) : (
<div >
  {[...user_orders].reverse().map((order: Order) => (
    <a href = "#reviews" style = {{textDecoration: "none", color: "black"}}>
    <Card
      key={order.id}
      style={{ marginBottom: "20px", width: "100%" }}
      onClick={() => {
        handleProductSelect(order.product.id);
        setShowReviews(true);
        if (selectedOrder && selectedOrder.id === order.id) {
          setSelectedOrder(null);
        } else {
          setSelectedOrder(order);
        }
      }}
    >
      <Card.Body
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "pointer",
        }}
      >
        <Row>
          <Col>
        <Link to={`/single_product/${order.product.id}`} style={{ textDecoration: "none", color: "black"}}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            height="200"
            width="200"
            alt="productPic"
            src={order.product.picture}
            style={{ marginRight: "40px" }}
          />
          <div>
            <div>
              <h4>{order.product.product_name}</h4>
            </div>
            

            <div style={{ height: "10px" }} />

            <div>
              {order.product.description.length > 50
                ? `${order.product.description.substr(0, 50)}...`
                : order.product.description}
            </div>
          </div>
        </div>
        </Link>
        </Col>

              <Col className="d-flex align-items-center">

              <ListGroup variant="flush">
                        <ListGroup.Item>{order.shipping_address.first_name} {order.shipping_address.last_name}</ListGroup.Item>
                        <ListGroup.Item>{order.shipping_address.state}</ListGroup.Item>
                        <ListGroup.Item>{order.shipping_address.country}</ListGroup.Item>
                        <ListGroup.Item>{order.shipping_address.city}</ListGroup.Item>
                        <ListGroup.Item>{order.shipping_address.postal_code}</ListGroup.Item>
                      </ListGroup>
            </Col>

            
            {isTablet ? (
                                      <Col className="d-flex align-items-center" style = {{direction: "rtl", justifyContent: "center", textAlign: "center"}}>
                                      <div>
                                  total: <b>₪{order.price}</b>
                                  </div>
                                  </Col>
            ) : (
                <Col className="d-flex align-items-center" style = {{direction: "rtl"}}>
                <div>
                total:  <b>₪{order.price}</b>
            </div>
            </Col>
            )}
            </Row>
      </Card.Body>
    </Card>
    </a>
  ))}
</div>
)}


        





  

                {selectedOrder && (
                  <div>
                    <div id = "reviews" style={{ height: "250px"}}/>
                  <div style = {{ display: "flex", justifyContent: "center", alignItems: "center"}}><h4>LEAVE A REVIEW</h4></div>
                  <div style = {{height: "50px"}} />
<div style={{ textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center" }}>
    <Form onSubmit={handleSubmit} encType="multipart/form-data" style={{ width: "43%" }}>
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
</div>
)}

  <div style = {{height: "400px"}} />


  </Container>
</div>

  );
};

export default OrdersUser;
