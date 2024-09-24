import React from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";

function Header() {
  const navigate = useNavigate();

  return (
    <div className="header">
      <div className="header-content">
        <h2>Need Recipe!</h2>
        <p>
          Choose from a diverse menu featuring a delectable array of dishes
          crafted with the finest ingredients and culinary experties. Our food
          satisfy your cravings and elevate your dining experience, one
          delicious meal at a time
        </p>
        <Link to="/#foodDisplay">
          <button>View Menu</button>
        </Link>
      </div>
    </div>
  );
}

export default Header;
