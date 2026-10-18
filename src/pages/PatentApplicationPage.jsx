import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText,
  User,
  Lightbulb,
  FileCode,
  UploadCloud,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Save,
  ShieldAlert,
  Download,
  Trash2,
  Loader2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { generateApplication } from '../services/api';
import StepIndicator from '../components/common/StepIndicator';

export default function PatentApplicationPage() {
  const navigate = useNavigate();
  const { applicationDraft, setApplicationDraft, invention } = useApp();

  const [currentStep, setCurrentStep] = useState(applicationDraft?.currentStep || 1);
  const [formData, setFormData] = useState(applicationDraft || {
    applicant: {
      name: "Dr. A. K. Shastri",
      email: "ak.shastri@ayur-res.edu",
      organization: "National Institute of Ayurvedic Research",
      address: "Sector 14, Institutional Area, New Delhi, 110025, India",
      applicantType: "Academic / Research Institution"
    },
    invention: {
      title: invention?.title || "Polyherbal Glycemic Regulator Formulation Comprising Micro-Pellets",
      field: invention?.field || "Ayurvedic Phytopharmaceuticals & Metabolic Health",
      problemStatement: invention?.problem || "Gastric degradation and bitter taste in traditional glycemic preparations.",
      proposedSolution: invention?.solution || "Enteric-coated sustained release micro-pellets for duodenal dissolution."
    },
    technical: {
      abstract: "",
      detailedDescription: "",
      uniqueFeatures: invention?.uniqueFeatures || "",
      advantages: invention?.expectedBenefits || ""
    },
    documents: [
      { name: "Abstract_Specification.pdf", size: "1.2 MB", status: "Verified" },
      { name: "Technical_Description.pdf", size: "3.5 MB", status: "Verified" },
      { name: "Supporting_HPLC_Profiles.pdf", size: "2.1 MB", status: "Verified" }
    ]
  });

  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiGeneratedDraft, setAiGeneratedDraft] = useState(null);
  const [saveToast, setSaveToast] = useState(false);

  const steps = [
    { id: 1, label: "Applicant Details" },
    { id: 2, label: "Invention Details" },
    { id: 3, label: "Technical Specs" },
    { id: 4, label: "Documents" },
    { id: 5, label: "Review & Sign" }
  ];

  const handleApplicantChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      applicant: { ...prev.applicant, [name]: value }
    }));
  };

  const handleInventionChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      invention: { ...prev.invention, [name]: value }
    }));
  };

  const handleTechnicalChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      technical: { ...prev.technical, [name]: value }
    }));
  };

  const handleSaveDraft = () => {
    setApplicationDraft(formData);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3000);
  };

  // Section 7: AI-Assisted Application Filling
  const handleGenerateWithAI = async () => {
    setAiGenerating(true);
    try {
      const res = await generateApplication(formData.invention);
      setAiGeneratedDraft(res.draft);
    } catch (err) {
      console.error(err);
    } finally {
      setAiGenerating(false);
    }
  };

  const handleAcceptAIDraft = () => {
    if (!aiGeneratedDraft) return;

    setFormData((prev) => ({
      ...prev,
      invention: {
        ...prev.invention,
        title: aiGeneratedDraft.suggestedTitle,
        field: aiGeneratedDraft.fieldOfInvention,
        problemStatement: aiGeneratedDraft.problemStatement,
        proposedSolution: aiGeneratedDraft.proposedSolution
      },
      technical: {
        ...prev.technical,
        abstract: aiGeneratedDraft.abstract,
        detailedDescription: aiGeneratedDraft.technicalDescription,
        uniqueFeatures: aiGeneratedDraft.keyFeatures.join('\n• ')
      }
    }));

    setAiGeneratedDraft(null);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3000);
  };

  const nextStep = () => {
    const next = currentStep + 1;
    if (next <= 5) {
      setCurrentStep(next);
      setApplicationDraft({ ...formData, currentStep: next });
    } else {
      setApplicationDraft(formData);
      navigate('/review');
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      {/* Toast Alert */}
      {saveToast && (
        <div className="fixed top-20 right-5 z-50 bg-gov-900 text-white px-4 py-2.5 rounded-lg shadow-xl text-xs font-bold flex items-center gap-2 border border-amber-400">
          <CheckCircle2 className="w-4 h-4 text-amber-300" />
          <span>Draft specification saved to local session.</span>
        </div>
      )}

      {/* Header Bar */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold text-ayur-800 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-ayur-700" />
            <span>Formulation Patent Registration Wizard</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gov-900">
            Provisional Patent Application Wizard
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Complete the 5-step provisional patent disclosure format compliant with statutory guidelines.
          </p>
        </div>

        {/* AI Auto-fill trigger button (Section 7) */}
        <button
          onClick={handleGenerateWithAI}
          disabled={aiGenerating}
          className="px-4 py-2.5 bg-gradient-to-r from-gov-900 to-ayur-800 hover:from-gov-800 hover:to-ayur-700 text-white text-xs font-bold rounded-lg shadow-sm flex items-center gap-2 transition-all border border-amber-400/40"
        >
          {aiGenerating ? (
            <Loader2 className="w-4 h-4 animate-spin text-amber-300" />
          ) : (
            <Sparkles className="w-4 h-4 text-amber-300" />
          )}
          <span>Generate Using AI Assistant</span>
        </button>
      </div>

      {/* Step Indicator */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <StepIndicator
          steps={steps}
          currentStep={currentStep}
          onStepClick={(stepNum) => setCurrentStep(stepNum)}
        />
      </div>

      {/* AI Generated Draft Modal / Banner (Section 7 requirement) */}
      {aiGeneratedDraft && (
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-400 p-6 rounded-xl shadow-md space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-600" />
              <h3 className="text-sm font-extrabold text-amber-950 uppercase tracking-wide">
                AI-Generated Specification Draft
              </h3>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-200 text-amber-900 text-xs font-bold">
              AI-generated draft — requires human review.
            </span>
          </div>

          <p className="text-xs text-amber-900 leading-relaxed">
            The AI RAG Assistant synthesized the following patent draft based on your Ayurvedic formulation data:
          </p>

          <div className="bg-white p-4 rounded-lg border border-amber-200 space-y-3 text-xs">
            <div>
              <strong className="text-slate-500 uppercase text-[10px] block">Suggested Title:</strong>
              <div className="font-bold text-gov-900">{aiGeneratedDraft.suggestedTitle}</div>
            </div>
            <div>
              <strong className="text-slate-500 uppercase text-[10px] block">Abstract:</strong>
              <p className="text-slate-700 font-serif italic">{aiGeneratedDraft.abstract}</p>
            </div>
            <div>
              <strong className="text-slate-500 uppercase text-[10px] block">Problem & Solution:</strong>
              <p className="text-slate-700">{aiGeneratedDraft.proposedSolution}</p>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setAiGeneratedDraft(null)}
              className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
            >
              Dismiss
            </button>
            <button
              type="button"
              onClick={handleAcceptAIDraft}
              className="px-5 py-2 bg-ayur-700 hover:bg-ayur-800 text-white text-xs font-bold rounded-lg shadow-xs flex items-center gap-1.5 transition-colors"
            >
              <CheckCircle2 className="w-4 h-4 text-amber-300" />
              <span>Accept & Insert Into Application</span>
            </button>
          </div>
        </div>
      )}

      {/* Step Contents */}
      <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-sm">
        {/* STEP 1: APPLICANT DETAILS */}
        {currentStep === 1 && (
          <div className="space-y-5">
            <div className="border-b border-slate-200 pb-3">
              <h2 className="text-base font-bold text-gov-900 flex items-center gap-2">
                <User className="w-5 h-5 text-gov-800" />
                <span>Step 1: Applicant & Innovator Information</span>
              </h2>
              <p className="text-xs text-slate-500">Provide legal or institutional applicant identification.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Applicant / Primary Inventor Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.applicant.name}
                  onChange={handleApplicantChange}
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-1 focus:ring-gov-800 focus:outline-none"
                  placeholder="e.g. Dr. A. K. Shastri"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Official Email Address:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.applicant.email}
                  onChange={handleApplicantChange}
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-1 focus:ring-gov-800 focus:outline-none"
                  placeholder="e.g. scholar@ayur-res.edu"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Organization / Research Institute:</label>
                <input
                  type="text"
                  name="organization"
                  value={formData.applicant.organization}
                  onChange={handleApplicantChange}
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-1 focus:ring-gov-800 focus:outline-none"
                  placeholder="e.g. National Institute of Ayurvedic Research"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Applicant Classification:</label>
                <select
                  name="applicantType"
                  value={formData.applicant.applicantType}
                  onChange={handleApplicantChange}
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-lg bg-white focus:ring-1 focus:ring-gov-800 focus:outline-none"
                >
                  <option value="Academic / Research Institution">Academic / Research Institution</option>
                  <option value="Individual Innovator / Vaidya">Individual Innovator / Vaidya</option>
                  <option value="Ayurvedic Startup / MSME">Ayurvedic Startup / MSME</option>
                  <option value="Large Pharmaceutical Enterprise">Large Pharmaceutical Enterprise</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block font-bold text-slate-700 mb-1">Official Postal Address:</label>
                <textarea
                  rows={2}
                  name="address"
                  value={formData.applicant.address}
                  onChange={handleApplicantChange}
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-1 focus:ring-gov-800 focus:outline-none"
                  placeholder="Institutional address with pin code..."
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: INVENTION DETAILS */}
        {currentStep === 2 && (
          <div className="space-y-5">
            <div className="border-b border-slate-200 pb-3">
              <h2 className="text-base font-bold text-gov-900 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-amber-600" />
                <span>Step 2: Core Invention Details</span>
              </h2>
              <p className="text-xs text-slate-500">Define the core scope, technical field, and objective.</p>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Title of the Invention:</label>
                <input
                  type="text"
                  name="title"
                  value={formData.invention.title}
                  onChange={handleInventionChange}
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-1 focus:ring-gov-800 focus:outline-none font-semibold text-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Field of Invention:</label>
                <input
                  type="text"
                  name="field"
                  value={formData.invention.field}
                  onChange={handleInventionChange}
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-1 focus:ring-gov-800 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Problem Statement:</label>
                <textarea
                  rows={3}
                  name="problemStatement"
                  value={formData.invention.problemStatement}
                  onChange={handleInventionChange}
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-1 focus:ring-gov-800 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Proposed Solution:</label>
                <textarea
                  rows={3}
                  name="proposedSolution"
                  value={formData.invention.proposedSolution}
                  onChange={handleInventionChange}
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-1 focus:ring-gov-800 focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: TECHNICAL DESCRIPTION */}
        {currentStep === 3 && (
          <div className="space-y-5">
            <div className="border-b border-slate-200 pb-3">
              <h2 className="text-base font-bold text-gov-900 flex items-center gap-2">
                <FileCode className="w-5 h-5 text-gov-800" />
                <span>Step 3: Technical Description & Specifications</span>
              </h2>
              <p className="text-xs text-slate-500">Provide technical abstract, process descriptions, and claims.</p>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Abstract of the Invention:</label>
                <textarea
                  rows={3}
                  name="abstract"
                  value={formData.technical.abstract}
                  onChange={handleTechnicalChange}
                  placeholder="Provide concise scientific abstract (under 150 words)..."
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-1 focus:ring-gov-800 focus:outline-none font-serif"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Detailed Technical Description & Extraction Process:</label>
                <textarea
                  rows={5}
                  name="detailedDescription"
                  value={formData.technical.detailedDescription}
                  onChange={handleTechnicalChange}
                  placeholder="Detailed extraction steps, solvent concentrations, temperatures, and dosages..."
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-1 focus:ring-gov-800 focus:outline-none font-mono text-[11px]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Novel / Distinctive Features:</label>
                  <textarea
                    rows={3}
                    name="uniqueFeatures"
                    value={formData.technical.uniqueFeatures}
                    onChange={handleTechnicalChange}
                    className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-1 focus:ring-gov-800 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Technical Advantages / Synergistic Benefits:</label>
                  <textarea
                    rows={3}
                    name="advantages"
                    value={formData.technical.advantages}
                    onChange={handleTechnicalChange}
                    className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-1 focus:ring-gov-800 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: DOCUMENTS UPLOAD UI */}
        {currentStep === 4 && (
          <div className="space-y-5">
            <div className="border-b border-slate-200 pb-3">
              <h2 className="text-base font-bold text-gov-900 flex items-center gap-2">
                <UploadCloud className="w-5 h-5 text-ayur-700" />
                <span>Step 4: Supporting Technical Documents</span>
              </h2>
              <p className="text-xs text-slate-500">
                In this prototype demo, verify pre-attached simulated documents or add files.
              </p>
            </div>

            {/* Upload Area Mock */}
            <div className="border-2 border-dashed border-slate-300 hover:border-gov-800 rounded-xl p-6 text-center bg-slate-50/50 cursor-pointer transition-colors">
              <UploadCloud className="w-10 h-10 text-slate-400 mx-auto mb-2" />
              <div className="text-xs font-bold text-gov-900">
                Drag and drop PDF specifications, claims, or HPLC chromatograms
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                (Frontend prototype simulator — documents are mock-verified locally)
              </p>
            </div>

            {/* List of Dummy Uploaded Documents */}
            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                Verified Uploaded Attachments ({formData.documents.length}):
              </h4>
              {formData.documents.map((doc, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-white rounded-lg border border-slate-200 flex items-center justify-between text-xs hover:border-gov-400 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <FileText className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div>
                      <span className="font-bold text-slate-800">{doc.name}</span>
                      <span className="text-[10px] text-slate-400 block sm:inline sm:ml-2">({doc.size})</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold text-[10px]">
                      ✓ {doc.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 5: REVIEW SUMMARY IN WIZARD */}
        {currentStep === 5 && (
          <div className="space-y-5">
            <div className="border-b border-slate-200 pb-3">
              <h2 className="text-base font-bold text-gov-900 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Step 5: Review & Readiness Check</span>
              </h2>
              <p className="text-xs text-slate-500">
                Review your prepared application before entering the final formal review portal.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
                <div className="font-bold text-gov-900 text-sm">{formData.invention.title}</div>
                <div className="text-slate-600">
                  <strong>Applicant:</strong> {formData.applicant.name} ({formData.applicant.organization})
                </div>
                <div className="text-slate-600">
                  <strong>Technical Field:</strong> {formData.invention.field}
                </div>
                <div className="text-slate-600 line-clamp-2">
                  <strong>Abstract:</strong> {formData.technical.abstract || "Comprehensive botanical specification prepared."}
                </div>
              </div>

              <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg text-amber-900 text-xs flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0" />
                <span>
                  Please click <strong>“Review Application”</strong> to proceed to the formal verification and submission screen.
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Wizard Control Buttons */}
        <div className="mt-8 pt-5 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="px-4 py-2 border border-slate-300 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40 transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>
            <button
              type="button"
              onClick={handleSaveDraft}
              className="px-4 py-2 border border-slate-300 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5 text-slate-500" />
              <span>Save Draft</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            {currentStep < 5 ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-5 py-2.5 bg-gov-900 hover:bg-gov-800 text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setApplicationDraft(formData);
                  navigate('/review');
                }}
                className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-2 shadow-sm"
              >
                <CheckCircle2 className="w-4 h-4 text-white" />
                <span>Proceed to Application Review &rarr;</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
