import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  GitCompare,
  Sparkles,
  Calendar,
  Building,
  Tag,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Layers,
  FlaskConical,
  Award,
  BookOpen,
  Share2,
  Printer
} from 'lucide-react';
import { getPatentDetails } from '../services/api';
import { useApp } from '../context/AppContext';
import StatusBadge from '../components/common/StatusBadge';
import SimilarityGauge from '../components/common/SimilarityGauge';

export default function PatentDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setSelectedPatentId, setInvention } = useApp();

  const [patent, setPatent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await getPatentDetails(id || "DEMO-AYU-2026-001");
        setPatent(res.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  const handleCompare = () => {
    if (patent) {
      setSelectedPatentId(patent.id);
      navigate('/analysis');
    }
  };

  const handleUseForRAG = () => {
    if (patent) {
      setSelectedPatentId(patent.id);
      navigate('/assistant');
    }
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-16 text-center">
        <div className="w-10 h-10 border-4 border-gov-800 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm font-bold text-gov-900">Loading Patent Record Specification...</p>
        <p className="text-xs text-slate-500 mt-1">Retrieving full claims and botanical component tables.</p>
      </div>
    );
  }

  if (error || !patent) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="bg-rose-50 border border-rose-200 rounded-xl p-8">
          <h2 className="text-lg font-bold text-rose-800">Record Not Found</h2>
          <p className="text-xs text-rose-700 mt-2">{error || "Could not retrieve the requested patent."}</p>
          <Link
            to="/search"
            className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 bg-gov-900 text-white rounded-lg text-xs font-bold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Search</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      {/* Top Breadcrumb & Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={() => navigate('/search')}
          className="flex items-center gap-1.5 text-xs font-bold text-gov-800 hover:text-gov-950 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Search</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 bg-white hover:bg-slate-50 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Dossier</span>
          </button>
          <button
            onClick={handleUseForRAG}
            className="px-3.5 py-1.5 rounded-lg bg-ayur-700 hover:bg-ayur-800 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Use for RAG Analysis</span>
          </button>
          <button
            onClick={handleCompare}
            className="px-4 py-1.5 rounded-lg bg-gov-900 hover:bg-gov-800 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <GitCompare className="w-3.5 h-3.5 text-amber-300" />
            <span>Compare With My Invention</span>
          </button>
        </div>
      </div>

      {/* Main Patent Record Dossier */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Header Ribbon */}
        <div className="bg-gov-900 text-white p-6 border-b-4 border-amber-400">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs mb-3">
            <div className="flex items-center gap-2">
              <span className="font-mono bg-white/10 px-2.5 py-1 rounded text-amber-300 font-bold border border-white/20">
                {patent.id}
              </span>
              <span className="text-slate-300">IPC: {patent.ipcClassification}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-300">{patent.category}</span>
              <StatusBadge status={patent.status} size="sm" />
            </div>
          </div>

          <h1 className="text-xl sm:text-2xl font-extrabold text-white leading-snug">
            {patent.title}
          </h1>

          <div className="mt-4 pt-3 border-t border-white/15 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-200">
            <div>
              <span className="text-slate-400 block text-[11px]">Applicant Entity:</span>
              <strong className="text-white">{patent.applicant}</strong>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Inventors:</span>
              <span className="text-slate-200">{patent.inventors?.join(', ') || 'Listed on File'}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Filing & Publication:</span>
              <span className="text-slate-200">{patent.filingDate} / {patent.publicationDate}</span>
            </div>
          </div>
        </div>

        {/* Visual Similarity Score Banner */}
        <div className="bg-slate-50 border-b border-slate-200 p-4">
          <div className="max-w-md">
            <SimilarityGauge percentage={patent.similarity} label="Semantic Prior-Art Similarity" />
            <p className="text-[11px] text-slate-500 mt-1">
              Calculated against default Ayurvedic metabolic reference vector index.
            </p>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-8 text-xs sm:text-sm text-slate-700">
          {/* Abstract */}
          <section className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-gov-900 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-gov-800" />
              <span>Abstract of the Disclosure</span>
            </h2>
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 leading-relaxed font-serif text-slate-800">
              {patent.abstract}
            </div>
          </section>

          {/* Key Concepts & Keywords */}
          <section className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-gov-900 flex items-center gap-1.5">
              <Tag className="w-4 h-4 text-gov-800" />
              <span>Key Concepts & Classification Index</span>
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {patent.keywords.map((kw, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded bg-ayur-50 text-ayur-800 border border-ayur-200 text-xs font-semibold"
                >
                  {kw}
                </span>
              ))}
            </div>
          </section>

          {/* Botanical Ingredients & Active Phytochemicals Table */}
          <section className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-gov-900 flex items-center gap-1.5">
              <FlaskConical className="w-4 h-4 text-gov-800" />
              <span>Ingredients / Botanical Components Matrix</span>
            </h2>
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200 uppercase text-[11px]">
                  <tr>
                    <th className="p-3">Botanical / Common Name</th>
                    <th className="p-3">Plant Part Used</th>
                    <th className="p-3">Proportion (% w/w)</th>
                    <th className="p-3">Standardized Active Phytochemical</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {patent.ingredients.map((ing, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="p-3 font-semibold text-gov-950 italic">{ing.name}</td>
                      <td className="p-3 text-slate-600">{ing.part}</td>
                      <td className="p-3 font-mono font-bold text-ayur-800">{ing.proportion}</td>
                      <td className="p-3 text-slate-700">{ing.activePhyto}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Method & Extraction Process */}
          <section className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-gov-900 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-gov-800" />
              <span>Method / Extraction & Manufacturing Process</span>
            </h2>
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 leading-relaxed text-slate-800">
              {patent.method}
            </div>
          </section>

          {/* Potentially Relevant Claims */}
          <section className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-gov-900 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-gov-800" />
              <span>Potentially Relevant Claims (Patent Boundaries)</span>
            </h2>
            <div className="space-y-2">
              {patent.claims.map((claim, cIdx) => (
                <div
                  key={cIdx}
                  className="p-3.5 rounded-lg bg-blue-50/50 border border-blue-100 text-slate-800 text-xs leading-relaxed font-mono"
                >
                  {claim}
                </div>
              ))}
            </div>
          </section>

          {/* Traditional Knowledge & Related Documents */}
          <section className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-gov-900 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-gov-800" />
              <span>TKDL Cross-References & Prior-Art Context</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 bg-amber-50/60 rounded-lg border border-amber-200 text-amber-950">
                <span className="font-bold block mb-1">Classical Treatise References:</span>
                <ul className="list-disc list-inside space-y-1">
                  {patent.tkdlCrossReferences?.map((tk, i) => (
                    <li key={i}>{tk}</li>
                  ))}
                </ul>
              </div>
              <div className="p-3.5 bg-slate-100 rounded-lg border border-slate-200 text-slate-800">
                <span className="font-bold block mb-1">Prior-Art Distinction Notes:</span>
                <p className="leading-relaxed">{patent.priorArtNotes}</p>
              </div>
            </div>
          </section>
        </div>

        {/* Footer Actions */}
        <div className="bg-slate-50 p-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs text-slate-500 italic">
            Demo dataset record • Shown for academic demonstration
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/search')}
              className="px-4 py-2 border border-slate-300 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors"
            >
              Back to Search
            </button>
            <button
              onClick={handleCompare}
              className="px-5 py-2 bg-gov-900 hover:bg-gov-800 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <GitCompare className="w-3.5 h-3.5 text-amber-300" />
              <span>Compare With My Invention</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
