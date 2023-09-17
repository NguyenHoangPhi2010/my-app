import React from "react";
import Index from "./pages/index";
import Shop from "./pages/shop";
import Contact from "./pages/contact";
import Detail from "./pages/detail";
import Cart from "./pages/cart";
import Checkout from "./pages/checkout";
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';

import Login from "./pages/login";
import Profile from "./pages/profile";
import MyAccount from "./pages/profile/myaccount";
import Invoice from "./pages/profile/Invoice/invoice";
import InvoiceDetails from "./pages/profile/Invoice/invoicedetail";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Account from "./pages/profile/Account/account";
import { ButtonToolbar, ToastContainer } from "react-bootstrap";
import 'react-toastify/dist/ReactToastify.css';
import SignUp from "./pages/signup";
import ProductLike from "./pages/profile/productlike";
import PasswordResetLink, { DonateApp } from "./pages/PasswordResetLink";
import PayPalButton from "./pages/PasswordResetLink";
<<<<<<< HEAD
import AccountAddress from "./pages/profile/Account/accountAddress";
=======
>>>>>>> f125f77413c46b346417db359020eb1a320fca1c

function App() {
  const UserLayout = () => (
    <div>
      <ToastContainer />
      <Header />
      <Outlet />
      <Footer />
    </div>
  );

  return (

    <div className="App">
      <ToastContainer />
      <Router>
        <Routes>
          <Route element={<UserLayout />}>
            <Route path='/' element={<Index />} />
            <Route path='/shop' element={<Shop />} />
            <Route path="/shop/:encodednames" element={<Shop />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/checkout/:total' element={<Checkout />} />
            <Route path='/contact' element={<Contact />} />
<<<<<<< HEAD

=======
            <Route path='/product' element={<Productad />} />
            <Route path='/producttype' element={<ProductTypead />} />
>>>>>>> f125f77413c46b346417db359020eb1a320fca1c
            <Route path='/profile' element={<Profile />} />
            <Route path='/myaccount' element={<MyAccount />} />
            <Route path='/productlike' element={<ProductLike />} />
            <Route path='/invoice' element={<Invoice />} />
            <Route path='/invoicedetail/:id' element={<InvoiceDetails />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/account' element={<Account />} />
<<<<<<< HEAD
            <Route path='/accountaddress' element={<AccountAddress />} />
=======
>>>>>>> f125f77413c46b346417db359020eb1a320fca1c

          </Route>
          <Route path='/paypal' element={<DonateApp />} />
        </Routes>

      </Router>
    </div>
  );
}
export default App;
