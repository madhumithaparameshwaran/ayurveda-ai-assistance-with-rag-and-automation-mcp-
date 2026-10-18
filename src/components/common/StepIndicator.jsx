import React from 'react';
import { Check } from 'lucide-react';

export default function StepIndicator({ steps, currentStep, onStepClick }) {
  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between relative">
        {/* Background connecting line */}
        <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1 bg-slate-200 -z-0" />
        
        {/* Active connecting line */}
        <div
          className="absolute left-6 top-1/2 -translate-y-1/2 h-1 bg-gov-800 transition-all duration-500 -z-0"
          style={{
            width: `${((currentStep - 1) / (steps.length - 1)) * 90}%`
          }}
        />

        {steps.map((step, idx) => {
          const stepNum = idx + 1;
          const isCompleted = stepNum < currentStep;
          const isCurrent = stepNum === currentStep;

          return (
            <div
              key={step.id || idx}
              onClick={() => onStepClick && isCompleted && onStepClick(stepNum)}
              className={`flex flex-col items-center relative z-10 ${
                isCompleted ? 'cursor-pointer group' : 'cursor-default'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all ${
                  isCompleted
                    ? 'bg-gov-800 text-white border-gov-800 ring-4 ring-gov-100 group-hover:scale-105'
                    : isCurrent
                    ? 'bg-white text-gov-800 border-gov-800 ring-4 ring-ayur-100 shadow-md'
                    : 'bg-white text-slate-400 border-slate-300'
                }`}
              >
                {isCompleted ? <Check className="w-5 h-5 text-white" /> : stepNum}
              </div>
              <span
                className={`mt-2 text-xs font-semibold text-center max-w-[100px] leading-tight ${
                  isCurrent ? 'text-gov-900' : isCompleted ? 'text-slate-700' : 'text-slate-400'
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
