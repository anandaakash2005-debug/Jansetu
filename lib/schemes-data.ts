export interface Scheme {
  id: string
  name: string
  nameHindi: string
  nameBengali: string
  category: 'scholarship' | 'loan' | 'skill' | 'startup' | 'welfare'
  benefit: string
  benefitAmount?: string
  restrictedForGovEmployees?: boolean;
  eligibility: {
    maxAge?: number
    minAge?: number
    maxIncome?: number
    education?: string[]
    occupation?: string[]
    states?: string[]
    gender?: 'male' | 'female' | 'all'
    category?: string[]
  }
  documents: string[]
  description: string
  descriptionHindi: string
  descriptionBengali: string
  applicationLink: string
  ministry: string
}

export const schemes: Scheme[] = [
  {
    id: 'pm-scholarship',
    name: 'Prime Minister Scholarship Scheme',
    nameHindi: 'प्रधानमंत्री छात्रवृत्ति योजना',
    nameBengali: 'প্রধানমন্ত্রী বৃত্তি প্রকল্প',
    category: 'scholarship',
    benefit: 'Monthly scholarship for higher education',
    benefitAmount: '₹3,000/month',
    eligibility: {
      maxAge: 25,
      minAge: 18,
      maxIncome: 800000,
      education: ['12th Pass', 'Graduate', 'Post Graduate'],
      gender: 'all',
    },
    documents: ['Aadhaar Card', '10th Marksheet', '12th Marksheet', 'Income Certificate', 'Bank Passbook', 'Passport Photo'],
    description: 'This scholarship supports students from families of ex-servicemen and ex-coast guard personnel for professional degree courses.',
    descriptionHindi: 'यह छात्रवृत्ति पूर्व सैनिकों और तटरक्षक कर्मियों के परिवारों के छात्रों को व्यावसायिक डिग्री पाठ्यक्रमों के लिए सहायता प्रदान करती है।',
    descriptionBengali: 'এই বৃত্তি প্রাক্তন সেনা এবং উপকূল রক্ষী কর্মীদের পরিবারের শিক্ষার্থীদের পেশাদার ডিগ্রি কোর্সের জন্য সহায়তা করে।',
    applicationLink: 'https://scholarships.gov.in',
    ministry: 'Ministry of Defence',
  },
  {
    id: 'nsf-scholarship',
    name: 'National Scholarship Portal - Central Sector Scheme',
    nameHindi: 'केंद्रीय क्षेत्र योजना छात्रवृत्ति',
    nameBengali: 'কেন্দ্রীয় সেক্টর স্কলারশিপ',
    category: 'scholarship',
    benefit: 'Scholarship for meritorious students from low income families',
    benefitAmount: '₹12,000/year',
    restrictedForGovEmployees: true,
    eligibility: {
      maxAge: 30,
      minAge: 16,
      maxIncome: 450000,
      education: ['12th Pass', 'Graduate'],
      gender: 'all',
    },
    documents: ['Aadhaar Card', '10th Marksheet', '12th Marksheet', 'Income Certificate', 'Caste Certificate', 'Bank Account'],
    description: 'Financial assistance to meritorious students from low income families to meet day-to-day expenses during their studies.',
    descriptionHindi: 'कम आय वाले परिवारों के मेधावी छात्रों को उनकी पढ़ाई के दौरान दैनिक खर्चों को पूरा करने के लिए वित्तीय सहायता।',
    descriptionBengali: 'কম আয়ের পরিবারের মেধাবী শিক্ষার্থীদের পড়াশোনার সময় দৈনিক খরচ মেটাতে আর্থিক সহায়তা।',
    applicationLink: 'https://scholarships.gov.in',
    ministry: 'Ministry of Education',
  },
  {
    id: 'mudra-loan',
    name: 'Pradhan Mantri MUDRA Yojana',
    nameHindi: 'प्रधानमंत्री मुद्रा योजना',
    nameBengali: 'প্রধানমন্ত্রী মুদ্রা যোজনা',
    category: 'loan',
    benefit: 'Collateral-free loans for small businesses',
    benefitAmount: 'Up to ₹10 Lakh',
    eligibility: {
      maxAge: 65,
      minAge: 18,
      occupation: ['Self-employed', 'Small Business', 'Entrepreneur'],
      gender: 'all',
    },
    documents: ['Aadhaar Card', 'PAN Card', 'Business Plan', 'Address Proof', 'Bank Statement', 'Passport Photo'],
    description: 'MUDRA provides loans to small entrepreneurs and businesses without requiring collateral, categorized into Shishu, Kishore, and Tarun.',
    descriptionHindi: 'मुद्रा छोटे उद्यमियों और व्यवसायों को बिना किसी गारंटी के ऋण प्रदान करता है, जिसे शिशु, किशोर और तरुण में वर्गीकृत किया गया है।',
    descriptionBengali: 'মুদ্রা ছোট উদ্যোক্তা এবং ব্যবসায়ীদের জামানত ছাড়াই ঋণ প্রদান করে, যা শিশু, কিশোর এবং তরুণে শ্রেণীবদ্ধ।',
    applicationLink: 'https://www.mudra.org.in',
    ministry: 'Ministry of Finance',
  },
  {
    id: 'pmkvy',
    name: 'Pradhan Mantri Kaushal Vikas Yojana',
    nameHindi: 'प्रधानमंत्री कौशल विकास योजना',
    nameBengali: 'প্রধানমন্ত্রী কৌশল বিকাশ যোজনা',
    category: 'skill',
    benefit: 'Free skill training with certification',
    benefitAmount: 'Free Training + ₹8,000 reward',
    eligibility: {
      maxAge: 45,
      minAge: 15,
      education: ['8th Pass', '10th Pass', '12th Pass', 'Graduate'],
      gender: 'all',
    },
    documents: ['Aadhaar Card', 'Education Certificate', 'Bank Account', 'Passport Photo'],
    description: 'Free skill training program to enable Indian youth to take up industry-relevant skill training and become employable.',
    descriptionHindi: 'भारतीय युवाओं को उद्योग-प्रासंगिक कौशल प्रशिक्षण लेने और रोजगार योग्य बनने के लिए मुफ्त कौशल प्रशिक्षण कार्यक्रम।',
    descriptionBengali: 'ভারতীয় যুবকদের শিল্প-প্রাসঙ্গিক দক্ষতা প্রশিক্ষণ নিতে এবং কর্মসংস্থানযোগ্য হতে বিনামূল্যে দক্ষতা প্রশিক্ষণ কার্যক্রম।',
    applicationLink: 'https://www.pmkvyofficial.org',
    ministry: 'Ministry of Skill Development',
  },
  {
    id: 'startup-india',
    name: 'Startup India Seed Fund Scheme',
    nameHindi: 'स्टार्टअप इंडिया सीड फंड योजना',
    nameBengali: 'স্টার্টআপ ইন্ডিয়া সিড ফান্ড স্কিম',
    category: 'startup',
    benefit: 'Seed funding for early-stage startups',
    benefitAmount: 'Up to ₹50 Lakh',
    eligibility: {
      maxAge: 50,
      minAge: 18,
      occupation: ['Entrepreneur', 'Startup Founder'],
      gender: 'all',
    },
    documents: ['Aadhaar Card', 'PAN Card', 'Business Registration', 'Business Plan', 'Bank Account', 'Pitch Deck'],
    description: 'Financial assistance for proof of concept, prototype development, product trials, market entry and commercialization for startups.',
    descriptionHindi: 'स्टार्टअप्स के लिए अवधारणा के प्रमाण, प्रोटोटाइप विकास, उत्पाद परीक्षण, बाजार प्रवेश और व्यावसायीकरण के लिए वित्तीय सहायता।',
    descriptionBengali: 'স্টার্টআপগুলির জন্য ধারণার প্রমাণ, প্রোটোটাইপ উন্নয়ন, পণ্য পরীক্ষা, বাজারে প্রবেশ এবং বাণিজ্যিকীকরণের জন্য আর্থিক সহায়তা।',
    applicationLink: 'https://seedfund.startupindia.gov.in',
    ministry: 'Ministry of Commerce',
  },
  {
    id: 'pm-kisan',
    name: 'PM-KISAN Samman Nidhi',
    nameHindi: 'पीएम-किसान सम्मान निधि',
    nameBengali: 'পিএম-কিষাণ সম্মান নিধি',
    category: 'welfare',
    benefit: 'Direct income support to farmers',
    benefitAmount: '₹6,000/year',
    eligibility: {
      maxAge: 70,
      minAge: 18,
      occupation: ['Farmer', 'Agricultural Worker'],
      gender: 'all',
    },
    documents: ['Aadhaar Card', 'Land Records', 'Bank Account', 'Passport Photo'],
    description: 'Income support of Rs. 6000 per year in three equal installments to all land holding farmer families.',
    descriptionHindi: 'सभी भूमिधारक किसान परिवारों को तीन समान किस्तों में प्रति वर्ष 6000 रुपये की आय सहायता।',
    descriptionBengali: 'সমস্ত জমির মালিক কৃষক পরিবারগুলিকে তিনটি সমান কিস্তিতে প্রতি বছর ৬০০০ টাকা আয় সহায়তা।',
    applicationLink: 'https://pmkisan.gov.in',
    ministry: 'Ministry of Agriculture',
  },
  {
    id: 'sukanya-samriddhi',
    name: 'Sukanya Samriddhi Yojana',
    nameHindi: 'सुकन्या समृद्धि योजना',
    nameBengali: 'সুকন্যা সমৃদ্ধি যোজনা',
    category: 'welfare',
    benefit: 'Savings scheme for girl child education and marriage',
    benefitAmount: '8.2% interest rate',
    eligibility: {
      maxAge: 10,
      minAge: 0,
      gender: 'female',
    },
    documents: ['Birth Certificate', 'Parent Aadhaar Card', 'Address Proof', 'Passport Photo'],
    description: 'A government-backed savings scheme for parents of girl children, offering high interest rates and tax benefits.',
    descriptionHindi: 'बालिकाओं के माता-पिता के लिए एक सरकार समर्थित बचत योजना, जो उच्च ब्याज दरें और कर लाभ प्रदान करती है।',
    descriptionBengali: 'মেয়ে শিশুদের পিতামাতার জন্য একটি সরকার-সমর্থিত সঞ্চয় প্রকল্প, যা উচ্চ সুদের হার এবং কর সুবিধা প্রদান করে।',
    applicationLink: 'https://www.india.gov.in/sukanya-samriddhi-yojna',
    ministry: 'Ministry of Finance',
  },
  {
    id: 'ayushman-bharat',
    name: 'Ayushman Bharat - PMJAY',
    nameHindi: 'आयुष्मान भारत - पीएमजेएवाई',
    nameBengali: 'আয়ুষ্মান ভারত - পিএমজেএওয়াই',
    category: 'welfare',
    benefit: 'Free health insurance coverage',
    benefitAmount: 'Up to ₹5 Lakh/year',
    eligibility: {
      maxIncome: 300000,
      gender: 'all',
    },
    documents: ['Aadhaar Card', 'Ration Card', 'Income Certificate', 'Family Photo'],
    description: 'Health insurance scheme providing coverage of up to Rs. 5 lakh per family per year for secondary and tertiary care hospitalization.',
    descriptionHindi: 'स्वास्थ्य बीमा योजना जो माध्यमिक और तृतीयक देखभाल अस्पताल में भर्ती के लिए प्रति परिवार प्रति वर्ष 5 लाख रुपये तक का कवरेज प्रदान करती है।',
    descriptionBengali: 'স্বাস্থ্য বীমা প্রকল্প যা মাধ্যমিক এবং তৃতীয় স্তরের হাসপাতালে ভর্তির জন্য প্রতি পরিবার প্রতি বছর ৫ লাখ টাকা পর্যন্ত কভারেজ প্রদান করে।',
    applicationLink: 'https://pmjay.gov.in',
    ministry: 'Ministry of Health',
  },
  {
    id: 'pm-awas',
    name: 'Pradhan Mantri Awas Yojana',
    nameHindi: 'प्रधानमंत्री आवास योजना',
    nameBengali: 'প্রধানমন্ত্রী আবাস যোজনা',
    category: 'welfare',
    benefit: 'Affordable housing subsidy',
    benefitAmount: 'Up to ₹2.67 Lakh subsidy',
    eligibility: {
      maxIncome: 1800000,
      gender: 'all',
      category: ['EWS', 'LIG', 'MIG'],
    },
    documents: ['Aadhaar Card', 'Income Certificate', 'Address Proof', 'Bank Account', 'Property Documents'],
    description: 'Credit linked subsidy scheme for affordable housing to urban and rural poor.',
    descriptionHindi: 'शहरी और ग्रामीण गरीबों के लिए किफायती आवास के लिए क्रेडिट लिंक्ड सब्सिडी योजना।',
    descriptionBengali: 'শহুরে এবং গ্রামীণ দরিদ্রদের জন্য সাশ্রয়ী মূল্যের আবাসনের জন্য ক্রেডিট লিঙ্কড সাবসিডি স্কিম।',
    applicationLink: 'https://pmaymis.gov.in',
    ministry: 'Ministry of Housing',
  },
  {
    id: 'stand-up-india',
    name: 'Stand Up India Scheme',
    nameHindi: 'स्टैंड अप इंडिया योजना',
    nameBengali: 'স্ট্যান্ড আপ ইন্ডিয়া স্কিম',
    category: 'loan',
    benefit: 'Bank loans for SC/ST and women entrepreneurs',
    benefitAmount: '₹10 Lakh to ₹1 Crore',
    eligibility: {
      maxAge: 60,
      minAge: 18,
      occupation: ['Entrepreneur', 'Small Business'],
      gender: 'all',
      category: ['SC', 'ST', 'Women'],
    },
    documents: ['Aadhaar Card', 'Caste Certificate', 'Business Plan', 'Address Proof', 'Bank Statement', 'ID Proof'],
    description: 'Facilitates bank loans between Rs. 10 lakh and Rs. 1 crore to at least one SC/ST borrower and one woman borrower per bank branch.',
    descriptionHindi: 'प्रति बैंक शाखा कम से कम एक अनुसूचित जाति/जनजाति उधारकर्ता और एक महिला उधारकर्ता को 10 लाख रुपये से 1 करोड़ रुपये के बीच बैंक ऋण की सुविधा प्रदान करता है।',
    descriptionBengali: 'প্রতি ব্যাংক শাখায় কমপক্ষে একজন এসসি/এসটি ঋণগ্রহীতা এবং একজন মহিলা ঋণগ্রহীতাকে ১০ লাখ থেকে ১ কোটি টাকার মধ্যে ব্যাংক ঋণ সুবিধা প্রদান করে।',
    applicationLink: 'https://www.standupmitra.in',
    ministry: 'Ministry of Finance',
  },
]

