import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bot,
  Send,
  Sparkles,
  Search,
  FileText,
  AlertCircle,
  HelpCircle,
  RefreshCw,
  Cpu,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  CheckCircle2,
  FileCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { askAssistant } from '../services/api';
import SimilarityGauge from '../components/common/SimilarityGauge';

export default function AIAssistantPage() {
  const navigate = useNavigate();
  const { chatMessages, setChatMessages, setInvention } = useApp();
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const samplePrompts = [
    {
      title: "Blood Glucose Formulation",
      text: "I have developed a polyherbal formulation intended to support blood glucose management using Gymnema sylvestre and Momordica charantia micro-pellets."
    },
    {
      title: "Topical Curcumin Hydrogel",
      text: "I am preparing a topical nano-curcuminoid emulgel with Boswellia serrata for chronic knee osteoarthritis pain relief."
    },
    {
      title: "Cognitive Neuroprotective Medhya",
      text: "We are researching a standardized lipidic extraction of Withania somnifera and Bacopa monnieri for memory enhancement."
    },
    {
      title: "Respiratory Kashayam",
      text: "A spray-dried instantaneous Kashayam formulation containing Adhatoda vasica and piperine for bronchial asthma relief."
    }
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, loading]);

  const handleSend = async (messageText) => {
    const textToSend = messageText || inputText;
    if (!textToSend.trim() || loading) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setLoading(true);

    try {
      const response = await askAssistant(textToSend, chatMessages);
      const assistantMsg = {
        id: Date.now() + 1,
        sender: 'assistant',
        text: response.understanding,
        structured: response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      setChatMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'assistant',
          text: "An error occurred while contacting the RAG retrieval server. Please check your simulated connection.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleResetChat = () => {
    setChatMessages([
      {
        id: 1,
        sender: "assistant",
        text: "Hello. Describe your Ayurvedic medical solution or invention. I can help you explore potentially relevant existing solutions and organize information for a patent application.",
        timestamp: "Just now",
        structured: null
      }
    ]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      {/* Page Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-ayur-800 uppercase tracking-wider mb-1">
            <Bot className="w-4 h-4 text-ayur-700" />
            <span>Interactive RAG Copilot</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gov-900">
            AI Ayurvedic Innovation & Patent Assistant
          </h1>
          <p className="text-xs md:text-sm text-slate-600 mt-1">
            Ask questions, describe formulations, and simulate retrieval across indexed Ayurvedic texts and patent records.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleResetChat}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            title="Reset Conversation"
          >
            <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
            <span>Clear Chat</span>
          </button>
        </div>
      </div>

      {/* Main Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: Chat Workspace */}
        <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col h-[700px] overflow-hidden">
          {/* Top Notice Bar */}
          <div className="bg-amber-50 px-4 py-2 border-b border-amber-200 text-xs text-amber-900 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
            <span>
              <strong>Disclaimer:</strong> AI-generated information is for research and prototype assistance only
              and should not be treated as legal or medical advice.
            </span>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 bg-slate-50/50">
            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'assistant' && (
                  <div className="w-9 h-9 rounded-full bg-gov-900 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <Bot className="w-5 h-5 text-amber-400" />
                  </div>
                )}

                <div
                  className={`max-w-[88%] rounded-xl p-4 shadow-xs ${
                    msg.sender === 'user'
                      ? 'bg-gov-800 text-white rounded-br-none'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
                  }`}
                >
                  <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>

                  {/* Render Structured Response Cards */}
                  {msg.structured && (
                    <div className="mt-4 pt-3 border-t border-slate-200 space-y-3.5">
                      {/* 1. Concepts Extracted */}
                      {msg.structured.extractedConcepts?.length > 0 && (
                        <div>
                          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                            Key Concepts Extracted:
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {msg.structured.extractedConcepts.map((concept, i) => (
                              <span
                                key={i}
                                className="px-2 py-0.5 rounded-full bg-ayur-50 text-ayur-800 border border-ayur-200 text-xs font-semibold"
                              >
                                {concept}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* 2. Potentially Relevant Existing Documents */}
                      {msg.structured.relevantDocuments?.length > 0 && (
                        <div>
                          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                            Potentially Relevant Existing Documents:
                          </div>
                          <div className="space-y-2">
                            {msg.structured.relevantDocuments.map((doc, idx) => (
                              <div
                                key={idx}
                                className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                              >
                                <div className="space-y-0.5">
                                  <div className="font-bold text-gov-900">{doc.id}</div>
                                  <div className="text-slate-600 line-clamp-1">{doc.title}</div>
                                </div>
                                <div className="w-full sm:w-36 shrink-0">
                                  <SimilarityGauge percentage={doc.similarity} label="Similarity" />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* 3. Similarity Information & Important Differences */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                        <div className="p-3 bg-amber-50/60 rounded-lg border border-amber-200/80">
                          <span className="font-bold text-amber-900 block mb-1">
                            Similarity Assessment:
                          </span>
                          <p className="text-amber-950 text-xs leading-relaxed">
                            {msg.structured.similarityInfo}
                          </p>
                        </div>
                        <div className="p-3 bg-emerald-50/60 rounded-lg border border-emerald-200/80">
                          <span className="font-bold text-emerald-900 block mb-1">
                            Important Distinctions / Novelty:
                          </span>
                          <p className="text-emerald-950 text-xs leading-relaxed">
                            {msg.structured.distinctions}
                          </p>
                        </div>
                      </div>

                      {/* 4. Suggested Next Steps */}
                      {msg.structured.suggestedNextSteps?.length > 0 && (
                        <div className="p-3 bg-slate-100/70 rounded-lg border border-slate-200 text-xs space-y-1">
                          <span className="font-bold text-slate-700 block mb-1">
                            Suggested Next Steps:
                          </span>
                          {msg.structured.suggestedNextSteps.map((step, sIdx) => (
                            <div key={sIdx} className="flex items-center gap-1.5 text-slate-700">
                              <span className="text-ayur-600 font-bold">•</span>
                              <span>{step}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* 5. Action Buttons (Required by prompt) */}
                      <div className="pt-2 flex flex-wrap gap-2">
                        <button
                          onClick={() => navigate('/analysis')}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-ayur-700 hover:bg-ayur-800 text-white text-xs font-bold shadow-xs transition-colors"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                          <span>Analyze My Invention</span>
                        </button>
                        <button
                          onClick={() => navigate('/search')}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gov-800 hover:bg-gov-700 text-white text-xs font-bold shadow-xs transition-colors"
                        >
                          <Search className="w-3.5 h-3.5 text-slate-200" />
                          <span>Search Related Patents</span>
                        </button>
                        <button
                          onClick={() => navigate('/apply')}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-800 text-white text-xs font-bold shadow-xs transition-colors"
                        >
                          <FileText className="w-3.5 h-3.5 text-slate-200" />
                          <span>Prepare Application</span>
                        </button>
                      </div>
                    </div>
                  )}

                  <div
                    className={`text-[10px] mt-2 text-right ${
                      msg.sender === 'user' ? 'text-slate-300' : 'text-slate-400'
                    }`}
                  >
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-200 text-xs text-slate-600 shadow-xs">
                <div className="w-6 h-6 rounded-full border-2 border-gov-800 border-t-transparent animate-spin" />
                <div className="space-y-0.5">
                  <span className="font-bold text-gov-900 block">Analyzing formulation with RAG...</span>
                  <span className="text-[11px] text-slate-500">Querying FAISS vector index & matching Section 3(p) prior art.</span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Chat Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Describe your Ayurvedic medical solution or invention (e.g. polyherbal formulation for blood glucose)..."
              disabled={loading}
              className="flex-1 text-xs sm:text-sm px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gov-800"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || loading}
              className="px-5 py-3 rounded-lg bg-gov-900 hover:bg-gov-800 disabled:opacity-40 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-sm transition-colors"
            >
              <Send className="w-4 h-4 text-amber-300" />
              <span className="hidden sm:inline">Send</span>
            </button>
          </form>
        </div>

        {/* Right Side: Quick Starter Prompts & Academic Context */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
            <h3 className="text-xs font-bold text-gov-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Suggested Test Inventions</span>
            </h3>
            <p className="text-xs text-slate-500 mb-3">
              Click any sample prompt below to demonstrate the RAG assistant response:
            </p>

            <div className="space-y-2.5">
              {samplePrompts.map((p, idx) => (
                <div
                  key={idx}
                  onClick={() => handleSend(p.text)}
                  className="p-3 rounded-lg border border-slate-200 hover:border-gov-700 bg-slate-50 hover:bg-white cursor-pointer transition-all group"
                >
                  <div className="flex items-center justify-between text-xs font-bold text-gov-900 group-hover:text-gov-700">
                    <span>{p.title}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <p className="text-[11px] text-slate-600 line-clamp-2 mt-1 leading-normal">
                    {p.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-gov-900 to-gov-950 text-white p-5 rounded-xl border border-amber-400/30 shadow-md">
            <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Cpu className="w-4 h-4" />
              <span>RAG Pipeline Architecture</span>
            </h4>
            <div className="text-xs text-slate-300 space-y-2 leading-relaxed">
              <p>
                <strong>Step 1:</strong> User query is converted into dense semantic embeddings using
                domain-adapted BioBERT / Ayurvedic embeddings.
              </p>
              <p>
                <strong>Step 2:</strong> FAISS vector indexing searches over 10,000+ indexed records from
                classical Samhitas and patent registries.
              </p>
              <p>
                <strong>Step 3:</strong> LLM analyzes overlap under Indian Patent Act Section 3(p) guidance.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-700">
              <button
                onClick={() => navigate('/about')}
                className="text-xs text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 underline"
              >
                <span>Read detailed architecture specification</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
