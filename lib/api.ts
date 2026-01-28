/**
 * API Configuration for Smart Mumbai Solutions
 * 
 * Architecture:
 * - Frontend calls Next.js API routes at /api/* (same domain, no CORS issues)
 * - API routes proxy requests to Loan Sarathi backend
 * - API routes automatically add X-Application-Source header
 * 
 * Development: http://localhost:3001/api (Next.js API routes)
 * Production: http://localhost:3001/api (Next.js API routes) → https://loansarathi.com/api
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ||
  (typeof window !== 'undefined' ? '/api' : 'http://localhost:3001/api');

// Cache configuration
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes in milliseconds
interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

// In-memory cache for API responses
const apiCache = new Map<string, CacheEntry<any>>();

// Helper function to get from cache or fetch
function getCachedOrFetch<T>(
  cacheKey: string,
  fetchFn: () => Promise<T>
): Promise<T> {
  const cached = apiCache.get(cacheKey);
  const now = Date.now();

  // Return cached data if still valid
  if (cached && (now - cached.timestamp) < CACHE_TTL) {
    return Promise.resolve(cached.data);
  }

  // Fetch fresh data and cache it
  return fetchFn().then(data => {
    apiCache.set(cacheKey, { data, timestamp: now });
    return data;
  });
}

// API Response Types
interface ApiSuccessResponse {
  success: true;
  applicationId: string;
  message: string;
  data: {
    applicationId: string;
    status: string;
    createdAt: string;
  };
}

interface ApiErrorResponse {
  success: false;
  error?: string;
  errors?: Record<string, string>;
}

type ApiResponse = ApiSuccessResponse | ApiErrorResponse;

// Helper function to convert form sum insured to number
function parseSumInsured(sumInsured: string): number {
  // Convert "₹5L", "₹10L", "₹1Cr" etc. to numbers
  if (!sumInsured) return 0;

  const cleanValue = sumInsured.replace('₹', '').trim();

  if (cleanValue.endsWith('Cr')) {
    return parseFloat(cleanValue.replace('Cr', '')) * 10000000;
  } else if (cleanValue.endsWith('L')) {
    return parseFloat(cleanValue.replace('L', '')) * 100000;
  }

  return parseFloat(cleanValue) || 0;
}

// Map form loan types to API loan types
function mapLoanTypeToSlug(loanType: string): string {
  const mapping: Record<string, string> = {
    'Personal Loan': 'personal-loan',
    'Business Loan': 'business-loan',
    'Home Loan': 'home-loan',
    'Car Loan': 'car-loan',
    'Education Loan': 'education-loan',
  };

  return mapping[loanType] || loanType.toLowerCase().replace(/\s+/g, '-');
}

/**
 * Submit Loan Application
 */
export async function submitLoanApplication(loanType: string, formData: any): Promise<ApiResponse> {
  try {
    // Map form data to API format
    const requestBody: any = {
      loanType: loanType,
      personalInfo: {
        fullName: formData.fullName,
        email: formData.email || '',
        mobileNumber: formData.mobileNumber,
        dob: formData.dob,
        pincode: formData.pincode,
        city: formData.city,
        panCard: formData.panCard,
      },
      employmentInfo: {
        employmentType: formData.employmentType,
        monthlyIncome: parseFloat(formData.monthlyIncome) || 0,
        employerName: formData.employerName,
        existingEmi: parseFloat(formData.existingEmi) || 0,
      },
    };

    // Add Business Details (for business-loan)
    if (loanType === 'business-loan' && formData.businessType) {
      requestBody.businessDetails = {
        businessType: formData.businessType,
        turnover: parseFloat(formData.turnover) || 0,
        yearsInBusiness: parseInt(formData.yearsInBusiness) || 0,
        gstRegistered: formData.gstRegistered === 'yes',
      };
    }

    // Add Property Details (for home-loan, loan-against-property)
    if ((loanType === 'home-loan' || loanType === 'mortgage-loan') && formData.propertyCost) {
      requestBody.propertyDetails = {
        propertyCost: parseFloat(formData.propertyCost) || 0,
        currentMarketValue: parseFloat(formData.propertyCost) || 0, // Using same value
        propertyLoanType: formData.propertyLoanType || 'purchase',
        propertyType: formData.propertyType || 'apartment',
        propertyCity: formData.propertyCity || formData.city,
        propertyStatus: formData.propertyStatus === 'ready' ? 'ready-to-move' : 'under-construction',
        occupancyStatus: formData.occupancyStatus === 'self' ? 'self-occupied' : formData.occupancyStatus || 'self-occupied',
      };
    }

    // Add Loan Requirement (for personal, business, LAP)
    if (formData.loanAmount) {
      requestBody.loanRequirement = {
        loanAmount: parseFloat(formData.loanAmount) || 0,
        tenure: parseInt(formData.tenure) || 0,
        loanPurpose: formData.loanPurpose || 'General purpose',
      };
    }

    // Add Car Details (for car-loan)
    if (loanType === 'car-loan' && formData.carMake) {
      requestBody.carDetails = {
        carType: formData.carType,
        carMake: formData.carMake,
        carModel: formData.carModel,
        carVariant: formData.carVariant,
        carPrice: parseFloat(formData.carPrice) || 0,
        carYear: formData.carYear,
        downPayment: parseFloat(formData.downPayment) || 0,
      };
    }

    // Add Education Details (for education-loan)
    if (loanType === 'education-loan' && formData.courseName) {
      requestBody.educationDetails = {
        courseName: formData.courseName,
        instituteName: formData.instituteName,
        courseCountry: formData.courseCountry,
        courseDuration: formData.courseDuration,
        courseFee: parseFloat(formData.courseFee) || 0,
      };
    }

    const response = await fetch(`${API_BASE_URL}/applications/loan`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.error || 'Failed to submit loan application',
        errors: result.errors,
      };
    }

    return result;
  } catch (error) {
    console.error('Error submitting loan application:', error);
    return {
      success: false,
      error: 'Network error. Please check your connection and try again.',
    };
  }
}

