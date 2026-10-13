// Generated sample data. VERIFY amounts and rules on official websites before real use.
window.DATA={
 "docTypes": [
  {
   "code": "aadhaar",
   "name": "Aadhaar Card",
   "issued_by": "UIDAI",
   "where_to_get": "Enrolment centre or CSC. Update at myaadhaar.uidai.gov.in"
  },
  {
   "code": "bank",
   "name": "Bank Passbook",
   "issued_by": "Bank / Post Office",
   "where_to_get": "Any bank branch or post office (Jan Dhan accounts need no minimum balance)"
  },
  {
   "code": "photo",
   "name": "Passport Size Photo",
   "issued_by": "Photo studio",
   "where_to_get": "Any photo studio"
  },
  {
   "code": "ration",
   "name": "Ration Card",
   "issued_by": "State Food & Civil Supplies",
   "where_to_get": "Food department office or CSC"
  },
  {
   "code": "income",
   "name": "Income Certificate",
   "issued_by": "Tahsil / Revenue Office",
   "where_to_get": "State e-District portal, Tahsildar office or CSC"
  },
  {
   "code": "caste",
   "name": "Caste Certificate",
   "issued_by": "Tahsil / District Office",
   "where_to_get": "State e-District portal, revenue office or CSC"
  },
  {
   "code": "residence",
   "name": "Residence Certificate",
   "issued_by": "Tahsil / Gram Panchayat",
   "where_to_get": "Tahsildar, panchayat, municipal office or CSC"
  },
  {
   "code": "birth",
   "name": "Birth Certificate",
   "issued_by": "Municipality / Panchayat",
   "where_to_get": "Local registrar of births and deaths"
  },
  {
   "code": "disability",
   "name": "Disability Certificate (UDID)",
   "issued_by": "Government hospital medical board",
   "where_to_get": "Apply at swavlambancard.gov.in"
  },
  {
   "code": "land",
   "name": "Land Ownership Document",
   "issued_by": "Revenue Department",
   "where_to_get": "State land records portal or village office"
  },
  {
   "code": "marksheet",
   "name": "Class 10 / 12 / Degree Marksheet",
   "issued_by": "School / College / Board",
   "where_to_get": "Your institution"
  },
  {
   "code": "vendor",
   "name": "Street Vendor Certificate",
   "issued_by": "Urban Local Body",
   "where_to_get": "Municipality office"
  },
  {
   "code": "udyam",
   "name": "Udyam Registration / Trade Licence",
   "issued_by": "MSME / Local body",
   "where_to_get": "udyamregistration.gov.in (free)"
  },
  {
   "code": "artisan",
   "name": "Artisan Trade Proof",
   "issued_by": "Panchayat / Guild",
   "where_to_get": "Local panchayat or recognised body"
  }
 ],
 "schemes": [
  {
   "id": 1,
   "slug": "pm-kisan",
   "name": "PM-KISAN Samman Nidhi",
   "level": "Central",
   "state": null,
   "category": "Agriculture",
   "benefit": "₹6,000 per year in 3 instalments",
   "description": "Direct income support for farmer families.",
   "eligibility": [
    "Farmer family with cultivable land",
    "Valid Aadhaar",
    "Aadhaar-linked bank account"
   ],
   "how": [
    "Register at pmkisan.gov.in or a CSC",
    "Verify with Aadhaar OTP",
    "Track status with registration number"
   ],
   "website": "https://pmkisan.gov.in",
   "min_age": 18,
   "max_age": null,
   "max_income": null,
   "gender": null,
   "occupation": "farmer",
   "categories": null,
   "needs_disability": 0,
   "soft": 0,
   "documents": [
    {
     "code": "aadhaar",
     "mandatory": 1,
     "copies": 1
    },
    {
     "code": "bank",
     "mandatory": 1,
     "copies": 1
    },
    {
     "code": "land",
     "mandatory": 1,
     "copies": 1
    }
   ]
  },
  {
   "id": 2,
   "slug": "pm-jay",
   "name": "Ayushman Bharat PM-JAY",
   "level": "Central",
   "state": null,
   "category": "Health",
   "benefit": "Health cover up to ₹5 lakh per family per year",
   "description": "Cashless treatment in empanelled hospitals.",
   "eligibility": [
    "Family listed in SECC data, or senior aged 70+",
    "Valid Aadhaar"
   ],
   "how": [
    "Check eligibility at pmjay.gov.in",
    "Visit a CSC or Ayushman Mitra",
    "Get your Ayushman card"
   ],
   "website": "https://pmjay.gov.in",
   "min_age": null,
   "max_age": null,
   "max_income": 250000,
   "gender": null,
   "occupation": null,
   "categories": null,
   "needs_disability": 0,
   "soft": 1,
   "documents": [
    {
     "code": "aadhaar",
     "mandatory": 1,
     "copies": 1
    },
    {
     "code": "ration",
     "mandatory": 1,
     "copies": 1
    },
    {
     "code": "income",
     "mandatory": 0,
     "copies": 1
    }
   ]
  },
  {
   "id": 3,
   "slug": "apy",
   "name": "Atal Pension Yojana",
   "level": "Central",
   "state": null,
   "category": "Senior Citizens",
   "benefit": "Pension of ₹1,000 to ₹5,000 a month after 60",
   "description": "Guaranteed pension for unorganised workers.",
   "eligibility": [
    "Age 18 to 40",
    "Savings bank account"
   ],
   "how": [
    "Visit your bank or CSC",
    "Choose pension amount",
    "Auto-debit set up"
   ],
   "website": "https://www.npscra.nsdl.co.in",
   "min_age": 18,
   "max_age": 40,
   "max_income": null,
   "gender": null,
   "occupation": null,
   "categories": null,
   "needs_disability": 0,
   "soft": 0,
   "documents": [
    {
     "code": "aadhaar",
     "mandatory": 1,
     "copies": 1
    },
    {
     "code": "bank",
     "mandatory": 1,
     "copies": 1
    }
   ]
  },
  {
   "id": 4,
   "slug": "pmsby",
   "name": "PM Suraksha Bima Yojana",
   "level": "Central",
   "state": null,
   "category": "Social Welfare",
   "benefit": "₹2 lakh accident cover for ₹20 a year",
   "description": "Low-cost accident insurance.",
   "eligibility": [
    "Age 18 to 70",
    "Savings bank account"
   ],
   "how": [
    "Apply at your bank or CSC",
    "Give auto-debit consent"
   ],
   "website": "https://jansuraksha.gov.in",
   "min_age": 18,
   "max_age": 70,
   "max_income": null,
   "gender": null,
   "occupation": null,
   "categories": null,
   "needs_disability": 0,
   "soft": 0,
   "documents": [
    {
     "code": "aadhaar",
     "mandatory": 1,
     "copies": 1
    },
    {
     "code": "bank",
     "mandatory": 1,
     "copies": 1
    }
   ]
  },
  {
   "id": 5,
   "slug": "ujjwala",
   "name": "PM Ujjwala Yojana",
   "level": "Central",
   "state": null,
   "category": "Women & Child",
   "benefit": "Free LPG connection",
   "description": "LPG connection for women from poor households.",
   "eligibility": [
    "Woman aged 18+",
    "Low-income household",
    "No existing LPG connection"
   ],
   "how": [
    "Apply at an LPG distributor or CSC",
    "Submit KYC form"
   ],
   "website": "https://www.pmuy.gov.in",
   "min_age": 18,
   "max_age": null,
   "max_income": 100000,
   "gender": "F",
   "occupation": null,
   "categories": null,
   "needs_disability": 0,
   "soft": 0,
   "documents": [
    {
     "code": "aadhaar",
     "mandatory": 1,
     "copies": 1
    },
    {
     "code": "ration",
     "mandatory": 1,
     "copies": 1
    },
    {
     "code": "bank",
     "mandatory": 1,
     "copies": 1
    },
    {
     "code": "photo",
     "mandatory": 1,
     "copies": 2
    }
   ]
  },
  {
   "id": 6,
   "slug": "pmay",
   "name": "PM Awas Yojana",
   "level": "Central",
   "state": null,
   "category": "Housing",
   "benefit": "Financial help to build or buy a home",
   "description": "Housing support for eligible families.",
   "eligibility": [
    "No pucca house",
    "Low or middle income",
    "Not already a PMAY beneficiary"
   ],
   "how": [
    "Apply at pmaymis.gov.in or CSC",
    "Local body verifies",
    "Sanction and instalments"
   ],
   "website": "https://pmaymis.gov.in",
   "min_age": 18,
   "max_age": null,
   "max_income": 300000,
   "gender": null,
   "occupation": null,
   "categories": null,
   "needs_disability": 0,
   "soft": 1,
   "documents": [
    {
     "code": "aadhaar",
     "mandatory": 1,
     "copies": 1
    },
    {
     "code": "income",
     "mandatory": 1,
     "copies": 1
    },
    {
     "code": "residence",
     "mandatory": 1,
     "copies": 1
    },
    {
     "code": "bank",
     "mandatory": 1,
     "copies": 1
    },
    {
     "code": "photo",
     "mandatory": 1,
     "copies": 2
    }
   ]
  },
  {
   "id": 7,
   "slug": "nsap-old",
   "name": "Old-Age Pension (NSAP)",
   "level": "Central",
   "state": null,
   "category": "Senior Citizens",
   "benefit": "Monthly pension (states often add to it)",
   "description": "Pension for seniors from poor households.",
   "eligibility": [
    "Age 60+",
    "Below poverty line household"
   ],
   "how": [
    "Apply at panchayat, municipality or CSC",
    "Verification by local officer"
   ],
   "website": "https://nsap.nic.in",
   "min_age": 60,
   "max_age": null,
   "max_income": 100000,
   "gender": null,
   "occupation": null,
   "categories": null,
   "needs_disability": 0,
   "soft": 0,
   "documents": [
    {
     "code": "aadhaar",
     "mandatory": 1,
     "copies": 1
    },
    {
     "code": "birth",
     "mandatory": 1,
     "copies": 1
    },
    {
     "code": "income",
     "mandatory": 1,
     "copies": 1
    },
    {
     "code": "bank",
     "mandatory": 1,
     "copies": 1
    },
    {
     "code": "photo",
     "mandatory": 1,
     "copies": 2
    }
   ]
  },
  {
   "id": 8,
   "slug": "nsap-dis",
   "name": "Disability Pension (NSAP)",
   "level": "Central",
   "state": null,
   "category": "Disability",
   "benefit": "Monthly pension for severe disability",
   "description": "For persons with 80%+ disability from poor households.",
   "eligibility": [
    "Disability of 80% or more",
    "Age 18+",
    "Below poverty line"
   ],
   "how": [
    "Apply at CSC or social welfare office",
    "Medical certificate check"
   ],
   "website": "https://nsap.nic.in",
   "min_age": 18,
   "max_age": null,
   "max_income": 100000,
   "gender": null,
   "occupation": null,
   "categories": null,
   "needs_disability": 1,
   "soft": 0,
   "documents": [
    {
     "code": "aadhaar",
     "mandatory": 1,
     "copies": 1
    },
    {
     "code": "disability",
     "mandatory": 1,
     "copies": 1
    },
    {
     "code": "income",
     "mandatory": 1,
     "copies": 1
    },
    {
     "code": "bank",
     "mandatory": 1,
     "copies": 1
    },
    {
     "code": "photo",
     "mandatory": 1,
     "copies": 2
    }
   ]
  },
  {
   "id": 9,
   "slug": "svanidhi",
   "name": "PM SVANidhi",
   "level": "Central",
   "state": null,
   "category": "Employment",
   "benefit": "Loan from ₹10,000 with interest rebate on timely repayment",
   "description": "Working-capital loan for street vendors.",
   "eligibility": [
    "Street vendor with certificate or letter of recommendation"
   ],
   "how": [
    "Apply at pmsvanidhi.mohua.gov.in or CSC",
    "Bank sanctions loan"
   ],
   "website": "https://pmsvanidhi.mohua.gov.in",
   "min_age": 18,
   "max_age": null,
   "max_income": null,
   "gender": null,
   "occupation": "vendor",
   "categories": null,
   "needs_disability": 0,
   "soft": 0,
   "documents": [
    {
     "code": "aadhaar",
     "mandatory": 1,
     "copies": 1
    },
    {
     "code": "vendor",
     "mandatory": 1,
     "copies": 1
    },
    {
     "code": "bank",
     "mandatory": 1,
     "copies": 1
    }
   ]
  },
  {
   "id": 10,
   "slug": "vishwakarma",
   "name": "PM Vishwakarma",
   "level": "Central",
   "state": null,
   "category": "Employment",
   "benefit": "Training, toolkit and low-interest credit",
   "description": "Support for traditional artisans.",
   "eligibility": [
    "Works in one of the listed traditional trades",
    "Age 18+"
   ],
   "how": [
    "Register at pmvishwakarma.gov.in or CSC",
    "Verification",
    "Training and toolkit"
   ],
   "website": "https://pmvishwakarma.gov.in",
   "min_age": 18,
   "max_age": null,
   "max_income": null,
   "gender": null,
   "occupation": "artisan",
   "categories": null,
   "needs_disability": 0,
   "soft": 0,
   "documents": [
    {
     "code": "aadhaar",
     "mandatory": 1,
     "copies": 1
    },
    {
     "code": "artisan",
     "mandatory": 1,
     "copies": 1
    },
    {
     "code": "bank",
     "mandatory": 1,
     "copies": 1
    },
    {
     "code": "photo",
     "mandatory": 1,
     "copies": 1
    }
   ]
  },
  {
   "id": 11,
   "slug": "mudra",
   "name": "PM Mudra Yojana",
   "level": "Central",
   "state": null,
   "category": "Employment",
   "benefit": "Collateral-free business loans",
   "description": "Shishu, Kishor and Tarun loans for small businesses.",
   "eligibility": [
    "Small business or business plan",
    "Age 18+"
   ],
   "how": [
    "Apply at a bank, NBFC or udyamimitra.in",
    "Submit business details"
   ],
   "website": "https://www.mudra.org.in",
   "min_age": 18,
   "max_age": null,
   "max_income": null,
   "gender": null,
   "occupation": "business,unemployed",
   "categories": null,
   "needs_disability": 0,
   "soft": 1,
   "documents": [
    {
     "code": "aadhaar",
     "mandatory": 1,
     "copies": 1
    },
    {
     "code": "udyam",
     "mandatory": 0,
     "copies": 1
    },
    {
     "code": "bank",
     "mandatory": 1,
     "copies": 1
    },
    {
     "code": "photo",
     "mandatory": 1,
     "copies": 2
    },
    {
     "code": "residence",
     "mandatory": 1,
     "copies": 1
    }
   ]
  },
  {
   "id": 12,
   "slug": "nsp",
   "name": "National Scholarship Portal",
   "level": "Central",
   "state": null,
   "category": "Education",
   "benefit": "Scholarship for tuition and maintenance",
   "description": "Central and state scholarships.",
   "eligibility": [
    "Enrolled student",
    "Family income within the scheme limit",
    "Marks as required"
   ],
   "how": [
    "Register at scholarships.gov.in",
    "Fill the form and upload documents",
    "Institute verifies"
   ],
   "website": "https://scholarships.gov.in",
   "min_age": null,
   "max_age": null,
   "max_income": 250000,
   "gender": null,
   "occupation": "student",
   "categories": null,
   "needs_disability": 0,
   "soft": 1,
   "documents": [
    {
     "code": "aadhaar",
     "mandatory": 1,
     "copies": 1
    },
    {
     "code": "marksheet",
     "mandatory": 1,
     "copies": 1
    },
    {
     "code": "income",
     "mandatory": 1,
     "copies": 1
    },
    {
     "code": "caste",
     "mandatory": 0,
     "copies": 1
    },
    {
     "code": "bank",
     "mandatory": 1,
     "copies": 1
    },
    {
     "code": "photo",
     "mandatory": 1,
     "copies": 1
    }
   ]
  },
  {
   "id": 13,
   "slug": "eshram",
   "name": "e-Shram Card",
   "level": "Central",
   "state": null,
   "category": "Employment",
   "benefit": "Free registration and ₹2 lakh accident cover",
   "description": "National database of unorganised workers.",
   "eligibility": [
    "Unorganised worker aged 16 to 59",
    "Not an EPFO/ESIC member"
   ],
   "how": [
    "Register at eshram.gov.in or CSC",
    "Aadhaar OTP verification"
   ],
   "website": "https://eshram.gov.in",
   "min_age": 16,
   "max_age": 59,
   "max_income": null,
   "gender": null,
   "occupation": "worker,vendor,artisan",
   "categories": null,
   "needs_disability": 0,
   "soft": 0,
   "documents": [
    {
     "code": "aadhaar",
     "mandatory": 1,
     "copies": 1
    },
    {
     "code": "bank",
     "mandatory": 1,
     "copies": 1
    }
   ]
  },
  {
   "id": 14,
   "slug": "kl-kasp",
   "name": "Karunya Arogya Suraksha (KASP)",
   "level": "State",
   "state": "Kerala",
   "category": "Health",
   "benefit": "Health cover up to ₹5 lakh per family per year",
   "description": "Kerala health protection scheme.",
   "eligibility": [
    "Kerala resident",
    "Eligible family category"
   ],
   "how": [
    "Apply through the local body or CSC",
    "Enrol and get card"
   ],
   "website": "https://www.myscheme.gov.in",
   "min_age": null,
   "max_age": null,
   "max_income": 250000,
   "gender": null,
   "occupation": null,
   "categories": null,
   "needs_disability": 0,
   "soft": 1,
   "documents": [
    {
     "code": "aadhaar",
     "mandatory": 1,
     "copies": 1
    },
    {
     "code": "ration",
     "mandatory": 1,
     "copies": 1
    },
    {
     "code": "income",
     "mandatory": 1,
     "copies": 1
    }
   ]
  },
  {
   "id": 15,
   "slug": "tn-magalir",
   "name": "Kalaignar Magalir Urimai Thogai",
   "level": "State",
   "state": "Tamil Nadu",
   "category": "Women & Child",
   "benefit": "Monthly ₹1,000 for women heads of family",
   "description": "Income support for eligible women.",
   "eligibility": [
    "Woman head of family",
    "Tamil Nadu resident",
    "Within income limit"
   ],
   "how": [
    "Apply at the designated camp or CSC"
   ],
   "website": "https://www.myscheme.gov.in",
   "min_age": 21,
   "max_age": null,
   "max_income": 250000,
   "gender": "F",
   "occupation": null,
   "categories": null,
   "needs_disability": 0,
   "soft": 1,
   "documents": [
    {
     "code": "aadhaar",
     "mandatory": 1,
     "copies": 1
    },
    {
     "code": "ration",
     "mandatory": 1,
     "copies": 1
    },
    {
     "code": "bank",
     "mandatory": 1,
     "copies": 1
    }
   ]
  },
  {
   "id": 16,
   "slug": "ka-gruha",
   "name": "Gruha Lakshmi",
   "level": "State",
   "state": "Karnataka",
   "category": "Women & Child",
   "benefit": "Monthly ₹2,000 for the woman head of a family",
   "description": "Karnataka guarantee scheme.",
   "eligibility": [
    "Woman head of family",
    "Karnataka resident"
   ],
   "how": [
    "Apply at Seva Sindhu or a CSC"
   ],
   "website": "https://www.myscheme.gov.in",
   "min_age": 18,
   "max_age": null,
   "max_income": null,
   "gender": "F",
   "occupation": null,
   "categories": null,
   "needs_disability": 0,
   "soft": 1,
   "documents": [
    {
     "code": "aadhaar",
     "mandatory": 1,
     "copies": 1
    },
    {
     "code": "ration",
     "mandatory": 1,
     "copies": 1
    },
    {
     "code": "bank",
     "mandatory": 1,
     "copies": 1
    }
   ]
  },
  {
   "id": 17,
   "slug": "mh-ladki",
   "name": "Majhi Ladki Bahin Yojana",
   "level": "State",
   "state": "Maharashtra",
   "category": "Women & Child",
   "benefit": "Monthly ₹1,500 for eligible women",
   "description": "Maharashtra women support scheme.",
   "eligibility": [
    "Woman aged 21 to 65",
    "Maharashtra resident",
    "Family income up to ₹2.5 lakh"
   ],
   "how": [
    "Apply online or at the Anganwadi or CSC"
   ],
   "website": "https://www.myscheme.gov.in",
   "min_age": 21,
   "max_age": 65,
   "max_income": 250000,
   "gender": "F",
   "occupation": null,
   "categories": null,
   "needs_disability": 0,
   "soft": 0,
   "documents": [
    {
     "code": "aadhaar",
     "mandatory": 1,
     "copies": 1
    },
    {
     "code": "residence",
     "mandatory": 1,
     "copies": 1
    },
    {
     "code": "income",
     "mandatory": 1,
     "copies": 1
    },
    {
     "code": "bank",
     "mandatory": 1,
     "copies": 1
    },
    {
     "code": "photo",
     "mandatory": 1,
     "copies": 1
    }
   ]
  },
  {
   "id": 18,
   "slug": "wb-lakshmir",
   "name": "Lakshmir Bhandar",
   "level": "State",
   "state": "West Bengal",
   "category": "Women & Child",
   "benefit": "Monthly income support for women",
   "description": "West Bengal women support scheme.",
   "eligibility": [
    "Woman aged 25 to 60",
    "West Bengal resident"
   ],
   "how": [
    "Apply at Duare Sarkar camp or CSC"
   ],
   "website": "https://www.myscheme.gov.in",
   "min_age": 25,
   "max_age": 60,
   "max_income": null,
   "gender": "F",
   "occupation": null,
   "categories": null,
   "needs_disability": 0,
   "soft": 1,
   "documents": [
    {
     "code": "aadhaar",
     "mandatory": 1,
     "copies": 1
    },
    {
     "code": "residence",
     "mandatory": 1,
     "copies": 1
    },
    {
     "code": "bank",
     "mandatory": 1,
     "copies": 1
    }
   ]
  },
  {
   "id": 19,
   "slug": "ts-aarogyasri",
   "name": "Aarogyasri",
   "level": "State",
   "state": "Telangana",
   "category": "Health",
   "benefit": "Health cover for low-income families",
   "description": "Telangana health scheme.",
   "eligibility": [
    "Telangana resident",
    "Low-income family"
   ],
   "how": [
    "Enrol via the local health office or CSC"
   ],
   "website": "https://www.myscheme.gov.in",
   "min_age": null,
   "max_age": null,
   "max_income": 250000,
   "gender": null,
   "occupation": null,
   "categories": null,
   "needs_disability": 0,
   "soft": 1,
   "documents": [
    {
     "code": "aadhaar",
     "mandatory": 1,
     "copies": 1
    },
    {
     "code": "ration",
     "mandatory": 1,
     "copies": 1
    },
    {
     "code": "income",
     "mandatory": 1,
     "copies": 1
    }
   ]
  }
 ]
};

