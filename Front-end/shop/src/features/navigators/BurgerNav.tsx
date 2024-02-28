import React, { useState } from 'react';
import { RxHamburgerMenu } from "react-icons/rx";
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import ProfileNavigator from './ProfileNavigator';

const BurgerNav = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div>
        <div style={{ justifyContent: "center", textAlign: "center", fontSize: "2rem" }} onClick={handleShow}>
          <RxHamburgerMenu />
        </div>
      </div>
      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="top"
      >
        <Offcanvas.Header closeButton>
        </Offcanvas.Header>
        <Offcanvas.Body>
            <ProfileNavigator />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default BurgerNav;
