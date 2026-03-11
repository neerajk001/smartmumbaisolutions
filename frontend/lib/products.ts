import {
    HandCoins,
    Briefcase,
    Home,
    Building2,
    GraduationCap,
    Car,
    HeartPulse,
    Shield,
    Bike,
    ShieldCheck,
    FileText
} from "lucide-react";

export const loans = [
    {
        slug: "personal-loan",
        title: "Personal Loan",
        detail: "Up to ₹2cr",
        metric: "10.49% ROI",
        icon: HandCoins,
        image: "/card-logos/PersonalLoan.png",
        description: "Get instant personal loans with minimal documentation. Whether it's for a wedding, medical emergency, or travel, our personal loans offer flexible repayment tenures and competitive interest rates.",
        features: [
            "Instant Approval within 24 hours",
            "Minimal Documentation",
            "Flexible Tenure up to 60 months",
            "No Collateral Required"
        ],
        eligibility: [
            "Salaried individuals with minimum income of ₹25,000/month",
            "Self-employed professionals with 2 years business vintage",
            "Credit score of 750+",
            "Age between 21 and 60 years"
        ],
        documents: [
            "Identity Proof (Aadhar/PAN)",
            "Address Proof (Passport/Utility Bill)",
            "Last 3 months salary slips",
            "Last 6 months bank statement"
        ],
        faqs: [
            {
                question: "How soon can I get the loan disbursed?",
                answer: "Once approved, the loan amount is typically credited to your account within 24 hours."
            },
            {
                question: "Is there a prepayment penalty?",
                answer: "Foreclosure charges may apply after a lock-in period of 6-12 months, depending on the lender's policy."
            }
        ]
    },
    {
        slug: "business-loan",
        title: "Business Loan",
        detail: "Up to ₹2 Crores",
        metric: "14.00% ROI",
        icon: Briefcase,
        image: "/card-logos/BusinessLoan.png",
        description: "Fuel your business growth with our tailored business financing solutions. From working capital to expansion funds, we support your entrepreneurial journey.",
        features: [
            "Collateral-free options available",
            "Overdraft facility",
            "Flexible repayment options",
            "Quick disbursal"
        ],
        eligibility: [
            "Business vintage of at least 3 years",
            "Profitable for the last 2 years",
            "Minimum turnover of ₹40 Lakhs",
            "Age between 25 and 65 years"
        ],
        documents: [
            "Business Registration Proof",
            "GST Returns for last 12 months",
            "Last 2 years ITR and Balance Sheet",
            "KYC of promoters"
        ],
        faqs: [
            {
                question: "Do I need collateral?",
                answer: "We offer both secured and unsecured business loans. Unsecured loans do not require collateral up to a certain limit."
            },
            {
                question: "Can I get a top-up on my existing loan?",
                answer: "Yes, top-up loans are available for existing customers with a good repayment track record."
            }
        ]
    },
    {
        slug: "home-loan",
        title: "Home Loan",
        detail: "Up to ₹5 Crores",
        metric: "8.35% ROI",
        icon: Home,
        image: "/card-logos/HomeLoan (2).png",
        description: "Turn your dream home into reality with our affordable home loans. We offer attractive interest rates and long repayment tenures to make home ownership easy.",
        features: [
            "Doorstep service",
            "Balance transfer facility",
            "Top-up loan available",
            "PMAY subsidy benefits"
        ],
        eligibility: [
            "Salaried or self-employed individuals",
            "Minimum annual income of ₹3 Lakhs",
            "Age between 21 and 65 years",
            "Property should be within approved locations"
        ],
        documents: [
            "Property Title Deeds",
            "Agreement to Sell",
            "Income Proof (Salary Slips/ITR)",
            "KYC Documents"
        ],
        faqs: [
            {
                question: "What is the maximum tenure?",
                answer: "Home loans can have a requested tenure of up to 30 years depending on your age and eligibility."
            },
            {
                question: "Does the interest rate change?",
                answer: "You can choose between fixed and floating interest rates. Floating rates vary with the repo rate."
            }
        ]
    },
    {
        slug: "mortgage-loan",
        title: "Mortgage Loan",
        detail: "Up to 5cr",
        metric: "8.75% ROI",
        icon: Building2,
        image: "/card-logos/LAP (2).png",
        description: "Unlock the value of your property with a Loan Against Property. Use the funds for business needs, education, or personal requirements.",
        features: [
            "High LTV ratio",
            "Longer tenure up to 15 years",
            "Low interest rates",
            "Both residential and commercial property accepted"
        ],
        eligibility: [
            "Property must be freehold and clear of disputes",
            "Salaried or self-employed applicants",
            "Clear repayment history",
            "Property value assessment required"
        ],
        documents: [
            "Property Title Documents",
            "Latest Tax Paid Receipt",
            "Proof of Income",
            "Bank Statements"
        ],
        faqs: [
            {
                question: "What type of properties are accepted?",
                answer: "We accept residential, commercial, and industrial properties as collateral."
            },
            {
                question: "How is the loan amount decided?",
                answer: "The loan amount is typically 60-70% of the property's market value."
            }
        ]
    },
    {
        slug: "education-loan",
        title: "Education Loan",
        detail: "Up to ₹2 Crores",
        metric: "9.50% ROI",
        icon: GraduationCap,
        image: "/card-logos/EducationLoan.png",
        description: "Invest in your future with our comprehensive education loans. We cover tuition fees, living expenses, and travel costs for studies in India and abroad.",
        features: [
            "Cover for 100% expenses",
            "Moratorium period available",
            "Tax benefits under 80E",
            "Pre-visa disbursement"
        ],
        eligibility: [
            "Confirmed admission in recognized university",
            "Co-borrower (parent/guardian) required",
            "Good academic record",
            "Collateral required for loans above ₹7.5 Lakhs"
        ],
        documents: [
            "Admission Letter",
            "Fee Structure",
            "KYC of Student and Co-borrower",
            "Income proof of Co-borrower"
        ],
        faqs: [
            {
                question: "When does repayment start?",
                answer: "Repayment typically starts 6 months after the course completion or 1 year after getting a job, whichever is earlier."
            },
            {
                question: "Is margin money required?",
                answer: "For loans up to ₹4 Lakhs, no margin is required. Above that, 5-15% margin may apply."
            }
        ]
    },
    {
        slug: "car-loan",
        title: "Car Loan",
        detail: "Up to 90% Value",
        metric: "9.00% ROI",
        icon: Car,
        image: "/card-logos/CarLoan (2).png",
        description: "Drive home your dream car today. Our car loans come with instant approval and up to 100% on-road funding for select models.",
        features: [
            "Up to 90% on-road funding",
            "7 years repayment tenure",
            "Pre-approved offers",
            "Minimal paperwork"
        ],
        eligibility: [
            "Age 21 to 65 years",
            "Minimum annual income of ₹2.5 Lakhs",
            "Minimum 1 year of employment stability",
            "Good credit score"
        ],
        documents: [
            "Pro-forma Invoice from dealer",
            "KYC Documents",
            "Income Proof",
            "Bank Statements"
        ],
        faqs: [
            {
                question: "Can I get finance for a used car?",
                answer: "Yes, we offer loans for both new and certified pre-owned cars."
            },
            {
                question: "What is the tenure?",
                answer: "Car loan tenures range from 1 to 7 years."
            }
        ]
    }
];

