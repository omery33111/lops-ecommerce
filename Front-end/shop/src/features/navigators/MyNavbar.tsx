import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { selectIsLogged, selectUser } from "../authentication/authenticationSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Button, Card, Container, Form } from "react-bootstrap";
import { FaSuitcase } from "react-icons/fa";
import { RiUserFill } from "react-icons/ri";
import { FaHeart } from "react-icons/fa";
import { GoSearch } from "react-icons/go";
import { FaUserSecret } from "react-icons/fa";
import { removeProduct, selectCart } from "../cart/cartSlice";
import { selectWishList } from "../wishlist/wishListSlice";
import { useState } from "react";
import { searchProductsAsync, selectSearchProduct, updateSearchProduct } from "../product/productSlice";
import { OverlayTrigger, Dropdown, Image } from 'react-bootstrap';
import { BsTrash } from "react-icons/bs";
import { useLocation } from 'react-router-dom';
import { myServer } from "../../endpoints/endpoints";



const MyNavbar = () => {
  const dispatch = useAppDispatch();

  const myCart = useAppSelector(selectCart);
  const wishList = useAppSelector(selectWishList);

  const username = useAppSelector(selectUser);
  const isLogged = useAppSelector(selectIsLogged);
  const search_product = useAppSelector(selectSearchProduct);

  const [showForm, setShowForm] = useState(false)

  const storedIsStaff = JSON.parse(localStorage.getItem('is_staff') as string);


  const handleSubmit = async (event: any) => {
    event.preventDefault();
  
    dispatch(searchProductsAsync({searchQuery: search_product}));
  };
  
  const [showCart, setShowCart] = useState(false);


  const location = useLocation();

  const isMobile = window.innerWidth <= 768;

  return (
    <div>
        <Navbar bg="black" variant="dark" style = {{height: "70px"}}>
          <Container style={{transform: isMobile ? "translateX(6rem) translateY(0rem)" : "translateX(0rem) translateY(0rem)"}}>

          

            <Nav>
            <Navbar.Brand>
              <Link to = "/">
            <img style={{ height: storedIsStaff ? "35px" : '50px', position: "absolute", top: isMobile ? -15 : 0, left: -65, border: 0, transform: storedIsStaff && "translateY(8px) translateX(-8px)" }} src={require('../../images/LOPS.png')} alt="lops" />
              </Link>
            </Navbar.Brand>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              
              <Nav.Link>
                {!isMobile && (<h4 onClick={() => setShowForm(!showForm)}><GoSearch/></h4>)}
              
              {showForm && (

                <div style = {{width: "200px", position: "absolute", transform: " translateX(50px) translateY(-39px) "}}>
                  <Form onChange={handleSubmit}>
                  <Form.Group controlId="formProductName">
                    <Form.Control
                      type="text"
                      onChange = {(event) => dispatch(updateSearchProduct(event.target.value))}
                      value = {search_product}
                    />
                  </Form.Group>
              </Form>
              
              </div>)}

              
              </Nav.Link>
              
            </Nav>
            
            
            
            

            <Nav className="ml-auto" style = {{position: "absolute", right: 150}}>
            <div onMouseEnter={() => setShowCart(true)} onMouseLeave={() => setShowCart(false)}>
  {myCart.length === 0 ? (
    
    <div style={{ color: 'white', position: "absolute", transform: 'translateX(-50px) translateY(0px)'}}>
      <Nav.Link as={Link} to="/cart" style={{ color: 'white' }}>
        {myCart.length > 0 ? (
          <h4>
            <FaSuitcase />
            <span className="cart-count">{myCart.length}</span>
          </h4>
        ) : (
          <h4>
            <FaSuitcase />
          </h4>
        )}
      </Nav.Link>
    </div>

  ) : (
    <div>
      {location.pathname !== '/cart' && location.pathname !== '/order/order_post' ? (
    <OverlayTrigger
      trigger={['hover', 'focus']}
      placement="bottom"
      show={showCart}
      delay={{ show: 500, hide: 500 }}
      
      overlay={
        
        <Container className="p-3">
          
          <Card className = "card border-0 rounded-0" style={{ width: '23%', position: "absolute", transform: "translateX(790px) translateY(-7.9px)", backgroundColor: "black"}}>
            <Card.Header style={{ backgroundColor: 'black', color: 'white', textAlign: 'center' }}>SHOPPING CART</Card.Header>
            <Card.Body style = {{backgroundColor: "white"}}>
              <Dropdown>
                {myCart.map((item) => (
                  <Dropdown.Item key={item.id}>
                    <div className="d-flex align-items-center">
                      <Link to={`/single_product/${item.id}`}>
                        <Image src={myServer + item.picture} width="90" height="90" />
                      </Link>
                      <div className="ml-3">
                    
                        <Card.Text style={{ position: 'absolute', transform: 'translateX(8px) translateY(-45px)' }}>
                          <strong>
                            <Link to={`/single_product/${item.id}`} style={{ textDecoration: "none", color: "black", width: "100%"}}>
                            {item.product_name.length > 14 ? `${item.product_name.substr(0, 14)}...` : item.product_name}
                            </Link>
                          </strong>
                        </Card.Text>
                        <Card.Text style={{ position: "absolute", transform: "translateX(155px) translateY(-51px)" }}>
                            <Button variant='none'>
                              <h6>
                                <BsTrash style = {{color: "red"}} onClick={() => dispatch(removeProduct({ item: item }))} />
                              </h6>
                            </Button>
                          </Card.Text>
                          <h6 style={{ position: 'absolute', transform: 'translateX(8px) translateY(-8px)' }}>
                            $ {item.price}
                          </h6>
                          <small className="text-muted" style={{ position: 'absolute', transform: 'translateX(115px) translateY(-9px)' }}>
                            Amount: {item.amount}
                          </small>
                          <Card.Text style={{ position: 'absolute', transform: 'translateX(8px) translateY(9px)' }}>
                            {myCart.reduce((acc, item) => acc + item.price * item.amount, 0) >= 50 ? (
                              <small>Free Shipping - $0!</small>
                            ) : (
                              <small>Express Shipping - $5<br/><small style={{ position: 'absolute', transform: 'translateX(-2px) translateY(-5px)' }}>(for the entire order)</small></small>
                            )}
                          </Card.Text>
                          
                        </div>
                    </div>
                    <hr/>
                  </Dropdown.Item>
                ))}
                  <Link to = "/cart">
                  <Button style = {{width: "60%", position: 'absolute', transform: 'translateX(55px) translateY(-4px)'}} variant = "dark">MY CART</Button>
                  </Link><div style = {{height: "40px"}}/>
                  <Link to = "/order/order_post">
                  <Button style = {{width: "100%"}} variant = "warning">GO TO CHECKOUT</Button>
                  </Link>
              </Dropdown>
            </Card.Body>
            <Card.Footer style={{ backgroundColor: 'black', color: 'white', textAlign: 'center' }}>
              {myCart.reduce((acc, item) => acc + item.price * item.amount, 0) >= 50 ? (
                <div>ORDERS OVER $50 DESERVE FREE SHIPPING TO THEIR HOUSE!</div>
              ) : (
                <br/>
              )}
            </Card.Footer>
          </Card>
        </Container>
      }
    >
    <div className = "cart-icon" style={{ color: 'white', position: "absolute", transform: 'translateX(-50px) translateY(0px)'}}>
      <Nav.Link as={Link} to="/cart" style={{ color: 'white' }}>
        {myCart.length > 0 ? (
          <h4>
            <FaSuitcase />
            <span className="cart-count">{myCart.length}</span>
          </h4>
        ) : (
          <h4>
            <FaSuitcase />
          </h4>
        )}
      </Nav.Link>
    </div>
  </OverlayTrigger>
  ) : (
    
    <div style={{ color: 'white', position: "absolute", transform: 'translateX(-50px) translateY(0px)'}}>
          <Nav.Link as={Link} to="/cart" style={{ color: 'white' }}>
            {myCart.length > 0 ? (
              <h4>
                <FaSuitcase />
                <span className="cart-count">{myCart.length}</span>
              </h4>
            ) : (
              <h4>
                <FaSuitcase />
              </h4>
            )}
          </Nav.Link>
        </div>

  )}</div>

  )}
</div>



              &nbsp;&nbsp;&nbsp;
              <Nav.Link as = {Link} to = "/wishlist" style = {{color: "white"}}>
              {wishList.length > 0 ? (
                  <h4>
                    {" "}
                    <FaHeart/><span className="wishlist-count">{wishList.length}</span>{" "}
                  </h4>
                ) : (
                  <h4>
                    <FaHeart/>
                  </h4>
                )}
              </Nav.Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
               {isLogged ? (
               <Nav.Link as = {Link} to = "/profile">
                <div style = {{ color: "white", position: "absolute", transform: " translateX(-12px) translateY(-1px) "}}>
                <h3><RiUserFill /></h3>
                </div>
                <div style = {{ color: "white", position: "absolute", transform: " translateX(22px) translateY(-4px) "}}>
                <small>Welcome,<br/></small>
                </div>
                <div style = {{ color: "white", position: "absolute", transform: " translateX(22px) translateY(13px) "}}>
                <small>{username}</small>
                </div>
                </Nav.Link>) : (<Nav.Link as={Link} to="/login">
                  <h3 style = {{color: "white", position: "absolute", transform: 'translateX(-12px) translateY(-2px)'}}>
                    <RiUserFill />
                  </h3> 
                </Nav.Link>
                )}

{storedIsStaff && (
<div style={{ color: 'white', position: "absolute", transform:  isMobile ? "translateX(-100px)" : 'translateX(-130px) translateY(-3px)'}}>
          <Nav.Link as={Link} to="/admin_panel/panel_main" style={{ color: 'white' }}>
          <h3><FaUserSecret /></h3>
          </Nav.Link>
        </div>)}
              
            </Nav>
          </Container>
        </Navbar>
        


    </div>
  );
};

export default MyNavbar;