export const categories = [
  { id: 'scholarship', name: 'Scholarship', nameHindi: 'छात्रवृत्ति', nameBengali: 'বৃত্তি', icon: 'GraduationCap' },
  { id: 'loan', name: 'Loan', nameHindi: 'ऋण', nameBengali: 'ঋণ', icon: 'Banknote' },
  { id: 'skill', name: 'Skill Development', nameHindi: 'कौशल विकास', nameBengali: 'দক্ষতা উন্নয়ন', icon: 'Wrench' },
  { id: 'startup', name: 'Startup', nameHindi: 'स्टार्टअप', nameBengali: 'স্টার্টআপ', icon: 'Rocket' },
  { id: 'welfare', name: 'Welfare', nameHindi: 'कल्याण', nameBengali: 'কল্যাণ', icon: 'Heart' },
]

export const states = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi', 'Jammu and Kashmir', 'Ladakh'
]

export const educationLevels = [
  '8th Pass', '10th Pass', '12th Pass', 'Graduate', 'Post Graduate', 'Diploma', 'ITI'
]

export const occupations = [
  'Student', 'Farmer', 'Self-employed', 'Small Business', 'Entrepreneur', 'Agricultural Worker', 'Unemployed', 'Government Employee', 'Private Employee', 'Startup Founder'
]
