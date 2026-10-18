import React from 'react';

export default function StatusBadge({ status, size = "md" }) {
  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs font-medium",
    md: "px-2.5 py-1 text-xs font-semibold",
    lg: "px-3 py-1.5 text-sm font-semibold"
  };

  const statusConfigs = {
    "Granted": "bg-emerald-100 text-emerald-800 border-emerald-300",
    "Published": "bg-blue-100 text-blue-800 border-blue-300",
    "Application": "bg-amber-100 text-amber-800 border-amber-300",
    "Submitted for Prototype Review": "bg-purple-100 text-purple-800 border-purple-300",
    "Draft": "bg-slate-100 text-slate-700 border-slate-300",
    "Under Review": "bg-indigo-100 text-indigo-800 border-indigo-300",
    "Verified": "bg-teal-100 text-teal-800 border-teal-300"
  };

  const currentClass = statusConfigs[status] || "bg-slate-100 text-slate-700 border-slate-300";

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border shadow-xs ${sizeClasses[size]} ${currentClass}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-75 animate-pulse" />
      {status}
    </span>
  );
}
