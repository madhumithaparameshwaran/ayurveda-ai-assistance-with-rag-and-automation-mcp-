import React from 'react';
import {
  Cpu,
  Database,
  Layers,
  Sparkles,
  ShieldCheck,
  BookOpen,
  Code,
  FileCheck,
  CheckCircle2,
  Workflow,
  ExternalLink
} from 'lucide-react';

export default function AboutPage() {
  const techStack = [
    { title: "React.js + Vite", desc: "Interactive, accessible client-side UI and state synchronization.", role: "Frontend UI Layer" },
    { title: "FastAPI", desc: "High-performance Python asynchronous RESTful API framework.", role: "Backend API Service" },
    { title: "Python 3.11", desc: "Core language for NLP, embedding generation, and scientific pipelines.", role: "Core Language" },
    { title: "RAG Framework", desc: "Retrieval-Augmented Generation connecting LLMs with private patent vector stores.", role: "Core Architecture" },
    { title: "LLM (Llama-3 / Gemini)", desc: "Domain-instructed LLM for drafting patent specifications and analyzing synergy.", role: "Generative Model" },
    { title: "FAISS / ChromaDB", desc: "Dense vector database indexing classical Ayurvedic corpus & patent disclosures.", role: "Vector Index" },
    { title: "Vector Embeddings", desc: "Domain-adapted dense embeddings mapping botanical terms and claim semantics.", role: "Semantic Space" }
  ];

  const pipelineStages = [
    { label: "1. User Input", desc: "Formulation description, botanical components, and therapeutic targets." },
    { label: "2. React Frontend", desc: "Client-side input validation, concept tagging, and persistent local state." },
    { label: "3. FastAPI Backend", desc: "REST endpoints handling query orchestration and data normalization." },
    { label: "4. RAG Pipeline", desc: "Chunking, botanical NER extraction, and dense similarity matching." },
    { label: "5. Vector Database", desc: "Sub-millisecond cosine distance indexing across classical texts and patents." },
    { label: "6. Knowledge Base", desc: "Caraka, Sushruta Samhitas, TKDL reference markers, and IP databases." },
    { label: "7. LLM Processing", desc: "Prompt synthesis under Section 3(p) patentability guidelines." },
    { label: "8. AI-Assisted Response", desc: "Structured similarity percentages, distinctions, and draft claims." }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-10">
      {/* Header Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-xs">
        <div className="text-xs font-bold text-ayur-800 uppercase tracking-wider mb-1 flex items-center gap-1.5">
          <BookOpen className="w-4 h-4 text-ayur-700" />
          <span>M.Tech Data Science Academic Project</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gov-900">
          About the AI-Based Ayurvedic Patent Assistance System
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
          An academic research prototype investigating the application of dense vector retrieval and
          Retrieval-Augmented Generation (RAG) to Ayurvedic intellectual property, prior-art discovery,
          and provisional patent drafting.
        </p>
      </div>

      {/* 1. System Purpose */}
      <section className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <h2 className="text-lg font-bold text-gov-900 uppercase tracking-wide border-b border-slate-100 pb-2">
          System Purpose & Research Objective
        </h2>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          The prototype demonstrates how <strong>Retrieval-Augmented Generation (RAG)</strong> can assist
          innovators, Vaidyas, and academic researchers in navigating the complex domain of Ayurvedic medicine
          and patent law. In conventional patent research, searching for prior art in Ayurvedic formulations
          is challenging due to multilingual botanical names (Sanskrit, Latin binomials, vernacular names) and
          extensive classical literature spanning centuries.
        </p>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          By coupling dense vector embeddings with classical Ayurvedic treatises (such as the <em>Caraka Samhita</em>,
          <em>Sushruta Samhita</em>, and <em>Astanga Hrdaya</em>) alongside contemporary patent literature, the system
          evaluates whether a proposed formulation represents a <strong>mere aggregation of known properties</strong> or
          a genuine, non-obvious synergistic technical advancement.
        </p>

        <div className="p-4 bg-amber-50 rounded-lg border border-amber-200 text-xs text-amber-950 space-y-1.5">
          <div className="font-bold flex items-center gap-1.5 text-amber-900">
            <ShieldCheck className="w-4 h-4 text-amber-700" />
            <span>Section 3(p) of the Indian Patents Act, 1970</span>
          </div>
          <p className="leading-relaxed">
            Section 3(p) excludes from patentability: <em>“an invention which in effect, is traditional knowledge or
            which is an aggregation or duplication of known properties of traditionally known component or components.”</em>
            This system assists scholars in identifying classical prior art early and drafting specifications that
            concretely prove <strong>unexpected synergism, novel extraction kinetics, or enhanced bioavailability</strong>.
          </p>
        </div>
      </section>

      {/* 2. RAG System Architecture Diagram */}
      <section className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-xs space-y-6">
        <div>
          <h2 className="text-lg font-bold text-gov-900 uppercase tracking-wide border-b border-slate-100 pb-2 flex items-center gap-2">
            <Workflow className="w-5 h-5 text-gov-800" />
            <span>End-to-End System Architecture</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Data progression through the frontend prototype and future FastAPI backend.
          </p>
        </div>

        {/* Visual Flow Pipeline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          {pipelineStages.map((stage, idx) => (
            <div
              key={idx}
              className="bg-slate-50 p-4 rounded-lg border border-slate-200 flex flex-col justify-between hover:border-gov-600 transition-colors"
            >
              <div>
                <span className="font-bold text-gov-900 block mb-1">{stage.label}</span>
                <p className="text-slate-600 text-[11px] leading-relaxed">{stage.desc}</p>
              </div>
              <div className="mt-3 text-[10px] text-ayur-700 font-bold">
                Stage {idx + 1} of 8 &rarr;
              </div>
            </div>
          ))}
        </div>

        {/* Text Representation as required by prompt */}
        <div className="p-4 bg-gov-950 text-slate-200 rounded-lg font-mono text-xs overflow-x-auto">
          <div className="text-amber-400 font-bold mb-2">// Architectural Pipeline Graph:</div>
          <div>User</div>
          <div className="text-slate-500">↓</div>
          <div>React Frontend (UI / State / Client Storage)</div>
          <div className="text-slate-500">↓</div>
          <div>FastAPI Backend (REST API Service Layer)</div>
          <div className="text-slate-500">↓</div>
          <div>RAG Pipeline (Botanical NER & Query Expansion)</div>
          <div className="text-slate-500">↓</div>
          <div>Vector Database (FAISS / ChromaDB Embeddings)</div>
          <div className="text-slate-500">↓</div>
          <div>Patent / Research Knowledge Base (10,000+ Records + Classical Samhitas)</div>
          <div className="text-slate-500">↓</div>
          <div>LLM (Domain-Adapted Generative Synthesis)</div>
          <div className="text-slate-500">↓</div>
          <div className="text-emerald-400 font-bold">AI-Assisted Structured Response & Patent Draft</div>
        </div>
      </section>

      {/* 3. Technology Stack Cards */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-gov-900 uppercase tracking-wide border-b border-slate-200 pb-2">
          Technology Stack
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {techStack.map((tech, idx) => (
            <div
              key={idx}
              className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs hover:shadow-xs transition-shadow"
            >
              <div className="text-[10px] uppercase font-bold text-ayur-700 tracking-wider mb-1">
                {tech.role}
              </div>
              <h3 className="font-bold text-gov-900 text-sm mb-1">{tech.title}</h3>
              <p className="text-slate-600 text-xs leading-relaxed">{tech.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Prototype Disclaimer */}
      <section className="bg-slate-100 p-6 rounded-xl border border-slate-300 text-xs text-slate-700 space-y-2">
        <div className="font-bold text-slate-900 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-gov-800" />
          <span>Academic Disclaimer & Declaration</span>
        </div>
        <p className="leading-relaxed">
          This software is developed strictly for academic demonstration, algorithmic evaluation, and
          M.Tech Data Science project assessment. All patent documents prefixed with <code>DEMO-AYU-2026-XXX</code>
          and application serials <code>PROT-2026-XXXXXX</code> are fictional simulated data records.
          No actual statutory filings are initiated by this prototype.
        </p>
      </section>
    </div>
  );
}
