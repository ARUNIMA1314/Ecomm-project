import React, { useEffect, useState } from "react";
import './App.css';
import Header from './Header';
import Home from './Home';
import Checkout from "./Checkout";
import Login from "./Login";
import Payment from "./Payment";
import { commerce } from "./lib/commerce";
import Orders from "./Orders";
import { BrowserRouter as Router, Routes, Route, unstable_HistoryRouter} from "react-router-dom";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import Products from "./components/Products"

const promise = loadStripe(
  "pk_test_51Kx67BSDVlQf7vZMXjAmlURZXF33zahLwtW6FcxBK7i0hzvJ0n1ySpneuXqB6KqxZSyQrnasKsIVUGZ9Hl15QtTu0022a6zFj6"
  );

function App() {
  const[{}, dispatch] = useStateValue();
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const response = await commerce.products.list();
    setProducts((response && response.data)||[]);
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  console.log({products});


  useEffect(() => {
    //will only run once the app component loads

    auth.onAuthStateChanged(authUser => {
      console.log("THE USER IS >>>", authUser);

      if(authUser){
        //the user just logged in/ the user was logged in
        dispatch({
          type: 'SET_USER',
          user: authUser
        });
      }else{
        //the user is logged out
        dispatch({
          type: 'SET_USER',
          user: null
        });
      }
    });
  }, []);

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path = "/orders" element = {[<Header />, <Orders />]} />
          <Route path = "/login" element = {[<Login />]} />
          <Route path = "/checkout" element = {[<Header />, <Checkout/>]} />
          <Route path = "/payment" element = {[<Header />,<Elements stripe={promise} ><Payment /></Elements>]} />
          <Route path = "/product" element = {[<Header />, <Products products={products} />]} />
          <Route path = "/" element={[<Header />, <Home />]} />
        </Routes>
    </div>
    </Router>
  );
}

export default App;