// Sample alerts, news and CSC centres. Replace with real data. Dates are relative to today.
const day=n=>new Date(Date.now()+n*864e5).toISOString().slice(0,10);
window.DATA.alerts=[
 {id:"a1",slug:"nsp",type:"deadline",title:"Application deadline for scholarship",detail:"Sample alert. Check the last date on the official portal.",date:day(5)},
 {id:"a2",slug:"pm-kisan",type:"update",title:"PM-KISAN instalment update",detail:"Sample alert. Check e-KYC and bank seeding.",date:day(-2)},
 {id:"a3",slug:"pmay",type:"new",title:"Housing scheme window",detail:"Sample alert. Check your local body notice.",date:day(20)}];
window.DATA.news=[
 {title:"Scholarship applications open for students",category:"Education",level:"Central",date:day(0)},
 {title:"Farmer support instalment released",category:"Agriculture",level:"Central",date:day(-2)},
 {title:"Health card enrolment drive expanded",category:"Health",level:"Central",date:day(-4)},
 {title:"New state housing scheme announced",category:"Housing",level:"State",date:day(-6)}].map(n=>({...n,source:"Sample data",url:"https://pib.gov.in"}));
window.DATA.csc={name:"Your nearest Common Service Centre",hours:"Usually 9:00 AM to 6:00 PM",url:"https://locator.csccloud.in"};
