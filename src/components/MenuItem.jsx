import React from 'react';

export default function MenuItem({ item }) {
  return (
    <div>
      <h3>{item.name}</h3>
      <p>Description:{item.description}</p>
      <p>Price: ${item.price}</p>
      <button>Add to Order</button>
    </div>
  );
}

