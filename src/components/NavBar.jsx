import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css'; 

export default function NavBar() {
  return (
    <nav className="NavBar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/menu">Menu</Link>
        </li>
        <li>
          <Link to="/new-order">New Order</Link>
        </li>
      </ul>
    </nav>
  );
}

