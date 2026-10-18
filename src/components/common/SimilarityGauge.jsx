import React from 'react';

export default function SimilarityGauge({ percentage, label = "Similarity", showBar = true }) {
  const num = Number(percentage) || 0;

  let colorClass = "text-emerald-700 bg-emerald-50 border-emerald-200";
  let barClass = "bg-emerald-600";
  let badgeText = "Low Overlap";

  if (num >= 80) {
    colorClass = "text-rose-700 bg-rose-50 border-rose-200";
    barClass = "bg-rose-600";
    badgeText = "High Overlap";
  } else if (num >= 65) {
    colorClass = "text-amber-700 bg-amber-50 border-amber-200";
    barClass = "bg-amber-600";
    badgeText = "Moderate Overlap";
  } else if (num >= 50) {
    colorClass = "text-blue-700 bg-blue-50 border-blue-200";
    barClass = "bg-blue-600";
    badgeText = "Mild Overlap";
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between text-xs font-medium mb-1">
        <span className="text-slate-600">{label}:</span>
        <span className={`px-2 py-0.5 rounded border text-xs font-bold ${colorClass}`}>
          {num}% ({badgeText})
        </span>
      </div>
      {showBar && (
        <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden shadow-inner">
          <div
            className={`h-2 rounded-full transition-all duration-700 ${barClass}`}
            style={{ width: `${Math.min(num, 100)}%` }}
          />
        </div>
      )}
    </div>
  );
}
