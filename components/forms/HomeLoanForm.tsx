"use client";

import { useState } from "react";
import MultiStepForm from "./MultiStepForm";
import { PersonalDetailsStep, EmploymentInfoStep } from "./CommonSteps";
import { HomeLoanFields } from "@/lib/formTypes";

interface HomeLoanFormProps {
  onSubmit: (data: HomeLoanFields) => void;
  onClose: () => void;
}

export default function HomeLoanForm({
  onSubmit,
  onClose,
}: HomeLoanFormProps) {
  const [formData, setFormData] = useState<Partial<HomeLoanFields>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep = (stepIndex: number, data: any, isPreview: boolean = false): boolean => {
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
      if (!data.propertyCost)
        newErrors.propertyCost = "Property cost is required";
      if (!data.propertyLoanType)
        newErrors.propertyLoanType = "Property loan type is required";
      if (!data.propertyCity?.trim())
        newErrors.propertyCity = "Property city is required";
      if (!data.propertyStatus)
        newErrors.propertyStatus = "Property status is required";
    }

    if (!isPreview) {
      setErrors(newErrors);
    }
    return Object.keys(newErrors).length === 0;
  };

  const PropertyDetailsStep = () => {
    const handleChange = (field: keyof HomeLoanFields, value: string) => {
      setFormData({ ...formData, [field]: value });
      if (errors[field]) {
        setErrors({ ...errors, [field]: "" });
      }
    };

    const propertyTypes = [
      { value: "new_purchase", label: "New Purchase" },
      { value: "resale", label: "Resale" },
      { value: "construction", label: "Construction" },
      { value: "plot", label: "Plot Purchase" },
    ];

    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Property Cost */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Property Cost (₹) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={formData.propertyCost || ""}
              onChange={(e) => handleChange("propertyCost", e.target.value)}
              placeholder="Estimated property value"
              className={`w-full px-5 py-4 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition text-base text-black ${errors.propertyCost ? "border-red-500" : "border-gray-300"
                }`}
            />
            {errors.propertyCost && (
              <p className="text-red-500 text-xs mt-2">{errors.propertyCost}</p>
            )}
          </div>

          {/* Property Loan Type */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Property Type <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.propertyLoanType || ""}
              onChange={(e) => handleChange("propertyLoanType", e.target.value)}
              className={`w-full px-5 py-4 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition text-base text-black ${errors.propertyLoanType ? "border-red-500" : "border-gray-300"
                }`}
            >
              <option value="">Select Type</option>
              {propertyTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
            {errors.propertyLoanType && (
              <p className="text-red-500 text-xs mt-1">
                {errors.propertyLoanType}
              </p>
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
              className={`w-full px-5 py-4 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition text-base text-black ${errors.propertyCity ? "border-red-500" : "border-gray-300"
                }`}
            />
            {errors.propertyCity && (
              <p className="text-red-500 text-xs mt-2">{errors.propertyCity}</p>
            )}
          </div>

          {/* Property Status */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Property Status <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="propertyStatus"
                  value="ready"
                  checked={formData.propertyStatus === "ready"}
                  onChange={(e) =>
                    handleChange("propertyStatus", e.target.value)
                  }
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-gray-700">Ready to Move</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="propertyStatus"
                  value="construction"
                  checked={formData.propertyStatus === "construction"}
                  onChange={(e) =>
                    handleChange("propertyStatus", e.target.value)
                  }
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-gray-700">Under Construction</span>
              </label>
            </div>
            {errors.propertyStatus && (
              <p className="text-red-500 text-xs mt-1">
                {errors.propertyStatus}
              </p>
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
                Employment Details
              </h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Type:</span>
                  <span className="ml-2 font-medium capitalize">
                    {formData.employmentType}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Monthly Income:</span>
                  <span className="ml-2 font-medium">
                    ₹{parseFloat(formData.monthlyIncome || "0").toLocaleString()}
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
                  <span className="text-gray-600">Cost:</span>
                  <span className="ml-2 font-medium">
                    ₹
                    {parseFloat(formData.propertyCost || "0").toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Type:</span>
                  <span className="ml-2 font-medium capitalize">
                    {formData.propertyLoanType?.replace(/_/g, " ")}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">City:</span>
                  <span className="ml-2 font-medium">
                    {formData.propertyCity}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Status:</span>
                  <span className="ml-2 font-medium capitalize">
                    {formData.propertyStatus}
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
      title: "Property Details",
      component: <PropertyDetailsStep />,
    },
    {
      title: "Review",
      component: <ReviewStep />,
    },
  ];

  const handleSubmit = (data: any) => {
    console.log("Home Loan Application Submitted:", data);
    onSubmit(data as HomeLoanFields);
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

