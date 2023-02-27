import React, { useEffect, useState } from 'react';
import { Alert, Button, Card, Col, Container, ListGroup, Modal, Row } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Link, useNavigate } from 'react-router-dom';
import { getOrdersAsync, selectOrders } from '../order/orderSlice';
import { logoutAsync, reset } from '../authentication/authenticationSlice';
import AdminProdNavigator from '../navigators/AdminProdNavigator';



const AllOrders = () => {
    const myServer = "https://ecommerce-lops.onrender.com"
    const dispatch = useAppDispatch();
    const navigate = useNavigate();


  const orders = useAppSelector(selectOrders);


  useEffect(() => {
    dispatch(getOrdersAsync());
  }, [dispatch]);


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
      <h2>ORDERS</h2>
      <div style = {{height: "100px"}}/>
      <h5>ORDER LIST</h5>
      <br />



<table className="table table-striped" style={{ width: "75%" }}>
  <thead>
  <tr style={{ backgroundColor: "#5A5A5A", color: "white",  textAlign: "center", verticalAlign: "middle" }}>
      <th>User ID</th>
      <th>Product ID</th>
      <th>Price</th>
      <th>Shipping ID</th>
      <th>Amount</th>
    </tr>
  </thead>
  <div>
  {orders.length === 0 ? (
    <Alert variant="info" className="d-none d-lg-block" style = {{position: "absolute", transform: "translateX(0px) translateY(0px)", width: "63.6%"}}>
      <Alert.Heading>THERE ARE NO ORDERS YET!</Alert.Heading>
      <b>You are welcome to browse the collections and find your item.</b>
    </Alert>
  ) : ("")}
</div>
  <tbody>
    {[...orders].reverse().map((order) => (
  <tr key={order.id} style = {{ textAlign: "center", verticalAlign: "middle"}}>
    <td>{order.user}</td>
    <td>{order.product}</td>
    <td>${order.price}</td>
    <td>{order.shipping_address}</td>
    <td>{order.amount}</td>
  </tr>
))
}
  </tbody>
</table>

  <div style = {{height: "134px"}}/>

       <AdminProdNavigator />
        
  </Container>
</div>
  );
};

export default AllOrders;
