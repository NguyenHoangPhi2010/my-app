import React, { useEffect, useState } from "react";
import Index from "./pages/index";
import Shop from "./pages/shop";
import Contact from "./pages/contact";
import Detail from "./pages/detail";
import Cart from "./pages/cart";
import Checkout from "./pages/checkout";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Productad from "./admin/Product";
import ProductTypead from "./admin/ProductType";
import Login from "./pages/login";
import Profile from "./pages/profile";
import MyAccount from "./pages/profile/myaccount";

import Invoice from "./pages/profile/Invoice/invoice";
import InvoiceDetails from "./pages/profile/Invoice/invoicedetail";
function App() {


  return (

    <div className="App">

      <Router>
        <Routes>
          <Route path='/' element={<Index />} />
          <Route path='/shop' element={<Shop />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/product' element={<Productad />} />
          <Route path='/producttype' element={<ProductTypead />} />
          <Route path='/login' element={<Login />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/myaccount' element={<MyAccount />} />
          <Route path='/invoice' element={<Invoice />} />
          <Route path='/invoicedetail/:id' element={<InvoiceDetails />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;