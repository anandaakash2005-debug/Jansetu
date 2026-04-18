'use client'

import { Suspense, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ArrowLeft, CheckCircle, Circle, FileText, AlertTriangle, Lightbulb, Download, Users, ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useLanguage } from '@/lib/language-context'
import { schemes } from '@/lib/schemes-data'
import { cn } from '@/lib/utils'

function GuidanceContent() {
  const searchParams = useSearchParams()
  const schemeId = searchParams.get('scheme')
  const { language, t } = useLanguage()
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [expandedStep, setExpandedStep] = useState<number | null>(0)
  const [parentMode, setParentMode] = useState(false)

  const scheme = schemeId ? schemes.find(s => s.id === schemeId) : null
  const title = scheme 
    ? (language === 'hi' ? scheme.nameHindi : language === 'bn' ? scheme.nameBengali : scheme.name)
    : null

  const toggleStep = (index: number) => {
    if (completedSteps.includes(index)) {
      setCompletedSteps(prev => prev.filter(i => i !== index))
    } else {
      setCompletedSteps(prev => [...prev, index])
    }
  }

  const applicationSteps = [
    {
      title: language === 'hi' ? 'दस्तावेज तैयार करें' : language === 'bn' ? 'নথি প্রস্তুত করুন' : 'Prepare Documents',
      description: language === 'hi' 
        ? 'सभी आवश्यक दस्तावेजों की फोटोकॉपी और ओरिजिनल तैयार रखें।'
        : language === 'bn'
        ? 'সমস্ত প্রয়োজনীয় নথির ফটোকপি এবং আসল প্রস্তুত রাখুন।'
        : 'Keep photocopies and originals of all required documents ready.',
      parentDesc: language === 'hi'
        ? 'अपने बच्चे के सभी कागजात इकट्ठा करें - आधार कार्ड, मार्कशीट, आय प्रमाण पत्र।'
        : language === 'bn'
        ? 'আপনার সন্তানের সমস্ত কাগজপত্র সংগ্রহ করুন - আধার কার্ড, মার্কশিট, আয়ের শংসাপত্র।'
        : 'Collect all your child\'s papers - Aadhaar card, marksheet, income certificate.',
      documents: scheme?.documents || ['Aadhaar Card', 'Income Certificate', 'Bank Account', 'Photo'],
    },
    {
      title: language === 'hi' ? 'आधिकारिक वेबसाइट पर जाएं' : language === 'bn' ? 'অফিসিয়াল ওয়েবসাইটে যান' : 'Visit Official Website',
      description: language === 'hi'
        ? 'योजना की आधिकारिक वेबसाइट पर जाएं और रजिस्ट्रेशन करें।'
        : language === 'bn'
        ? 'প্রকল্পের অফিসিয়াল ওয়েবসাইটে যান এবং নিবন্ধন করুন।'
        : 'Visit the scheme\'s official website and register.',
      parentDesc: language === 'hi'
        ? 'कंप्यूटर या मोबाइल पर सरकारी वेबसाइट खोलें। अगर मदद चाहिए तो CSC सेंटर जाएं।'
        : language === 'bn'
        ? 'কম্পিউটার বা মোবাইলে সরকারি ওয়েবসাইট খুলুন। সাহায্য লাগলে CSC সেন্টারে যান।'
        : 'Open the government website on computer or mobile. Go to CSC center if you need help.',
      link: scheme?.applicationLink,
    },
    {
      title: language === 'hi' ? 'फॉर्म भरें' : language === 'bn' ? 'ফর্ম পূরণ করুন' : 'Fill the Form',
      description: language === 'hi'
        ? 'सभी जानकारी सही-सही भरें। गलती होने पर आवेदन रद्द हो सकता है।'
        : language === 'bn'
        ? 'সমস্ত তথ্য সঠিকভাবে পূরণ করুন। ভুল হলে আবেদন বাতিল হতে পারে।'
        : 'Fill all information correctly. Mistakes can lead to rejection.',
      parentDesc: language === 'hi'
        ? 'फॉर्म में नाम, पता, बैंक खाता नंबर भरें। हर चीज आधार कार्ड से मिलनी चाहिए।'
        : language === 'bn'
        ? 'ফর্মে নাম, ঠিকানা, ব্যাংক অ্যাকাউন্ট নম্বর পূরণ করুন। সবকিছু আধার কার্ডের সাথে মিলতে হবে।'
        : 'Fill name, address, bank account number in form. Everything should match Aadhaar card.',
    },
    {
      title: language === 'hi' ? 'दस्तावेज अपलोड करें' : language === 'bn' ? 'নথি আপলোড করুন' : 'Upload Documents',
      description: language === 'hi'
        ? 'स्कैन किए गए दस्तावेज PDF या JPG फॉर्मेट में अपलोड करें।'
        : language === 'bn'
        ? 'স্ক্যান করা নথি PDF বা JPG ফর্ম্যাটে আপলোড করুন।'
        : 'Upload scanned documents in PDF or JPG format.',
      parentDesc: language === 'hi'
        ? 'फोन से कागजात की फोटो लेकर अपलोड करें। फोटो साफ होनी चाहिए।'
        : language === 'bn'
        ? 'ফোন দিয়ে কাগজপত্রের ছবি তুলে আপলোড করুন। ছবি পরিষ্কার হতে হবে।'
        : 'Take photos of documents with phone and upload. Photos should be clear.',
    },
    {
      title: language === 'hi' ? 'सबमिट और ट्रैक करें' : language === 'bn' ? 'সাবমিট এবং ট্র্যাক করুন' : 'Submit and Track',
      description: language === 'hi'
        ? 'आवेदन सबमिट करें और एप्लिकेशन नंबर नोट करें। स्टेटस ट्रैक करते रहें।'
        : language === 'bn'
        ? 'আবেদন সাবমিট করুন এবং অ্যাপ্লিকেশন নম্বর নোট করুন। স্ট্যাটাস ট্র্যাক করতে থাকুন।'
        : 'Submit application and note down the application number. Keep tracking status.',
      parentDesc: language === 'hi'
        ? 'सबमिट बटन दबाएं। जो नंबर मिले उसे लिख लें - इससे पता चलेगा कि पैसा कब आएगा।'
        : language === 'bn'
        ? 'সাবমিট বাটন টিপুন। যে নম্বর পাবেন সেটা লিখে রাখুন - এতে জানা যাবে টাকা কবে আসবে।'
        : 'Press submit button. Write down the number you get - this will tell when money will come.',
    },
  ]

  const tips = [
    {
      icon: AlertTriangle,
      title: language === 'hi' ? 'सामान्य गलतियां' : language === 'bn' ? 'সাধারণ ভুল' : 'Common Mistakes',
      items: language === 'hi' 
        ? ['नाम की spelling गलत', 'गलत बैंक अकाउंट नंबर', 'धुंधली फोटो अपलोड', 'आय प्रमाण पत्र पुराना']
        : language === 'bn'
        ? ['নামের বানান ভুল', 'ভুল ব্যাংক অ্যাকাউন্ট নম্বর', 'ঝাপসা ছবি আপলোড', 'আয়ের শংসাপত্র পুরানো']
        : ['Wrong name spelling', 'Wrong bank account number', 'Blurry photo upload', 'Old income certificate'],
    },
    {
      icon: Lightbulb,
      title: language === 'hi' ? 'सफलता के टिप्स' : language === 'bn' ? 'সাফল্যের টিপস' : 'Success Tips',
      items: language === 'hi'
        ? ['आधार कार्ड से नाम मिलाएं', 'सभी दस्तावेज 6 महीने से नए हों', 'फोटो साफ और पढ़ने योग्य हो', 'आवेदन की रसीद संभाल कर रखें']
        : language === 'bn'
        ? ['আধার কার্ডের সাথে নাম মিলান', 'সমস্ত নথি ৬ মাসের মধ্যে হওয়া উচিত', 'ছবি পরিষ্কার এবং পড়ার যোগ্য হওয়া উচিত', 'আবেদনের রসিদ সংরক্ষণ করুন']
        : ['Match name with Aadhaar card', 'All documents should be within 6 months', 'Photo should be clear and readable', 'Keep application receipt safe'],
    },
  ]

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Button variant="ghost" size="sm" asChild className="mb-4 gap-1.5">
            <Link href={scheme ? `/schemes/${scheme.id}` : '/schemes'}>
              <ArrowLeft className="h-4 w-4" />
              {t('common.back')}
            </Link>
          </Button>
          
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
            {language === 'hi' ? 'आवेदन गाइड' : language === 'bn' ? 'আবেদন গাইড' : 'Application Guide'}
          </h1>
          {title && (
            <p className="mt-2 text-muted-foreground">{title}</p>
          )}

          {/* Parent Mode Toggle */}
          <button
            onClick={() => setParentMode(!parentMode)}
            className={cn(
              'mt-4 flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors',
              parentMode 
                ? 'bg-saffron/20 text-saffron' 
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            )}
          >
            <Users className="h-4 w-4" />
            {language === 'hi' 
              ? (parentMode ? 'सरल मोड चालू' : 'माता-पिता के लिए सरल भाषा')
              : language === 'bn'
              ? (parentMode ? 'সহজ মোড চালু' : 'পিতামাতার জন্য সহজ ভাষা')
              : (parentMode ? 'Simple Mode ON' : 'Simple Language for Parents')}
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Steps */}
          <div className="space-y-4 lg:col-span-2">
            {applicationSteps.map((step, index) => {
              const isCompleted = completedSteps.includes(index)
              const isExpanded = expandedStep === index
              
              return (
                <Card key={index} className={cn(isCompleted && 'border-green/50 bg-green/5')}>
                  <CardHeader 
                    className="cursor-pointer pb-2"
                    onClick={() => setExpandedStep(isExpanded ? null : index)}
                  >
                    <div className="flex items-start gap-3">
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleStep(index); }}
                        className={cn(
                          'mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors',
                          isCompleted 
                            ? 'border-green bg-green text-green-foreground' 
                            : 'border-muted-foreground text-muted-foreground'
                        )}
                      >
                        {isCompleted ? <CheckCircle className="h-4 w-4" /> : <span className="text-xs font-bold">{index + 1}</span>}
                      </button>
                      <div className="flex-1">
                        <CardTitle className="flex items-center justify-between text-base">
                          <span className={cn(isCompleted && 'text-green')}>{step.title}</span>
                          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  {isExpanded && (
                    <CardContent className="pt-0">
                      <p className="mb-3 pl-9 text-sm text-muted-foreground">
                        {parentMode ? step.parentDesc : step.description}
                      </p>
                      {step.documents && (
                        <div className="ml-9 rounded-lg bg-secondary p-3">
                          <p className="mb-2 text-xs font-medium text-muted-foreground">
                            {language === 'hi' ? 'आवश्यक दस्तावेज:' : language === 'bn' ? 'প্রয়োজনীয় নথি:' : 'Required Documents:'}
                          </p>
                          <ul className="grid gap-1 text-sm">
                            {step.documents.map((doc, i) => (
                              <li key={i} className="flex items-center gap-2">
                                <Circle className="h-1.5 w-1.5 fill-current" />
                                {doc}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {step.link && (
                        <Button asChild size="sm" className="ml-9 mt-3 gap-1.5">
                          <a href={step.link} target="_blank" rel="noopener noreferrer">
                            {language === 'hi' ? 'वेबसाइट खोलें' : language === 'bn' ? 'ওয়েবসাইট খুলুন' : 'Open Website'}
                          </a>
                        </Button>
                      )}
                    </CardContent>
                  )}
                </Card>
              )
            })}

            {/* Progress */}
            <Card className="bg-primary/5">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">
                    {language === 'hi' ? 'प्रगति' : language === 'bn' ? 'অগ্রগতি' : 'Progress'}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {completedSteps.length}/{applicationSteps.length}
                  </span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-secondary">
                  <div 
                    className="h-full rounded-full bg-primary transition-all"
                    style={{ width: `${(completedSteps.length / applicationSteps.length) * 100}%` }}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {tips.map((tip, index) => {
              const Icon = tip.icon
              return (
                <Card key={index}>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Icon className={cn('h-4 w-4', index === 0 ? 'text-destructive' : 'text-saffron')} />
                      {tip.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {tip.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Circle className="mt-1.5 h-1.5 w-1.5 shrink-0 fill-current" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )
            })}

            {/* Download Checklist */}
            <Card className="bg-secondary">
              <CardContent className="p-4">
                <Button variant="outline" className="w-full gap-2">
                  <Download className="h-4 w-4" />
                  {language === 'hi' ? 'चेकलिस्ट डाउनलोड करें' : language === 'bn' ? 'চেকলিস্ট ডাউনলোড করুন' : 'Download Checklist'}
                </Button>
              </CardContent>
            </Card>

            {/* Help */}
            <Card>
              <CardContent className="p-4 text-center">
                <FileText className="mx-auto h-8 w-8 text-muted-foreground" />
                <p className="mt-2 text-sm text-muted-foreground">
                  {language === 'hi' ? 'और मदद चाहिए?' : language === 'bn' ? 'আরও সাহায্য দরকার?' : 'Need more help?'}
                </p>
                <Button asChild variant="link" size="sm" className="mt-1">
                  <Link href="/chat">{t('nav.chat')}</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function GuidancePage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    }>
      <GuidanceContent />
    </Suspense>
  )
}
