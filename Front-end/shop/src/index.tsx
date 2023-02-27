import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./features/authentication/Login";
import Register from "./features/authentication/Register";
import App from "./App";
import Profile from "./features/profile_user/Profile";
import ProfileUpdate from "./features/profile_user/ProfileUpdate";
import Cart from "./features/cart/Cart";
import Shipping from "./features/shipping/Shipping";
import ShippingUpdate from "./features/shipping/ShippingUpdate";
import ShippingAdd from "./features/shipping/ShippingAdd";
import Category from "./features/navigators/CategoryNavbar";
import CategoryProducts from "./features/category/CategoryProducts";
import WishList from "./features/wishlist/WishList";
import "./index.css"
import ProductReviews from "./features/reviews/ProductReviews";
import UserReviews from "./features/reviews/UserReviews";
import Orders from "./features/order/Orders";
import OrdersUser from "./features/order/OrdersUser";
import Products from "./features/product/Products";
import Product from "./features/product/Product";
import ProfilesPanel from "./features/admin_panel/PanelProfiles";
import AddressesPanel from "./features/admin_panel/PanelAddresses";
import ReviewsPanel from "./features/admin_panel/PanelReviews";
import OrdersPanel from "./features/admin_panel/PanelOrders";
import ProfileUserUpdate from "./features/admin_panel/UpdateUserProfile";
import AddressUserUpdate from "./features/admin_panel/UpdateUserAddress";
import ReviewUserUpdate from "./features/admin_panel/UpdateUserReview";
import PanelMain from "./features/admin_panel/PanelMain";
import PanelProducts from "./features/admin_panel/PanelProducts";
import PanelAllOrders from "./features/admin_panel/PanelAllOrders";
import PanelCategories from "./features/admin_panel/PanelCategories";
import PostProduct from "./features/admin_panel/PostProduct";
import PostCategory from "./features/admin_panel/PostCategory";
import UpdateProduct from "./features/admin_panel/UpdateProduct";
import UpdateCategory from "./features/admin_panel/UpdateCategory";
import ReviewUpdate from "./features/reviews/ReviewUpdate";


const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>

          <Route path = "/" element={<App />}>

            <Route path = "/" element = {<Products />} />

            <Route path = "/single_product">
              <Route index element = {<Product />} />
              <Route path = ":number" element = {<Product />} />
            </Route>

            <Route path = "category/categories" element = {<Category />} />
            
            <Route path = "/category/category_products">
              <Route index element = {<CategoryProducts />} />
              <Route path = ":number" element = {<CategoryProducts />} />
            </Route>

            <Route path = "register" element = {<Register />} />
            <Route path = "login" element = {<Login />} />

            <Route path = "cart" element = {<Cart />} />

            <Route path = "wishlist" element = {<WishList />} />

            <Route path = "profile" element = {<Profile />} />
            <Route path = "profile/profile_update" element = {<ProfileUpdate />} />
            

            <Route path = "shipping" element = {<Shipping />} />

            <Route path = "shipping/shipping_post" element = {<ShippingAdd />} />

            <Route path = "/shipping/shipping_update">
              <Route index element = {<ShippingUpdate />} />
              <Route path = ":number" element = {<ShippingUpdate />} />
            </Route>

            <Route path = "/reviews/reviews_product">
              <Route index element = {<ProductReviews />} />
              <Route path = ":number" element = {<ProductReviews />} />
            </Route>

            <Route path = "/reviews/review_update">
              <Route index element = {<ReviewUpdate />} />
              <Route path = ":number" element = {<ReviewUpdate />} />
            </Route>
            
            <Route path = "/reviews/reviews_user">
              <Route index element = {<UserReviews />} />
              <Route path = ":number" element = {<UserReviews />} />
            </Route>

            <Route path = "order/order_post" element = {<Orders />} />

            <Route path = "/order/orders_user" element = {<OrdersUser />} />

            <Route path = "/admin_panel/panel_main" element = {<PanelMain />} />

            <Route path = "/admin_panel/user_details_profiles" element = {<ProfilesPanel />} />

            <Route path = "/admin_panel/user_details_addresses">
              <Route index element = {<AddressesPanel />} />
              <Route path = ":number" element = {<AddressesPanel />} />
            </Route>

            <Route path = "/admin_panel/user_details_reviews">
              <Route index element = {<ReviewsPanel />} />
              <Route path = ":number" element = {<ReviewsPanel />} />
            </Route>

            <Route path = "/admin_panel/user_details_orders">
              <Route index element = {<OrdersPanel />} />
              <Route path = ":number" element = {<OrdersPanel />} />
            </Route>

            <Route path = "/admin_panel/user_details_update_profile">
              <Route index element = {<ProfileUserUpdate />} />
              <Route path = ":number" element = {<ProfileUserUpdate />} />
            </Route>

            <Route path = "/admin_panel/user_details_update_address">
              <Route index element = {<AddressUserUpdate />} />
              <Route path = ":number" element = {<AddressUserUpdate />} />
            </Route>

            <Route path = "/admin_panel/user_details_update_review">
              <Route index element = {<ReviewUserUpdate />} />
              <Route path = ":number" element = {<ReviewUserUpdate />} />
            </Route>

            <Route path = "/admin_panel/order_details" element = {<PanelAllOrders />} />

            <Route path = "/admin_panel/product_details" element = {<PanelProducts />} />
            
            <Route path = "/admin_panel/post_product/" element = {<PostProduct />} />

            <Route path = "/admin_panel/update_product">
              <Route index element = {<UpdateProduct />} />
              <Route path = ":number" element = {<UpdateProduct />} />
            </Route>

            <Route path = "/admin_panel/category_details" element = {<PanelCategories />} />

            <Route path = "/admin_panel/update_category">
              <Route index element = {<UpdateCategory />} />
              <Route path = ":number" element = {<UpdateCategory />} />
            </Route>

            <Route path = "/admin_panel/post_category/" element = {<PostCategory />} />


          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
