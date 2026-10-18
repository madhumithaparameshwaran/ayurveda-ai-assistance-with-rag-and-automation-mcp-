# AI-Based Ayurvedic Medical Solution and Patent Assistance System
> **Academic Prototype Demonstration Portal** — *Not an Official Government Website*  
> **Course / Degree:** M.Tech Data Science Capstone Project  
> **Domain:** Retrieval-Augmented Generation (RAG), NLP, Ayurvedic Intellectual Property, and Patent Law

---

## 🏛️ Project Overview

The **“AI-Based Ayurvedic Medical Solution and Patent Assistance System”** is a full-featured frontend prototype for an AI-powered assistant designed to assist Ayurvedic researchers, pharmaceutical scientists, and traditional medicine innovators (Vaidyas). 

Under **Section 3(p) of the Indian Patents Act, 1970**, inventions that merely aggregate known properties of traditional herbs or re-state traditional knowledge are not patentable. This system demonstrates how **Retrieval-Augmented Generation (RAG)** combined with dense vector indexing can:
1. Extract botanical entities, extraction conditions, and therapeutic claims from plain descriptions.
2. Search through indexed classical Ayurvedic treatises (Samhitas) and contemporary patent databases.
3. Quantify semantic overlap and identify distinguishing synergistic elements.
4. Auto-generate compliant provisional patent drafts.
5. Simulate application filing and lifecycle tracking.

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v18+ recommended, verified on v24)
- npm (v9+)

### Installation & Execution
```bash
# 1. Navigate to the project directory
cd C:\Users\HP\.gemini\antigravity\scratch\ayurveda-patent-ai

# 2. Install dependencies (if not already installed)
npm install

# 3. Launch local development server
npm run dev
```

The application will run at: **`http://localhost:5173`** (or the port assigned by Vite).

---

## 🛠️ Technology Stack

| Layer | Technologies Used | Purpose |
|---|---|---|
| **Frontend Framework** | React 18, Vite | High-performance SPA with instant HMR |
| **Styling & Design System** | Tailwind CSS | Government-portal navy, Ayurvedic green, and academic gold theme |
| **Icons** | Lucide React | Clean, accessible vector icons across all pages |
| **Routing** | React Router v7 | Seamless client-side navigation with URL param matching |
| **State & Persistence** | React Context + `localStorage` | Preserves inventions, drafts, and chat sessions across reloads |
| **API Service Layer** | `src/services/api.js` | Modular async service layer ready for future FastAPI integration |

---

## 📑 Application Structure & Features (10 Complete Pages)

1. **Home (`/`)**:
   - Government-service portal inspired header with official bilingual titles and news marquee.
   - Hero banner: *"Discover, Analyze and Prepare Your Innovation"*.
   - Three feature cards: *Ayurvedic Solution Analysis*, *Prior-Art Search*, *Patent Application Assistance*.
   - Interactive 5-step methodology banner: *Describe → Retrieve → Compare → Analyze → Prepare Application*.
   - Quick one-click trigger to run sample glycemic regulation formulation.

2. **AI Assistant (`/assistant`)**:
   - Full conversational RAG assistant interface with suggested prompt pills.
   - Structured responses breaking down: Understanding, Extracted Concepts, Relevant Prior Art, Overlap Assessment, Distinguishing Features, and Next Steps.
   - One-click action buttons: `[Analyze My Invention]`, `[Search Related Patents]`, `[Prepare Application]`.

3. **Patent Search (`/search`)**:
   - Faceted prior-art search across categories (*Ayurveda*, *Herbal Medicine*, *Medical Formulation*), publication statuses (*Published*, *Granted*, *Application*), and similarity thresholds.
   - Card View and Table View toggle.
   - Includes 10 realistic dummy Ayurvedic patent records (e.g. `DEMO-AYU-2026-001` to `DEMO-AYU-2026-010`).

4. **Patent Details (`/patent/:id`)**:
   - Comprehensive patent specification dossier including abstract, IPC codes, botanical component tables (parts used, w/w ratios, active marker compounds), extraction processes, and claim boundaries.
   - Actions to compare against user's invention or launch RAG analysis.

5. **Invention Analysis (`/analysis`)**:
   - Complete technical disclosure form with a *"Load Sample Formulation"* button (*Polyherbal Glycemic Regulator Formulation*).
   - RAG analysis dashboard:
     - Extracted Concepts tags
     - Top 3 similar prior-art documents with visual similarity gauges
     - Similarities vs Distinguishing differences matrix
     - Cautious academic research guidance (strictly adheres to academic caution: no "Patent Guaranteed" or "Approved", uses "Potentially relevant prior art", "Requires further review")
     - Direct CTA to transfer extracted parameters to the application wizard.

6. **Patent Application Wizard (`/apply`)**:
   - 5-step guided wizard:
     1. Applicant Details
     2. Invention Details
     3. Technical Description
     4. Documents (Dummy uploaded documents verified)
     5. Review & Sign
   - **AI-Assisted Autofill (`[Generate Using AI Assistant]`):** Synthesizes specification drafts directly from the current analysis session and provides `[Accept & Insert Into Application]`.

7. **Application Review (`/review`)**:
   - Formal verification screen displaying applicant info, invention info, technical description, and document verifications with completion checkmarks.

8. **Application Submitted (`/submitted`)**:
   - Success acknowledgment with generated tracking ID (e.g., `PROT-2026-000001`), submission timestamp, printable summary, and direct link to track status.

9. **Application Status Tracking (`/status`)**:
   - Application lookup by number.
   - Interactive 7-stage lifecycle timeline:
     - ✓ Application Created
     - ✓ Invention Information Prepared
     - ✓ Prior-Art Search Completed
     - ✓ Application Draft Prepared
     - ● Submitted for Prototype Review (Active)
     - ○ Examination (Pending)
     - ○ Final Advisory Decision (Pending)

10. **About & Architecture (`/about`)**:
    - Comprehensive system documentation for faculty review.
    - End-to-end pipeline breakdown (Frontend → FastAPI → RAG → FAISS/ChromaDB → LLM → Response).
    - Explanation of Section 3(p) of the Indian Patents Act and Traditional Knowledge Digital Library (TKDL) cross-referencing.

11. **Global Floating Chatbot (`FloatingChatbot.jsx`)**:
    - Persistent bottom-right drawer accessible on every page with session preservation and quick prompt suggestions.

---

## 🔌 FastAPI / RAG Backend-Ready API Structure

The service layer in [`src/services/api.js`](src/services/api.js) is built to be a drop-in replacement for the future FastAPI backend:

```javascript
// FastAPI Endpoint Mapping:
POST /api/rag/query            <--> askAssistant(message, history)
POST /api/invention/analyze    <--> analyzeInvention(formData)
GET  /api/patents/search       <--> searchPatents(query, filters)
GET  /api/patents/{id}         <--> getPatentDetails(id)
POST /api/application/generate <--> generateApplication(data)
POST /api/application/create   <--> createApplication(data)
GET  /api/application/{id}/status <--> getApplicationStatus(id)
```

---

## ⚖️ Legal & Academic Disclaimer

> **IMPORTANT:**  
> This portal is an educational prototype developed for an **M.Tech Data Science project demonstration**.  
> It is **NOT an official government website** and does not represent the Office of the Controller General of Patents, Designs & Trade Marks (CGPDTM) or any government agency. All patent identifiers (`DEMO-AYU-2026-XXX`) and applicant names are purely fictional simulation records.
