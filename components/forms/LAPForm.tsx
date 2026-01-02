"use client";

import { useState } from "react";
import MultiStepForm from "./MultiStepForm";
import { PersonalDetailsStep, EmploymentInfoStep } from "./CommonSteps";
import { LAPFields } from "@/lib/formTypes";
import { validateLAPAmount } from "@/lib/validation";

interface LAPFormProps {
  onSubmit: (data: LAPFields) => void;
  onClose: () => void;
}

export default function LAPForm({ onSubmit, onClose }: LAPFormProps) {
  const [formData, setFormData] = useState<Partial<LAPFields>>({});
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
        newErrors.employerName = "Employer name is required";
      if (!data.existingEmi && data.existingEmi !== "0")
        newErrors.existingEmi = "Existing EMI is required";
    } else if (stepIndex === 2) {
      if (!data.propertyType)
        newErrors.propertyType = "Property type is required";
      if (!data.propertyCost)
        newErrors.propertyCost = "Property cost is required";
      if (!data.propertyCity?.trim())
        newErrors.propertyCity = "Property city is required";
      if (!data.occupancyStatus)
        newErrors.occupancyStatus = "Occupancy status is required";
      if (!data.loanAmount) newErrors.loanAmount = "Loan amount is required";
      if (!data.tenure) newErrors.tenure = "Tenure is required";
      if (!data.loanPurpose?.trim())
        newErrors.loanPurpose = "Loan purpose is required";

      // Validate LAP amount (max 70% of property value)
      if (data.loanAmount && data.propertyCost) {
        const lapError = validateLAPAmount(data.loanAmount, data.propertyCost);
        if (lapError) {
          newErrors.loanAmount = lapError;
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const PropertyInfoStep = () => {
    const handleChange = (field: keyof LAPFields, value: string) => {
      setFormData({ ...formData, [field]: value });
      if (errors[field]) {
        setErrors({ ...errors, [field]: "" });
      }
    };

    const propertyTypes = [
      { value: "residential", label: "Residential" },
      { value: "commercial", label: "Commercial" },
      { value: "industrial", label: "Industrial" },
      { value: "plot", label: "Plot" },
    ];

    const tenures = ["1", "2", "3", "5", "7", "10", "15"];

    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Property Type */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Property Type <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.propertyType || ""}
              onChange={(e) => handleChange("propertyType", e.target.value)}
              className={`w-full px-5 py-4 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition text-base ${
                errors.propertyType ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Type</option>
              {propertyTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
            {errors.propertyType && (
              <p className="text-red-500 text-xs mt-2">{errors.propertyType}</p>
            )}
          </div>

          {/* Property Cost */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Property Market Value (₹) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={formData.propertyCost || ""}
              onChange={(e) => handleChange("propertyCost", e.target.value)}
              placeholder="Current market value"
              className={`w-full px-5 py-4 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition text-base ${
                errors.propertyCost ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.propertyCost && (
              <p className="text-red-500 text-xs mt-2">{errors.propertyCost}</p>
            )}
          </div>

          {/* Property City */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Property City <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.propertyCity || ""}
              onChange={(e) => handleChange("propertyCity", e.target.value)}
              placeholder="Enter property city"
              className={`w-full px-5 py-4 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition text-base ${
                errors.propertyCity ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.propertyCity && (
              <p className="text-red-500 text-xs mt-2">{errors.propertyCity}</p>
            )}
          </div>

          {/* Occupancy Status */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Occupancy Status <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="occupancyStatus"
                  value="self"
                  checked={formData.occupancyStatus === "self"}
                  onChange={(e) =>
                    handleChange("occupancyStatus", e.target.value)
                  }
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-gray-700 text-sm">Self</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="occupancyStatus"
                  value="rented"
                  checked={formData.occupancyStatus === "rented"}
                  onChange={(e) =>
                    handleChange("occupancyStatus", e.target.value)
                  }
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-gray-700 text-sm">Rented</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="occupancyStatus"
                  value="vacant"
                  checked={formData.occupancyStatus === "vacant"}
                  onChange={(e) =>
                    handleChange("occupancyStatus", e.target.value)
                  }
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-gray-700 text-sm">Vacant</span>
              </label>
            </div>
            {errors.occupancyStatus && (
              <p className="text-red-500 text-xs mt-1">
                {errors.occupancyStatus}
              </p>
            )}
          </div>

          {/* Loan Amount */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Loan Amount (₹) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={formData.loanAmount || ""}
              onChange={(e) => handleChange("loanAmount", e.target.value)}
              placeholder="Up to 70% of property value"
              className={`w-full px-5 py-4 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition text-base ${
                errors.loanAmount ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.loanAmount && (
              <p className="text-red-500 text-xs mt-2">{errors.loanAmount}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              Maximum 70% of property value
            </p>
          </div>

          {/* Tenure */}
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

          {/* Loan Purpose */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Loan Purpose <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.loanPurpose || ""}
              onChange={(e) => handleChange("loanPurpose", e.target.value)}
              placeholder="e.g., Business expansion, Medical, Education"
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
                Property Details
              </h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Type:</span>
                  <span className="ml-2 font-medium capitalize">
                    {formData.propertyType}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Market Value:</span>
                  <span className="ml-2 font-medium">
                    ₹
                    {parseFloat(formData.propertyCost || "0").toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">City:</span>
                  <span className="ml-2 font-medium">
                    {formData.propertyCity}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Occupancy:</span>
                  <span className="ml-2 font-medium capitalize">
                    {formData.occupancyStatus}
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
      title: "Property Info",
      component: <PropertyInfoStep />,
    },
    {
      title: "Review",
      component: <ReviewStep />,
    },
  ];

  const handleSubmit = (data: any) => {
    console.log("LAP Application Submitted:", data);
    onSubmit(data as LAPFields);
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

