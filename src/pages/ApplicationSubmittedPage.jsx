import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  CheckCircle2,
  FileCheck,
  Home,
  ArrowRight,
  ShieldAlert,
  Printer,
  Calendar,
  User,
  FileText,
  Copy
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import StatusBadge from '../components/common/StatusBadge';

export default function ApplicationSubmittedPage() {
  const navigate = useNavigate();
  const { lastSubmittedId, applicationDraft } = useApp();

  const appId = lastSubmittedId || "PROT-2026-000001";
  const submissionDate = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const handleCopyId = () => {
    navigator.clipboard.writeText(appId);
    alert(`Application ID ${appId} copied to clipboard!`);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-8">
      {/* Success Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden text-center p-8 sm:p-12 space-y-6">
        {/* Animated Checkmark Badge */}
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600 shadow-inner ring-8 ring-emerald-50">
          <CheckCircle2 className="w-12 h-12" />
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gov-900">
            Prototype Application Submitted Successfully
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
            Your Ayurvedic provisional patent specification has been simulated, indexed into the
            prototype status tracker, and assigned an official demonstration identifier.
          </p>
        </div>

        {/* Application Credentials Box */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-left max-w-lg mx-auto space-y-3.5 shadow-2xs">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <span className="text-xs font-bold text-slate-500 uppercase">Application Number:</span>
            <div className="flex items-center gap-2">
              <span className="font-mono text-base font-extrabold text-gov-900 bg-white px-3 py-1 rounded border border-slate-300">
                {appId}
              </span>
              <button
                onClick={handleCopyId}
                className="p-1.5 text-slate-500 hover:text-gov-900 hover:bg-slate-200 rounded"
                title="Copy Application Number"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-700">
            <span className="font-semibold text-slate-500">Submission Date:</span>
            <span className="font-bold flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              {submissionDate}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-700">
            <span className="font-semibold text-slate-500">Invention Title:</span>
            <span className="font-bold text-gov-900 truncate max-w-[260px]">
              {applicationDraft?.invention?.title || "Polyherbal Glycemic Regulator Formulation"}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-700 pt-1">
            <span className="font-semibold text-slate-500">Current Status:</span>
            <StatusBadge status="Submitted for Prototype Review" size="sm" />
          </div>
        </div>

        {/* Mandatory Academic Prototype Notice */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-900 flex items-start gap-3 text-left max-w-lg mx-auto">
          <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Prototype Demonstration Only:</strong> This submission is simulated for academic demonstration
            and does not constitute an actual patent filing or statutory submission before the Controller General of
            Patents, Designs & Trade Marks (CGPDTM).
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-4 border-t border-slate-100">
          <button
            onClick={() => navigate('/status')}
            className="px-6 py-3 bg-gov-900 hover:bg-gov-800 text-white rounded-lg text-xs font-bold flex items-center gap-2 shadow-md transition-colors"
          >
            <FileCheck className="w-4 h-4 text-amber-300" />
            <span>Track Application Status</span>
          </button>

          <button
            onClick={() => window.print()}
            className="px-5 py-3 border border-slate-300 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-2"
          >
            <Printer className="w-4 h-4 text-slate-500" />
            <span>Print Acknowledgment</span>
          </button>

          <Link
            to="/"
            className="px-5 py-3 border border-slate-300 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-2"
          >
            <Home className="w-4 h-4 text-slate-500" />
            <span>Return to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
