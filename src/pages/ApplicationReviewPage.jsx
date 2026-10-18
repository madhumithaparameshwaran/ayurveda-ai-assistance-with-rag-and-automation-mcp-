import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileCheck,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  Send,
  Building,
  User,
  FileText,
  ShieldCheck,
  Layers,
  Sparkles,
  Loader2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { createApplication } from '../services/api';
import StatusBadge from '../components/common/StatusBadge';

export default function ApplicationReviewPage() {
  const navigate = useNavigate();
  const { applicationDraft, setLastSubmittedId } = useApp();
  const [submitting, setSubmitting] = useState(false);

  const applicant = applicationDraft?.applicant || {
    name: "Dr. A. K. Shastri",
    email: "ak.shastri@ayur-res.edu",
    organization: "National Institute of Ayurvedic Research",
    address: "Sector 14, Institutional Area, New Delhi, India",
    applicantType: "Academic / Research Institution"
  };

  const invention = applicationDraft?.invention || {
    title: "Polyherbal Glycemic Regulator Formulation Comprising Micro-Pellets",
    field: "Ayurvedic Phytopharmaceuticals & Metabolic Health",
    problemStatement: "Gastric degradation and bitter taste in traditional preparations.",
    proposedSolution: "Enteric-coated sustained release micro-pellets."
  };

  const technical = applicationDraft?.technical || {
    abstract: "A novel synergistic botanical composition designed for targeted metabolic homeostasis...",
    detailedDescription: "Extrusion-spheronization and fluid-bed enteric coating protocol...",
    uniqueFeatures: "1. Synergistic Cinnamomum verum\n2. Enteric core-shell coating",
    advantages: "12-hour sustained glycemic regulation."
  };

  const documents = applicationDraft?.documents || [
    { name: "Abstract.pdf", size: "1.2 MB", status: "Verified" },
    { name: "Technical_Description.pdf", size: "3.5 MB", status: "Verified" },
    { name: "Supporting_Document.pdf", size: "2.1 MB", status: "Verified" }
  ];

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const res = await createApplication({
        applicant,
        invention,
        technical,
        documents
      });
      setLastSubmittedId(res.data.applicationId);
      navigate('/submitted');
    } catch (err) {
      console.error(err);
      alert("Submission error in prototype simulator.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Top Breadcrumb & Warning */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/apply')}
          className="flex items-center gap-1.5 text-xs font-bold text-gov-800 hover:text-gov-950 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Edit Application In Wizard</span>
        </button>
        <span className="text-xs text-slate-500">Form 1 & 2 Simulated Dossier</span>
      </div>

      {/* Main Review Card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Header Ribbon */}
        <div className="bg-gov-900 text-white p-6 border-b-4 border-amber-400">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs mb-2">
            <div className="flex items-center gap-2">
              <span className="font-mono bg-white/10 px-2.5 py-0.5 rounded text-amber-300 font-bold border border-white/20">
                PROT-2026-DRAFT
              </span>
              <span className="text-slate-300">Formulation Patent Specification</span>
            </div>
            <StatusBadge status="Draft" size="sm" />
          </div>

          <h1 className="text-xl sm:text-2xl font-extrabold text-white leading-snug">
            {invention.title || "Example Ayurvedic Formulation Specification"}
          </h1>

          <div className="mt-3 text-xs text-slate-300 flex items-center gap-2">
            <User className="w-4 h-4 text-amber-400" />
            <span>Applicant: <strong className="text-white">{applicant.name}</strong></span>
            <span>•</span>
            <span>{applicant.organization}</span>
          </div>
        </div>

        {/* Prototype Legal Disclaimer Notice */}
        <div className="bg-amber-50 p-4 border-b border-amber-200 flex items-start gap-2.5 text-xs text-amber-900">
          <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <strong>Academic Review Screen:</strong> Verify all sections below. Once submitted, a simulated
            prototype application tracking number will be generated and logged to the status tracking system.
          </div>
        </div>

        {/* Review Sections with Checkmarks */}
        <div className="p-6 space-y-6 text-xs sm:text-sm">
          {/* Section 1: Applicant Information */}
          <div className="border border-slate-200 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div className="flex items-center gap-2 font-bold text-gov-900">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>1. Applicant Information</span>
              </div>
              <span className="text-emerald-700 text-xs font-semibold">✓ Completed</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
              <div><strong>Name:</strong> {applicant.name}</div>
              <div><strong>Email:</strong> {applicant.email}</div>
              <div><strong>Organization:</strong> {applicant.organization}</div>
              <div><strong>Type:</strong> {applicant.applicantType}</div>
              <div className="sm:col-span-2"><strong>Address:</strong> {applicant.address}</div>
            </div>
          </div>

          {/* Section 2: Invention Information */}
          <div className="border border-slate-200 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div className="flex items-center gap-2 font-bold text-gov-900">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>2. Invention Information</span>
              </div>
              <span className="text-emerald-700 text-xs font-semibold">✓ Completed</span>
            </div>
            <div className="space-y-2 text-xs text-slate-700">
              <div><strong>Title:</strong> {invention.title}</div>
              <div><strong>Field:</strong> {invention.field}</div>
              <div><strong>Problem Addressed:</strong> {invention.problemStatement}</div>
              <div><strong>Proposed Solution:</strong> {invention.proposedSolution}</div>
            </div>
          </div>

          {/* Section 3: Technical Description */}
          <div className="border border-slate-200 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div className="flex items-center gap-2 font-bold text-gov-900">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>3. Technical Description & Claims</span>
              </div>
              <span className="text-emerald-700 text-xs font-semibold">✓ Completed</span>
            </div>
            <div className="space-y-2 text-xs text-slate-700">
              <div>
                <strong>Abstract:</strong>
                <p className="mt-1 font-serif text-slate-800 bg-slate-50 p-2.5 rounded border border-slate-100">
                  {technical.abstract || "Comprehensive standardized botanical formulation extract abstract."}
                </p>
              </div>
              <div>
                <strong>Novel/Distinctive Features:</strong>
                <p className="mt-1 whitespace-pre-wrap">{technical.uniqueFeatures || "Synergistic botanical ratios with duodenal delivery."}</p>
              </div>
            </div>
          </div>

          {/* Section 4: Prior-Art Search Verification */}
          <div className="border border-slate-200 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div className="flex items-center gap-2 font-bold text-gov-900">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>4. Prior-Art & TKDL Search Verification</span>
              </div>
              <span className="text-emerald-700 text-xs font-semibold">✓ Verified</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Prior-art retrieval conducted against 10,000+ indexed records. Section 3(p) cross-referencing
              completed for classical Ayurvedic treatises.
            </p>
          </div>

          {/* Section 5: Supporting Documents */}
          <div className="border border-slate-200 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div className="flex items-center gap-2 font-bold text-gov-900">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>5. Supporting Documents</span>
              </div>
              <span className="text-emerald-700 text-xs font-semibold">✓ Verified ({documents.length})</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {documents.map((doc, i) => (
                <div key={i} className="p-2 bg-slate-50 border border-slate-200 rounded text-xs">
                  <div className="font-semibold text-slate-800 truncate">{doc.name}</div>
                  <div className="text-[10px] text-emerald-700 font-bold">✓ {doc.status}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Submission Action Bar */}
        <div className="bg-slate-50 p-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={() => navigate('/apply')}
            className="px-4 py-2 border border-slate-300 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors"
          >
            &larr; Back to Edit Form
          </button>

          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="px-6 py-3 bg-gov-900 hover:bg-gov-800 text-white rounded-lg text-xs sm:text-sm font-bold flex items-center gap-2 shadow-md transition-all border border-amber-400/30 disabled:opacity-50"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-amber-300" />
                <span>Submitting to Prototype Registry...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4 text-amber-300" />
                <span>Submit Prototype Application</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
