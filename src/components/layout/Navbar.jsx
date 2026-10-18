import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import {
  Home,
  Bot,
  Search,
  FileText,
  FileCheck,
  Activity,
  Info,
  ShieldAlert,
  Sparkles,
  Globe,
  Bell,
  Menu,
  X,
  Volume2
} from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [fontSize, setFontSize] = useState('normal');
  const [lang, setLang] = useState('EN');
  const navigate = useNavigate();

  const toggleFontSize = () => {
    if (fontSize === 'normal') setFontSize('large');
    else if (fontSize === 'large') setFontSize('extra');
    else setFontSize('normal');
  };

  const navLinks = [
    { name: "Home", path: "/", icon: Home },
    { name: "AI Assistant", path: "/assistant", icon: Bot, badge: "RAG" },
    { name: "Patent Search", path: "/search", icon: Search },
    { name: "Invention Analysis", path: "/analysis", icon: Activity, badge: "Core" },
    { name: "Apply", path: "/apply", icon: FileText },
    { name: "Application Status", path: "/status", icon: FileCheck },
    { name: "About", path: "/about", icon: Info },
  ];

  return (
    <header className="w-full bg-white shadow-sm border-b border-slate-200 sticky top-0 z-50">
      {/* 1. Top Government/Academic Utility Strip */}
      <div className="bg-slate-900 text-slate-200 text-xs px-4 py-1.5 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Official Prototype Warning Banner */}
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30 text-[11px]">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
              Prototype Demonstration Portal — Not an Official Government Website
            </span>
            <span className="hidden md:inline text-slate-400 text-[11px]">
              M.Tech Data Science Academic Project
            </span>
          </div>

          {/* Accessibility & Utility Tools */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLang(lang === 'EN' ? 'HI' : 'EN')}
              className="flex items-center gap-1 hover:text-white transition-colors"
              title="Toggle Language"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{lang === 'EN' ? 'हिन्दी' : 'English'}</span>
            </button>
            <div className="h-3 w-px bg-slate-700" />
            <button
              onClick={toggleFontSize}
              className="flex items-center gap-1 hover:text-white transition-colors font-mono"
              title="Adjust Font Size"
            >
              <span>A-</span>
              <span className="font-bold underline">A</span>
              <span>A+</span>
            </button>
            <div className="h-3 w-px bg-slate-700" />
            <button
              onClick={() => alert("Screen Reader access enabled in academic simulator.")}
              className="flex items-center gap-1 hover:text-white transition-colors"
              title="Screen Reader Support"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Screen Reader</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Portal Branding Header */}
      <div className="bg-white py-3.5 px-4 border-b border-slate-100">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Emblem & Titles */}
          <Link to="/" className="flex items-center gap-3.5 group">
            {/* Custom Academic / Ayurvedic Emblem Logo */}
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-tr from-gov-900 via-gov-800 to-ayur-800 p-0.5 shadow-md flex items-center justify-center shrink-0">
              <div className="w-full h-full rounded-full bg-white flex flex-col items-center justify-center border-2 border-amber-400/40">
                <span className="text-xl md:text-2xl leading-none">🌿</span>
                <span className="text-[7px] font-bold text-gov-900 tracking-tighter uppercase">IP-AYUR</span>
              </div>
            </div>

            <div>
              <div className="text-[11px] md:text-xs font-semibold text-slate-500 uppercase tracking-wider">
                बौद्धिक संपदा एवं नवाचार अनुसंधान सहायता पोर्टल
              </div>
              <h1 className="text-base md:text-xl font-extrabold text-gov-900 leading-tight tracking-tight group-hover:text-gov-700 transition-colors">
                INTELLECTUAL PROPERTY & INNOVATION ASSISTANCE PORTAL
              </h1>
              <p className="text-xs md:text-sm font-medium text-ayur-800 flex items-center gap-1.5">
                <span>AI-Assisted Ayurvedic Innovation and Patent Research</span>
                <span className="hidden lg:inline text-slate-400">•</span>
                <span className="hidden lg:inline text-slate-600 text-xs">Academic RAG Architecture</span>
              </p>
            </div>
          </Link>

          {/* Quick Academic Meta Pill */}
          <div className="hidden xl:flex items-center gap-3 bg-slate-50 p-2 rounded-lg border border-slate-200">
            <div className="text-right">
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">RAG Vector Store</div>
              <div className="text-xs font-bold text-emerald-700 flex items-center justify-end gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                Indexed & Ready
              </div>
            </div>
            <div className="h-7 w-px bg-slate-200" />
            <div className="text-right">
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Patent Corpus</div>
              <div className="text-xs font-bold text-gov-800">10,240+ Records</div>
            </div>
          </div>

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* 3. Primary Government Navy Navigation Bar */}
      <nav className="bg-gov-900 text-white shadow-inner">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === "/"}
                  className={({ isActive }) =>
                    `flex items-center gap-1.5 px-3.5 py-2.5 text-xs lg:text-sm font-semibold transition-colors border-b-2 ${
                      isActive
                        ? 'border-amber-400 text-amber-300 bg-gov-800/80 shadow-xs'
                        : 'border-transparent text-slate-200 hover:text-white hover:bg-gov-800/50'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-ayur-600 text-white uppercase ml-0.5">
                      {link.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </div>

          {/* Right Action: Quick Patent Track Form */}
          <div className="hidden lg:flex items-center gap-2 py-1">
            <button
              onClick={() => navigate('/analysis')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-ayur-700 hover:bg-ayur-800 text-white text-xs font-bold transition-all shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Analyze Formulation</span>
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-gov-950 border-t border-gov-800 px-4 py-3 space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === "/"}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3 py-2 rounded text-sm font-semibold ${
                      isActive ? 'bg-gov-800 text-amber-300' : 'text-slate-300 hover:bg-gov-900'
                    }`
                  }
                >
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    <span>{link.name}</span>
                  </div>
                  {link.badge && (
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-ayur-600 text-white">
                      {link.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </div>
        )}
      </nav>

      {/* 4. Live Updates / News Ticker Bar (matches IP India style) */}
      <div className="bg-amber-50 border-b border-amber-200 px-4 py-1 flex items-center overflow-hidden text-xs">
        <div className="flex items-center gap-1.5 bg-gov-900 text-amber-300 font-bold px-2.5 py-0.5 rounded text-[11px] shrink-0 mr-3 shadow-xs">
          <Bell className="w-3 h-3 text-amber-400 animate-bounce" />
          <span>LATEST UPDATES:</span>
        </div>
        <div className="whitespace-nowrap overflow-hidden w-full relative">
          <div className="animate-marquee font-medium text-slate-700">
            • RAG Knowledge Base updated with 10,000+ classical Ayurvedic formulations and patent documents &nbsp;&nbsp;&nbsp;&nbsp;
            • Integrated TKDL reference indexing active for Section 3(p) prior art checks &nbsp;&nbsp;&nbsp;&nbsp;
            • Prototype submission portal open for M.Tech Data Science project demonstration &nbsp;&nbsp;&nbsp;&nbsp;
            • Note: AI-generated patent recommendations are for academic simulation only.
          </div>
        </div>
      </div>
    </header>
  );
}