/**
 * Submit Insurance Application
 */
export async function submitInsuranceApplication(insuranceType: string, formData: any): Promise<ApiResponse> {
  try {
    // Map form data to API format
    const requestBody: any = {
      insuranceType: insuranceType,
      basicInfo: {
        fullName: formData.fullName,
        mobileNumber: formData.mobileNumber,
        email: formData.email || '',
        dob: formData.dob || undefined,
        age: formData.age ? parseInt(formData.age) : undefined,
      },
    };

    // Add Sum Insured (for health-insurance, term-life)
    if ((insuranceType === 'health-insurance' || insuranceType === 'term-life') && formData.sumInsured) {
      requestBody.sumInsured = parseSumInsured(formData.sumInsured);
    }

    // Add Vehicle Info (for car-insurance, bike-insurance)
    if ((insuranceType === 'car-insurance' || insuranceType === 'bike-insurance') && formData.vehicleNumber) {
      requestBody.vehicleInfo = {
        pincode: formData.pincode,
        vehicleNumber: formData.vehicleNumber,
        policyTerm: parseInt(formData.policyTerm) || 1,
      };
    }

    // Add Loan Info (for loan-protector, emi-protector)
    if ((insuranceType === 'loan-protector' || insuranceType === 'emi-protector') && formData.loanType) {
      requestBody.loanInfo = {
        loanType: mapLoanTypeToSlug(formData.loanType),
        loanAmount: parseFloat(formData.loanAmount) || 0,
        tenure: parseInt(formData.tenure) || 0,
      };
    }

    const response = await fetch(`${API_BASE_URL}/applications/insurance`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.error || 'Failed to submit insurance application',
        errors: result.errors,
      };
    }

    return result;
  } catch (error) {
    console.error('Error submitting insurance application:', error);
    return {
      success: false,
      error: 'Network error. Please check your connection and try again.',
    };
  }
}

/**
 * Get Loan Products from backend API
 * @param slug - Optional: Get specific product by slug
 * @returns Loan products array or single product
 */
export interface LoanProduct {
  slug: string;
  title: string;
  maxAmount: string;
  interestRate: string;
}

export interface LoanProductsResponse {
  success: boolean;
  products?: LoanProduct[];
  product?: LoanProduct;
  error?: string;
}

export async function getLoanProducts(slug?: string): Promise<LoanProductsResponse> {
  const cacheKey = `loan-products_${slug || 'all'}`;

  return getCachedOrFetch(cacheKey, async () => {
    try {
      const url = slug
        ? `${API_BASE_URL}/loan-products?slug=${slug}`
        : `${API_BASE_URL}/loan-products`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store', // Don't use browser cache, we have our own
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.error || 'Failed to fetch loan products',
        };
      }

      return data;
    } catch (error: any) {
      // Gracefully handle backend unavailability in development
      if (error?.cause?.code === 'ECONNREFUSED' || error?.message?.includes('fetch failed')) {
        // Backend is offline, this is expected in standalone mode
        // Silently fail - static data will be used instead
      } else {
        console.error('Error fetching loan products:', error);
      }

      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error. Please check your connection and try again.',
      };
    }
  });
}


