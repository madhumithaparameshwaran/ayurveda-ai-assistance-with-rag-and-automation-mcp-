import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  ExternalLink,
  Minimize2,
  Maximize2,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { askAssistant } from '../../services/api';

export default function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const { chatMessages, setChatMessages, setInvention } = useApp();

  const suggestedQuestions = [
    "Search similar Ayurvedic solutions for blood sugar",
    "Analyze my invention formulation",
    "What existing solutions are relevant to Curcumin hydrogel?",
    "Help prepare my patent application"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [chatMessages, isOpen]);

  const handleSendMessage = async (textToSend) => {
    const query = textToSend || inputValue;
    if (!query.trim() || loading) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setLoading(true);

    try {
      const response = await askAssistant(query, chatMessages);
      const assistantMessage = {
        id: Date.now() + 1,
        sender: 'assistant',
        text: response.understanding,
        structured: response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      const errorMessage = {
        id: Date.now() + 1,
        sender: 'assistant',
        text: "I encountered an error accessing the prototype RAG knowledge base. Please try again.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-2.5 bg-gov-900 hover:bg-gov-800 text-white px-4 py-3 rounded-full shadow-2xl border-2 border-amber-400 transition-all hover:scale-105 active:scale-95"
          title="Open AI Patent Assistant"
        >
          <div className="relative">
            <Bot className="w-6 h-6 text-amber-300" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-ayur-500 rounded-full ring-2 ring-gov-900 animate-pulse" />
          </div>
          <div className="text-left hidden sm:block">
            <div className="text-xs font-bold leading-none text-white">AI Patent Assistant</div>
            <div className="text-[10px] text-amber-300 leading-tight">RAG Copilot • Active</div>
          </div>
        </button>
      )}

      {/* Floating Chatbot Window */}
      {isOpen && (
        <div
          className={`bg-white rounded-xl shadow-2xl border border-slate-300 flex flex-col overflow-hidden transition-all duration-300 ${
            isMinimized
              ? 'w-80 h-14'
              : 'w-[95vw] sm:w-[420px] h-[580px] max-h-[85vh]'
          }`}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-gov-950 via-gov-900 to-ayur-900 text-white px-4 py-3 flex items-center justify-between border-b border-amber-400/30">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-amber-400/40">
                <Bot className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>AI Ayurvedic Patent Assistant</span>
                  <span className="px-1.5 py-0.2 rounded bg-amber-400 text-gov-950 text-[9px] font-black uppercase">
                    RAG
                  </span>
                </div>
                <div className="text-[10px] text-slate-300">
                  Prior-Art & Formulation Advisor
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1 rounded text-slate-300 hover:text-white hover:bg-white/10"
                title={isMinimized ? "Expand" : "Minimize"}
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded text-slate-300 hover:text-white hover:bg-white/10"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Disclaimer Notice Banner */}
              <div className="bg-amber-50 px-3 py-1.5 border-b border-amber-200 text-[10px] text-amber-900 flex items-center gap-1.5 leading-tight">
                <AlertCircle className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                <span>AI-generated prototype advice. Not legal or patent counsel.</span>
              </div>

              {/* Chat Messages Area */}
              <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-slate-50 text-xs">
                {chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-2 ${
                      msg.sender === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {msg.sender === 'assistant' && (
                      <div className="w-6 h-6 rounded-full bg-gov-800 text-white flex items-center justify-center shrink-0 mt-1">
                        <Bot className="w-3.5 h-3.5 text-amber-300" />
                      </div>
                    )}

                    <div
                      className={`max-w-[85%] rounded-lg p-3 shadow-xs ${
                        msg.sender === 'user'
                          ? 'bg-gov-800 text-white rounded-br-none'
                          : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none'
                      }`}
                    >
                      <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>

                      {/* Structured RAG Payload Card */}
                      {msg.structured && (
                        <div className="mt-2.5 pt-2.5 border-t border-slate-100 space-y-2">
                          {/* Extracted Concepts */}
                          {msg.structured.extractedConcepts && (
                            <div>
                              <div className="text-[10px] font-bold text-slate-500 uppercase mb-1">
                                Concepts Identified:
                              </div>
                              <div className="flex flex-wrap gap-1">
                                {msg.structured.extractedConcepts.map((c, i) => (
                                  <span
                                    key={i}
                                    className="px-1.5 py-0.5 rounded bg-ayur-50 text-ayur-800 border border-ayur-200 text-[10px] font-medium"
                                  >
                                    {c}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Relevant Documents */}
                          {msg.structured.relevantDocuments && (
                            <div>
                              <div className="text-[10px] font-bold text-slate-500 uppercase mb-1">
                                Potentially Relevant Documents:
                              </div>
                              <div className="space-y-1">
                                {msg.structured.relevantDocuments.map((doc, idx) => (
                                  <div
                                    key={idx}
                                    className="p-1.5 rounded bg-slate-50 border border-slate-200 flex items-center justify-between text-[11px]"
                                  >
                                    <div className="truncate mr-2">
                                      <span className="font-bold text-gov-800">{doc.id}: </span>
                                      <span className="text-slate-600 truncate">{doc.title}</span>
                                    </div>
                                    <span className="shrink-0 px-1 rounded bg-amber-100 text-amber-900 font-bold text-[10px]">
                                      {doc.similarity}%
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Distinguishing aspects */}
                          {msg.structured.distinctions && (
                            <div className="p-2 bg-blue-50/70 rounded border border-blue-100 text-[11px] text-blue-900 leading-snug">
                              <strong>Distinguishing Feature: </strong>
                              {msg.structured.distinctions}
                            </div>
                          )}

                          {/* Quick Action CTAs */}
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            <button
                              onClick={() => {
                                setIsOpen(false);
                                navigate('/analysis');
                              }}
                              className="px-2 py-1 rounded bg-ayur-700 hover:bg-ayur-800 text-white text-[10px] font-bold flex items-center gap-1 shadow-xs"
                            >
                              <Sparkles className="w-3 h-3 text-amber-300" />
                              <span>Analyze My Invention</span>
                            </button>
                            <button
                              onClick={() => {
                                setIsOpen(false);
                                navigate('/search');
                              }}
                              className="px-2 py-1 rounded bg-gov-800 hover:bg-gov-700 text-white text-[10px] font-bold shadow-xs"
                            >
                              Search Related Patents
                            </button>
                            <button
                              onClick={() => {
                                setIsOpen(false);
                                navigate('/apply');
                              }}
                              className="px-2 py-1 rounded bg-slate-700 hover:bg-slate-800 text-white text-[10px] font-bold shadow-xs"
                            >
                              Prepare Application
                            </button>
                          </div>
                        </div>
                      )}

                      <div
                        className={`text-[9px] mt-1 text-right ${
                          msg.sender === 'user' ? 'text-slate-300' : 'text-slate-400'
                        }`}
                      >
                        {msg.timestamp}
                      </div>
                    </div>

                    {msg.sender === 'user' && (
                      <div className="w-6 h-6 rounded-full bg-slate-300 text-slate-700 flex items-center justify-center shrink-0 mt-1">
                        <User className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>
                ))}

                {loading && (
                  <div className="flex items-center gap-2 text-slate-500 text-xs italic p-2 bg-white rounded border border-slate-200">
                    <Loader2 className="w-4 h-4 animate-spin text-gov-800" />
                    <span>Searching vector knowledge base & synthesizing advice...</span>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Prompt Chips */}
              <div className="p-2 bg-slate-100 border-t border-slate-200 overflow-x-auto whitespace-nowrap scrollbar-none flex gap-1.5">
                {suggestedQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendMessage(q)}
                    disabled={loading}
                    className="inline-block text-[10px] px-2 py-1 rounded-full bg-white hover:bg-amber-50 text-gov-900 border border-slate-200 transition-colors shadow-2xs shrink-0"
                  >
                    {q}
                  </button>
                ))}
              </div>

              {/* Input Area */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="p-2.5 bg-white border-t border-slate-200 flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Describe formulation or ask question..."
                  className="flex-1 text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gov-800"
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || loading}
                  className="p-2 bg-gov-900 hover:bg-gov-800 disabled:opacity-40 text-white rounded-lg transition-colors shadow-xs"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </>
          )}
        </div>
      )}
    </div>
  );
}
