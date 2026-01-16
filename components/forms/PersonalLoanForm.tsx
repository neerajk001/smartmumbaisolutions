"use client";

import { useState } from "react";
import MultiStepForm from "./MultiStepForm";
import { PersonalDetailsStep, EmploymentInfoStep } from "./CommonSteps";
import { PersonalLoanFields } from "@/lib/formTypes";
import { Banknote, Calendar, FileText } from "lucide-react";

interface PersonalLoanFormProps {
  onSubmit: (data: PersonalLoanFields) => void;
  onClose: () => void;
}

const LoanRequirementStep = ({ formData, setFormData, errors, setErrors }: any) => {
  const handleChange = (field: keyof PersonalLoanFields, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const tenures = ["1", "2", "3", "4", "5", "7", "10", "15"];
  const purposes = [
    { value: "personal", label: "Personal Use" },
    { value: "medical", label: "Medical Emergency" },
    { value: "wedding", label: "Wedding" },
    { value: "business", label: "Business" },
    { value: "debt_consolidation", label: "Debt Consolidation" },
    { value: "other", label: "Other" },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Loan Amount */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Loan Amount (₹) <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Banknote className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="number"
              value={formData.loanAmount || ""}
              onChange={(e) => handleChange("loanAmount", e.target.value)}
              placeholder="Enter loan amount"
              className={`w-full pl-12 pr-5 py-3 bg-gray-50 border rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-300 text-base text-gray-900 shadow-sm ${errors.loanAmount ? "border-red-500" : "border-gray-200"
                }`}
            />
          </div>
          {errors.loanAmount && (
            <p className="text-red-500 text-xs mt-2 font-medium">{errors.loanAmount}</p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            Minimum amount: ₹10,000
          </p>
        </div>

        {/* Tenure */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Tenure (Years) <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <select
              value={formData.tenure || ""}
              onChange={(e) => handleChange("tenure", e.target.value)}
              className={`w-full pl-12 pr-5 py-3 bg-gray-50 border rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-300 text-base text-gray-900 shadow-sm appearance-none ${errors.tenure ? "border-red-500" : "border-gray-200"
                }`}
            >
              <option value="">Select Tenure</option>
              {tenures.map((tenure) => (
                <option key={tenure} value={tenure}>
                  {tenure} {parseInt(tenure) === 1 ? "Year" : "Years"}
                </option>
              ))}
            </select>
          </div>
          {errors.tenure && (
            <p className="text-red-500 text-xs mt-2 font-medium">{errors.tenure}</p>
          )}
        </div>

        {/* Loan Purpose */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Loan Purpose <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <FileText className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <select
              value={formData.loanPurpose || ""}
              onChange={(e) => handleChange("loanPurpose", e.target.value)}
              className={`w-full pl-12 pr-5 py-3 bg-gray-50 border rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-300 text-base text-gray-900 shadow-sm appearance-none ${errors.loanPurpose ? "border-red-500" : "border-gray-200"
                }`}
            >
              <option value="">Select Purpose</option>
              {purposes.map((purpose) => (
                <option key={purpose.value} value={purpose.value}>
                  {purpose.label}
                </option>
              ))}
            </select>
          </div>
          {errors.loanPurpose && (
            <p className="text-red-500 text-xs mt-2 font-medium">{errors.loanPurpose}</p>
          )}
        </div>
      </div>
    </div>
  );
};

const ReviewStep = ({ formData }: any) => {
  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-bold text-blue-900 mb-4">
          Application Summary
        </h3>

        <div className="space-y-4">
          {/* Personal Details */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">
              Personal Details
            </h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Name:</span>
                <span className="ml-2 font-medium text-gray-900">{formData.fullName}</span>
              </div>
              <div>
                <span className="text-gray-600">Mobile:</span>
                <span className="ml-2 font-medium text-gray-900">
                  {formData.mobileNumber}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Email:</span>
                <span className="ml-2 font-medium text-gray-900">{formData.email}</span>
              </div>
              <div>
                <span className="text-gray-600">PAN:</span>
                <span className="ml-2 font-medium text-gray-900">{formData.panCard}</span>
              </div>
            </div>
          </div>

          {/* Employment Details */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">
              Employment Details
            </h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Type:</span>
                <span className="ml-2 font-medium text-gray-900 capitalize">
                  {formData.employmentType}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Monthly Income:</span>
                <span className="ml-2 font-medium text-gray-900">
                  ₹{parseFloat(formData.monthlyIncome || "0").toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Loan Details */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">
              Loan Details
            </h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Amount:</span>
                <span className="ml-2 font-medium text-gray-900">
                  ₹{parseFloat(formData.loanAmount || "0").toLocaleString()}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Tenure:</span>
                <span className="ml-2 font-medium text-gray-900">
                  {formData.tenure} Years
                </span>
              </div>
              <div className="col-span-2">
                <span className="text-gray-600">Purpose:</span>
                <span className="ml-2 font-medium capitalize">
                  {formData.loanPurpose?.replace(/_/g, " ")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <p className="text-xs text-gray-600">
          By submitting this application, you agree to our Terms & Conditions
          and Privacy Policy. Your information will be securely processed.
        </p>
      </div>
    </div>
  );
};

export default function PersonalLoanForm({
  onSubmit,
  onClose,
}: PersonalLoanFormProps) {
  const [formData, setFormData] = useState<Partial<PersonalLoanFields>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep = (stepIndex: number, data: any, isPreview: boolean = false): boolean => {
    const newErrors: Record<string, string> = {};

    if (stepIndex === 0) {
      // Personal Details validation
      if (!data.fullName?.trim()) newErrors.fullName = "Full name is required";
      if (!data.mobileNumber?.trim())
        newErrors.mobileNumber = "Mobile number is required";
      if (!data.email?.trim()) newErrors.email = "Email is required";
      if (!data.pincode?.trim()) newErrors.pincode = "Pincode is required";
      if (!data.dob) newErrors.dob = "Date of birth is required";
      if (!data.city) newErrors.city = "City is required";
      if (!data.panCard?.trim()) newErrors.panCard = "PAN card is required";
    } else if (stepIndex === 1) {
      // Employment Info validation
      if (!data.employmentType)
        newErrors.employmentType = "Employment type is required";
      if (!data.monthlyIncome)
        newErrors.monthlyIncome = "Monthly income is required";
      if (!data.employerName?.trim())
        newErrors.employerName = "Employer name is required";
      if (!data.existingEmi && data.existingEmi !== "0")
        newErrors.existingEmi = "Existing EMI is required";
    } else if (stepIndex === 2) {
      // Loan Requirement validation
      if (!data.loanAmount) {
        newErrors.loanAmount = "Loan amount is required";
      } else if (Number(data.loanAmount) < 10000) {
        newErrors.loanAmount = "Loan amount must be at least ₹10,000";
      }
      if (!data.tenure) newErrors.tenure = "Tenure is required";
      if (!data.loanPurpose)
        newErrors.loanPurpose = "Loan purpose is required";
    }

    if (!isPreview) {
      setErrors(newErrors);
    }
    return Object.keys(newErrors).length === 0;
  };

  const steps = [
    {
      title: "Personal Details",
      component: (
        <PersonalDetailsStep formData={formData} setFormData={setFormData} />
      ),
    },
    {
      title: "Employment Info",
      component: (
        <EmploymentInfoStep formData={formData} setFormData={setFormData} />
      ),
    },
    {
      title: "Loan Requirement",
      component: <LoanRequirementStep formData={formData} setFormData={setFormData} errors={errors} setErrors={setErrors} />,
    },
    {
      title: "Review",
      component: <ReviewStep formData={formData} />,
    },
  ];

  const handleSubmit = (data: any) => {
    console.log("Personal Loan Application Submitted:", data);
    onSubmit(data as PersonalLoanFields);
  };

  return (
    <MultiStepForm
      steps={steps}
      onSubmit={handleSubmit}
      formData={formData}
      setFormData={setFormData}
      validateStep={validateStep}
    />
  );
}
