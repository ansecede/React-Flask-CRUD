import React, { useState } from "react";
import { Link } from "react-router-dom";
// import menu from "../../assets/menu.svg";
// import { FaTimes } from "react-icons/fa";
// import "./navbar.css";

function NavBar() {
  return (
    <nav className="w-full flex bg-gray-800 py-6 justify-between items-center navbar">
      <Link to={"/"}>
        <h1 className="text-xl font-semibold text-slate-50 sm:pl-20 pl-5">
          M2G
        </h1>
      </Link>
      <ul className="list-none hidden sm:flex justify-end items-center pr-20 text-slate-50 ">
        <li className="mr-10">
          <Link to={"/catalogs"}>Gestion de Catalogos</Link>
        </li>
        <li>
          <Link to={"/clients"}>Gestion de Clientes</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
