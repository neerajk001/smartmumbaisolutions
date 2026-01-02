"use client";

import { useState } from "react";
import { X, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PersonalLoanForm from "./PersonalLoanForm";
import BusinessLoanForm from "./BusinessLoanForm";
import HomeLoanForm from "./HomeLoanForm";
import LAPForm from "./LAPForm";
import CarLoanForm from "./CarLoanForm";
import EducationLoanForm from "./EducationLoanForm";
import InsuranceForm from "./InsuranceForms";
import { submitLoanApplication, submitInsuranceApplication } from "@/lib/api";

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  productType: string;
  productTitle: string;
  category: "Loan" | "Insurance";
}

export default function ApplicationModal({
  isOpen,
  onClose,
  productType,
  productTitle,
  category,
}: ApplicationModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
    applicationId?: string;
  }>({ type: null, message: '' });

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      let result;

      if (category === "Loan") {
        result = await submitLoanApplication(productType, data);
      } else {
        result = await submitInsuranceApplication(productType, data);
      }

      if (result.success) {
        setSubmitStatus({
          type: 'success',
          message: result.message || 'Application submitted successfully!',
          applicationId: result.applicationId,
        });

        // Close modal after 3 seconds
        setTimeout(() => {
          onClose();
          setSubmitStatus({ type: null, message: '' });
        }, 3000);
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.error || 'Failed to submit application. Please try again.',
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'An unexpected error occurred. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
      // Reset status after modal closes
      setTimeout(() => {
        setSubmitStatus({ type: null, message: '' });
      }, 300);
    }
  };

  const renderForm = () => {
    // Show success state
    if (submitStatus.type === 'success') {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center py-16 px-8"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="text-green-600" size={48} />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Application Submitted!</h3>
          <p className="text-gray-600 text-center mb-4">{submitStatus.message}</p>
          {submitStatus.applicationId && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg px-6 py-4 mb-6">
              <p className="text-sm text-gray-600 mb-1">Your Application ID</p>
              <p className="text-xl font-bold text-blue-600">{submitStatus.applicationId}</p>
            </div>
          )}
          <p className="text-sm text-gray-500 text-center">
            Our team will review your application and contact you within 24-48 hours.
          </p>
        </motion.div>
      );
    }

    // Show error state
    if (submitStatus.type === 'error') {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center py-16 px-8"
        >
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
            <AlertCircle className="text-red-600" size={48} />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Submission Failed</h3>
          <p className="text-gray-600 text-center mb-6">{submitStatus.message}</p>
          <button
            onClick={() => setSubmitStatus({ type: null, message: '' })}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            Try Again
          </button>
        </motion.div>
      );
    }

    // Show form
    if (category === "Loan") {
      switch (productType) {
        case "personal-loan":
          return (
            <PersonalLoanForm onSubmit={handleSubmit} onClose={handleClose} />
          );
        case "business-loan":
          return (
            <BusinessLoanForm onSubmit={handleSubmit} onClose={handleClose} />
          );
        case "home-loan":
          return <HomeLoanForm onSubmit={handleSubmit} onClose={handleClose} />;
        case "mortgage-loan":
          return <LAPForm onSubmit={handleSubmit} onClose={handleClose} />;
        case "car-loan":
          return <CarLoanForm onSubmit={handleSubmit} onClose={handleClose} />;
        case "education-loan":
          return (
            <EducationLoanForm onSubmit={handleSubmit} onClose={handleClose} />
          );
        default:
          return <div>Form not available</div>;
      }
    } else {
      return (
        <InsuranceForm
          type={productType}
          onSubmit={handleSubmit}
          onClose={handleClose}
        />
      );
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-2 py-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.2 }}
                className="relative w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Loading Overlay */}
                {isSubmitting && (
                  <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-10 flex items-center justify-center">
                    <div className="flex flex-col items-center">
                      <Loader2 className="text-blue-600 animate-spin mb-4" size={48} />
                      <p className="text-gray-700 font-semibold">Submitting your application...</p>
                      <p className="text-gray-500 text-sm mt-2">Please wait</p>
                    </div>
                  </div>
                )}

                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-5 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold">{productTitle}</h2>
                      <p className="text-blue-100 text-xs mt-1">
                        {submitStatus.type === 'success'
                          ? 'Application submitted successfully'
                          : submitStatus.type === 'error'
                            ? 'Submission failed'
                            : 'Complete the application form below'}
                      </p>
                    </div>
                    <button
                      onClick={handleClose}
                      disabled={isSubmitting}
                      className={`p-2 hover:bg-white/10 rounded-full transition-colors ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    >
                      <X size={22} />
                    </button>
                  </div>
                </div>

                {/* Form Content */}
                <div className="p-8 max-h-[calc(100vh-140px)] overflow-y-auto">
                  {renderForm()}
                </div>
              </motion.div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

