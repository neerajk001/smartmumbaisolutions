"use client";

import { useState } from "react";
import { User, Phone, CheckCircle2, UserCircle, Briefcase, MapPin, Banknote } from "lucide-react";

interface LendingFormProps {
  onSubmit: (data: any) => void;
  onClose: () => void;
}

export default function LendingForm({ onSubmit, onClose }: LendingFormProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    employmentType: "",
    monthlyIncome: "",
    loanAmount: "",
    pincode: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Name is required";
    if (!formData.mobileNumber.trim()) newErrors.mobileNumber = "Mobile no is required";
    if (!formData.employmentType) newErrors.employmentType = "Please select employment type";
    if (!formData.monthlyIncome) newErrors.monthlyIncome = "Monthly income is required";
    if (!formData.loanAmount) newErrors.loanAmount = "Loan amount is required";
    if (!formData.pincode.trim()) newErrors.pincode = "Pincode is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="bg-white rounded-xl p-8 min-h-[500px]">
      <div className="mb-6 pb-4 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900">Loan Application Form</h2>
        <p className="text-sm text-gray-500 mt-1">Please fill in your details</p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Customer name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => {
                  setFormData({ ...formData, fullName: e.target.value });
                  if (errors.fullName) setErrors({ ...errors, fullName: "" });
                }}
                placeholder="Enter your full name"
                className={`w-full pl-12 pr-5 py-3 bg-gray-50 border rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-300 text-base text-gray-900 ${errors.fullName ? "border-red-500" : "border-gray-200"}`}
              />
            </div>
            {errors.fullName && <p className="text-red-500 text-xs mt-1 font-medium">{errors.fullName}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Mobile no <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="tel"
                value={formData.mobileNumber}
                onChange={(e) => {
                  setFormData({ ...formData, mobileNumber: e.target.value });
                  if (errors.mobileNumber) setErrors({ ...errors, mobileNumber: "" });
                }}
                placeholder="10-digit mobile number"
                maxLength={10}
                className={`w-full pl-12 pr-5 py-3 bg-gray-50 border rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-300 text-base text-gray-900 ${errors.mobileNumber ? "border-red-500" : "border-gray-200"}`}
              />
            </div>
            {errors.mobileNumber && <p className="text-red-500 text-xs mt-1 font-medium">{errors.mobileNumber}</p>}
          </div>

          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Salaries/ self employed <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-col sm:flex-row gap-4">
              <label className="flex-1 cursor-pointer">
                <div className={`relative p-4 rounded-xl border-2 transition-all duration-200 ${formData.employmentType === 'salaried' ? 'border-blue-600 bg-blue-50/50' : 'border-gray-200 hover:border-blue-400'}`}>
                  <div className="flex items-center justify-between pointer-events-none">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${formData.employmentType === 'salaried' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
                        <UserCircle size={20} />
                      </div>
                      <span className="font-semibold text-gray-900">Salaried</span>
                    </div>
                    {formData.employmentType === 'salaried' && <CheckCircle2 className="text-blue-600" size={20} />}
                  </div>
                  <input
                    type="radio"
                    name="employmentType"
                    value="salaried"
                    className="hidden"
                    onChange={(e) => {
                      setFormData({ ...formData, employmentType: e.target.value });
                      if (errors.employmentType) setErrors({ ...errors, employmentType: "" });
                    }}
                  />
                </div>
              </label>

              <label className="flex-1 cursor-pointer">
                <div className={`relative p-4 rounded-xl border-2 transition-all duration-200 ${formData.employmentType === 'self-employed' ? 'border-blue-600 bg-blue-50/50' : 'border-gray-200 hover:border-blue-400'}`}>
                  <div className="flex items-center justify-between pointer-events-none">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${formData.employmentType === 'self-employed' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
                        <Briefcase size={20} />
                      </div>
                      <span className="font-semibold text-gray-900">Self Employed</span>
                    </div>
                    {formData.employmentType === 'self-employed' && <CheckCircle2 className="text-blue-600" size={20} />}
                  </div>
                  <input
                    type="radio"
                    name="employmentType"
                    value="self-employed"
                    className="hidden"
                    onChange={(e) => {
                      setFormData({ ...formData, employmentType: e.target.value });
                      if (errors.employmentType) setErrors({ ...errors, employmentType: "" });
                    }}
                  />
                </div>
              </label>
            </div>
            {errors.employmentType && <p className="text-red-500 text-xs mt-2 font-medium">{errors.employmentType}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Monthly income <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Banknote className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="number"
                value={formData.monthlyIncome}
                onChange={(e) => {
                  setFormData({ ...formData, monthlyIncome: e.target.value });
                  if (errors.monthlyIncome) setErrors({ ...errors, monthlyIncome: "" });
                }}
                placeholder="Enter monthly income"
                className={`w-full pl-12 pr-5 py-3 bg-gray-50 border rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-300 text-base text-gray-900 ${errors.monthlyIncome ? "border-red-500" : "border-gray-200"}`}
              />
            </div>
            {errors.monthlyIncome && <p className="text-red-500 text-xs mt-1 font-medium">{errors.monthlyIncome}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Loan amount <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Banknote className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="number"
                value={formData.loanAmount}
                onChange={(e) => {
                  setFormData({ ...formData, loanAmount: e.target.value });
                  if (errors.loanAmount) setErrors({ ...errors, loanAmount: "" });
                }}
                placeholder="Enter loan amount"
                className={`w-full pl-12 pr-5 py-3 bg-gray-50 border rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-300 text-base text-gray-900 ${errors.loanAmount ? "border-red-500" : "border-gray-200"}`}
              />
            </div>
            {errors.loanAmount && <p className="text-red-500 text-xs mt-1 font-medium">{errors.loanAmount}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Pincode <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={formData.pincode}
                onChange={(e) => {
                  setFormData({ ...formData, pincode: e.target.value });
                  if (errors.pincode) setErrors({ ...errors, pincode: "" });
                }}
                placeholder="6-digit pincode"
                maxLength={6}
                className={`w-full pl-12 pr-5 py-3 bg-gray-50 border rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-300 text-base text-gray-900 ${errors.pincode ? "border-red-500" : "border-gray-200"}`}
              />
            </div>
            {errors.pincode && <p className="text-red-500 text-xs mt-1 font-medium">{errors.pincode}</p>}
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-100">
        <button
          onClick={onClose}
          className="px-6 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="px-8 py-2.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors focus:ring-4 focus:ring-blue-600/20"
        >
          Submit
        </button>
      </div>
    </div>
  );
}