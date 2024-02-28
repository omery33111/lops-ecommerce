import React, { useEffect, useRef, useState } from 'react'
import { Button, Col, Container, Figure, Form, Row } from 'react-bootstrap'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { postProductAsync, selectProducts } from './productSlice'
import { useNavigate } from 'react-router-dom'
import Carrousel from '../navigators/Carrousel'
import { selectCategories } from '../category/categorySlice'
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import { myServer } from '../../endpoints/endpoints'
import { addWish, removeWish, selectWishList } from '../wishlist/wishListSlice'
import './product.css';


const Products = () => {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();


  const wishlist = useAppSelector(selectWishList);
  const categories = useAppSelector(selectCategories);
  const products = useAppSelector(selectProducts);
  const storedIsStaff = JSON.parse(localStorage.getItem('is_staff') as string);

  const [category, setCategory] = useState<number>(1);
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number>(0);
  const [picture, setPicture ] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);






  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('category', category.toString());
    formData.append('product_name', productName);
    formData.append('description', description);
    formData.append('price', price.toString());
    formData.append('picture', picture);

    dispatch(postProductAsync(formData));
    setCategory(1);
    setProductName('');
    setDescription('');
    setPrice(0);
    setPicture('');
  };

  const handlePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPicture(event.target.files ? event.target.files[0] : undefined);
  };



  const observer = useRef<IntersectionObserver | null>(null);
  const myDivRef = useRef<HTMLDivElement>(null);

  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(12);

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
          setLimit(limit + 12);
          setShowSpinner(false)
        }, 300);
      }
    });
    
    if (myDivRef.current) {
      observer.current.observe(myDivRef.current);
    }
  }, [myDivRef, limit]);

  const isMobile = window.innerWidth <= 768;

  return (
    <div><br/><br/>
      <Carrousel />
      <Container><br/><br/>

      
      

      <h1 style = {{display: 'flex', justifyContent: 'center'}}>PRODUCTS</h1><br/><br/><br/><br/><br/>
      
      {storedIsStaff ? (
      <div>
      <Button variant = "warning" onClick={() => setShowForm(!showForm)}>Add Product</Button><br/><br/><hr/><br/>
      {showForm && (
      <Row>
        <Col md={7}>
          <Form onSubmit={handleSubmit} encType="multipart/form-data">
          <Row>

            <Col md={6}>
            <Form.Group controlId="formCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control as="select"
              onChange = {(event) => setCategory(Number(event.target.value))}
              required
              >
              {categories.map(category => (
              <option key={category.id} value={category.id}>{category.category_name}</option>
              ))}
</Form.Control>
</Form.Group>
                  <Form.Group controlId="formProductName">
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control
                      type="text"
                      onChange = {(event) => setProductName(event.target.value)}
                      value = {productName}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="formDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      type="text"
                      onChange = {(event) => setDescription(event.target.value)}
                      value = {description}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="formPrice">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      type="number"
                      onChange = {(event) => setPrice(Number(event.target.value))}
                      value = {price}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="formPicture">
                    <Form.Label>Picture</Form.Label>
                    <Form.Control
                      type="file"
                      onChange = {handlePictureChange}
                    />
                  </Form.Group><br/>
                </Col>
              </Row>
              
              <Row>
                <Button variant="warning" type="submit">
                  Create New Product
                </Button><br/><br/>
              
            </Row><br/><br/><hr/>
          </Form>
        </Col>
      </Row>
        
      )}
</div>) : ("")}
      
<div className='brand-map-items'>
  {products.slice(0, offset + limit).map((product) =>
    <div key={product.id} className="product-item">
      <div>
        <button style={{ border: "none", background: "none", padding: 0 }} onClick={() => navigate("/single_product/" + product.id)}>
          <img
            width={isMobile ? `150px` : `225px`}
            height={isMobile ? `150px` : `225px`}
            alt="picture1"
            src={myServer + product.picture}
          />
        </button>
        {isMobile ? (
                  <div>
                  <div style={{ fontSize: '0.9rem' }}>
                    {product.product_name}<br />
                    <b style={{ marginRight: "1rem" }}>${product.price}</b>
                  </div>
                  <button type="button" style={{ border: "none", backgroundColor: "transparent", marginRight: isMobile ? "9rem" : "3.8rem", marginTop: "-1rem" }}>
                    <h5>
                      {wishlist.find((item) => String(item.id) === String(product.id))
                        ? <FaHeart style={{ color: "red" }} onClick={() => dispatch(removeWish({ item: product }))} />
                        : <FaRegHeart onClick={() => dispatch(addWish({ item: product }))} />}
                    </h5>
                  </button>
                </div>
        ) : (
                  <div style={{ display: "flex", justifyContent: isMobile ? "flex-start" : "space-between" }}>
                  <div style={{ fontSize: '0.9rem' }}>
                    {product.product_name}<br />
                    <b style={{ marginRight: "1rem" }}>${product.price}</b>
                  </div>
                  <button type="button" style={{ border: "none", backgroundColor: "transparent", marginRight: isMobile ? "9rem" : "3.8rem", marginTop: "-1rem" }}>
                    <h5>
                      {wishlist.find((item) => String(item.id) === String(product.id))
                        ? <FaHeart style={{ color: "red" }} onClick={() => dispatch(removeWish({ item: product }))} />
                        : <FaRegHeart onClick={() => dispatch(addWish({ item: product }))} />}
                    </h5>
                  </button>
                </div>
        )}

      </div>
    </div>
  )}
</div>


{products.length >= offset + limit && (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '25vh' }}>
    {showSpinner &&
        <Stack>
        <CircularProgress color="warning" />
      </Stack>}
  </div>
)}
<div ref={myDivRef} />

      </Container>
      
      
      <div style = {{height: "100px"}} />
    </div>
    
    
    
  )
}


export default Products