import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  createOrder,
  getOrders,
  editOrder,
  deleteOrder,
} from "../services/ordersApi";

export default function NewOrder() {
  const [creatingOrder, setCreatingOrder] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [deletingOrder, setDeletingOrder] = useState(null);
  const [orders, setOrders] = useState([]);
  const [orderDetails, setOrderDetails] = useState({
    itemName: "",
    quantity: 0,
    itemPrice: 0, // Add your itemPrice field
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
      itemPrice: 0, // Add your itemPrice field
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

  return (
    <div>
      <h1>Place Order</h1>
      <button onClick={() => setCreatingOrder(true)}>Create New Order</button>

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
          <button onClick={handleDeleteOrder}>Yes, Delete</button>
          <button onClick={() => setDeletingOrder(null)}>Cancel</button>
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
            <button type="submit">Save</button>
            <button onClick={() => setEditingOrder(null)}>Cancel</button>
          </>
        )}
        <button onClick={() => setCreatingOrder(false)}>Cancel</button>
      </form>
    </div>
  );
}
