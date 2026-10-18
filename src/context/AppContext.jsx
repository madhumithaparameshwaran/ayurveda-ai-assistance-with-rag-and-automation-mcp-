import React, { createContext, useContext, useState, useEffect } from 'react';
import { DEMO_SAMPLE_INVENTION } from '../data/patents';

const AppContext = createContext(null);

const STORAGE_KEYS = {
  INVENTION: 'ayur_invention_data',
  ANALYSIS: 'ayur_analysis_data',
  APPLICATION_DRAFT: 'ayur_application_draft',
  LAST_SUBMITTED_ID: 'ayur_last_submitted_id',
  CHAT_MESSAGES: 'ayur_chat_messages',
  SELECTED_PATENT_ID: 'ayur_selected_patent_id'
};

export function AppProvider({ children }) {
  // 1. Current invention state
  const [invention, setInvention] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.INVENTION);
      return saved ? JSON.parse(saved) : DEMO_SAMPLE_INVENTION;
    } catch {
      return DEMO_SAMPLE_INVENTION;
    }
  });

  // 2. AI Analysis results state
  const [analysisResult, setAnalysisResult] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ANALYSIS);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // 3. Application form draft state
  const [applicationDraft, setApplicationDraft] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.APPLICATION_DRAFT);
      return saved ? JSON.parse(saved) : {
        applicant: {
          name: "Dr. A. K. Shastri",
          email: "ak.shastri@ayur-res.edu",
          organization: "National Institute of Ayurvedic Research",
          address: "Sector 14, Institutional Area, New Delhi, India",
          applicantType: "Academic / Research Institution"
        },
        invention: {
          title: DEMO_SAMPLE_INVENTION.title,
          field: DEMO_SAMPLE_INVENTION.field,
          problemStatement: DEMO_SAMPLE_INVENTION.problem,
          proposedSolution: DEMO_SAMPLE_INVENTION.solution
        },
        technical: {
          abstract: "",
          detailedDescription: "",
          uniqueFeatures: DEMO_SAMPLE_INVENTION.uniqueFeatures,
          advantages: DEMO_SAMPLE_INVENTION.expectedBenefits
        },
        documents: [
          { name: "Abstract.pdf", size: "1.2 MB", status: "Verified" },
          { name: "Technical_Description.pdf", size: "3.5 MB", status: "Verified" },
          { name: "Supporting_Document.pdf", size: "2.1 MB", status: "Verified" }
        ],
        currentStep: 1
      };
    } catch {
      return null;
    }
  });

  // 4. Last submitted application ID
  const [lastSubmittedId, setLastSubmittedId] = useState(() => {
    return localStorage.getItem(STORAGE_KEYS.LAST_SUBMITTED_ID) || "PROT-2026-000001";
  });

  // 5. Selected patent ID for comparison
  const [selectedPatentId, setSelectedPatentId] = useState(() => {
    return localStorage.getItem(STORAGE_KEYS.SELECTED_PATENT_ID) || "DEMO-AYU-2026-001";
  });

  // 6. Global Chat history
  const [chatMessages, setChatMessages] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CHAT_MESSAGES);
      return saved ? JSON.parse(saved) : [
        {
          id: 1,
          sender: "assistant",
          text: "Hello! Describe your Ayurvedic medical solution or invention. I can help you explore potentially relevant existing solutions and organize information for a patent application.",
          timestamp: "Just now",
          structured: null
        }
      ];
    } catch {
      return [];
    }
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.INVENTION, JSON.stringify(invention));
  }, [invention]);

  useEffect(() => {
    if (analysisResult) {
      localStorage.setItem(STORAGE_KEYS.ANALYSIS, JSON.stringify(analysisResult));
    }
  }, [analysisResult]);

  useEffect(() => {
    if (applicationDraft) {
      localStorage.setItem(STORAGE_KEYS.APPLICATION_DRAFT, JSON.stringify(applicationDraft));
    }
  }, [applicationDraft]);

  useEffect(() => {
    if (lastSubmittedId) {
      localStorage.setItem(STORAGE_KEYS.LAST_SUBMITTED_ID, lastSubmittedId);
    }
  }, [lastSubmittedId]);

  useEffect(() => {
    if (selectedPatentId) {
      localStorage.setItem(STORAGE_KEYS.SELECTED_PATENT_ID, selectedPatentId);
    }
  }, [selectedPatentId]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CHAT_MESSAGES, JSON.stringify(chatMessages));
  }, [chatMessages]);

  const loadSampleInvention = () => {
    setInvention(DEMO_SAMPLE_INVENTION);
  };

  const resetAllData = () => {
    setInvention(DEMO_SAMPLE_INVENTION);
    setAnalysisResult(null);
    localStorage.removeItem(STORAGE_KEYS.ANALYSIS);
  };

  return (
    <AppContext.Provider
      value={{
        invention,
        setInvention,
        loadSampleInvention,
        analysisResult,
        setAnalysisResult,
        applicationDraft,
        setApplicationDraft,
        lastSubmittedId,
        setLastSubmittedId,
        selectedPatentId,
        setSelectedPatentId,
        chatMessages,
        setChatMessages,
        resetAllData
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
