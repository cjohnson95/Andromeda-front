import React, { useState, useEffect } from "react";
import axios from "axios";
import '../App.css'; 




import {
  createOrder,
  getOrders,
  editOrder,
  deleteOrder,
} from "../services/ordersApi";

export default function NewOrder() {
  const [cart, setCart] = useState([]);

  const [creatingOrder, setCreatingOrder] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [deletingOrder, setDeletingOrder] = useState(null);
  const [orders, setOrders] = useState([]);
  const [orderDetails, setOrderDetails] = useState({
    itemName: "",
    quantity: 0,
    itemPrice: 0, 
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("/order");
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders", error);
      }
    };
    fetchOrders();
  }, []);

  const resetOrderDetails = () => {
    setOrderDetails({
      itemName: "",
      quantity: 0,
      itemPrice: 0, 
    });
  };

  const handleCreateOrder = () => {
    createOrder(orderDetails)
      .then(() => {
        setCreatingOrder(false);
        resetOrderDetails();
        getOrders().then((data) => setOrders(data));
      })
      .catch((error) => console.error(error));
  };

  const handleEditOrder = () => {
    if (!editingOrder) {
      return;
    }
    editOrder(editingOrder.id, orderDetails)
      .then(() => {
        setEditingOrder(null);
        resetOrderDetails();
        getOrders().then((data) => setOrders(data));
      })
      .catch((error) => console.error(error));
  };

  const handleDeleteOrder = () => {
    if (!deletingOrder) {
      return;
    }
    deleteOrder(deletingOrder.id)
      .then(() => {
        setDeletingOrder(null);
        getOrders().then((data) => setOrders(data));
      })
      .catch((error) => console.error(error));
  };

  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  return (
    <div>
      <h1>Place Order</h1>
      <button className="create-new-order" onClick={() => setCreatingOrder(true)}>Create New Order</button>

      <ul>
        {orders.map((order) => (
          <li key={order._id}>
            {order.itemName} - Quantity: {order.quantity}
            <button onClick={() => setEditingOrder(order)}>Edit</button>
            <button onClick={() => setDeletingOrder(order)}>Delete</button>
          </li>
        ))}
      </ul>

      {deletingOrder && (
        <div>
          <p>Are you sure you want to delete this order?</p>
          <p>Item Name: {deletingOrder.itemName}</p>
          <p>Quantity: {deletingOrder.quantity}</p>
          <button className= "delete-order"onClick={handleDeleteOrder}>Yes, Delete</button>
          <button className= "cancel-order" onClick={() => setDeletingOrder(null)}>Cancel</button>
        </div>
      )}

      <form onSubmit={creatingOrder ? handleCreateOrder : handleEditOrder}>
        <input
          type="text"
          placeholder="Item Name"
          value={orderDetails.itemName}
          onChange={(e) =>
            setOrderDetails({ ...orderDetails, itemName: e.target.value })
          }
        />
      
        <input
          type="number"
          placeholder="Quantity"
          value={orderDetails.quantity}
          onChange={(e) =>
            setOrderDetails({ ...orderDetails, quantity: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Item Price"
          value={orderDetails.itemPrice}
          onChange={(e) =>
            setOrderDetails({
              ...orderDetails,
              itemPrice: parseFloat(e.target.value),
            })
          }
        />

        {creatingOrder ? (
          <button type="submit">Create</button>
        ) : (
          <>
            <button className='save-order' type="submit">Save</button>
            {/* <button onClick={() => setCreatingOrder(null)}>Save</button> */}
          </>
        )}
        <button className="cancel-order"onClick={() => setCreatingOrder(false)}>Cancel</button>
      </form>

      <h2>Cart</h2>
      <ul>
        {cart.map((cartItem, index) => (
          <li key={index}>
            {cartItem.itemName} - Quantity: {cartItem.quantity}
            - Total Price: {cartItem.quantity * cartItem.itemPrice}
          </li>
        ))}
      </ul>

     
      <button className= "add-to-cart"onClick={() => addToCart(orderDetails)}>
        Add to Cart
      </button>
    </div>
  );
}
