"use client";

import { useState } from "react";
import {
  validateFullName,
  validateMobileNumber,
  validateDOB,
  validatePincode,
  validateVehicleNumber,
  validateAge,
  validateRequired,
  validateNumber,
} from "@/lib/validation";
import {
  HealthInsuranceFields,
  TermLifeInsuranceFields,
  CarInsuranceFields,
  BikeInsuranceFields,
  LoanProtectorFields,
  EMIProtectorFields,
} from "@/lib/formTypes";

interface InsuranceFormProps {
  type: string;
  onSubmit: (data: any) => void;
  onClose: () => void;
}

export default function InsuranceForm({
  type,
  onSubmit,
  onClose,
}: InsuranceFormProps) {
  const [formData, setFormData] = useState<any>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const handleBlur = (field: string) => {
    let error = null;
    const value = formData[field];

    switch (field) {
      case "fullName":
        error = validateFullName(value);
        break;
      case "mobileNumber":
        error = validateMobileNumber(value);
        break;
      case "dob":
        error = validateDOB(value);
        break;
      case "pincode":
        error = validatePincode(value);
        break;
      case "vehicleNumber":
        error = validateVehicleNumber(value);
        break;
      case "age":
        error = validateAge(value);
        break;
      case "loanAmount":
      case "courseFee":
        error = validateNumber(value, 0);
        break;
    }

    if (error) {
      setErrors({ ...errors, [field]: error });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Common validations
    if (!formData.fullName?.trim())
      newErrors.fullName = "Full name is required";
    if (!formData.mobileNumber?.trim())
      newErrors.mobileNumber = "Mobile number is required";

    // Type-specific validations
    switch (type) {
      case "health-insurance":
      case "term-life":
      case "car-insurance":
      case "bike-insurance":
      case "emi-protector":
        if (!formData.dob) newErrors.dob = "Date of birth is required";
        if (!formData.sumInsured && (type === "health-insurance" || type === "term-life"))
          newErrors.sumInsured = "Sum insured is required";
        break;

      case "loan-protector":
        if (!formData.age) newErrors.age = "Age is required";
        if (!formData.loanType) newErrors.loanType = "Loan type is required";
        if (!formData.loanAmount)
          newErrors.loanAmount = "Loan amount is required";
        if (!formData.tenure) newErrors.tenure = "Tenure is required";
        break;
    }

    // Vehicle-specific validations
    if (type === "car-insurance" || type === "bike-insurance") {
      if (!formData.pincode?.trim())
        newErrors.pincode = "Pincode is required";
      if (!formData.vehicleNumber?.trim())
        newErrors.vehicleNumber = "Vehicle number is required";
      if (!formData.policyTerm)
        newErrors.policyTerm = "Policy term is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log(`${type} Application Submitted:`, formData);
      onSubmit(formData);
    }
  };

  // Health Insurance Form
  if (type === "health-insurance") {
    const sumInsuredOptions = ["₹5L", "₹10L", "₹25L", "₹50L", "₹1Cr"];

    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.fullName || ""}
              onChange={(e) => handleChange("fullName", e.target.value)}
              onBlur={() => handleBlur("fullName")}
              className={`w-full px-5 py-4 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition text-base text-black ${errors.fullName ? "border-red-500" : "border-gray-300"
                }`}
            />
            {errors.fullName && (
              <p className="text-red-500 text-xs mt-2">{errors.fullName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Mobile Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              value={formData.mobileNumber || ""}
              onChange={(e) => handleChange("mobileNumber", e.target.value)}
              onBlur={() => handleBlur("mobileNumber")}
              maxLength={10}
              className={`w-full px-5 py-4 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition text-base text-black ${errors.mobileNumber ? "border-red-500" : "border-gray-300"
                }`}
            />
            {errors.mobileNumber && (
              <p className="text-red-500 text-xs mt-2">{errors.mobileNumber}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Date of Birth <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={formData.dob || ""}
              onChange={(e) => handleChange("dob", e.target.value)}
              onBlur={() => handleBlur("dob")}
              className={`w-full px-5 py-4 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition text-base text-black ${errors.dob ? "border-red-500" : "border-gray-300"
                }`}
            />
            {errors.dob && (
              <p className="text-red-500 text-xs mt-2">{errors.dob}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Sum Insured <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.sumInsured || ""}
              onChange={(e) => handleChange("sumInsured", e.target.value)}
              className={`w-full px-5 py-4 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition text-base text-black ${errors.sumInsured ? "border-red-500" : "border-gray-300"
                }`}
            >
              <option value="">Select Cover Amount</option>
              {sumInsuredOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors.sumInsured && (
              <p className="text-red-500 text-xs mt-2">{errors.sumInsured}</p>
            )}
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-8 py-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            Submit Application
          </button>
        </div>
      </form>
    );
  }

  // Term Life Insurance Form
  if (type === "term-life") {
    const sumInsuredOptions = ["₹50L", "₹1Cr", "₹2Cr", "₹5Cr", "₹10Cr"];

    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.fullName || ""}
              onChange={(e) => handleChange("fullName", e.target.value)}
              onBlur={() => handleBlur("fullName")}
              className={`w-full px-5 py-4 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition text-base text-black ${errors.fullName ? "border-red-500" : "border-gray-300"
                }`}
            />
            {errors.fullName && (
              <p className="text-red-500 text-xs mt-2">{errors.fullName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Mobile Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              value={formData.mobileNumber || ""}
              onChange={(e) => handleChange("mobileNumber", e.target.value)}
              onBlur={() => handleBlur("mobileNumber")}
              maxLength={10}
              className={`w-full px-5 py-4 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition text-base text-black ${errors.mobileNumber ? "border-red-500" : "border-gray-300"
                }`}
            />
            {errors.mobileNumber && (
              <p className="text-red-500 text-xs mt-2">{errors.mobileNumber}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Date of Birth <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={formData.dob || ""}
              onChange={(e) => handleChange("dob", e.target.value)}
              onBlur={() => handleBlur("dob")}
              className={`w-full px-5 py-4 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition text-base text-black ${errors.dob ? "border-red-500" : "border-gray-300"
                }`}
            />
            {errors.dob && (
              <p className="text-red-500 text-xs mt-2">{errors.dob}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Life Cover <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.sumInsured || ""}
              onChange={(e) => handleChange("sumInsured", e.target.value)}
              className={`w-full px-5 py-4 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition text-base text-black ${errors.sumInsured ? "border-red-500" : "border-gray-300"
                }`}
            >
              <option value="">Select Cover Amount</option>
              {sumInsuredOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors.sumInsured && (
              <p className="text-red-500 text-xs mt-2">{errors.sumInsured}</p>
            )}
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-8 py-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            Submit Application
          </button>
        </div>
      </form>
    );
  }

  // Car/Bike Insurance Form
  if (type === "car-insurance" || type === "bike-insurance") {
    const policyTerms = ["1", "2", "3"];

    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.fullName || ""}
              onChange={(e) => handleChange("fullName", e.target.value)}
              onBlur={() => handleBlur("fullName")}
              className={`w-full px-5 py-4 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition text-base text-black ${errors.fullName ? "border-red-500" : "border-gray-300"
                }`}
            />
            {errors.fullName && (
              <p className="text-red-500 text-xs mt-2">{errors.fullName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Mobile Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              value={formData.mobileNumber || ""}
              onChange={(e) => handleChange("mobileNumber", e.target.value)}
              onBlur={() => handleBlur("mobileNumber")}
              maxLength={10}
              className={`w-full px-5 py-4 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition text-base text-black ${errors.mobileNumber ? "border-red-500" : "border-gray-300"
                }`}
            />
            {errors.mobileNumber && (
              <p className="text-red-500 text-xs mt-2">{errors.mobileNumber}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Date of Birth <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={formData.dob || ""}
              onChange={(e) => handleChange("dob", e.target.value)}
              onBlur={() => handleBlur("dob")}
              className={`w-full px-5 py-4 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition text-base text-black ${errors.dob ? "border-red-500" : "border-gray-300"
                }`}
            />
            {errors.dob && (
              <p className="text-red-500 text-xs mt-2">{errors.dob}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Pincode <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.pincode || ""}
              onChange={(e) => handleChange("pincode", e.target.value)}
              onBlur={() => handleBlur("pincode")}
              maxLength={6}
              className={`w-full px-5 py-4 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition text-base text-black ${errors.pincode ? "border-red-500" : "border-gray-300"
                }`}
            />
            {errors.pincode && (
              <p className="text-red-500 text-xs mt-2">{errors.pincode}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Vehicle Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.vehicleNumber || ""}
              onChange={(e) =>
                handleChange("vehicleNumber", e.target.value.toUpperCase())
              }
              onBlur={() => handleBlur("vehicleNumber")}
              placeholder="MH12AB1234"
              className={`w-full px-5 py-4 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition text-base text-black ${errors.vehicleNumber ? "border-red-500" : "border-gray-300"
                }`}
            />
            {errors.vehicleNumber && (
              <p className="text-red-500 text-xs mt-1">
                {errors.vehicleNumber}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Policy Term (Years) <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.policyTerm || ""}
              onChange={(e) => handleChange("policyTerm", e.target.value)}
              className={`w-full px-5 py-4 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition text-base text-black ${errors.policyTerm ? "border-red-500" : "border-gray-300"
                }`}
            >
              <option value="">Select Term</option>
              {policyTerms.map((term) => (
                <option key={term} value={term}>
                  {term} {parseInt(term) === 1 ? "Year" : "Years"}
                </option>
              ))}
            </select>
            {errors.policyTerm && (
              <p className="text-red-500 text-xs mt-2">{errors.policyTerm}</p>
            )}
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-8 py-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            Submit Application
          </button>
        </div>
      </form>
    );
  }

  // Loan Protector Form
  if (type === "loan-protector") {
    const loanTypes = ["Personal Loan", "Business Loan", "Home Loan"];

    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.fullName || ""}
              onChange={(e) => handleChange("fullName", e.target.value)}
              onBlur={() => handleBlur("fullName")}
              className={`w-full px-5 py-4 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition text-base text-black ${errors.fullName ? "border-red-500" : "border-gray-300"
                }`}
            />
            {errors.fullName && (
              <p className="text-red-500 text-xs mt-2">{errors.fullName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Mobile Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              value={formData.mobileNumber || ""}
              onChange={(e) => handleChange("mobileNumber", e.target.value)}
              onBlur={() => handleBlur("mobileNumber")}
              maxLength={10}
              className={`w-full px-5 py-4 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition text-base text-black ${errors.mobileNumber ? "border-red-500" : "border-gray-300"
                }`}
            />
            {errors.mobileNumber && (
              <p className="text-red-500 text-xs mt-2">{errors.mobileNumber}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Age <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={formData.age || ""}
              onChange={(e) => handleChange("age", e.target.value)}
              onBlur={() => handleBlur("age")}
              placeholder="18-100"
              min="18"
              max="100"
              className={`w-full px-5 py-4 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition text-base text-black ${errors.age ? "border-red-500" : "border-gray-300"
                }`}
            />
            {errors.age && (
              <p className="text-red-500 text-xs mt-2">{errors.age}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Loan Type <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.loanType || ""}
              onChange={(e) => handleChange("loanType", e.target.value)}
              className={`w-full px-5 py-4 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition text-base text-black ${errors.loanType ? "border-red-500" : "border-gray-300"
                }`}
            >
              <option value="">Select Loan Type</option>
              {loanTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.loanType && (
              <p className="text-red-500 text-xs mt-2">{errors.loanType}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Loan Amount (₹) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={formData.loanAmount || ""}
              onChange={(e) => handleChange("loanAmount", e.target.value)}
              onBlur={() => handleBlur("loanAmount")}
              className={`w-full px-5 py-4 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition text-base text-black ${errors.loanAmount ? "border-red-500" : "border-gray-300"
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
            <input
              type="number"
              value={formData.tenure || ""}
              onChange={(e) => handleChange("tenure", e.target.value)}
              placeholder="1-30 years"
              min="1"
              max="30"
              className={`w-full px-5 py-4 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition text-base text-black ${errors.tenure ? "border-red-500" : "border-gray-300"
                }`}
            />
            {errors.tenure && (
              <p className="text-red-500 text-xs mt-2">{errors.tenure}</p>
            )}
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-8 py-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            Submit Application
          </button>
        </div>
      </form>
    );
  }

  // EMI Protector Form
  if (type === "emi-protector") {
    const loanTypes = ["Personal Loan", "Business Loan", "Home Loan"];

    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.fullName || ""}
              onChange={(e) => handleChange("fullName", e.target.value)}
              onBlur={() => handleBlur("fullName")}
              className={`w-full px-5 py-4 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition text-base text-black ${errors.fullName ? "border-red-500" : "border-gray-300"
                }`}
            />
            {errors.fullName && (
              <p className="text-red-500 text-xs mt-2">{errors.fullName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Mobile Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              value={formData.mobileNumber || ""}
              onChange={(e) => handleChange("mobileNumber", e.target.value)}
              onBlur={() => handleBlur("mobileNumber")}
              maxLength={10}
              className={`w-full px-5 py-4 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition text-base text-black ${errors.mobileNumber ? "border-red-500" : "border-gray-300"
                }`}
            />
            {errors.mobileNumber && (
              <p className="text-red-500 text-xs mt-2">{errors.mobileNumber}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Date of Birth <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={formData.dob || ""}
              onChange={(e) => handleChange("dob", e.target.value)}
              onBlur={() => handleBlur("dob")}
              className={`w-full px-5 py-4 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition text-base text-black ${errors.dob ? "border-red-500" : "border-gray-300"
                }`}
            />
            {errors.dob && (
              <p className="text-red-500 text-xs mt-2">{errors.dob}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Loan Type <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.loanType || ""}
              onChange={(e) => handleChange("loanType", e.target.value)}
              className={`w-full px-5 py-4 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition text-base text-black ${errors.loanType ? "border-red-500" : "border-gray-300"
                }`}
            >
              <option value="">Select Loan Type</option>
              {loanTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.loanType && (
              <p className="text-red-500 text-xs mt-2">{errors.loanType}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Loan Amount (₹) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={formData.loanAmount || ""}
              onChange={(e) => handleChange("loanAmount", e.target.value)}
              onBlur={() => handleBlur("loanAmount")}
              className={`w-full px-5 py-4 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition text-base text-black ${errors.loanAmount ? "border-red-500" : "border-gray-300"
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
            <input
              type="number"
              value={formData.tenure || ""}
              onChange={(e) => handleChange("tenure", e.target.value)}
              placeholder="1-30 years"
              min="1"
              max="30"
              className={`w-full px-5 py-4 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition text-base text-black ${errors.tenure ? "border-red-500" : "border-gray-300"
                }`}
            />
            {errors.tenure && (
              <p className="text-red-500 text-xs mt-2">{errors.tenure}</p>
            )}
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-8 py-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            Submit Application
          </button>
        </div>
      </form>
    );
  }

  return null;
}

