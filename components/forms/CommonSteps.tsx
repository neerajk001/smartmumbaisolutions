"use client";

import { CommonLoanFields } from "@/lib/formTypes";
import {
  validateFullName,
  validateMobileNumber,
  validateEmail,
  validatePincode,
  validatePanCard,
  validateRequired,
  validateNumber,
  validateNonNegativeNumber,
  validateDOB,
} from "@/lib/validation";
import { useState } from "react";

interface StepProps {
  formData: any;
  setFormData: (data: any) => void;
}

// Step 1: Personal/Basic Details
export function PersonalDetailsStep({ formData, setFormData }: StepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: keyof CommonLoanFields, value: string) => {
    setFormData({ ...formData, [field]: value });
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const handleBlur = (field: keyof CommonLoanFields) => {
    let error = null;
    const value = formData[field];

    switch (field) {
      case "fullName":
        error = validateFullName(value);
        break;
      case "mobileNumber":
        error = validateMobileNumber(value);
        break;
      case "email":
        error = validateEmail(value);
        break;
      case "pincode":
        error = validatePincode(value);
        break;
      case "panCard":
        error = validatePanCard(value);
        break;
      case "dob":
        error = validateDOB(value);
        break;
      case "city":
        error = validateRequired(value, "City");
        break;
    }

    if (error) {
      setErrors({ ...errors, [field]: error });
    }
  };

  const cities = [
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Hyderabad",
    "Chennai",
    "Kolkata",
    "Pune",
    "Ahmedabad",
    "Jaipur",
    "Surat",
    "Other",
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.fullName || ""}
            onChange={(e) => handleChange("fullName", e.target.value)}
            onBlur={() => handleBlur("fullName")}
            placeholder="Enter your full name"
            className={`w-full px-5 py-4 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition text-base ${
              errors.fullName ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.fullName && (
            <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
          )}
        </div>

        {/* Mobile Number */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Mobile Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            value={formData.mobileNumber || ""}
            onChange={(e) => handleChange("mobileNumber", e.target.value)}
            onBlur={() => handleBlur("mobileNumber")}
            placeholder="10-digit mobile number"
            maxLength={10}
            className={`w-full px-5 py-4 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition text-base ${
              errors.mobileNumber ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.mobileNumber && (
            <p className="text-red-500 text-xs mt-2">{errors.mobileNumber}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={formData.email || ""}
            onChange={(e) => handleChange("email", e.target.value)}
            onBlur={() => handleBlur("email")}
            placeholder="your.email@example.com"
            className={`w-full px-5 py-4 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition text-base ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-2">{errors.email}</p>
          )}
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Date of Birth <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            value={formData.dob || ""}
            onChange={(e) => handleChange("dob", e.target.value)}
            onBlur={() => handleBlur("dob")}
            className={`w-full px-5 py-4 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition text-base ${
              errors.dob ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.dob && (
            <p className="text-red-500 text-xs mt-2">{errors.dob}</p>
          )}
        </div>

        {/* City */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            City <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.city || ""}
            onChange={(e) => handleChange("city", e.target.value)}
            onBlur={() => handleBlur("city")}
            className={`w-full px-5 py-4 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition text-base ${
              errors.city ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          {errors.city && (
            <p className="text-red-500 text-xs mt-2">{errors.city}</p>
          )}
        </div>

        {/* Pincode */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Pincode <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.pincode || ""}
            onChange={(e) => handleChange("pincode", e.target.value)}
            onBlur={() => handleBlur("pincode")}
            placeholder="6-digit pincode"
            maxLength={6}
            className={`w-full px-5 py-4 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition text-base ${
              errors.pincode ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.pincode && (
            <p className="text-red-500 text-xs mt-2">{errors.pincode}</p>
          )}
        </div>

        {/* PAN Card */}
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            PAN Card <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.panCard || ""}
            onChange={(e) =>
              handleChange("panCard", e.target.value.toUpperCase())
            }
            onBlur={() => handleBlur("panCard")}
            placeholder="ABCDE1234F"
            maxLength={10}
            className={`w-full px-5 py-4 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition text-base ${
              errors.panCard ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.panCard && (
            <p className="text-red-500 text-xs mt-2">{errors.panCard}</p>
          )}
        </div>
      </div>
    </div>
  );
}

// Step 2: Employment Info
export function EmploymentInfoStep({ formData, setFormData }: StepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: keyof CommonLoanFields, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const handleBlur = (field: keyof CommonLoanFields) => {
    let error = null;
    const value = formData[field];

    switch (field) {
      case "employmentType":
        error = validateRequired(value, "Employment Type");
        break;
      case "monthlyIncome":
        error = validateNumber(value, 0);
        break;
      case "employerName":
        error = validateRequired(value, "Employer/Business Name");
        break;
      case "existingEmi":
        error = validateNonNegativeNumber(value);
        break;
    }

    if (error) {
      setErrors({ ...errors, [field]: error });
    }
  };

  return (
    <div className="space-y-8">
      {/* Employment Type */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-4">
          Employment Type <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="employmentType"
              value="salaried"
              checked={formData.employmentType === "salaried"}
              onChange={(e) => handleChange("employmentType", e.target.value)}
              className="w-4 h-4 text-blue-600"
            />
            <span className="text-gray-700">Salaried</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="employmentType"
              value="self-employed"
              checked={formData.employmentType === "self-employed"}
              onChange={(e) => handleChange("employmentType", e.target.value)}
              className="w-4 h-4 text-blue-600"
            />
            <span className="text-gray-700">Self-Employed</span>
          </label>
        </div>
        {errors.employmentType && (
          <p className="text-red-500 text-xs mt-2">{errors.employmentType}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Monthly Income */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Monthly Income (₹) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            value={formData.monthlyIncome || ""}
            onChange={(e) => handleChange("monthlyIncome", e.target.value)}
            onBlur={() => handleBlur("monthlyIncome")}
            placeholder="Enter monthly income"
            className={`w-full px-5 py-4 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition text-base ${
              errors.monthlyIncome ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.monthlyIncome && (
            <p className="text-red-500 text-xs mt-2">{errors.monthlyIncome}</p>
          )}
        </div>

        {/* Employer Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            {formData.employmentType === "self-employed"
              ? "Business Name"
              : "Employer Name"}{" "}
            <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.employerName || ""}
            onChange={(e) => handleChange("employerName", e.target.value)}
            onBlur={() => handleBlur("employerName")}
            placeholder={
              formData.employmentType === "self-employed"
                ? "Enter business name"
                : "Enter employer name"
            }
            className={`w-full px-5 py-4 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition text-base ${
              errors.employerName ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.employerName && (
            <p className="text-red-500 text-xs mt-2">{errors.employerName}</p>
          )}
        </div>

        {/* Existing EMI */}
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Existing EMI (₹) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            value={formData.existingEmi || ""}
            onChange={(e) => handleChange("existingEmi", e.target.value)}
            onBlur={() => handleBlur("existingEmi")}
            placeholder="Enter 0 if no existing EMI"
            className={`w-full px-5 py-4 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition text-base ${
              errors.existingEmi ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.existingEmi && (
            <p className="text-red-500 text-xs mt-2">{errors.existingEmi}</p>
          )}
          <p className="text-sm text-gray-500 mt-2">
            Include all current loan EMIs
          </p>
        </div>
      </div>
    </div>
  );
}

