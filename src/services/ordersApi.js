import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:3001'
});

 export const getMenuItems = () => {
     return api.get('/menu');
 }
export const createOrder = (orderData) => {
    return api.post('/order/add', orderData);
}

export const setOrders = (orderData) => {
    return api.update('/order/update', orderData);
}

export const getOrders = () => {
    return api.get('/order');
};

export const editOrder = (orderId, updatedData) => {
    return api.put(`/order/edit/${orderId}`, updatedData);
};

export const deleteOrder = (orderId) => {
    return api.delete(`/order/delete/${orderId}`);
};