export const insurances = [
    {
        slug: "health-insurance",
        title: "Health Insurance",
        detail: "₹1Cr Cover",
        metric: "Cashless",
        icon: HeartPulse,
        image: "/card-logos/HealthInsurance.png",
        description: "Comprehensive health coverage for you and your family. Protect your savings from medical emergencies with our cashless network hospitals.",
        features: [
            "Cashless treatment at 10,000+ hospitals",
            "No claim bonus",
            "Free health check-ups",
            "Pre & post hospitalization cover"
        ],
        eligibility: [
            "Entry age 18 years to 65 years",
            "Dependent children from 91 days to 25 years",
            "Lifetime renewability"
        ],
        documents: [
            "KYC Documents",
            "Medical check-up report (if applicable)",
            "Proposal Form"
        ],
        faqs: [
            {
                question: "Does it cover COVID-19?",
                answer: "Yes, most of our health plans cover COVID-19 hospitalization."
            },
            {
                question: "What is the waiting period?",
                answer: "Pre-existing diseases usually have a waiting period of 2-4 years."
            }
        ]
    },
    {
        slug: "term-life",
        title: "Term Life",
        detail: "Tax Benefits",
        metric: "₹10Cr+ Cover",
        icon: Shield,
        image: "/card-logos/terminsurance.png",
        description: "Secure your family's financial future with our pure term life insurance plans. High life cover at affordable premiums with tax benefits.",
        features: [
            "High coverage at low premium",
            "Critical illness rider",
            "Accidental death benefit",
            "Tax saving under 80C"
        ],
        eligibility: [
            "Age 18 to 65 years",
            "Should be an Indian resident",
            "Salaried or Self-employed"
        ],
        documents: [
            "Age Proof",
            "Income Proof",
            "Medical Reports (if required)",
            "Identity Proof"
        ],
        faqs: [
            {
                question: "Will I get money back at the end?",
                answer: "Standard term plans do not have maturity benefits, but Return of Premium (ROP) variants are available."
            },
            {
                question: "Is the premium fixed?",
                answer: "Yes, the premium amount usually remains constant throughout the policy term."
            }
        ]
    },
    {
        slug: "car-insurance",
        title: "Car Insurance",
        detail: "Instant Policy",
        metric: "Zero Dep",
        icon: Car,
        image: "/card-logos/CarInsurance.png",
        description: "Protect your car against damages, theft, and third-party liabilities. Get comprehensive coverage with add-ons like Zero Depreciation.",
        features: [
            "Cashless repairs",
            "24x7 Roadside assistance",
            "Engine protection cover",
            "No claim bonus protection"
        ],
        eligibility: [
            "Vehicle must be registered in India",
            "Valid fitness certificate for older cars"
        ],
        documents: [
            "RC Copy",
            "Previous Policy Copy (for renewal)",
            "KYC Documents"
        ],
        faqs: [
            {
                question: "What is IDV?",
                answer: "IDV (Insured Declared Value) is the maximum sum assured you get in case of total loss or theft."
            },
            {
                question: "How to claim?",
                answer: "Call our toll-free number immediately after an accident for assistance and claim registration."
            }
        ]
    },
    {
        slug: "bike-insurance",
        title: "Bike Insurance",
        detail: "Third Party",
        metric: "Comprehensive",
        icon: Bike,
        image: "/card-logos/BikeInsurance.png",
        description: "Two-wheeler insurance that covers damage to your bike and third-party liabilities. Quick renewal and instant policy issuance.",
        features: [
            "Instant policy issuance",
            "Third-party liability cover",
            "Personal accident cover",
            "Easy claim settlement"
        ],
        eligibility: [
            "Registered two-wheeler owner",
            "Valid driving license"
        ],
        documents: [
            "RC Copy",
            "Previous Policy details"
        ],
        faqs: [
            {
                question: "Is bike insurance mandatory?",
                answer: "Yes, Third-Party Liability insurance is mandatory for all vehicles in India."
            }
        ]
    },
    {
        slug: "loan-protector",
        title: "Loan Protector",
        detail: "Liability Cover",
        metric: "Secure",
        icon: ShieldCheck,
        image: "/card-logos/LoanProtector.png",
        description: "Ensure your loan liabilities are taken care of in case of unfortunate events. Protect your family from debt burden.",
        features: [
            "Covers outstanding loan amount",
            "Critical illness cover",
            "Accidental death cover",
            "Peace of mind"
        ],
        eligibility: [
            "Existing loan borrower",
            "Age 18 to 60 years"
        ],
        documents: [
            "Loan Account Statement",
            "KYC",
            "Health Declaration"
        ],
        faqs: [
            {
                question: "Does it cover job loss?",
                answer: "Some variants offer limited EMI protection in case of job loss. Check policy details."
            }
        ]
    },
    {
        slug: "emi-protector",
        title: "EMI Protector",
        detail: "Job Loss Cover",
        metric: "Assured",
        icon: FileText,
        image: "/card-logos/EMI Protector.png",
        description: "Secure your EMI payments against job loss or temporary disability. Maintain your credit score and financial stability.",
        features: [
            "Covers 3-6 months of EMI",
            "Job loss protection",
            "Accidental disability cover",
            "Simple claim process"
        ],
        eligibility: [
            "Salaried individuals only",
            "Minimum 2 years of work experience"
        ],
        documents: [
            "Salary Slips",
            "Termination Letter (for claim)",
            "Loan details"
        ],
        faqs: [
            {
                question: "Is voluntary resignation covered?",
                answer: "No, only involuntary job loss due to layoffs or retrenchment is typically covered."
            }
        ]
    }
];
