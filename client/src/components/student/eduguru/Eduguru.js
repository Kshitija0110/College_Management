import React, { useState, useRef, useEffect } from "react";
import { Send, X, MessageSquare } from "lucide-react";
import Header from "../Header";
import Sidebar from "../Sidebar";

const EduGuru = () => {
  const [messages, setMessages] = useState([
    {
      text: "Hello! I'm EDUGURU, your educational assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message
    setMessages((prev) => [
      ...prev,
      { text: input, sender: "user", timestamp: new Date() },
    ]);
    
    const userQuestion = input.trim();
    setInput("");
    setIsLoading(true);
    
    try {
      const response = await fetch("https://kshitu-genai.hf.space/get_answer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ question: userQuestion })
      });

      const data = await response.json();

      if (response.ok) {
        // Add bot response to messages
        setMessages((prev) => [
          ...prev,
          { text: data.answer, sender: "bot", timestamp: new Date() },
        ]);
      } else {
        throw new Error(data.error || "Failed to get response from EduGuru");
      }
    } catch (error) {
      console.error("Error fetching answer:", error);
      setMessages((prev) => [
        ...prev,
        { 
          text: "Sorry, I encountered an error. Please try again later.", 
          sender: "bot", 
          timestamp: new Date() 
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="bg-[#d6d9e0] h-screen flex items-center justify-center">
      <div className="flex flex-col bg-[#f4f6fa] h-5/6 w-[95%] rounded-2xl shadow-2xl space-y-6 overflow-y-hidden">
        <Header />
        <div className="flex flex-[0.95]">
          <Sidebar />
          <div className="flex-[0.8] mt-3">
            <div className="space-y-5">
              <div className="flex text-gray-400 items-center space-x-2">
                <MessageSquare />
                <h1>EduGuru - AI Educational Assistant</h1>
              </div>
              <div className="mr-10 bg-white rounded-xl p-6 h-[29.5rem] flex flex-col">
                {/* Chat messages container */}
                <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        message.sender === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] px-4 py-3 rounded-xl ${
                          message.sender === "user"
                            ? "bg-indigo-600 text-white"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        <div className="text-sm">{message.text}</div>
                        <div 
                          className={`text-xs mt-1 ${
                            message.sender === "user" ? "text-indigo-200" : "text-gray-500"
                          }`}
                        >
                          {formatTime(message.timestamp)}
                        </div>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 text-gray-800 px-4 py-3 rounded-xl max-w-[80%]">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input form */}
                <form 
                  onSubmit={handleSendMessage} 
                  className="flex items-center border-t pt-3"
                >
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask EduGuru a question..."
                    disabled={isLoading}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className={`px-4 py-2 rounded-r-lg ${
                      isLoading || !input.trim()
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-indigo-600 hover:bg-indigo-700"
                    } text-white transition-colors`}
                  >
                    <Send size={18} />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EduGuru;