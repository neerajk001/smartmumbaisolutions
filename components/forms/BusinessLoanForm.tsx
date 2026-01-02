"use client";

import { useState } from "react";
import MultiStepForm from "./MultiStepForm";
import { PersonalDetailsStep, EmploymentInfoStep } from "./CommonSteps";
import { BusinessLoanFields } from "@/lib/formTypes";

interface BusinessLoanFormProps {
  onSubmit: (data: BusinessLoanFields) => void;
  onClose: () => void;
}

export default function BusinessLoanForm({
  onSubmit,
  onClose,
}: BusinessLoanFormProps) {
  const [formData, setFormData] = useState<Partial<BusinessLoanFields>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep = (stepIndex: number, data: any): boolean => {
    const newErrors: Record<string, string> = {};

    if (stepIndex === 0) {
      if (!data.fullName?.trim()) newErrors.fullName = "Full name is required";
      if (!data.mobileNumber?.trim())
        newErrors.mobileNumber = "Mobile number is required";
      if (!data.email?.trim()) newErrors.email = "Email is required";
      if (!data.pincode?.trim()) newErrors.pincode = "Pincode is required";
      if (!data.dob) newErrors.dob = "Date of birth is required";
      if (!data.city) newErrors.city = "City is required";
      if (!data.panCard?.trim()) newErrors.panCard = "PAN card is required";
    } else if (stepIndex === 1) {
      if (!data.employmentType)
        newErrors.employmentType = "Employment type is required";
      if (!data.monthlyIncome)
        newErrors.monthlyIncome = "Monthly income is required";
      if (!data.employerName?.trim())
        newErrors.employerName = "Business name is required";
      if (!data.existingEmi && data.existingEmi !== "0")
        newErrors.existingEmi = "Existing EMI is required";
    } else if (stepIndex === 2) {
      if (!data.businessType)
        newErrors.businessType = "Business type is required";
      if (!data.turnover) newErrors.turnover = "Annual turnover is required";
      if (!data.yearsInBusiness)
        newErrors.yearsInBusiness = "Years in business is required";
      if (!data.gstRegistered)
        newErrors.gstRegistered = "GST registration status is required";
    } else if (stepIndex === 3) {
      if (!data.loanAmount) newErrors.loanAmount = "Loan amount is required";
      if (!data.tenure) newErrors.tenure = "Tenure is required";
      if (!data.loanPurpose)
        newErrors.loanPurpose = "Loan purpose is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const BusinessDetailsStep = () => {
    const handleChange = (field: keyof BusinessLoanFields, value: string) => {
      setFormData({ ...formData, [field]: value });
      if (errors[field]) {
        setErrors({ ...errors, [field]: "" });
      }
    };

    const businessTypes = [
      { value: "proprietorship", label: "Proprietorship" },
      { value: "partnership", label: "Partnership" },
      { value: "private_ltd", label: "Private Limited" },
      { value: "llp", label: "LLP" },
    ];

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Business Type */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Business Type <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.businessType || ""}
              onChange={(e) => handleChange("businessType", e.target.value)}
              className={`w-full px-5 py-4 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition text-base ${
                errors.businessType ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Business Type</option>
              {businessTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
            {errors.businessType && (
              <p className="text-red-500 text-xs mt-2">{errors.businessType}</p>
            )}
          </div>

          {/* Annual Turnover */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Annual Turnover (₹) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={formData.turnover || ""}
              onChange={(e) => handleChange("turnover", e.target.value)}
              placeholder="Enter annual turnover"
              className={`w-full px-5 py-4 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition text-base ${
                errors.turnover ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.turnover && (
              <p className="text-red-500 text-xs mt-2">{errors.turnover}</p>
            )}
          </div>

          {/* Years in Business */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Years in Business <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={formData.yearsInBusiness || ""}
              onChange={(e) =>
                handleChange("yearsInBusiness", e.target.value)
              }
              placeholder="Enter years"
              className={`w-full px-5 py-4 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition text-base ${
                errors.yearsInBusiness ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.yearsInBusiness && (
              <p className="text-red-500 text-xs mt-1">
                {errors.yearsInBusiness}
              </p>
            )}
          </div>

          {/* GST Registered */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              GST Registered <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gstRegistered"
                  value="yes"
                  checked={formData.gstRegistered === "yes"}
                  onChange={(e) =>
                    handleChange("gstRegistered", e.target.value)
                  }
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-gray-700">Yes</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gstRegistered"
                  value="no"
                  checked={formData.gstRegistered === "no"}
                  onChange={(e) =>
                    handleChange("gstRegistered", e.target.value)
                  }
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-gray-700">No</span>
              </label>
            </div>
            {errors.gstRegistered && (
              <p className="text-red-500 text-xs mt-1">
                {errors.gstRegistered}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  };

  const LoanRequirementStep = () => {
    const handleChange = (field: keyof BusinessLoanFields, value: string) => {
      setFormData({ ...formData, [field]: value });
      if (errors[field]) {
        setErrors({ ...errors, [field]: "" });
      }
    };

    const tenures = ["1", "2", "3", "4", "5", "7", "10", "15"];

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Loan Amount (₹) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={formData.loanAmount || ""}
              onChange={(e) => handleChange("loanAmount", e.target.value)}
              placeholder="Enter loan amount"
              className={`w-full px-5 py-4 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition text-base ${
                errors.loanAmount ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.loanAmount && (
              <p className="text-red-500 text-xs mt-2">{errors.loanAmount}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Tenure (Years) <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.tenure || ""}
              onChange={(e) => handleChange("tenure", e.target.value)}
              className={`w-full px-5 py-4 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition text-base ${
                errors.tenure ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Tenure</option>
              {tenures.map((tenure) => (
                <option key={tenure} value={tenure}>
                  {tenure} {parseInt(tenure) === 1 ? "Year" : "Years"}
                </option>
              ))}
            </select>
            {errors.tenure && (
              <p className="text-red-500 text-xs mt-2">{errors.tenure}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Loan Purpose <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.loanPurpose || ""}
              onChange={(e) => handleChange("loanPurpose", e.target.value)}
              placeholder="e.g., Working Capital, Expansion, Equipment Purchase"
              className={`w-full px-5 py-4 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition text-base ${
                errors.loanPurpose ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.loanPurpose && (
              <p className="text-red-500 text-xs mt-2">{errors.loanPurpose}</p>
            )}
          </div>
        </div>
      </div>
    );
  };

  const ReviewStep = () => {
    return (
      <div className="space-y-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-bold text-blue-900 mb-4">
            Application Summary
          </h3>

          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Personal Details
              </h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Name:</span>
                  <span className="ml-2 font-medium">{formData.fullName}</span>
                </div>
                <div>
                  <span className="text-gray-600">Mobile:</span>
                  <span className="ml-2 font-medium">
                    {formData.mobileNumber}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Business Details
              </h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Business Type:</span>
                  <span className="ml-2 font-medium capitalize">
                    {formData.businessType?.replace(/_/g, " ")}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Turnover:</span>
                  <span className="ml-2 font-medium">
                    ₹{parseFloat(formData.turnover || "0").toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Years in Business:</span>
                  <span className="ml-2 font-medium">
                    {formData.yearsInBusiness}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">GST Registered:</span>
                  <span className="ml-2 font-medium uppercase">
                    {formData.gstRegistered}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Loan Details
              </h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Amount:</span>
                  <span className="ml-2 font-medium">
                    ₹{parseFloat(formData.loanAmount || "0").toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Tenure:</span>
                  <span className="ml-2 font-medium">
                    {formData.tenure} Years
                  </span>
                </div>
                <div className="col-span-2">
                  <span className="text-gray-600">Purpose:</span>
                  <span className="ml-2 font-medium">
                    {formData.loanPurpose}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <p className="text-xs text-gray-600">
            By submitting this application, you agree to our Terms & Conditions
            and Privacy Policy.
          </p>
        </div>
      </div>
    );
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
      title: "Business Details",
      component: <BusinessDetailsStep />,
    },
    {
      title: "Loan Requirement",
      component: <LoanRequirementStep />,
    },
    {
      title: "Review",
      component: <ReviewStep />,
    },
  ];

  const handleSubmit = (data: any) => {
    console.log("Business Loan Application Submitted:", data);
    onSubmit(data as BusinessLoanFields);
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

