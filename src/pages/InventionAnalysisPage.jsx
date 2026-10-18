import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Activity,
  Sparkles,
  Layers,
  FlaskConical,
  ShieldAlert,
  ArrowRight,
  Eye,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  FileText,
  FileCheck,
  Loader2,
  BookmarkPlus
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { analyzeInvention } from '../services/api';
import { DEMO_SAMPLE_INVENTION } from '../data/patents';
import SimilarityGauge from '../components/common/SimilarityGauge';

export default function InventionAnalysisPage() {
  const navigate = useNavigate();
  const {
    invention,
    setInvention,
    analysisResult,
    setAnalysisResult,
    setApplicationDraft
  } = useApp();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(invention || DEMO_SAMPLE_INVENTION);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setInvention((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoadSample = () => {
    setFormData(DEMO_SAMPLE_INVENTION);
    setInvention(DEMO_SAMPLE_INVENTION);
  };

  const handleReset = () => {
    const empty = {
      title: "",
      field: "",
      problem: "",
      solution: "",
      ingredients: "",
      method: "",
      uniqueFeatures: "",
      expectedBenefits: ""
    };
    setFormData(empty);
    setInvention(empty);
    setAnalysisResult(null);
  };

  const handleAnalyze = async (e) => {
    if (e) e.preventDefault();
    if (!formData.title.trim() && !formData.solution.trim()) return;

    setLoading(true);
    try {
      const result = await analyzeInvention(formData);
      setAnalysisResult(result);
    } catch (err) {
      console.error("Analysis failed", err);
    } finally {
      setLoading(false);
    }
  };

  const handleTransferToApplication = () => {
    // Populate application wizard state from analysis
    setApplicationDraft((prev) => ({
      ...prev,
      invention: {
        title: formData.title,
        field: formData.field,
        problemStatement: formData.problem,
        proposedSolution: formData.solution
      },
      technical: {
        abstract: `A novel Ayurvedic formulation comprising ${formData.ingredients || 'standardized botanical extracts'}. Evaluated for targeted therapeutic efficacy and novel delivery dynamics.`,
        detailedDescription: `INVENTION SPECIFICATION:\nTitle: ${formData.title}\nField: ${formData.field}\nMethod: ${formData.method}\nIngredients: ${formData.ingredients}`,
        uniqueFeatures: formData.uniqueFeatures,
        advantages: formData.expectedBenefits
      },
      currentStep: 2
    }));
    navigate('/apply');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold text-ayur-800 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-ayur-700" />
            <span>Semantic Prior-Art Evaluator</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gov-900">
            AI-Based Invention & Prior-Art Analysis
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Evaluate technical disclosures, extract phytocompounds, compute overlap with prior patents,
            and review Section 3(p) patentability guidance.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleLoadSample}
            className="px-3.5 py-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Load Sample Invention</span>
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="px-3 py-2 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-50 text-xs font-semibold transition-colors flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Invention Disclosure Input Form */}
        <div className="lg:col-span-5 bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-5">
          <div className="border-b border-slate-200 pb-3">
            <h2 className="text-sm font-bold text-gov-900 uppercase tracking-wide flex items-center gap-2">
              <FlaskConical className="w-4 h-4 text-ayur-700" />
              <span>Invention Technical Disclosure Form</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Enter your Ayurvedic medical solution details to run semantic vector matching.
            </p>
          </div>

          <form onSubmit={handleAnalyze} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Invention Title:</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g. Polyherbal Glycemic Regulator Formulation..."
                required
                className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-gov-800 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Field of Invention:</label>
              <input
                type="text"
                name="field"
                value={formData.field}
                onChange={handleInputChange}
                placeholder="e.g. Ayurvedic Phytopharmaceuticals & Metabolic Health"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-gov-800 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Problem Addressed:</label>
              <textarea
                rows={2}
                name="problem"
                value={formData.problem}
                onChange={handleInputChange}
                placeholder="Describe current limitations, bitter taste, gastric degradation, or low bioavailability..."
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-gov-800 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Proposed Solution:</label>
              <textarea
                rows={3}
                name="solution"
                value={formData.solution}
                onChange={handleInputChange}
                placeholder="Describe how your botanical combination solves the problem..."
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-gov-800 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Ingredients / Components:</label>
              <textarea
                rows={2}
                name="ingredients"
                value={formData.ingredients}
                onChange={handleInputChange}
                placeholder="List herbs, botanical parts (leaves, root), ratios, and bio-enhancers..."
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-gov-800 focus:outline-none font-mono text-[11px]"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Method / Process:</label>
              <textarea
                rows={2}
                name="method"
                value={formData.method}
                onChange={handleInputChange}
                placeholder="Extraction temperature, solvent, spheronization, coating method..."
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-gov-800 focus:outline-none text-[11px]"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Unique Features:</label>
              <textarea
                rows={2}
                name="uniqueFeatures"
                value={formData.uniqueFeatures}
                onChange={handleInputChange}
                placeholder="Key distinguishing features, synergistic combinations..."
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-gov-800 focus:outline-none text-[11px]"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Expected Benefits:</label>
              <input
                type="text"
                name="expectedBenefits"
                value={formData.expectedBenefits}
                onChange={handleInputChange}
                placeholder="e.g. 12-hour sustained release, zero bitter aftertaste..."
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-gov-800 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-lg bg-gov-900 hover:bg-gov-800 text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors shadow-sm disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-amber-300" />
                  <span>Computing Vector Similarities...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Analyze Invention</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Column: Analysis Dashboard */}
        <div className="lg:col-span-7 space-y-6">
          {/* Empty Prompt State when no analysis has run */}
          {!analysisResult && !loading && (
            <div className="bg-white p-10 rounded-xl border border-slate-200 shadow-xs text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-gov-800">
                <Activity className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-gov-950">Awaiting Invention Submission</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                Click <strong>“Load Sample Invention”</strong> and then <strong>“Analyze Invention”</strong> to
                execute the RAG-assisted concept extraction, prior-art overlap scoring, and Section 3(p)
                patentability guidance.
              </p>
              <button
                onClick={() => {
                  handleLoadSample();
                  handleAnalyze();
                }}
                className="px-5 py-2.5 bg-ayur-700 hover:bg-ayur-800 text-white rounded-lg text-xs font-bold transition-all shadow-xs"
              >
                Auto-Run Sample Analysis &rarr;
              </button>
            </div>
          )}

          {/* Loading Animation Card */}
          {loading && (
            <div className="bg-white p-12 rounded-xl border border-slate-200 shadow-xs text-center space-y-4">
              <div className="w-12 h-12 border-4 border-gov-800 border-t-transparent rounded-full animate-spin mx-auto" />
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-gov-900">Executing RAG Analysis Pipeline...</h3>
                <p className="text-xs text-slate-500">
                  Step 1: Extracting botanical Named Entities (NER)...<br />
                  Step 2: Calculating dense cosine distances against patent corpus...<br />
                  Step 3: Checking Section 3(p) traditional knowledge overlap...
                </p>
              </div>
            </div>
          )}

          {/* Render Full Dashboard when analysisResult is present */}
          {analysisResult && !loading && (
            <div className="space-y-6">
              {/* Cautionary Notice Bar */}
              <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg text-xs text-amber-900 shadow-xs">
                <div className="flex items-center gap-2 font-bold mb-1">
                  <ShieldAlert className="w-4 h-4 text-amber-600" />
                  <span>PRELIMINARY AI-ASSISTED PRIOR-ART ASSESSMENT</span>
                </div>
                <p className="leading-relaxed">
                  {analysisResult.cautiousNotice}
                </p>
              </div>

              {/* 1. Extracted Concepts */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h3 className="text-xs font-bold text-gov-900 uppercase tracking-wide flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>Extracted Concepts</span>
                  </h3>
                  <span className="text-[11px] text-slate-400">NLP Entity Tagging</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {analysisResult.extractedConcepts.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-3 py-1 rounded-full bg-slate-100 text-gov-900 border border-slate-200 text-xs font-semibold flex items-center gap-1"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-ayur-600" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* 2. Potentially Relevant Existing Solutions */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h3 className="text-xs font-bold text-gov-900 uppercase tracking-wide flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-gov-800" />
                    <span>Potentially Relevant Existing Solutions</span>
                  </h3>
                  <span className="text-[11px] text-slate-400">Top 3 Dense Vector Matches</span>
                </div>

                <div className="space-y-3">
                  {analysisResult.relevantDocuments.map((doc, idx) => (
                    <div
                      key={doc.id}
                      className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors space-y-2"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-gov-900 bg-white px-2 py-0.5 rounded border border-slate-200">
                            {doc.id}
                          </span>
                          <span className="text-xs font-bold text-slate-800">{doc.category}</span>
                        </div>
                        <button
                          onClick={() => navigate(`/patent/${doc.id}`)}
                          className="text-xs font-bold text-gov-800 hover:text-gov-950 flex items-center gap-1 self-start sm:self-auto"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View Full Record</span>
                        </button>
                      </div>

                      <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{doc.title}</h4>

                      {/* Similarity Indicator */}
                      <SimilarityGauge percentage={doc.calculatedSimilarity || doc.similarity} label="Prior-Art Overlap" />
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. Similarities & Differences Side-by-Side Matrix */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Similarities Card */}
                <div className="bg-white p-5 rounded-xl border border-amber-200 shadow-xs space-y-3">
                  <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wide flex items-center gap-1.5 pb-2 border-b border-amber-100">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>Similarities Identified</span>
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-700">
                    {analysisResult.similarities.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-amber-500 font-bold mt-0.5">•</span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Distinguishing Features Card */}
                <div className="bg-white p-5 rounded-xl border border-emerald-200 shadow-xs space-y-3">
                  <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wide flex items-center gap-1.5 pb-2 border-b border-emerald-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Differences / Distinguishing Features</span>
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-700">
                    {analysisResult.distinguishingFeatures.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-emerald-500 font-bold mt-0.5">•</span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* 4. AI Research Guidance */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
                <h4 className="text-xs font-bold text-gov-900 uppercase tracking-wide flex items-center gap-1.5 pb-2 border-b border-slate-100">
                  <ShieldAlert className="w-4 h-4 text-gov-800" />
                  <span>AI Research Guidance (Section 3(p) Compliance)</span>
                </h4>
                <div className="space-y-2 text-xs text-slate-700 leading-relaxed">
                  {analysisResult.aiGuidance.map((guidance, gIdx) => (
                    <p key={gIdx} className="p-2.5 bg-slate-50 rounded border border-slate-100">
                      {guidance}
                    </p>
                  ))}
                </div>
              </div>

              {/* 5. Transfer to Patent Application CTA */}
              <div className="bg-gov-900 text-white p-6 rounded-xl shadow-md flex flex-col sm:flex-row items-center justify-between gap-4 border border-amber-400/30">
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <BookmarkPlus className="w-4 h-4 text-amber-300" />
                    <span>Ready to Draft Specification?</span>
                  </h4>
                  <p className="text-xs text-slate-300 mt-1">
                    Transfer these extracted parameters directly into the 5-Step Patent Application Wizard.
                  </p>
                </div>
                <button
                  onClick={handleTransferToApplication}
                  className="px-5 py-2.5 bg-ayur-600 hover:bg-ayur-700 text-white rounded-lg text-xs font-bold flex items-center gap-2 shrink-0 transition-colors shadow-xs"
                >
                  <span>Transfer to Application Wizard</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
