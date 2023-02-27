import { ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'



const AdminProdNavigator = () => {
    

  return (

          <div style = {{ position: "fixed", width: "380px", top: 380, right: 32 }}>
            <ListGroup variant="flush">
              <Link to="/admin_panel/order_details" style={{ textDecoration: "none" }}>
                <ListGroup.Item><b>Orders</b></ListGroup.Item>
              </Link>

              <Link to="/admin_panel/product_details" style={{ textDecoration: "none" }}>
                <ListGroup.Item><b>Products</b></ListGroup.Item>
              </Link>

              <Link to="/admin_panel/category_details" style={{ textDecoration: "none" }}>
                <ListGroup.Item><b>Categories</b></ListGroup.Item>
            </Link>

              <Link to={`/admin_panel/panel_main`} style={{ textDecoration: "none" }}>
                <ListGroup.Item>BACK TO MAIN</ListGroup.Item>
              </Link>

            </ListGroup>
          </div>
  )
}



export default AdminProdNavigator
