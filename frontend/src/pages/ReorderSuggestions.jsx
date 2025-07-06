import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../css/ReorderSuggestions.css'; 

const ReorderSuggestions = () => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const res = await axios.get('http://localhost:3000/reorder', {
          withCredentials: true,
        });
        setSuggestions(res.data);
      } catch (err) {
        console.error('Failed to fetch reorder suggestions:', err);
      }
    };

    fetchSuggestions();
  }, []);

  return (
    <section className="reorder-section">
      <h2 className="reorder-heading">Smart Inventory</h2>
      {suggestions.length === 0 ? (
        <p className="no-suggestions">No reorder suggestions yet. Order more to get personalized insights!</p>
      ) : (
        <div className="reorder-grid">
          {suggestions.map((item, index) => (
            <div key={index} className="reorder-card">
              <Link to={`/product/${item.product._id}`} className="reorder-link">
                <img
                  src={item.product.imageUrl || '/placeholder.png'}
                  alt={item.product.name}
                  className="reorder-image"
                  onError={(e) => (e.target.src = '/placeholder.png')}
                />
                <div className="reorder-info">
                  <h3>{item.product.name}</h3>
                  
                  <p className="reorder-price">₹{item.product.price}</p>
                  
                </div>
              </Link>
              <div className="reorder-meta">
                <p>🗓️ Next Likely Purchase: <strong>{item.nextLikelyPurchase}</strong></p>
                <p>🔁 Avg. Interval: {item.averageInterval} days</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default ReorderSuggestions;
