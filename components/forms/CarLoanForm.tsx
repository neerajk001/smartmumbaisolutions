"use client";

import { useState } from "react";
import MultiStepForm from "./MultiStepForm";
import { PersonalDetailsStep, EmploymentInfoStep } from "./CommonSteps";
import { CarLoanFields } from "@/lib/formTypes";
import { validateCarYear, validateDownPayment } from "@/lib/validation";

interface CarLoanFormProps {
  onSubmit: (data: CarLoanFields) => void;
  onClose: () => void;
}

export default function CarLoanForm({ onSubmit, onClose }: CarLoanFormProps) {
  const [formData, setFormData] = useState<Partial<CarLoanFields>>({});
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
      if (!data.carType) newErrors.carType = "Car type is required";
      if (!data.carMake?.trim()) newErrors.carMake = "Car make is required";
      if (!data.carModel?.trim()) newErrors.carModel = "Car model is required";
      if (!data.carVariant?.trim())
        newErrors.carVariant = "Car variant is required";
      if (!data.carPrice) newErrors.carPrice = "Car price is required";
      if (!data.downPayment)
        newErrors.downPayment = "Down payment is required";

      // Validate car year for used cars
      if (data.carType === "used" && data.carYear) {
        const yearError = validateCarYear(data.carYear, data.carType);
        if (yearError) {
          newErrors.carYear = yearError;
        }
      } else if (data.carType === "used" && !data.carYear) {
        newErrors.carYear = "Car year is required for used cars";
      }

      // Validate down payment and loan amount
      if (data.downPayment && data.carPrice) {
        const dpError = validateDownPayment(data.downPayment, data.carPrice);
        if (dpError) {
          newErrors.downPayment = dpError;
        } else if (Number(data.carPrice) - Number(data.downPayment) < 10000) {
          newErrors.downPayment = "Loan amount (Price - Down Payment) must be at least ₹10,000";
        }
      }
    }

    if (!isPreview) {
      setErrors(newErrors);
    }
    return Object.keys(newErrors).length === 0;
  };

  const VehicleDetailsStep = () => {
    const handleChange = (field: keyof CarLoanFields, value: string) => {
      setFormData({ ...formData, [field]: value });
      if (errors[field]) {
        setErrors({ ...errors, [field]: "" });
      }
    };

    return (
      <div className="space-y-6">
        {/* Car Type */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Car Type <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="carType"
                value="new"
                checked={formData.carType === "new"}
                onChange={(e) => handleChange("carType", e.target.value)}
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-gray-700">New</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="carType"
                value="used"
                checked={formData.carType === "used"}
                onChange={(e) => handleChange("carType", e.target.value)}
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-gray-700">Used</span>
            </label>
          </div>
          {errors.carType && (
            <p className="text-red-500 text-xs mt-1">{errors.carType}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Car Make */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Car Make <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.carMake || ""}
              onChange={(e) => handleChange("carMake", e.target.value)}
              placeholder="e.g., Maruti, Hyundai, Honda"
              className={`w-full px-5 py-4 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition text-base ${errors.carMake ? "border-red-500" : "border-gray-300"
                }`}
            />
            {errors.carMake && (
              <p className="text-red-500 text-xs mt-2">{errors.carMake}</p>
            )}
          </div>

          {/* Car Model */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Car Model <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.carModel || ""}
              onChange={(e) => handleChange("carModel", e.target.value)}
              placeholder="e.g., Swift, i20, City"
              className={`w-full px-5 py-4 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition text-base ${errors.carModel ? "border-red-500" : "border-gray-300"
                }`}
            />
            {errors.carModel && (
              <p className="text-red-500 text-xs mt-2">{errors.carModel}</p>
            )}
          </div>

          {/* Car Variant */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Car Variant <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.carVariant || ""}
              onChange={(e) => handleChange("carVariant", e.target.value)}
              placeholder="e.g., VXi, SX, VX"
              className={`w-full px-5 py-4 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition text-base ${errors.carVariant ? "border-red-500" : "border-gray-300"
                }`}
            />
            {errors.carVariant && (
              <p className="text-red-500 text-xs mt-2">{errors.carVariant}</p>
            )}
          </div>

          {/* Car Price */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              On-Road Price (₹) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={formData.carPrice || ""}
              onChange={(e) => handleChange("carPrice", e.target.value)}
              placeholder="Enter on-road price"
              className={`w-full px-5 py-4 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition text-base ${errors.carPrice ? "border-red-500" : "border-gray-300"
                }`}
            />
            {errors.carPrice && (
              <p className="text-red-500 text-xs mt-2">{errors.carPrice}</p>
            )}
          </div>

          {/* Car Year (only for used cars) */}
          {formData.carType === "used" && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Manufacturing Year <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={formData.carYear || ""}
                onChange={(e) => handleChange("carYear", e.target.value)}
                placeholder="e.g., 2020"
                min="2018"
                max={new Date().getFullYear()}
                className={`w-full px-5 py-4 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition text-base ${errors.carYear ? "border-red-500" : "border-gray-300"
                  }`}
              />
              {errors.carYear && (
                <p className="text-red-500 text-xs mt-2">{errors.carYear}</p>
              )}
            </div>
          )}

          {/* Down Payment */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Down Payment (₹) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={formData.downPayment || ""}
              onChange={(e) => handleChange("downPayment", e.target.value)}
              placeholder="Min 10% of car price"
              className={`w-full px-5 py-4 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition text-base ${errors.downPayment ? "border-red-500" : "border-gray-300"
                }`}
            />
            {errors.downPayment && (
              <p className="text-red-500 text-xs mt-2">{errors.downPayment}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              Min. 10% of car price. Loan amount (Price - Down Payment) must be greater than ₹10,000
            </p>
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
                  <span className="ml-2 font-medium text-gray-900">{formData.fullName}</span>
                </div>
                <div>
                  <span className="text-gray-600">Mobile:</span>
                  <span className="ml-2 font-medium text-gray-900">
                    {formData.mobileNumber}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Vehicle Details
              </h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Type:</span>
                  <span className="ml-2 font-medium text-gray-900 capitalize">
                    {formData.carType}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Make & Model:</span>
                  <span className="ml-2 font-medium text-gray-900">
                    {formData.carMake} {formData.carModel}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Variant:</span>
                  <span className="ml-2 font-medium text-gray-900">{formData.carVariant}</span>
                </div>
                {formData.carType === "used" && (
                  <div>
                    <span className="text-gray-600">Year:</span>
                    <span className="ml-2 font-medium text-gray-900">{formData.carYear}</span>
                  </div>
                )}
                <div>
                  <span className="text-gray-600">On-Road Price:</span>
                  <span className="ml-2 font-medium text-gray-900">
                    ₹{parseFloat(formData.carPrice || "0").toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Down Payment:</span>
                  <span className="ml-2 font-medium text-gray-900">
                    ₹{parseFloat(formData.downPayment || "0").toLocaleString()}
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
                  <span className="text-gray-600">Loan Amount:</span>
                  <span className="ml-2 font-medium text-gray-900">
                    ₹
                    {(
                      parseFloat(formData.carPrice || "0") -
                      parseFloat(formData.downPayment || "0")
                    ).toLocaleString()}
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
      title: "Vehicle Details",
      component: <VehicleDetailsStep />,
    },
    {
      title: "Review",
      component: <ReviewStep />,
    },
  ];

  const handleSubmit = (data: any) => {
    console.log("Car Loan Application Submitted:", data);
    onSubmit(data as CarLoanFields);
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

