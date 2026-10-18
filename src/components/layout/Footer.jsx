import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, BookOpen, Cpu, Database, Award, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 text-xs border-t-4 border-gov-800 mt-16">
      {/* Disclaimer Strip */}
      <div className="bg-amber-950/80 border-b border-amber-800/40 text-amber-200 px-4 py-3">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
          <div className="flex items-center gap-2.5">
            <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0" />
            <p className="text-xs font-semibold leading-relaxed">
              <strong className="text-amber-300 uppercase tracking-wide">Academic Prototype Notice:</strong>{" "}
              This portal is an educational prototype built for an M.Tech Data Science project. It is{" "}
              <span className="underline font-bold text-white">NOT an official government patent filing system</span>{" "}
              and does not confer any legal patent rights, trademark protections, or clinical authorizations.
            </p>
          </div>
          <div className="shrink-0">
            <span className="inline-block bg-amber-400/20 text-amber-300 border border-amber-400/30 px-2.5 py-1 rounded font-bold text-[11px]">
              Prototype Version 2.4-DEMO
            </span>
          </div>
        </div>
      </div>

      {/* Main Footer Directory */}
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Col 1: System Identification */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-ayur-700 flex items-center justify-center text-white text-base">
              🌿
            </div>
            <div>
              <div className="font-extrabold text-white text-sm">IP-AYUR ASSISTANCE</div>
              <div className="text-[10px] text-slate-400">RAG Academic Framework</div>
            </div>
          </div>
          <p className="text-slate-400 leading-relaxed text-xs">
            A specialized academic prototype integrating Large Language Models and dense vector retrieval
            to assist Ayurvedic researchers in preliminary prior-art evaluation and provisional patent drafting.
          </p>
          <div className="text-[11px] text-slate-500 pt-1">
            Department of Computer Science & Data Engineering<br />
            M.Tech Data Science Capstone Project
          </div>
        </div>

        {/* Col 2: System Modules */}
        <div>
          <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-3 pb-1 border-b border-slate-800">
            System Modules
          </h4>
          <ul className="space-y-2">
            <li>
              <Link to="/assistant" className="hover:text-amber-300 transition-colors flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-ayur-400" />
                <span>AI RAG Formulation Assistant</span>
              </Link>
            </li>
            <li>
              <Link to="/search" className="hover:text-amber-300 transition-colors flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-blue-400" />
                <span>Prior-Art Patent Database</span>
              </Link>
            </li>
            <li>
              <Link to="/analysis" className="hover:text-amber-300 transition-colors flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>Novelty & Concept Analyzer</span>
              </Link>
            </li>
            <li>
              <Link to="/apply" className="hover:text-amber-300 transition-colors flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                <span>Provisional Application Wizard</span>
              </Link>
            </li>
            <li>
              <Link to="/status" className="hover:text-amber-300 transition-colors flex items-center gap-1.5">
                <ArrowUpRight className="w-3.5 h-3.5 text-purple-400" />
                <span>Application Status Tracker</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3: Legal & Regulatory Framework */}
        <div>
          <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-3 pb-1 border-b border-slate-800">
            Ayurvedic IP Guidelines
          </h4>
          <p className="text-slate-400 text-xs leading-relaxed mb-3">
            In accordance with <strong>Section 3(p)</strong> of the Indian Patents Act, traditional knowledge
            or an aggregation of known properties is not patentable unless demonstrating unexpected synergism.
          </p>
          <div className="bg-slate-800/80 p-2.5 rounded border border-slate-700 text-[11px] text-slate-300">
            <span className="text-amber-400 font-semibold block mb-0.5">TKDL Alignment:</span>
            Cross-referenced with classical treatises: Caraka Samhita, Sushruta Samhita, and Astanga Hrdaya.
          </div>
        </div>

        {/* Col 4: Technical Stack & Architecture */}
        <div>
          <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-3 pb-1 border-b border-slate-800">
            Technical Stack
          </h4>
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <span className="bg-slate-800 px-2 py-1 rounded text-slate-300">React.js + Vite</span>
            <span className="bg-slate-800 px-2 py-1 rounded text-slate-300">Tailwind CSS</span>
            <span className="bg-slate-800 px-2 py-1 rounded text-slate-300">FastAPI (Ready)</span>
            <span className="bg-slate-800 px-2 py-1 rounded text-slate-300">FAISS / ChromaDB</span>
            <span className="bg-slate-800 px-2 py-1 rounded text-slate-300">RAG Framework</span>
            <span className="bg-slate-800 px-2 py-1 rounded text-slate-300">Llama-3 / Gemini</span>
          </div>
          <div className="mt-4">
            <Link
              to="/about"
              className="inline-flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 font-semibold underline"
            >
              View System Architecture & Methodology &rarr;
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="bg-slate-950 py-4 px-4 border-t border-slate-800 text-center text-slate-500 text-[11px]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            © {new Date().getFullYear()} AI-Based Ayurvedic Medical Solution and Patent Assistance System.
            Academic Prototype.
          </div>
          <div className="flex items-center gap-4">
            <span>Designed for M.Tech Evaluation</span>
            <span>•</span>
            <span className="text-slate-400">All demonstration records are fictional.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
