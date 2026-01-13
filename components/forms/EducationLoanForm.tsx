"use client";

import { useState } from "react";
import MultiStepForm from "./MultiStepForm";
import { PersonalDetailsStep, EmploymentInfoStep } from "./CommonSteps";
import { EducationLoanFields } from "@/lib/formTypes";

interface EducationLoanFormProps {
  onSubmit: (data: EducationLoanFields) => void;
  onClose: () => void;
}

export default function EducationLoanForm({
  onSubmit,
  onClose,
}: EducationLoanFormProps) {
  const [formData, setFormData] = useState<Partial<EducationLoanFields>>({});
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
      if (!data.courseName?.trim())
        newErrors.courseName = "Course name is required";
      if (!data.instituteName?.trim())
        newErrors.instituteName = "Institute name is required";
      if (!data.courseCountry)
        newErrors.courseCountry = "Course country is required";
      if (!data.courseDuration)
        newErrors.courseDuration = "Course duration is required";
      if (!data.courseFee) newErrors.courseFee = "Course fee is required";
    }

    if (!isPreview) {
      setErrors(newErrors);
    }
    return Object.keys(newErrors).length === 0;
  };

  const EducationDetailsStep = () => {
    const handleChange = (field: keyof EducationLoanFields, value: string) => {
      setFormData({ ...formData, [field]: value });
      if (errors[field]) {
        setErrors({ ...errors, [field]: "" });
      }
    };

    const countries = [
      { value: "india", label: "India" },
      { value: "usa", label: "USA" },
      { value: "uk", label: "UK" },
      { value: "canada", label: "Canada" },
      { value: "australia", label: "Australia" },
      { value: "germany", label: "Germany" },
      { value: "other", label: "Other" },
    ];

    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Course Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Course Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.courseName || ""}
              onChange={(e) => handleChange("courseName", e.target.value)}
              placeholder="e.g., MBA, B.Tech, MS"
              className={`w-full px-5 py-4 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition text-base ${errors.courseName ? "border-red-500" : "border-gray-300"
                }`}
            />
            {errors.courseName && (
              <p className="text-red-500 text-xs mt-2">{errors.courseName}</p>
            )}
          </div>

          {/* Institute Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Institute/University Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.instituteName || ""}
              onChange={(e) => handleChange("instituteName", e.target.value)}
              placeholder="Enter institute name"
              className={`w-full px-5 py-4 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition text-base ${errors.instituteName ? "border-red-500" : "border-gray-300"
                }`}
            />
            {errors.instituteName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.instituteName}
              </p>
            )}
          </div>

          {/* Course Country */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Country <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.courseCountry || ""}
              onChange={(e) => handleChange("courseCountry", e.target.value)}
              className={`w-full px-5 py-4 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition text-base ${errors.courseCountry ? "border-red-500" : "border-gray-300"
                }`}
            >
              <option value="">Select Country</option>
              {countries.map((country) => (
                <option key={country.value} value={country.value}>
                  {country.label}
                </option>
              ))}
            </select>
            {errors.courseCountry && (
              <p className="text-red-500 text-xs mt-1">
                {errors.courseCountry}
              </p>
            )}
          </div>

          {/* Course Duration */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Course Duration (Years) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={formData.courseDuration || ""}
              onChange={(e) => handleChange("courseDuration", e.target.value)}
              placeholder="1-10 years"
              min="1"
              max="10"
              className={`w-full px-5 py-4 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition text-base ${errors.courseDuration ? "border-red-500" : "border-gray-300"
                }`}
            />
            {errors.courseDuration && (
              <p className="text-red-500 text-xs mt-1">
                {errors.courseDuration}
              </p>
            )}
          </div>

          {/* Course Fee */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Total Course Fee (₹) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={formData.courseFee || ""}
              onChange={(e) => handleChange("courseFee", e.target.value)}
              placeholder="Enter total course fee"
              className={`w-full px-5 py-4 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition text-base ${errors.courseFee ? "border-red-500" : "border-gray-300"
                }`}
            />
            {errors.courseFee && (
              <p className="text-red-500 text-xs mt-2">{errors.courseFee}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              Include tuition and other expenses
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
                  <span className="ml-2 font-medium">{formData.fullName}</span>
                </div>
                <div>
                  <span className="text-gray-600">Mobile:</span>
                  <span className="ml-2 font-medium">
                    {formData.mobileNumber}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Email:</span>
                  <span className="ml-2 font-medium">{formData.email}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Co-Applicant Details
              </h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Employment Type:</span>
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
                Education Details
              </h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Course:</span>
                  <span className="ml-2 font-medium">{formData.courseName}</span>
                </div>
                <div>
                  <span className="text-gray-600">Institute:</span>
                  <span className="ml-2 font-medium">
                    {formData.instituteName}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Country:</span>
                  <span className="ml-2 font-medium capitalize">
                    {formData.courseCountry}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Duration:</span>
                  <span className="ml-2 font-medium">
                    {formData.courseDuration}{" "}
                    {parseInt(formData.courseDuration || "0") === 1
                      ? "Year"
                      : "Years"}
                  </span>
                </div>
                <div className="col-span-2">
                  <span className="text-gray-600">Total Fee:</span>
                  <span className="ml-2 font-medium">
                    ₹{parseFloat(formData.courseFee || "0").toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <p className="text-xs text-gray-600">
            By submitting this application, you agree to our Terms & Conditions
            and Privacy Policy. Note: A co-applicant (parent/guardian) is
            required for education loans.
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
      title: "Co-Applicant Info",
      component: (
        <EmploymentInfoStep formData={formData} setFormData={setFormData} />
      ),
    },
    {
      title: "Education Details",
      component: <EducationDetailsStep />,
    },
    {
      title: "Review",
      component: <ReviewStep />,
    },
  ];

  const handleSubmit = (data: any) => {
    console.log("Education Loan Application Submitted:", data);
    onSubmit(data as EducationLoanFields);
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

