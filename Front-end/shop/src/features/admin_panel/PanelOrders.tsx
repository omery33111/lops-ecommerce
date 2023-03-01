import { useEffect, useState } from 'react'
import { Alert, Col, Container, Row, Table } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getAllOrdersAsync, selectOrders } from './panelSlice';
import AdminNavigator from '../navigators/AdminNavigator';
import { Order } from '../../models/Order';
import NavUserProfile from './NavUserProfile';



const PanelOrders = () => {
    const dispatch = useAppDispatch();

    const orders = useAppSelector(selectOrders)


    const { number } = useParams();

    useEffect(() => {
      if (number !== undefined) {
        dispatch(getAllOrdersAsync(number));
      }
    }, [number, dispatch]);
    


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
        <div style = {{height: "100px"}}/>
        <h5>USER ORDERS</h5>
        <NavUserProfile/>
        <br/>
        <Row>
        {isScrolling ? (<div style = {{position: "absolute", top: 380}}><AdminNavigator /></div>) : (<div style = {{position: "absolute"}}><AdminNavigator /></div>) }



          <Col xs={9}>
            <Table striped bordered hover>
              <thead>
                <tr style={{ backgroundColor: "#5A5A5A", color: "white" }}>
                  <th style={{ textAlign: "center"}}>Order ID</th>
                  <th style={{ textAlign: "center"}}>Product ID</th>
                  <th style={{ textAlign: "center" }}>Price</th>
                  <th style={{ textAlign: "center" }}>Amount</th>
                  <th style={{ textAlign: "center" }}>Address ID</th>
                </tr>
              </thead>
              
              {orders.length === 0 ? (
                <Alert variant="info" style = {{position: "absolute", width: "965px"}}><br/>
                  <Alert.Heading>USER HAS NO ORDERS YET!</Alert.Heading>
                  <b>The requested user has not made any orders yet.</b>
                </Alert>
              ) : ("")}

              <tbody>
                {[...orders].reverse().map((order: Order) => (
                  <tr key={order.id} style={{ backgroundColor: "white" }}>
                    <td style={{ textAlign: "center", verticalAlign: "middle" }}>{order.id}</td>
                    <td style={{ textAlign: "center", verticalAlign: "middle"  }}>{order.product}</td>
                    <td style={{ textAlign: "center", verticalAlign: "middle"  }}>{order.price}</td>
                    <td style={{ textAlign: "center", verticalAlign: "middle"  }}>{order.amount}</td>
                    <td style={{ textAlign: "center", verticalAlign: "middle"  }}>{order.shipping_address}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
          </Row>

          <div style = {{height: "350px"}}/>
          


          </Container>


    </div>
  )
}

export default PanelOrders