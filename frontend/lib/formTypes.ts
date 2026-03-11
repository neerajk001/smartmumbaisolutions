// Common field types for all loan applications
export interface CommonLoanFields {
  // Step 1: Personal Details
  fullName: string;
  mobileNumber: string;
  email: string;
  pincode: string;
  dob: string;
  city: string;
  panCard: string;

  // Step 2: Employment Info
  employmentType: "salaried" | "self-employed" | "";
  monthlyIncome: string;
  employerName: string;
  existingEmi: string;
}

// Personal Loan specific fields
export interface PersonalLoanFields extends CommonLoanFields {
  loanAmount: string;
  tenure: string;
  loanPurpose: string;
}

// Business Loan specific fields
export interface BusinessLoanFields extends CommonLoanFields {
  businessType: string;
  turnover: string;
  yearsInBusiness: string;
  gstRegistered: "yes" | "no" | "";
  loanAmount: string;
  tenure: string;
  loanPurpose: string;
}

// Home Loan specific fields
export interface HomeLoanFields extends CommonLoanFields {
  propertyCost: string;
  propertyLoanType: string;
  propertyCity: string;
  propertyStatus: "ready" | "construction" | "";
}

// Loan Against Property specific fields
export interface LAPFields extends CommonLoanFields {
  propertyType: string;
  propertyCost: string;
  propertyCity: string;
  occupancyStatus: "self" | "rented" | "vacant" | "";
  loanAmount: string;
  tenure: string;
  loanPurpose: string;
}

// Car Loan specific fields
export interface CarLoanFields extends CommonLoanFields {
  carType: string;
  carMake: string;
  carModel: string;
  carVariant: string;
  carPrice: string;
  carYear: string;
  downPayment: string;
}

// Education Loan specific fields
export interface EducationLoanFields extends CommonLoanFields {
  courseName: string;
  instituteName: string;
  courseCountry: string;
  courseDuration: string;
  courseFee: string;
}

// Insurance Types
export interface HealthInsuranceFields {
  fullName: string;
  mobileNumber: string;
  dob: string;
  sumInsured: string;
}

export interface TermLifeInsuranceFields {
  fullName: string;
  mobileNumber: string;
  dob: string;
  sumInsured: string;
}

export interface CarInsuranceFields {
  fullName: string;
  mobileNumber: string;
  dob: string;
  pincode: string;
  vehicleNumber: string;
  policyTerm: string;
}

export interface BikeInsuranceFields {
  fullName: string;
  mobileNumber: string;
  dob: string;
  pincode: string;
  vehicleNumber: string;
  policyTerm: string;
}

export interface LoanProtectorFields {
  fullName: string;
  mobileNumber: string;
  age: string;
  loanType: string;
  loanAmount: string;
  tenure: string;
}

export interface EMIProtectorFields {
  fullName: string;
  mobileNumber: string;
  dob: string;
  loanType: string;
  loanAmount: string;
  tenure: string;
}

export type LoanType =
  | "personal-loan"
  | "business-loan"
  | "home-loan"
  | "mortgage-loan"
  | "car-loan"
  | "education-loan";

export type InsuranceType =
  | "health-insurance"
  | "term-life"
  | "car-insurance"
  | "bike-insurance"
  | "loan-protector"
  | "emi-protector";

