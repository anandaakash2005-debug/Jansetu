import { schemes, type Scheme } from './schemes-data'
import type { Language } from './language-context'
import type { UserProfile } from './user-context';

interface IntentResult {
  intent: 'scholarship' | 'loan' | 'skill' | 'startup' | 'welfare' | 'general' | 'greeting'
  keywords: string[]
}

const intentPatterns: Record<string, string[]> = {
  scholarship: ['scholarship', 'education', 'college', 'school', 'study', 'fee', 'student', 'पढ़ाई', 'छात्रवृत्ति', 'कॉलेज', 'স্কলারশিপ', 'পড়াশোনা'],
  loan: ['loan', 'money', 'borrow', 'business loan', 'finance', 'credit', 'ऋण', 'पैसा', 'ঋণ', 'টাকা'],
  skill: ['skill', 'training', 'course', 'learn', 'job', 'employment', 'कौशल', 'प्रशिक्षण', 'নৌকরি', 'দক্ষতা'],
  startup: ['startup', 'business', 'entrepreneur', 'company', 'funding', 'व्यापार', 'उद्यमी', 'ব্যবসা', 'উদ্যোক্তা'],
  welfare: ['health', 'insurance', 'housing', 'home', 'farmer', 'agriculture', 'girl', 'woman', 'स्वास्थ्य', 'बीमा', 'किसान', 'স্বাস্থ্য', 'কৃষক', 'মহিলা'],
  greeting: ['hello', 'hi', 'hey', 'namaste', 'help', 'नमस्ते', 'मदद', 'হ্যালো', 'সাহায্য']
}

const intentPriority = ['scholarship', 'loan', 'skill', 'startup', 'welfare', 'greeting']

function detectIntent(message: string): IntentResult {
  const lowerMessage = message.toLowerCase()
  const matched: Record<string, string[]> = {}

  for (const [intent, patterns] of Object.entries(intentPatterns)) {
    for (const pattern of patterns) {
      if (lowerMessage.includes(pattern.toLowerCase())) {
        if (!matched[intent]) matched[intent] = []
        matched[intent].push(pattern)
      }
    }
  }

  for (const intent of intentPriority) {
    if (matched[intent] && intent !== 'greeting') {
      return { intent: intent as IntentResult['intent'], keywords: matched[intent] }
    }
  }

  if (matched['greeting']) {
    return { intent: 'greeting', keywords: matched['greeting'] }
  }

  return { intent: 'general', keywords: [] }
}

function getSchemesByCategory(category: Scheme['category']): Scheme[] {
  return schemes.filter(s => s.category === category)
}

function formatSchemeResponse(scheme: Scheme, language: Language): string {
  const name =
    (language === 'hi' ? scheme.nameHindi : language === 'bn' ? scheme.nameBengali : null)
    ?? scheme.name

  const desc =
    (language === 'hi' ? scheme.descriptionHindi : language === 'bn' ? scheme.descriptionBengali : null)
    ?? scheme.description

  return `**${name}**\n${scheme.benefitAmount ? `Benefit: ${scheme.benefitAmount}\n` : ''}${desc}`
}

const responses: Record<string, Record<Language, string>> = {
  greeting: {
    en: "Hello! I'm Saarthi, your guide to government schemes. I can help you find:\n\n• Scholarships for education\n• Loans for business\n• Skill training programs\n• Startup funding\n• Health & welfare schemes\n\nJust tell me what you need! For example: 'I need money for college' or 'I want to start a business'",
    hi: "नमस्ते! मैं सारथी हूं, सरकारी योजनाओं के लिए आपका मार्गदर्शक। मैं आपको खोजने में मदद कर सकता हूं:\n\n• शिक्षा के लिए छात्रवृत्ति\n• व्यापार के लिए ऋण\n• कौशल प्रशिक्षण कार्यक्रम\n• स्टार्टअप फंडिंग\n• स्वास्थ्य और कल्याण योजनाएं\n\nबस मुझे बताएं आपको क्या चाहिए!",
    bn: "হ্যালো! আমি সারথি, সরকারি প্রকল্পের জন্য আপনার গাইড। আমি আপনাকে খুঁজে পেতে সাহায্য করতে পারি:\n\n• শিক্ষার জন্য বৃত্তি\n• ব্যবসার জন্য ঋণ\n• দক্ষতা প্রশিক্ষণ কার্যক্রম\n• স্টার্টআপ ফান্ডিং\n• স্বাস্থ্য ও কল্যাণ প্রকল্প\n\nশুধু আমাকে বলুন আপনার কী দরকার!"
  },
  scholarship: {
    en: "I found some education schemes that might help you:",
    hi: "मुझे कुछ शिक्षा योजनाएं मिलीं जो आपकी मदद कर सकती हैं:",
    bn: "আমি কিছু শিক্ষা প্রকল্প পেয়েছি যা আপনাকে সাহায্য করতে পারে:"
  },
  loan: {
    en: "Here are some loan schemes that might work for you:",
    hi: "यहां कुछ ऋण योजनाएं हैं जो आपके लिए काम कर सकती हैं:",
    bn: "এখানে কিছু ঋণ প্রকল্প আছে যা আপনার জন্য কাজ করতে পারে:"
  },
  skill: {
    en: "Great! Here are skill development programs you can join:",
    hi: "बढ़िया! यहां कौशल विकास कार्यक्रम हैं जिनसे आप जुड़ सकते हैं:",
    bn: "চমৎকার! এখানে দক্ষতা উন্নয়ন কার্যক্রম রয়েছে যাতে আপনি যোগ দিতে পারেন:"
  },
  startup: {
    en: "Exciting! Here are startup funding options:",
    hi: "रोमांचक! यहां स्टार्टअप फंडिंग विकल्प हैं:",
    bn: "উত্তেজনাপূর্ণ! এখানে স্টার্টআপ ফান্ডিং অপশন আছে:"
  },
  welfare: {
    en: "Here are welfare schemes that might benefit you:",
    hi: "यहां कल्याण योजनाएं हैं जो आपको लाभ पहुंचा सकती हैं:",
    bn: "এখানে কল্যাণ প্রকল্প রয়েছে যা আপনার উপকারে আসতে পারে:"
  },
  general: {
    en: "I can help you find government schemes! Try asking about:\n• Education scholarships\n• Business loans\n• Skill training\n• Startup funding\n• Health insurance\n• Housing schemes\n\nWhat would you like to know more about?",
    hi: "मैं आपको सरकारी योजनाएं खोजने में मदद कर सकता हूं! इनके बारे में पूछने का प्रयास करें:\n• शिक्षा छात्रवृत्ति\n• व्यापार ऋण\n• कौशल प्रशिक्षण\n• स्टार्टआप फंडिंग\n• स्वास्थ्य बीमा\n• आवास योजनाएं",
    bn: "আমি আপনাকে সরকারি প্রকল্প খুঁজে পেতে সাহায্য করতে পারি! জিজ্ঞাসা করার চেষ্টা করুন:\n• শিক্ষা বৃত্তি\n• ব্যবসা ঋণ\n• দক্ষতা প্রশিক্ষণ\n• স্টার্টআপ ফান্ডিং\n• স্বাস্থ্য বীমা\n• আবাসন প্রকল্প"
  }
}

