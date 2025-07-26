import React, { useEffect, useState } from 'react';
import Cart from "./Cart";
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const Landing = () => {
    const [products, setProducts] = useState([]);
    const {user}=useContext(UserContext);
    useEffect(() => {
        fetch('https://smartmart-server.onrender.com/product')
            .then((res) => res.json())
            .then((data) => setProducts(data))
            .catch((err) => console.error('Error fetching products:', err));
    }, []);

    return (
        <div className="landing-container">
            
            <div className="content-wrapper">
                {user&& <Cart/>}
                
                <div className="product-grid">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <Link to={`/product/${product._id}`} key={product._id}>
                                <div className="product-card">
                                    <img
                                        src={product.imageUrl || 'https://via.placeholder.com/200'}
                                        alt={product.name}
                                        className="product-image"
                                    />
                                    <div className="product-details">
                                        <h2>{product.name}</h2>
                                        <p className="price">₹{product.price}</p>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p>Loading products...</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Landing;
