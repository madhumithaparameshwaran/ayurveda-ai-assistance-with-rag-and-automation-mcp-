import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Search,
  FileText,
  Activity,
  ArrowRight,
  ShieldCheck,
  BookOpen,
  Bot,
  Database,
  CheckCircle2,
  FileCheck,
  Cpu
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function HomePage() {
  const navigate = useNavigate();
  const { loadSampleInvention } = useApp();

  const handleStartWithSample = () => {
    loadSampleInvention();
    navigate('/analysis');
  };

  const workflowSteps = [
    { number: "01", title: "Describe", desc: "Input Ayurvedic formulation details, herbs, and therapeutic objectives", icon: BookOpen },
    { number: "02", title: "Retrieve", desc: "Vector RAG pipeline searches 10,000+ classical and prior-art patent records", icon: Database },
    { number: "03", title: "Compare", desc: "Semantic similarity models detect commonalities and distinguish novel features", icon: Activity },
    { number: "04", title: "Analyze", desc: "Examine Section 3(p) compliance, synergy parameters, and patentability guidance", icon: Sparkles },
    { number: "05", title: "Prepare Application", desc: "Generate structured technical descriptions and provisional patent drafts", icon: FileText },
  ];

  return (
    <div className="space-y-12 pb-16">
      {/* 1. Official Government-Portal Inspired Hero Section */}
      <section className="relative bg-gradient-to-b from-gov-900 via-gov-850 to-gov-950 text-white py-14 px-4 overflow-hidden border-b-4 border-amber-400">
        {/* Subtle decorative background watermark */}
        <div className="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-center">
          <div className="w-[600px] h-[600px] rounded-full border-[30px] border-white flex items-center justify-center">
            <span className="text-[280px]">🌿</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 border border-amber-400/30 text-xs font-semibold backdrop-blur-xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>M.Tech Data Science Research Prototype • RAG Architecture</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Discover, Analyze and Prepare Your <span className="text-amber-400">Ayurvedic Innovation</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl font-light">
                An AI-assisted platform for exploring Ayurvedic innovations, identifying potentially
                relevant existing solutions, and preparing information for patent applications.
              </p>

              {/* Call-to-action buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  to="/assistant"
                  className="flex items-center gap-2 px-5 py-3 rounded-lg bg-ayur-600 hover:bg-ayur-700 text-white font-bold text-sm shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
                >
                  <Bot className="w-4 h-4 text-amber-300" />
                  <span>Start AI Assistant</span>
                </Link>

                <Link
                  to="/search"
                  className="flex items-center gap-2 px-5 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-sm backdrop-blur-xs transition-all"
                >
                  <Search className="w-4 h-4 text-amber-300" />
                  <span>Search Existing Solutions</span>
                </Link>

                <Link
                  to="/apply"
                  className="flex items-center gap-2 px-5 py-3 rounded-lg bg-amber-500 hover:bg-amber-600 text-gov-950 font-bold text-sm shadow-md transition-all"
                >
                  <FileText className="w-4 h-4 text-gov-950" />
                  <span>Prepare Patent Application</span>
                </Link>
              </div>

              {/* Notice */}
              <div className="text-xs text-slate-300 flex items-center gap-2 pt-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Prototype Demonstration Portal — Not an Official Government Website</span>
              </div>
            </div>

            {/* Right Interactive Quick Box */}
            <div className="lg:col-span-4 bg-white/95 text-slate-900 rounded-xl p-6 shadow-2xl border border-white/20">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <span className="text-xs font-bold uppercase tracking-wider text-gov-900">
                  Quick Research Portal
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-ayur-100 text-ayur-800">
                  LIVE DEMO
                </span>
              </div>

              <div className="mt-4 space-y-3">
                <p className="text-xs text-slate-600 leading-snug">
                  Experience the full workflow with our pre-loaded sample invention:
                  <strong className="text-slate-800 block mt-1">
                    “Polyherbal Glycemic Regulator (Gymnema & Momordica Micro-Pellets)”
                  </strong>
                </p>

                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-1.5">
                  <div className="flex justify-between text-slate-500">
                    <span>Domain:</span>
                    <span className="font-semibold text-slate-700">Metabolic / Diabetes</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Index Cross-Matches:</span>
                    <span className="font-semibold text-emerald-700">3 Similar Patents</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>TKDL Status:</span>
                    <span className="font-semibold text-gov-800">Cross-Referenced</span>
                  </div>
                </div>

                <button
                  onClick={handleStartWithSample}
                  className="w-full py-2.5 px-4 rounded-lg bg-gov-900 hover:bg-gov-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <Activity className="w-4 h-4 text-amber-300" />
                  <span>Run Sample Invention Analysis &rarr;</span>
                </button>

                <div className="text-[10px] text-center text-slate-400">
                  Simulates vector embedding extraction and similarity comparison
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Three Feature Cards */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-xs font-bold uppercase tracking-widest text-ayur-800 mb-1">
            CORE PLATFORM CAPABILITIES
          </h2>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-gov-900">
            Comprehensive Assistance for Ayurvedic Inventors
          </h3>
          <p className="text-sm text-slate-600 mt-2">
            Bridging classical Ayurvedic Pharmacopoeia with modern patent classification standards
            and RAG-assisted prior-art search.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-ayur-700 mb-4">
                <Sparkles className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-gov-900 mb-2">
                1. Ayurvedic Solution Analysis
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Extract botanical entities, active phytochemical markers, formulation vehicles, and
                process steps from your plain technical description. Identify potential Section 3(p) traditional
                knowledge overlaps before statutory drafting.
              </p>
              <ul className="space-y-1.5 text-xs text-slate-700 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-ayur-600 shrink-0" />
                  <span>Extracts botanical & phytochemical entities</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-ayur-600 shrink-0" />
                  <span>Identifies distinguishing synergistic features</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-ayur-600 shrink-0" />
                  <span>Provides cautious research guidance</span>
                </li>
              </ul>
            </div>
            <Link
              to="/analysis"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-ayur-700 hover:text-ayur-800 hover:underline pt-2 border-t border-slate-100"
            >
              <span>Explore Solution Analysis</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-gov-700 mb-4">
                <Search className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-gov-900 mb-2">
                2. Prior-Art & Patent Search
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Search through our catalog of simulated Ayurvedic and herbal medicine patent records.
                Filter by technological classification, filing status, or similarity percentage to locate
                prior publications.
              </p>
              <ul className="space-y-1.5 text-xs text-slate-700 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-gov-600 shrink-0" />
                  <span>Faceted search by therapeutic domain & IPC codes</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-gov-600 shrink-0" />
                  <span>Detailed claim analysis and botanical matrices</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-gov-600 shrink-0" />
                  <span>Side-by-side comparison with your invention</span>
                </li>
              </ul>
            </div>
            <Link
              to="/search"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-gov-800 hover:text-gov-900 hover:underline pt-2 border-t border-slate-100"
            >
              <span>Search Prior-Art Database</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-gold-700 mb-4">
                <FileText className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-gov-900 mb-2">
                3. Patent Application Assistance
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                A multi-step guided wizard that structures technical descriptions, abstracts, and claims.
                Use the one-click “Generate Using AI Assistant” tool to transform research notes into standard
                patent drafting formats.
              </p>
              <ul className="space-y-1.5 text-xs text-slate-700 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>5-step applicant & technical description wizard</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>AI assistant autofill integration</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>Simulation tracking with real-time status timeline</span>
                </li>
              </ul>
            </div>
            <Link
              to="/apply"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-gold-700 hover:text-gold-800 hover:underline pt-2 border-t border-slate-100"
            >
              <span>Launch Application Wizard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Workflow Section */}
      <section className="bg-slate-100 py-12 px-4 border-y border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-gov-800">
              END-TO-END METHODOLOGY
            </span>
            <h3 className="text-2xl font-extrabold text-gov-900 mt-1">
              From Formulation Concept to Patent Preparation
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              Describe → Retrieve → Compare → Analyze → Prepare Application
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {workflowSteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs flex flex-col justify-between relative group hover:border-gov-700 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl font-black text-slate-200 group-hover:text-amber-500 transition-colors">
                        {step.number}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-slate-100 text-gov-800 flex items-center justify-center">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>
                    <h4 className="text-sm font-bold text-gov-900 mb-1">{step.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Quick Architecture & Academic Highlights */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-gov-900 text-white rounded-2xl p-8 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8 border-2 border-amber-400/30">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-amber-400 text-gov-950 text-xs font-black uppercase">
              RAG Innovation
            </div>
            <h3 className="text-2xl font-extrabold text-white">
              Academic Project Architecture for Faculty Review
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
              This prototype validates how Retrieval-Augmented Generation (RAG) resolves the critical
              Section 3(p) traditional knowledge bottleneck in Indian Patent filings by systematically
              identifying classical texts and distinguishing novel synergistic mechanisms.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <Link
              to="/about"
              className="px-5 py-3 rounded-lg bg-white text-gov-950 font-bold text-xs hover:bg-slate-100 transition-colors shadow-sm"
            >
              View System Architecture
            </Link>
            <Link
              to="/status"
              className="px-5 py-3 rounded-lg bg-gov-800 hover:bg-gov-700 text-amber-300 border border-amber-400/40 font-bold text-xs transition-colors"
            >
              Track Sample Application
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
