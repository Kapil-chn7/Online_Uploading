import React from "react";
import { NavLink } from "react-router-dom";

export default function FooterComp() {
  let footerstyle = {
    width: "100%",
    marginTop: "100vh auto",
  };
  return (
    <footer className="bg-dark text-light py-3" style={footerstyle}>
      <p className="text-center">
        <NavLink className="nav-link" to="/About">
          Copyright &copy; Dummysite.com
        </NavLink>
      </p>
    </footer>
  );
}
