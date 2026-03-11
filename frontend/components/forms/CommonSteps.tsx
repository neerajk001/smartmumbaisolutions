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
import {
  User,
  Phone,
  Mail,
  Calendar,
  MapPin,
  Hash,
  CreditCard,
  Building2,
  Banknote,
  Wallet
} from "lucide-react";

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
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={formData.fullName || ""}
              onChange={(e) => handleChange("fullName", e.target.value)}
              onBlur={() => handleBlur("fullName")}
              placeholder="Enter your full name"
              className={`w-full pl-12 pr-5 py-3 bg-gray-50 border rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-300 text-base text-gray-900 shadow-sm ${errors.fullName ? "border-red-500" : "border-gray-200"
                }`}
            />
          </div>
          {errors.fullName && (
            <p className="text-red-500 text-xs mt-1 font-medium">{errors.fullName}</p>
          )}
        </div>

        {/* Mobile Number */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Mobile Number <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="tel"
              value={formData.mobileNumber || ""}
              onChange={(e) => handleChange("mobileNumber", e.target.value)}
              onBlur={() => handleBlur("mobileNumber")}
              placeholder="10-digit mobile number"
              maxLength={10}
              className={`w-full pl-12 pr-5 py-3 bg-gray-50 border rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-300 text-base text-gray-900 shadow-sm ${errors.mobileNumber ? "border-red-500" : "border-gray-200"
                }`}
            />
          </div>
          {errors.mobileNumber && (
            <p className="text-red-500 text-xs mt-2 font-medium">{errors.mobileNumber}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Email Address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="email"
              value={formData.email || ""}
              onChange={(e) => handleChange("email", e.target.value)}
              onBlur={() => handleBlur("email")}
              placeholder="your.email@example.com"
              className={`w-full pl-12 pr-5 py-3 bg-gray-50 border rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-300 text-base text-gray-900 shadow-sm ${errors.email ? "border-red-500" : "border-gray-200"
                }`}
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-xs mt-2 font-medium">{errors.email}</p>
          )}
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Date of Birth <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="date"
              value={formData.dob || ""}
              onChange={(e) => handleChange("dob", e.target.value)}
              onBlur={() => handleBlur("dob")}
              className={`w-full pl-12 pr-5 py-3 bg-gray-50 border rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-300 text-base text-gray-900 shadow-sm ${errors.dob ? "border-red-500" : "border-gray-200"
                }`}
            />
          </div>
          {errors.dob && (
            <p className="text-red-500 text-xs mt-2 font-medium">{errors.dob}</p>
          )}
        </div>

        {/* City */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            City <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <select
              value={formData.city || ""}
              onChange={(e) => handleChange("city", e.target.value)}
              onBlur={() => handleBlur("city")}
              className={`w-full pl-12 pr-5 py-3 bg-gray-50 border rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-300 text-base text-gray-900 shadow-sm appearance-none ${errors.city ? "border-red-500" : "border-gray-200"
                }`}
            >
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          {errors.city && (
            <p className="text-red-500 text-xs mt-2 font-medium">{errors.city}</p>
          )}
        </div>

        {/* Pincode */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Pincode <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={formData.pincode || ""}
              onChange={(e) => handleChange("pincode", e.target.value)}
              onBlur={() => handleBlur("pincode")}
              placeholder="6-digit pincode"
              maxLength={6}
              className={`w-full pl-12 pr-5 py-3 bg-gray-50 border rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-300 text-base text-gray-900 shadow-sm ${errors.pincode ? "border-red-500" : "border-gray-200"
                }`}
            />
          </div>
          {errors.pincode && (
            <p className="text-red-500 text-xs mt-2 font-medium">{errors.pincode}</p>
          )}
        </div>

        {/* PAN Card */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            PAN Card <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={formData.panCard || ""}
              onChange={(e) =>
                handleChange("panCard", e.target.value.toUpperCase())
              }
              onBlur={() => handleBlur("panCard")}
              placeholder="ABCDE1234F"
              maxLength={10}
              className={`w-full pl-12 pr-5 py-3 bg-gray-50 border rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-300 text-base text-gray-900 shadow-sm ${errors.panCard ? "border-red-500" : "border-gray-200"
                }`}
            />
          </div>
          {errors.panCard && (
            <p className="text-red-500 text-xs mt-2 font-medium">{errors.panCard}</p>
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
          <label className="flex items-center gap-3 cursor-pointer group">
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.employmentType === 'salaried' ? 'border-blue-600' : 'border-gray-300 group-hover:border-blue-400'}`}>
              {formData.employmentType === 'salaried' && <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />}
            </div>
            <input
              type="radio"
              name="employmentType"
              value="salaried"
              checked={formData.employmentType === "salaried"}
              onChange={(e) => handleChange("employmentType", e.target.value)}
              className="hidden"
            />
            <span className="text-gray-700 font-medium group-hover:text-blue-600 transition-colors">Salaried</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.employmentType === 'self-employed' ? 'border-blue-600' : 'border-gray-300 group-hover:border-blue-400'}`}>
              {formData.employmentType === 'self-employed' && <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />}
            </div>
            <input
              type="radio"
              name="employmentType"
              value="self-employed"
              checked={formData.employmentType === "self-employed"}
              onChange={(e) => handleChange("employmentType", e.target.value)}
              className="hidden"
            />
            <span className="text-gray-700 font-medium group-hover:text-blue-600 transition-colors">Self-Employed</span>
          </label>
        </div>
        {errors.employmentType && (
          <p className="text-red-500 text-xs mt-2 font-medium">{errors.employmentType}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Monthly Income */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Monthly Income (₹) <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Banknote className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="number"
              value={formData.monthlyIncome || ""}
              onChange={(e) => handleChange("monthlyIncome", e.target.value)}
              onBlur={() => handleBlur("monthlyIncome")}
              placeholder="Enter monthly income"
              className={`w-full pl-12 pr-5 py-3 bg-gray-50 border rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-300 text-base text-gray-900 shadow-sm ${errors.monthlyIncome ? "border-red-500" : "border-gray-200"
                }`}
            />
          </div>
          {errors.monthlyIncome && (
            <p className="text-red-500 text-xs mt-2 font-medium">{errors.monthlyIncome}</p>
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
          <div className="relative">
            <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
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
              className={`w-full pl-12 pr-5 py-3 bg-gray-50 border rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-300 text-base text-gray-900 shadow-sm ${errors.employerName ? "border-red-500" : "border-gray-200"
                }`}
            />
          </div>
          {errors.employerName && (
            <p className="text-red-500 text-xs mt-2 font-medium">{errors.employerName}</p>
          )}
        </div>

        {/* Existing EMI */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Existing EMI (₹) <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Wallet className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="number"
              value={formData.existingEmi || ""}
              onChange={(e) => handleChange("existingEmi", e.target.value)}
              onBlur={() => handleBlur("existingEmi")}
              placeholder="Enter 0 if no existing EMI"
              className={`w-full pl-12 pr-5 py-3 bg-gray-50 border rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-300 text-base text-gray-900 shadow-sm ${errors.existingEmi ? "border-red-500" : "border-gray-200"
                }`}
            />
          </div>
          {errors.existingEmi && (
            <p className="text-red-500 text-xs mt-2 font-medium">{errors.existingEmi}</p>
          )}
          <p className="text-sm text-gray-500 mt-2 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
            Include all current loan EMIs
          </p>
        </div>
      </div>
    </div>
  );
}

