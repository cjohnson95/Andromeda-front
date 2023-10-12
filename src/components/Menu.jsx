import React, { useEffect, useState } from "react";
import MenuItem from "./MenuItem";
import { getMenuItems } from "../services/menuApi";
import '../App.css'; 

// import NavigationBar from "../components/NavBar";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export default function Menu() {
   const [menuItems, setMenuItems] = useState([]);
   
  useEffect(() => {
    getMenuItems()
      .then((response) => {
        console.log("Menu Items response", response.data);
        setMenuItems(response.data);
      })
      .catch((error) => {
        console.error("Error fetching menu items", error);
      });
  }, []);

  return (
    <div>
      <h1>Menu</h1>
      <ul>
        {menuItems.map((menuItem) => (
          <MenuItem
            key={`${menuItem.name}-${menuItem.description}-${menuItem.price}`}
            menuItem={menuItem}
          />
        ))}
      </ul>
    </div>
  );
}
