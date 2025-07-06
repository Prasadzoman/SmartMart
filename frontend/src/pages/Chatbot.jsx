import React, { useState } from "react";
import axios from "axios";
import "../css/Chatbot.css";
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
      const res = await axios.post("http://localhost:3000/chatbot", {
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
    <div className="pt-20 px-4 w-full max-w-2xl mx-auto h-[calc(100vh-4rem)] flex flex-col">
      <div className="flex-1 overflow-y-auto space-y-3 pb-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`rounded-md px-3 py-2 max-w-[85%] text-sm whitespace-pre-line ${
              msg.type === "user"
                ? "bg-blue-100 self-end text-right"
                : "bg-gray-100 self-start text-left"
            }`}
          >
            <p>{msg.text}</p>

            {msg.products && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                {msg.products.map((prod) => (
                  <Link
                    to={`/product/${prod._id}`}
                    className="block border rounded-md p-2 hover:shadow transition bg-white"
                    key={prod._id}
                  >
                    <img
                      src={prod.imageUrl}
                      alt={prod.name}
                      className="w-full h-28 object-cover rounded"
                    />
                    <h4 className="font-medium mt-1 text-sm truncate">{prod.name}</h4>
                    <p className="text-xs text-gray-600">Brand: {prod.brand}</p>
                    <p className="text-sm font-semibold">₹{prod.price}</p>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}

        {loading && <div className="bg-gray-100 rounded-md px-3 py-2 text-sm w-fit">Thinking...</div>}
      </div>

      <div className="mt-auto flex gap-2 pt-3 pb-4 sticky bottom-0 bg-white">
        <input
          type="text"
          placeholder="Describe your health condition..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleSend}
          className="px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
