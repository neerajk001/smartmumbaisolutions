// Validation functions for form fields

export const validateFullName = (name: string): string | null => {
  if (!name || name.trim().length < 2) {
    return "Full name must be at least 2 characters";
  }
  return null;
};

export const validateMobileNumber = (mobile: string): string | null => {
  if (!mobile) return "Mobile number is required";
  const cleanMobile = mobile.replace(/\D/g, "");
  if (cleanMobile.length !== 10) {
    return "Mobile number must be 10 digits";
  }
  if (!/^[6-9]/.test(cleanMobile)) {
    return "Invalid mobile number";
  }
  return null;
};

export const validateEmail = (email: string): string | null => {
  if (!email) return "Email is required";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Please enter a valid email address";
  }
  return null;
};

export const validatePincode = (pincode: string): string | null => {
  if (!pincode) return "Pincode is required";
  const cleanPincode = pincode.replace(/\D/g, "");
  if (cleanPincode.length !== 6) {
    return "Pincode must be 6 digits";
  }
  return null;
};

export const validatePanCard = (pan: string): string | null => {
  if (!pan) return "PAN card number is required";
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  if (!panRegex.test(pan.toUpperCase())) {
    return "Invalid PAN format (e.g., ABCDE1234F)";
  }
  return null;
};

export const validateNumber = (value: string, min: number = 0): string | null => {
  if (!value) return "Value is required";
  const num = parseFloat(value);
  if (isNaN(num)) {
    return "Please enter a valid number";
  }
  if (num <= min) {
    return `Value must be greater than ${min}`;
  }
  return null;
};

export const validateNonNegativeNumber = (value: string): string | null => {
  if (!value) return "Value is required";
  const num = parseFloat(value);
  if (isNaN(num)) {
    return "Please enter a valid number";
  }
  if (num < 0) {
    return "Value cannot be negative";
  }
  return null;
};

export const validateRequired = (value: string, fieldName: string): string | null => {
  if (!value || value.trim().length === 0) {
    return `${fieldName} is required`;
  }
  return null;
};

export const validateVehicleNumber = (vehicleNo: string): string | null => {
  if (!vehicleNo) return "Vehicle number is required";
  // Format: MH12AB1234 or similar
  const vehicleRegex = /^[A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{4}$/;
  if (!vehicleRegex.test(vehicleNo.toUpperCase().replace(/[\s-]/g, ""))) {
    return "Invalid vehicle number format (e.g., MH12AB1234)";
  }
  return null;
};

export const validateAge = (age: string, min: number = 18, max: number = 100): string | null => {
  if (!age) return "Age is required";
  const ageNum = parseInt(age);
  if (isNaN(ageNum)) {
    return "Please enter a valid age";
  }
  if (ageNum < min || ageNum > max) {
    return `Age must be between ${min} and ${max}`;
  }
  return null;
};

export const validateDOB = (dob: string): string | null => {
  if (!dob) {
    return "Date of birth is required";
  }
  const date = new Date(dob);
  const today = new Date();
  const age = today.getFullYear() - date.getFullYear();

  if (age < 18) {
    return "You must be at least 18 years old";
  }
  if (age > 100) {
    return "Please enter a valid date of birth";
  }
  return null;
};

export const validateCarYear = (year: string, carType: string): string | null => {
  if (carType === "used") {
    if (!year) return "Year is required";
    const yearNum = parseInt(year);
    const currentYear = new Date().getFullYear();

    if (isNaN(yearNum)) {
      return "Please enter a valid year";
    }
    if (yearNum < 2018 || yearNum > currentYear) {
      return `Year must be between 2018 and ${currentYear}`;
    }
  }
  return null;
};

export const validateDownPayment = (downPayment: string, carPrice: string): string | null => {
  if (!downPayment || !carPrice) return "Values are required";
  const dp = parseFloat(downPayment);
  const price = parseFloat(carPrice);

  if (isNaN(dp) || isNaN(price)) {
    return "Please enter valid amounts";
  }

  const minDownPayment = price * 0.1; // 10% minimum
  if (dp < minDownPayment) {
    return `Minimum down payment is 10% (₹${minDownPayment.toLocaleString()})`;
  }

  if (dp > price) {
    return "Down payment cannot exceed car price";
  }

  return null;
};

export const validateLAPAmount = (loanAmount: string, propertyCost: string): string | null => {
  if (!loanAmount || !propertyCost) return "Values are required";
  const loan = parseFloat(loanAmount);
  const property = parseFloat(propertyCost);

  if (isNaN(loan) || isNaN(property)) {
    return "Please enter valid amounts";
  }

  const maxLoan = property * 0.7; // 70% maximum
  if (loan > maxLoan) {
    return `Maximum loan amount is 70% of property value (₹${maxLoan.toLocaleString()})`;
  }

  return null;
};



