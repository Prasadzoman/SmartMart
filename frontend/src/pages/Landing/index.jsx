import React, { useEffect, useState, useContext } from 'react';
import background from './imgs/heroSection.jpg';
import search from './imgs/search.svg';
import { UserContext } from '../../context/UserContext';
import instance from '../../lib/axios';
import add from './imgs/add_white.svg';
import { Link } from 'react-router-dom';


function Landing() {
    const [products, setProducts] = useState([]);
    const { user, addToCart } = useContext(UserContext);
    const [query, setQuery] = useState('');

    const handleProducts = async () => {
        try {
            const res = await instance.get('/product/');
            setProducts(res.data); // Assuming API returns array of products
        } catch (error) {
            console.error('Failed to fetch products', error);
        }
    };

    useEffect(() => {
        handleProducts();
    }, []);


    

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div className="w-full pt-15">
            {/* Hero section */}
            <div className="relative h-96 w-full">
                <img
                    src={background}
                    alt="Background"
                    className="absolute inset-0 w-full h-full object-cover -z-10"
                />
                <div className="relative z-10 px-6 h-96 w-full flex items-start justify-center pt-20">
                    <h1 className="text-5xl md:text-6xl font-extrabold text-white">Smart Bazar</h1>
                </div>
            </div>

            {/* Subtitle */}
            <div className="w-full flex justify-center mt-7 mb-7 px-4">
                <h2 className="text-xl md:text-2xl text-center">Best seller grocery near you</h2>
            </div>

            {/* Search bar */}
            <div className="w-full flex justify-center mb-10 px-4">
                <div className="relative w-full max-w-sm">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search..."
                        className="w-full border border-gray-300 rounded-full py-2 px-4 pr-12 text-sm"
                    />
                    <button
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 px-2"
                        onClick={() => console.log('Search:', query)}
                    >
                        <img src={search} alt="Search" className="h-5 w-5" />
                    </button>
                </div>
            </div>

            {/* Product grid */}
            <div className="bg-white grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 px-4 pb-10 md:ml-20 md:mr-20">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <Link to={`/product/${product._id}`} key={product._id}>

                        
                        <div
                            key={product._id}
                            className="  mt-4 w-full h-60 shadow-md bg-white rounded-lg overflow-hidden hover:scale-105 transition duration-300 flex flex-col"
                        >
                            {/* Product Image */}
                            <div className="h-40 flex justify-center items-center overflow-hidden">
                                <img
                                    src={product.imageUrl}
                                    alt={product.name}
                                    className="h-full object-contain"
                                />
                            </div>

                            {/* Product Info */}
                            <div className="flex flex-col flex-grow p-3">
                                <h3 className="text-sm font-semibold">{product.name}</h3>
                                <p className="text-xs text-gray-600 truncate">{product.description}</p>

                                {/* Price & Add Button Fixed at Bottom */}
                                <div className="flex justify-between items-center mt-auto">
                                    <span className="text-green-600 font-bold text-sm">₹{product.price}</span>
                                    <button onClick={() => addToCart(product._id, 1)} className="bg-emerald-500 text-white text-xs p-2 rounded-full hover:bg-emerald-600">
                                        <img src={add} alt="Add" className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                        </Link>
                    ))
                ) : (
                    <p className="text-center col-span-full text-gray-500">No products found.</p>
                )}
            </div>

        </div>
    );
}

export default Landing;
