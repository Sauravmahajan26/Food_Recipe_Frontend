import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { assets } from "../assets/assets";
import { HashLink as Link } from "react-router-hash-link";
import CartIcon from "../CartIcon/CartIcon";

function Navbar() {
  return (
    <nav className={`navbar`}>
      <Link to="/">
        <img src={assets.food_logo} alt="logo" className="logo" />
      </Link>
      <ul className="navbar-menu">
        <Link smooth to="/">
          Home
        </Link>
        <Link smooth to="/#foodDisplay">
          Recipes
        </Link>
        <Link smooth to="/#recipeCarousel">
          Carousel Food
        </Link>
        <Link smooth to="/#exploreMenu">
          Explore Menu
        </Link>
        <Link smooth to="/#footer">
          Contact Us
        </Link>
      </ul>
      <div className="navbar-right">
        <Link to="/#searchRecipe">
          <img src={assets.search_icon} alt="search" />
        </Link>
        <Link to="/cart">
          <CartIcon />
        </Link>

        <div className="navbar-profile">
          <img src={assets.profile_icon} alt="profile" />
          <ul className="nav-profile-dropdown">
            <li>
              <img src={assets.recipe_page} alt="recipes" />
              <p>Recipes</p>
            </li>
            <hr />
            <li>
              <img src={assets.logout_icon} alt="logout" />
              <p>Logout</p>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