export function processUserMessage(
  message: string,
  language: Language,
  profile?: UserProfile   // FIX: make profile optional so it never crashes if undefined
): string {
  const { intent } = detectIntent(message)

  if (intent === 'greeting') {
    return responses.greeting[language]
  }

  if (intent === 'general') {
    return responses.general[language]
  }

  let categorySchemes = getSchemesByCategory(intent as Scheme['category'])

  // FIX: only block scholarships when the user is ASKING about scholarships
  // Previously this filter ran on ALL intents, wrongly hiding results
  if (intent === 'scholarship' && profile?.income !== undefined && profile.income > 800000) {
    categorySchemes = []  // high income = no scholarship results at all
  }

  // FIX: gov employee filter only applies when schemes have that restriction flag
  if (profile?.is_gov_employee) {
    categorySchemes = categorySchemes.filter(s => s.restrictedForGovEmployees !== true)
  }

  // Build warning — only show scholarship warning if they asked about scholarships
  let warning = ''

  if (intent === 'scholarship' && profile?.income !== undefined && profile.income > 800000) {
    warning =
      language === 'hi'
        ? '⚠ आपकी आय अधिक है, कुछ छात्रवृत्तियां उपलब्ध नहीं हैं।'
        : language === 'bn'
          ? '⚠ আপনার আয় বেশি, কিছু বৃত্তি উপলব্ধ নয়।'
          : '⚠ Your income is high, some scholarships are not available.'
  }

  if (profile?.is_gov_employee) {
    warning +=
      (warning ? '\n' : '') +
      (language === 'hi'
        ? '⚠ सरकारी कर्मचारी परिवारों के लिए कुछ योजनाएं लागू नहीं होतीं।'
        : language === 'bn'
          ? '⚠ সরকারি কর্মচারী পরিবারের জন্য কিছু প্রকল্প প্রযোজ্য নয়।'
          : '⚠ Some schemes are not available for government employee families.')
  }

  // Handle empty result
  if (categorySchemes.length === 0) {
    return (
      (warning ? warning + '\n\n' : '') +
      (language === 'hi'
        ? '❌ आपके लिए कोई उपयुक्त योजना नहीं मिली। कृपया अपनी जानकारी अपडेट करें।'
        : language === 'bn'
          ? '❌ আপনার জন্য উপযুক্ত কোনো প্রকল্প পাওয়া যায়নি।'
          : '❌ No suitable schemes found for your profile.')
    )
  }

  const intro = responses[intent][language]

  const schemeDetails = categorySchemes
    .slice(0, 3)
    .map(s => formatSchemeResponse(s, language))
    .join('\n\n')

  const footer =
    language === 'hi'
      ? '\n\nअधिक जानकारी के लिए, "योजनाएं" पेज पर जाएं या अपनी पात्रता जांचें।'
      : language === 'bn'
        ? '\n\nআরও তথ্যের জন্য, "প্রকল্প" পৃষ্ঠায় যান বা আপনার যোগ্যতা যাচাই করুন।'
        : '\n\nFor more details, visit the Schemes page or check your eligibility.'

  return `${warning ? warning + '\n\n' : ''}${intro}\n\n${schemeDetails}${footer}`
}

export function getQuickReplies(language: Language): string[] {
  const replies: Record<Language, string[]> = {
    en: ['I need a scholarship', 'Help me start a business', 'I want skill training', 'Show health schemes'],
    hi: ['मुझे छात्रवृत्ति चाहिए', 'व्यापार शुरू करने में मदद करें', 'मुझे कौशल प्रशिक्षण चाहिए', 'स्वास्थ्य योजनाएं दिखाएं'],
    bn: ['আমার বৃত্তি দরকার', 'ব্যবসা শুরু করতে সাহায্য করুন', 'আমি দক্ষতা প্রশিক্ষণ চাই', 'স্বাস্থ্য প্রকল্প দেখান']
  }

  return replies[language]
}