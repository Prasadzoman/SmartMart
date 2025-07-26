import React, { useState } from "react";
import axios from "axios";
import "../css/Chatbot.css"
import { Link } from "react-router-dom";
const Chatbot = () => {
  const [messages, setMessages] = useState([
    { type: "bot", text: "Hi! Tell me about your health condition and I’ll suggest products." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { type: "user", text: input }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const res = await axios.post("https://smartmart-server.onrender.com/chatbot", {
        message: input,
      });

      const { response, products } = res.data;

      const botResponse = {
        type: "bot",
        text: response,
        products: products || [],
      };

      setMessages([...newMessages, botResponse]);
      setInput("");
    } catch (err) {
      setMessages([...newMessages, { type: "bot", text: "Something went wrong." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="chat-container">
      <div className="chat-window">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message chat-${msg.type}`}>
            <p>{msg.text}</p>

            {msg.products && (
              <div className="chat-product-grid">
                {msg.products.map((prod) => (
                  <Link to={`/product/${prod._id}`} className="chat-product-link" key={prod._id}>
                    <div className="chat-product-card">
                      <img src={prod.imageUrl} alt={prod.name} />
                      <h4>{prod.name}</h4>
                      <p><strong>Brand:</strong> {prod.brand}</p>
                      <p><strong>Price:</strong> ₹{prod.price}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}

        {loading && <div className="chat-message chat-bot">Thinking...</div>}
      </div>

      <div className="chat-input">
        <input
          type="text"
          placeholder="Describe your health condition..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
