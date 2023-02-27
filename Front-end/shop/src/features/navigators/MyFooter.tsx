import React from 'react';
import { Container, Row, Col, Nav, Navbar } from 'react-bootstrap';



const MyFooter = () => {
  return (
    <footer style = {{width: "100%"}} color = "white" className = "bg-black text-light py-2">
      <Container>
        <Row>
          <Col md = "3">
            <h5 className = "title">COMPANY INFO</h5><br/>
            <Nav.Link href = ''>
              Link 1
            </Nav.Link><br/>
            <Nav.Link href = ''>
              Link 2
            </Nav.Link><br/>
            <Nav.Link href = ''>
              Link 3
            </Nav.Link><br/>
          </Col>

          <Col md = "3">
          <h5 className = "title">HELP & SUPPORT</h5><br/>
          <Nav.Link href = ''>
              Link 1
            </Nav.Link><br/>
            <Nav.Link href = ''>
              Link 2
            </Nav.Link><br/>
            <Nav.Link href = ''>
              Link 3
            </Nav.Link><br/>
          </Col>

          <Col md = "3">
          <h5 className = "title">CUSTOMER CARE</h5><br/>
          <Nav.Link href = ''>
              Link 1
            </Nav.Link><br/>
            <Nav.Link href = ''>
              Link 2
            </Nav.Link><br/>
            <Nav.Link href = ''>
              Link 3
            </Nav.Link><br/>
          </Col>

          <Col>
          <h5 className = "title">FIND US</h5><br/>
          <Nav.Link href = ''>
              Link 1
            </Nav.Link><br/>
            <Nav.Link href = ''>
              Link 2
            </Nav.Link><br/>
            <Nav.Link href = ''>
              Link 3
            </Nav.Link><br/>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default MyFooter;
