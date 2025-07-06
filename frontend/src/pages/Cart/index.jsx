import React, { useState, useEffect } from 'react';
import instance from '../../lib/axios';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const handelCart = async () => {
    try {
      const res = await instance.get('/cart');
      setCartItems(res.data.items);
      
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handelCart();
  }, []);

  const changeQuantity = (id, delta) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const total = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const handlePlaceOrder = async () => {
    try {
      const items = cartItems.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
      }));

      await instance.post(
        'http://localhost:3000/orders',
        { items },
        { withCredentials: true }
      );

      alert('Order placed successfully!');
      handelCart();
    } catch (err) {
      console.error('Order failed:', err);
      alert('Order failed!');
    }
  };

  return (
    <>
      {/* Desktop View */}
      <div className="hidden md:flex pt-[30px] h-screen flex-col box-border bg-gray-50">
        <div className="mt-24 ml-8 mr-8 mb-8 flex flex-1 gap-6 rounded-lg">
          {/* Cart Section */}
          <div className="p-6 w-2/3 bg-white rounded-lg shadow">
            <h1 className="text-3xl font-bold mb-4">Shopping Cart</h1>
            <hr className="mb-4" />

            {/* Headings */}
            <div className="flex font-semibold text-gray-600 pb-2 mb-4">
              <div className="w-1/2">Product</div>
              <div className="w-1/6 text-center">Price</div>
              <div className="w-1/6 text-center">Quantity</div>
              <div className="w-1/6 text-right">Total</div>
            </div>

            {/* Products */}
            {isLoading ? (
              <div className="p-6 text-center">Loading...</div>
            ) : cartItems.length === 0 ? (
              <div className="p-6 text-center text-gray-500">Your cart is empty.</div>
            ) : (
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between border-b pb-4"
                  >
                    <div className="flex items-center w-1/2 gap-4">
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <span className="font-medium">{item.name}</span>
                    </div>
                    <div className="w-1/6 text-center text-gray-700">₹{item.price}</div>
                    <div className="w-1/6 text-center">
                      <div className="inline-flex items-center gap-2">
                        <button
                          onClick={() => changeQuantity(item.id, -1)}
                          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                        >
                          -
                        </button>
                        <span className="px-2 text-lg">{item.quantity}</span>
                        <button
                          onClick={() => changeQuantity(item.id, 1)}
                          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="w-1/6 text-right font-bold">₹{item.price * item.quantity}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="w-1/3 bg-white p-6 rounded-lg shadow h-fit">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>₹{total}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping</span>
              <span>₹0</span>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between font-bold text-lg mb-4">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
            <button onClick={handlePlaceOrder} className="w-full bg-[#40c057] hover:bg-[#37b24d] text-white py-2 rounded">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="pt-[100px] px-4 block md:hidden bg-gray-50 min-h-screen">
        <h1 className="text-2xl font-bold mb-4 text-center">Shopping Cart</h1>

        {isLoading ? (
          <div className="text-center">Loading...</div>
        ) : cartItems.length === 0 ? (
          <div className="text-center text-gray-500">Your cart is empty.</div>
        ) : (
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow p-4">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <div className="font-semibold text-sm">{item.name}</div>
                    <div className="text-gray-600 text-sm">₹{item.price}</div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => changeQuantity(item.id, -1)}
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span className="px-2 text-sm">{item.quantity}</span>
                    <button
                      onClick={() => changeQuantity(item.id, 1)}
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                  <div className="font-bold text-sm">₹{item.price * item.quantity}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Order Summary */}
        {cartItems.length > 0 && (
          <div className="bg-white rounded-lg shadow p-4 mt-6">
            <h2 className="text-lg font-semibold mb-2">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>₹{total}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping</span>
              <span>₹0</span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between font-bold text-md mb-4">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
            <button onClick={handlePlaceOrder} className="w-full bg-[#40c057] hover:bg-[#37b24d] text-white py-2 rounded">
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default Cart;
