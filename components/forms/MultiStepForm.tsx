"use client";

import { useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ArrowLeft, ArrowRight } from "lucide-react";

interface Step {
  title: string;
  component: ReactNode;
}

interface MultiStepFormProps {
  steps: Step[];
  onSubmit: (data: any) => void;
  formData: any;
  setFormData: (data: any) => void;
  validateStep?: (stepIndex: number, data: any, isPreview?: boolean) => boolean;
}

export default function MultiStepForm({
  steps,
  onSubmit,
  formData,
  setFormData,
  validateStep,
}: MultiStepFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;

  // Check validity without setting errors
  const isStepValid = validateStep ? validateStep(currentStep, formData, true) : true;

  const handleNext = () => {
    // Determine if we can proceed
    if (validateStep && !validateStep(currentStep, formData, false)) {
      return;
    }

    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep]);
    }

    if (isLastStep) {
      // Validate before final submission
      if (validateStep && !validateStep(currentStep, formData, false)) {
        return;
      }
      onSubmit(formData);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (!isFirstStep) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (stepIndex: number) => {
    if (stepIndex < currentStep || completedSteps.includes(stepIndex)) {
      setCurrentStep(stepIndex);
    }
  };

  return (
    <div className="w-full flex flex-col lg:flex-row gap-6">
      {/* Vertical Progress Steps - Left Side */}
      <div className="w-full lg:w-64 flex-shrink-0 flex flex-col">
        <div className="flex-1 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 shadow-sm relative min-h-[500px] lg:min-h-0">
          <div className="sticky top-4 p-5">
            <h3 className="text-sm font-bold text-gray-700 mb-5 uppercase tracking-wider">
              Application Progress
            </h3>
            <div className="relative">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  <div className="flex items-start gap-3 pb-6 last:pb-0">
                    {/* Step Number/Icon */}
                    <div className="relative z-10">
                      <button
                        onClick={() => goToStep(index)}
                        disabled={index > currentStep && !completedSteps.includes(index)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${index === currentStep
                          ? "bg-blue-600 text-white shadow-lg shadow-blue-600/40 scale-110"
                          : completedSteps.includes(index)
                            ? "bg-green-500 text-white cursor-pointer hover:scale-105 shadow-md"
                            : index < currentStep
                              ? "bg-blue-400 text-white cursor-pointer hover:scale-105"
                              : "bg-gray-200 text-gray-400 cursor-not-allowed"
                          }`}
                      >
                        {completedSteps.includes(index) ? (
                          <CheckCircle2 size={18} />
                        ) : (
                          index + 1
                        )}
                      </button>
                    </div>

                    {/* Step Title and Description */}
                    <div className="flex-1 pt-1.5">
                      <h4
                        className={`font-semibold text-sm transition-colors ${index === currentStep
                          ? "text-blue-600"
                          : completedSteps.includes(index)
                            ? "text-green-600"
                            : "text-gray-500"
                          }`}
                      >
                        {step.title}
                      </h4>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {index === currentStep
                          ? "In Progress"
                          : completedSteps.includes(index)
                            ? "Completed"
                            : "Pending"}
                      </p>
                    </div>
                  </div>

                  {/* Connecting Line */}
                  {index < steps.length - 1 && (
                    <div
                      className={`absolute left-5 top-10 w-0.5 h-6 -translate-x-1/2 transition-all duration-300 ${completedSteps.includes(index) || index < currentStep
                        ? "bg-green-400"
                        : "bg-gray-300"
                        }`}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Progress Bar */}
            <div className="mt-5 pt-5 border-t border-blue-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-gray-600">Overall Progress</span>
                <span className="text-xs font-bold text-blue-600">
                  {Math.round(((completedSteps.length) / steps.length) * 100)}%
                </span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${((completedSteps.length) / steps.length) * 100}%`,
                  }}
                  transition={{ duration: 0.5 }}
                  className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form Content - Right Side */}
      <div className="flex-1 min-w-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 min-h-[550px]"
          >
            <div className="mb-4 pb-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">
                {steps[currentStep].title}
              </h2>
              <p className="text-sm text-gray-500 mt-0.5">
                Step {currentStep + 1} of {steps.length}
              </p>
            </div>
            {steps[currentStep].component}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="sticky -bottom-8 z-20 flex justify-between p-3 bg-white/60 border-t border-gray-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] backdrop-blur-2xl backdrop-saturate-150">
          <button
            onClick={handleBack}
            disabled={isFirstStep}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${isFirstStep
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
              }`}
          >
            <ArrowLeft size={18} />
            Previous
          </button>

          <button
            onClick={handleNext}
            disabled={!isStepValid}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-lg ${!isStepValid
              ? "bg-gray-300 text-gray-500 cursor-not-allowed shadow-none"
              : "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/30 hover:shadow-blue-600/50"
              }`}
          >
            {isLastStep ? "Submit Application" : "Continue"}
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

