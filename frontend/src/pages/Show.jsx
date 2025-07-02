import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

const NutritionBar = ({ label, value, unit = "g", scale = 5, colorClass }) => {
  const width = Math.min(value * scale, 100);
  return (
    <div className="nutrition-bar-container">
      <div className="nutrition-label">{label}: {value} {unit}</div>
      <div className="nutrition-bar">
        <div className={`nutrition-bar-fill ${colorClass}`} style={{ width: `${width}%` }}></div>
      </div>
    </div>
  );
};

const Show = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { user, addToCart } = useContext(UserContext);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/product/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error('Error fetching product:', err);
      }
    };
    getProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product._id, 1);
  };

  if (!product) {
    return <div className="text-center mt-10 text-lg">Loading...</div>;
  }

  return (
    <div className="show-container">
      <h1 className="show-title">{product.name}</h1>
      <img
        src={product.imageUrl}
        alt={product.name}
        className="show-image"
      />

      <div className="show-info">
        <p><strong>Brand:</strong> {product.brand}</p>
        <p><strong>Price:</strong> ₹{product.price}</p>
        <p><strong>Category:</strong> {product.category}</p>
        {product.description && <p><strong>Description:</strong> {product.description}</p>}

        {user ? (
          <button className="add-to-cart-btn" onClick={handleAddToCart}>Add to Cart</button>
        ) : (
          <p className="login-warning">Login to add this item to cart</p>
        )}
      </div>

      <div className="nutrition-section">
        <h3>Nutritional Info (per 100g)</h3>

        {product.energy_kcal_100g && (
          <NutritionBar label="Calories" value={product.energy_kcal_100g} unit="kcal" scale={1} colorClass="bar-energy" />
        )}
        {product.fat_100g && (
          <NutritionBar label="Fat" value={product.fat_100g} colorClass="bar-fat" />
        )}
        {product.saturated_fat_100g && (
          <NutritionBar label="Saturated Fat" value={product.saturated_fat_100g} colorClass="bar-fat" />
        )}
        {product.carbohydrates_100g && (
          <NutritionBar label="Carbs" value={product.carbohydrates_100g} colorClass="bar-carbs" />
        )}
        {product.sugars_100g && (
          <NutritionBar label="Sugar" value={product.sugars_100g} colorClass="bar-sugar" />
        )}
        {product.fiber_100g && (
          <NutritionBar label="Fiber" value={product.fiber_100g} colorClass="bar-fiber" />
        )}
        {product.proteins_100g && (
          <NutritionBar label="Protein" value={product.proteins_100g} colorClass="bar-protein" />
        )}
        {product.salt_100g && (
          <NutritionBar label="Salt" value={product.salt_100g} colorClass="bar-salt" scale={20} />
        )}

        <h4>Extra Info</h4>
        <div className="nutriscore-container">
          <strong>Nutriscore: </strong>
          <span className={`nutriscore-badge nutriscore-${product.nutriscore_grade?.toLowerCase()}`}>
            {product.nutriscore_grade?.toUpperCase()}
          </span>
        </div>
        <p><strong>NOVA Group:</strong> {product.nova_group}</p>

        {product.allergens?.length > 0 && (
          <p><strong>Allergens:</strong> {product.allergens.join(', ')}</p>
        )}
        {product.additives?.length > 0 && (
          <p><strong>Additives:</strong> {product.additives.join(', ')}</p>
        )}
      </div>
    </div>
  );
};

export default Show;
