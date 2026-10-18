import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  FileCheck,
  Search,
  CheckCircle2,
  Clock,
  CircleDot,
  Circle,
  Building,
  Calendar,
  FileText,
  AlertCircle,
  ShieldAlert,
  Loader2,
  ArrowRight,
  Download
} from 'lucide-react';
import { getApplicationStatus } from '../services/api';
import { useApp } from '../context/AppContext';
import StatusBadge from '../components/common/StatusBadge';

export default function ApplicationStatusPage() {
  const { lastSubmittedId } = useApp();
  const [searchParams] = useSearchParams();

  const initialId = searchParams.get('id') || lastSubmittedId || "PROT-2026-000001";
  const [searchId, setSearchId] = useState(initialId);
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleTrack = async (targetId) => {
    const idToSearch = targetId || searchId;
    if (!idToSearch.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const res = await getApplicationStatus(idToSearch);
      setApplication(res.data);
    } catch (err) {
      setError(err.message || "Application not found.");
      setApplication(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleTrack(initialId);
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold text-ayur-800 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <FileCheck className="w-4 h-4 text-ayur-700" />
            <span>Simulated Docket Tracking System</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gov-900">
            Application Status Tracking
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Real-time status timeline and simulated examination progression for Ayurvedic patent prototypes.
          </p>
        </div>

        <div className="text-xs text-slate-500 font-mono bg-slate-50 px-3 py-1.5 rounded border border-slate-200">
          Sample ID: <strong>PROT-2026-000001</strong>
        </div>
      </div>

      {/* Tracking Search Input Card */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleTrack();
          }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              placeholder="Enter Application Number (e.g., PROT-2026-000001)..."
              className="w-full text-xs sm:text-sm pl-11 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gov-800 font-mono"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-gov-900 hover:bg-gov-800 text-white font-bold text-xs sm:text-sm rounded-lg flex items-center justify-center gap-2 transition-colors shadow-sm"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileCheck className="w-4 h-4 text-amber-300" />}
            <span>Track Application</span>
          </button>
        </form>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-rose-50 border border-rose-200 rounded-xl p-5 text-xs text-rose-800 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          <div>
            <strong>Lookup Notice:</strong> {error}
            <div className="mt-1">
              Try searching with default demonstration record:{" "}
              <button
                onClick={() => {
                  setSearchId("PROT-2026-000001");
                  handleTrack("PROT-2026-000001");
                }}
                className="font-bold underline text-gov-800"
              >
                PROT-2026-000001
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loading Skeleton */}
      {loading && (
        <div className="bg-white rounded-xl p-12 text-center border border-slate-200 shadow-xs">
          <Loader2 className="w-8 h-8 animate-spin text-gov-800 mx-auto mb-3" />
          <p className="text-xs font-bold text-gov-900">Retrieving Application Docket Details...</p>
        </div>
      )}

      {/* Application Timeline & Details View */}
      {application && !loading && (
        <div className="space-y-6">
          {/* Top Application Summary Dossier */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="bg-gov-900 text-white p-6 border-b-4 border-amber-400 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="font-mono bg-white/10 px-3 py-1 rounded text-amber-300 font-bold border border-white/20 text-xs">
                  {application.applicationId}
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-white mt-2">
                  {application.invention?.title || "Polyherbal Glycemic Regulator Formulation"}
                </h2>
                <div className="text-xs text-slate-300 mt-1 flex items-center gap-3">
                  <span>Applicant: {application.applicant?.name}</span>
                  <span>•</span>
                  <span>Submitted: {application.submissionDate}</span>
                </div>
              </div>

              <div>
                <StatusBadge status={application.status} size="lg" />
              </div>
            </div>

            {/* Prototype Disclaimer Banner */}
            <div className="bg-amber-50 p-3.5 border-b border-amber-200 text-xs text-amber-900 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0" />
              <span>{application.notice}</span>
            </div>

            {/* Application Progress Timeline */}
            <div className="p-6 sm:p-8">
              <h3 className="text-xs font-bold text-gov-900 uppercase tracking-wider mb-6">
                Lifecycle & Examination Progression Timeline
              </h3>

              <div className="relative pl-6 border-l-2 border-slate-200 space-y-8 ml-3">
                {application.timeline.map((step, idx) => {
                  let Icon = Circle;
                  let dotColor = "text-slate-300 bg-white ring-4 ring-slate-100";
                  let titleColor = "text-slate-400";
                  let badge = null;

                  if (step.status === "completed") {
                    Icon = CheckCircle2;
                    dotColor = "text-emerald-600 bg-white ring-4 ring-emerald-50";
                    titleColor = "text-gov-900 font-bold";
                    badge = <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">✓ Completed</span>;
                  } else if (step.status === "current") {
                    Icon = CircleDot;
                    dotColor = "text-purple-600 bg-white ring-4 ring-purple-100 animate-pulse";
                    titleColor = "text-purple-900 font-bold";
                    badge = <span className="text-[10px] text-purple-700 font-bold bg-purple-50 px-2 py-0.5 rounded border border-purple-200">● Active Stage</span>;
                  } else {
                    Icon = Circle;
                    dotColor = "text-slate-300 bg-white ring-4 ring-slate-100";
                    titleColor = "text-slate-400";
                    badge = <span className="text-[10px] text-slate-400 font-medium">○ Pending</span>;
                  }

                  return (
                    <div key={idx} className="relative group">
                      {/* Timeline icon node */}
                      <div className={`absolute -left-[35px] top-0.5 w-6 h-6 rounded-full flex items-center justify-center ${dotColor}`}>
                        <Icon className="w-5 h-5" />
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <div>
                          <div className={`text-xs sm:text-sm ${titleColor}`}>{step.stage}</div>
                          <div className="text-[11px] text-slate-500">{step.date}</div>
                        </div>
                        <div>{badge}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Dossier Meta Details */}
            <div className="p-6 bg-slate-50 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-700">
              <div>
                <strong className="block text-slate-500 uppercase text-[10px] mb-1">
                  Applicant Entity:
                </strong>
                <div>{application.applicant?.name}</div>
                <div className="text-slate-500">{application.applicant?.organization}</div>
                <div className="text-slate-500">{application.applicant?.email}</div>
              </div>

              <div>
                <strong className="block text-slate-500 uppercase text-[10px] mb-1">
                  Attached Prototype Documents:
                </strong>
                <div className="space-y-1">
                  {application.documents?.map((doc, dIdx) => (
                    <div key={dIdx} className="flex items-center justify-between">
                      <span className="truncate">{doc.name}</span>
                      <span className="text-[10px] text-emerald-700 font-bold">✓ Verified</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
