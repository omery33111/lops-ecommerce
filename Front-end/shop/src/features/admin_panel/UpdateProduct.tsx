import React, { useState, useEffect } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Category } from '../../models/Category';
import { selectCategories } from '../category/categorySlice';
import AdminProdNavigator from '../navigators/AdminProdNavigator';
import { getSingleProductAsync, patchProductAsync, selectSingleProduct } from '../product/productSlice';



const UpdateProduct = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const categories = useAppSelector(selectCategories)
    const single_product = useAppSelector(selectSingleProduct)


    const { number } = useParams();

    useEffect(() => {
      if (number !== undefined) {
        dispatch(getSingleProductAsync(number));
      }
    }, [number, dispatch]);


    const [category, setCategory] = useState<number>(1);
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState<number>(0);
    const [picture, setPicture ] = useState<any>(null);
  
  
    const handleSubmit = async (event: any) => {
      event.preventDefault();
  
      const formData = new FormData();
      formData.append('category', category.toString());
      formData.append('product_name', productName);
      formData.append('description', description);
      formData.append('price', price.toString());
      formData.append('picture', picture);
  
      dispatch(patchProductAsync({productData: formData, id: String(single_product.id)}));
      navigate("/admin_panel/product_details/");
      window.location.reload();
    };


  
    const handlePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setPicture(event.target.files ? event.target.files[0] : undefined);
    };

    
  return (
    <div>
        <Container>

        <Col md={9}>
            <br />
            <br />
            <h2>PRODUCTS</h2>
            <div style = {{height: "100px"}}/>
            <h5>PRODUCT DETAILS</h5>
            <br/>
            <Form onSubmit={handleSubmit}>
            <Row className="justify-content-left mt-3">

            <Col md={6}>
            <Form.Group controlId="formCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control as="select"
              onChange = {(event) => setCategory(Number(event.target.value))}
              required
              >
              {categories.map((category: Category) => (
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
              
              <Row className="justify-content-center mt-3">
                <Button style = {{width: "475px", position: "absolute", left: 111}} variant="warning" type="submit">
                  Complete Edit
                </Button>
                <br/><br/>
                
            </Row>
            
            <Button
             onClick={() => {
              navigate(`/admin_panel/product_details/`);
            }}
                    variant="secondary"
                    style={{ width: "100px", position: "absolute", left: 295}}
                  >
                    CANCLE
                  </Button>

            <br/>
          </Form>
          
          </Col>
            
        </Container>

        <div style = {{height: "130px"}}/>

        <AdminProdNavigator />
    </div>
  )
}


export default UpdateProduct
