import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import FoodDisplay from "../components/FoodDisplay/FoodDisplay";
import { useSelector } from "react-redux";
import Loading from "../components/Loading/Loading";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RecipeCarousel from "../components/RecipeCarousel/RecipeCarousel";
import RecipeInfo from "../components/RecipInfo/RecipeInfo";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";
import Cart from "../components/Cart/Cart";

function App() {
  const fetchStatus = useSelector((store) => store.fetchStatus);
  return (
    <>
      <Router>
        <ToastContainer />
        <div className="app">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipeInfo" element={<RecipeInfo />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>

        <div id="footer">
          <Footer />
        </div>
        <ScrollToTop />
      </Router>
    </>
  );
}

export default App;
