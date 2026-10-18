import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import FloatingChatbot from './components/common/FloatingChatbot';

// Pages
import HomePage from './pages/HomePage';
import AIAssistantPage from './pages/AIAssistantPage';
import PatentSearchPage from './pages/PatentSearchPage';
import PatentDetailsPage from './pages/PatentDetailsPage';
import InventionAnalysisPage from './pages/InventionAnalysisPage';
import PatentApplicationPage from './pages/PatentApplicationPage';
import ApplicationReviewPage from './pages/ApplicationReviewPage';
import ApplicationSubmittedPage from './pages/ApplicationSubmittedPage';
import ApplicationStatusPage from './pages/ApplicationStatusPage';
import AboutPage from './pages/AboutPage';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen bg-slate-50 font-sans text-slate-800 antialiased selection:bg-ayur-100 selection:text-ayur-900">
          {/* Top Portal Header & Navigation */}
          <Navbar />

          {/* Main Routing Area */}
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/assistant" element={<AIAssistantPage />} />
              <Route path="/search" element={<PatentSearchPage />} />
              <Route path="/patent/:id" element={<PatentDetailsPage />} />
              <Route path="/analysis" element={<InventionAnalysisPage />} />
              <Route path="/apply" element={<PatentApplicationPage />} />
              <Route path="/review" element={<ApplicationReviewPage />} />
              <Route path="/submitted" element={<ApplicationSubmittedPage />} />
              <Route path="/status" element={<ApplicationStatusPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          {/* Global Floating AI Chatbot Assistant */}
          <FloatingChatbot />

          {/* Academic Footer */}
          <Footer />
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}
