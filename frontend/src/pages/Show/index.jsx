import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import instance from '../../lib/axios';

const NutritionBar = ({ label, value, unit = 'g', scale = 2, colorClass = 'bg-blue-500' }) => {
  const width = Math.min(value * scale, 100);
  return (
    <div className="mb-4">
      <div className="text-sm font-medium text-gray-700 mb-1">
        {label}: {value} {unit}
      </div>
      <div className="w-full bg-gray-200 h-3 rounded">
        <div className={`h-3 rounded ${colorClass}`} style={{ width: `${width}%` }}></div>
      </div>
    </div>
  );
};

function Show() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { user, addToCart } = useContext(UserContext);

  useEffect(() => {
    const showProduct = async () => {
      try {
        const res = await instance.get(`/product/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    showProduct();
  }, [id]);

  if (!product) {
    return <div className="pt-20 text-center text-xl">Loading...</div>;
  }

  return (
    <div className="pt-20 w-full min-h-screen bg-white overflow-y-auto px-4">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Image Section */}
        <div className="w-full lg:w-2/3 flex justify-center items-center border border-gray-300 rounded-xl bg-gray-50">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="max-h-full max-w-full object-contain p-4"
          />
        </div>

        {/* Info Section */}
        <div className="w-full lg:w-1/3 flex flex-col justify-start gap-6 py-4 px-2 md:px-4">
          <h1 className="text-2xl md:text-4xl font-semibold tracking-wide text-gray-800">{product.name}</h1>
          <h2 className="text-lg md:text-2xl text-gray-600">{product.brand}</h2>
          <h3 className="text-xl md:text-3xl text-green-600 font-bold">₹{product.price}</h3>
          <p className="text-gray-700 text-base leading-relaxed">{product.description}</p>

          <div className="mt-4">
            <h3 className="text-base md:text-lg font-semibold mb-2">Nutrition per 100g:</h3>
            {product.energy_kcal_100g && (
              <p className="mb-4 text-sm text-gray-500">Energy: {product.energy_kcal_100g} kcal</p>
            )}
            <NutritionBar label="Proteins" value={product.proteins_100g || 0} colorClass="bg-green-500" />
            <NutritionBar label="Carbohydrates" value={product.carbohydrates_100g || 0} colorClass="bg-yellow-500" />
            <NutritionBar label="Sugars" value={product.sugars_100g || 0} colorClass="bg-pink-400" />
            <NutritionBar label="Fat" value={product.fat_100g || 0} colorClass="bg-red-500" />
            <NutritionBar label="Saturated Fat" value={product.saturated_fat_100g || 0} colorClass="bg-red-300" />
            <NutritionBar label="Fiber" value={product.fiber_100g || 0} colorClass="bg-purple-400" />
            <NutritionBar label="Salt" value={product.salt_100g || 0} colorClass="bg-blue-500" />
          </div>

          <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-sm">
            <h4 className="text-base md:text-lg font-semibold mb-3">Extra Info</h4>
            <div className="mb-2 flex items-center gap-2">
              <strong>Nutriscore:</strong>
              <span
                className={`uppercase px-2 py-1 rounded text-sm font-bold text-white nutriscore-badge nutriscore-${product.nutriscore_grade?.toLowerCase()}`}
                style={{ backgroundColor: getNutriScoreColor(product.nutriscore_grade) }}
              >
                {product.nutriscore_grade?.toUpperCase()}
              </span>
            </div>
            <p><strong>NOVA Group:</strong> {product.nova_group || 'N/A'}</p>
            {product.allergens?.length > 0 && (
              <p><strong>Allergens:</strong> {product.allergens.join(', ')}</p>
            )}
            {product.additives?.length > 0 && (
              <p><strong>Additives:</strong> {product.additives.join(', ')}</p>
            )}
          </div>

          <button
            onClick={() => addToCart(product)}
            className="mt-6 bg-emerald-500 text-white text-lg px-6 py-3 rounded-lg hover:bg-emerald-600 transition-all duration-200 w-full lg:w-fit"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Show;

function getNutriScoreColor(score) {
  switch ((score || '').toLowerCase()) {
    case 'a': return '#008000';
    case 'b': return '#85c12f';
    case 'c': return '#f5c518';
    case 'd': return '#f29c1f';
    case 'e': return '#d62828';
    default: return '#6b7280';
  }
}
