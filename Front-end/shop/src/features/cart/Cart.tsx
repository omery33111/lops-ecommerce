import { useEffect, useState } from 'react'
import { Alert, Button, Card, Col, Container, Row } from 'react-bootstrap'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectIsLogged } from '../authentication/authenticationSlice'
import { addProduct, deleteProduct, removeProduct, selectCart } from './cartSlice'
import { BsPlusLg } from "react-icons/bs";
import { FaMinus } from "react-icons/fa";
import { Link } from 'react-router-dom'
import { myServer } from '../../endpoints/endpoints'

const Cart = () => {
  const myCart = useAppSelector(selectCart);
  const isLogged = useAppSelector(selectIsLogged);
  const [total, setTotal] = useState(0);
  const dispatch = useAppDispatch();

  useEffect(() => {
    let tempTotal = 0;
    myCart.forEach((item) => {
      tempTotal += item.amount * item.price;
    });
    const roundedTotal = Math.round((tempTotal + Number.EPSILON) * 100) / 100;
    setTotal(roundedTotal);
  }, [myCart]);

  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 110) {
        setIsScrolling(true);
      } else {
        setIsScrolling(false);
      }
    });
  }, []);

  const isTablet = window.innerWidth >= 0 && window.innerWidth <= 1024;

  return (
    <Container style={{ marginTop: '20px' }}>
      <h2 className="text-center">SHOPPING CART</h2>
      <br />
      {!isLogged && (
        <Alert variant="info">
          <Alert.Heading>You're signed out right now.</Alert.Heading>
          <b>
            To save your items or have the ability to continue in the process, <Link to="/login">sign in</Link>.
          </b>
        </Alert>
      )}
      {myCart.length === 0 ? (
        <Alert variant="info">
          <Alert.Heading>Your cart seems to be empty. </Alert.Heading>
          <b>In order to have items in the shopping cart, you are welcome to browse the site and look for the products you are interested in.</b>
        </Alert>
      ) : (
        <Row>
          <Col xs={12} lg={8}>
            {myCart.map((product) => (
              <Card key={product.id} className="mb-3">
                <Row className="align-items-center">
                  <Col xs={4}>
                    <Link to={`/single_product/${product.id}`}>
                      <Card.Img src={myServer + product.picture} />
                    </Link>
                  </Col>
                  <Col xs={8}>
                    <Card.Body>
                      <Card.Title>
                        <Link style = {{textDecoration: "none", color: "black"}} to={`/single_product/${product.id}`}>{product.product_name}</Link>
                      </Card.Title>
                      <Card.Text>
                        <small>{product.description.length > 150 ? `${product.description.substr(0, 150)}...` : product.description}</small>
                      </Card.Text>
                      <div className="d-flex align-items-center">
                        <Button variant="warning" onClick={() => dispatch(addProduct({ item: product, amount: 1 }))}><BsPlusLg /></Button>
                        <h5 className="mx-3">{product.amount}</h5>
                        <Button variant="warning" onClick={() => dispatch(deleteProduct({ item: product, amount: 1 }))}><FaMinus /></Button>
                        <h5 className="ml-auto">&nbsp;&nbsp;${product.price}</h5>
                      </div>
                    </Card.Body>
                  </Col>
                </Row>
                <Button variant="warning" className="position-absolute bottom-0 right-0 m-3" onClick={() => dispatch(removeProduct({ item: product }))}>Delete</Button>
              </Card>
            ))}
          </Col>
          <Col xs={12} lg={4}>
            <Card style={{ width: '100%', maxWidth: '416px' }}>
              <Card.Body>
                <Link to="/order/order_post">
                  <Button variant="warning">GO TO CHECKOUT</Button>
                </Link>
                <Card.Title className="mt-3">Total of {myCart.length} items.</Card.Title>
                <Card.Text>
                  <b>Total price: {total + (total >= 50 ? 0 : 5)}$</b>
                </Card.Text>
                <hr />
                <Card.Text>
                  <b>Items price: {total}$</b>
                </Card.Text>
                <Card.Text>
                  <b>Shipping price: {total >= 50 ? 0 : 5}${total >= 50 ? " (order over 50$!)" : ""}</b>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
      {isTablet && (<div style = {{height: "2rem"}}/>)}
    </Container>
  )
}

export default Cart
