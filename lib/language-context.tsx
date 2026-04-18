'use client'

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

export type Language = 'en' | 'hi' | 'bn'

interface Translations {
  [key: string]: {
    en: string
    hi: string
    bn: string
  }
}

export const translations: Translations = {
  // Navigation
  'nav.home': { en: 'Home', hi: 'होम', bn: 'হোম' },
  'nav.chat': { en: 'AI Assistant', hi: 'AI सहायक', bn: 'AI সহায়ক' },
  'nav.schemes': { en: 'Schemes', hi: 'योजनाएं', bn: 'প্রকল্প' },
  'nav.eligibility': { en: 'Check Eligibility', hi: 'पात्रता जांचें', bn: 'যোগ্যতা যাচাই' },
  'nav.guidance': { en: 'Apply Guide', hi: 'आवेदन गाइड', bn: 'আবেদন গাইড' },
  'nav.profile': { en: 'Profile', hi: 'प्रोफाइल', bn: 'প্রোফাইল' },
  'nav.login': { en: 'Login / Sign Up', hi: 'लॉगिन / साइन अप', bn: 'লগইন / সাইন আপ' },
  'nav.offline': { en: 'Offline Help', hi: 'ऑफलाइन सहायता', bn: 'অফলাইন সাহায্য' },
  
  // Landing Page
  'hero.title': { en: 'Find Government Schemes You Can Actually Use', hi: 'सरकारी योजनाएं खोजें जो आप वास्तव में उपयोग कर सकते हैं', bn: 'সরকারি প্রকল্প খুঁজুন যা আপনি আসলে ব্যবহার করতে পারবেন' },
  'hero.subtitle': { en: 'Talk to our AI assistant in your language. No forms, no confusion.', hi: 'अपनी भाषा में हमारे AI सहायक से बात करें। कोई फॉर्म नहीं, कोई भ्रम नहीं।', bn: 'আপনার ভাষায় আমাদের AI সহায়কের সাথে কথা বলুন। কোনো ফর্ম নেই, কোনো বিভ্রান্তি নেই।' },
  'hero.cta': { en: 'Start in Your Language', hi: 'अपनी भाषा में शुरू करें', bn: 'আপনার ভাষায় শুরু করুন' },
  
  // Features
  'feature.noForms': { en: 'No Forms Needed', hi: 'कोई फॉर्म नहीं', bn: 'কোনো ফর্ম দরকার নেই' },
  'feature.noFormsDesc': { en: 'Just talk naturally', hi: 'बस स्वाभाविक रूप से बात करें', bn: 'শুধু স্বাভাবিকভাবে কথা বলুন' },
  'feature.yourLanguage': { en: 'Your Language', hi: 'आपकी भाषा', bn: 'আপনার ভাষা' },
  'feature.yourLanguageDesc': { en: 'Hindi, Bengali, English', hi: 'हिंदी, बंगाली, अंग्रेजी', bn: 'হিন্দি, বাংলা, ইংরেজি' },
  'feature.aiPowered': { en: 'AI Powered', hi: 'AI संचालित', bn: 'AI চালিত' },
  'feature.aiPoweredDesc': { en: 'Smart eligibility matching', hi: 'स्मार्ट पात्रता मिलान', bn: 'স্মার্ট যোগ্যতা মিলান' },
  
  // Chat
  'chat.placeholder': { en: 'Type your message or use voice...', hi: 'अपना संदेश टाइप करें या वॉयस का उपयोग करें...', bn: 'আপনার বার্তা টাইপ করুন বা ভয়েস ব্যবহার করুন...' },
  'chat.send': { en: 'Send', hi: 'भेजें', bn: 'পাঠান' },
  'chat.listening': { en: 'Listening...', hi: 'सुन रहा है...', bn: 'শুনছি...' },
  'chat.welcome': { en: 'Hello! I am Saarthi, your guide to government schemes. How can I help you today?', hi: 'नमस्ते! मैं सारथी हूं, सरकारी योजनाओं के लिए आपका मार्गदर्शक। आज मैं आपकी कैसे मदद कर सकता हूं?', bn: 'হ্যালো! আমি সারথি, সরকারি প্রকল্পের জন্য আপনার গাইড। আজ আমি আপনাকে কীভাবে সাহায্য করতে পারি?' },
  
  // Schemes
  'schemes.title': { en: 'Government Schemes', hi: 'सरकारी योजनाएं', bn: 'সরকারি প্রকল্প' },
  'schemes.filter': { en: 'Filter by Category', hi: 'श्रेणी के अनुसार फ़िल्टर करें', bn: 'বিভাগ অনুসারে ফিল্টার করুন' },
  'schemes.all': { en: 'All Schemes', hi: 'सभी योजनाएं', bn: 'সব প্রকল্প' },
  'schemes.viewDetails': { en: 'View Details', hi: 'विवरण देखें', bn: 'বিস্তারিত দেখুন' },
  'schemes.apply': { en: 'Apply Now', hi: 'अभी आवेदन करें', bn: 'এখনই আবেদন করুন' },
  'schemes.whyQualify': { en: 'Why You Qualify', hi: 'आप क्यों पात्र हैं', bn: 'আপনি কেন যোগ্য' },
  'schemes.documents': { en: 'Required Documents', hi: 'आवश्यक दस्तावेज', bn: 'প্রয়োজনীয় নথি' },
  'schemes.benefit': { en: 'Benefit', hi: 'लाभ', bn: 'সুবিধা' },
  
  // Eligibility
  'eligibility.title': { en: 'Check Your Eligibility', hi: 'अपनी पात्रता जांचें', bn: 'আপনার যোগ্যতা যাচাই করুন' },
  'eligibility.age': { en: 'Your Age', hi: 'आपकी आयु', bn: 'আপনার বয়স' },
  'eligibility.income': { en: 'Annual Family Income', hi: 'वार्षिक पारिवारिक आय', bn: 'বার্ষিক পারিবারিক আয়' },
  'eligibility.education': { en: 'Education Level', hi: 'शिक्षा स्तर', bn: 'শিক্ষার স্তর' },
  'eligibility.occupation': { en: 'Occupation', hi: 'व्यवसाय', bn: 'পেশা' },
  'eligibility.state': { en: 'State', hi: 'राज्य', bn: 'রাজ্য' },
  'eligibility.gender': { en: 'Gender', hi: 'लिंग', bn: 'লিঙ্গ' },
  'eligibility.check': { en: 'Check Eligibility', hi: 'पात्रता जांचें', bn: 'যোগ্যতা যাচাই করুন' },
  'eligibility.results': { en: 'Schemes You May Qualify For', hi: 'योजनाएं जिनके लिए आप पात्र हो सकते हैं', bn: 'আপনি যোগ্য হতে পারেন এমন প্রকল্প' },
  
  // Profile
  'profile.title': { en: 'Your Profile', hi: 'आपकी प्रोफाइल', bn: 'আপনার প্রোফাইল' },
  'profile.saved': { en: 'Saved Schemes', hi: 'सहेजी गई योजनाएं', bn: 'সংরক্ষিত প্রকল্প' },
  'profile.history': { en: 'Search History', hi: 'खोज इतिहास', bn: 'অনুসন্ধান ইতিহাস' },
  
  // Offline
  'offline.title': { en: 'No Internet? No Problem!', hi: 'इंटरनेट नहीं? कोई बात नहीं!', bn: 'ইন্টারনেট নেই? কোনো সমস্যা নেই!' },
  'offline.csc': { en: 'Find Nearby CSC Centers', hi: 'नजदीकी CSC केंद्र खोजें', bn: 'কাছাকাছি CSC কেন্দ্র খুঁজুন' },
  'offline.download': { en: 'Download Scheme Info', hi: 'योजना की जानकारी डाउनलोड करें', bn: 'প্রকল্পের তথ্য ডাউনলোড করুন' },
  'offline.whatsapp': { en: 'Get Help on WhatsApp', hi: 'WhatsApp पर मदद लें', bn: 'WhatsApp-এ সাহায্য নিন' },
  
  // Common
  'common.male': { en: 'Male', hi: 'पुरुष', bn: 'পুরুষ' },
  'common.female': { en: 'Female', hi: 'महिला', bn: 'মহিলা' },
  'common.other': { en: 'Other', hi: 'अन्य', bn: 'অন্যান্য' },
  'common.select': { en: 'Select', hi: 'चुनें', bn: 'নির্বাচন করুন' },
  'common.save': { en: 'Save', hi: 'सहेजें', bn: 'সংরক্ষণ করুন' },
  'common.back': { en: 'Back', hi: 'वापस', bn: 'পিছনে' },
  'common.next': { en: 'Next', hi: 'अगला', bn: 'পরবর্তী' },
  'common.step': { en: 'Step', hi: 'चरण', bn: 'ধাপ' },
  'common.of': { en: 'of', hi: 'का', bn: 'এর' },
}

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')

  const t = useCallback((key: string): string => {
    const translation = translations[key]
    if (!translation) return key
    return translation[language] || translation.en || key
  }, [language])

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
