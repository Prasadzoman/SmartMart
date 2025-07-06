import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../context/UserContext';
import instance from '../../lib/axios';

function Orders() {
  const { user } = useContext(UserContext);
  const [orders, setOrders] = useState([]); // ✅ Fixed useState

  const getOrders = async () => {
    try {
      const res = await instance.get('/orders');
      setOrders(res.data); // ✅ Only set the data
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="pt-20 min-h-screen bg-white">
      <div className="p-10 max-w-5xl mx-auto">
        <div className="flex justify-between items-center border-b-2 border-gray-200 pb-4 mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Your Orders</h1>
          <button className="bg-amber-500 text-white px-4 py-2 rounded-full hover:bg-amber-600 transition">
            Track Orders
          </button>
        </div>

        {/* Orders List */}
        {orders.length === 0 ? (
          <p className="text-gray-500">No orders found.</p>
        ) : (
          orders.map((order) => (
            <div key={order._id} className="mb-8 p-6 border-b border-gray-300  shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Order #{order._id}</h2>

              {order.items.map((item, i) => (
                <div key={i} className="flex items-center gap-4 mb-3">
                  <img
                    src={item.product?.imageUrl}
                    alt={item.product?.name}
                    className="w-20 h-20 object-contain rounded border border-gray-300"
                  />
                  <div>
                    <h3 className="font-medium text-gray-800">{item.product?.name}</h3>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Orders;
