'use client'

import { use } from 'react'
import Link from 'next/link'
import { ArrowLeft, ExternalLink, FileText, CheckCircle, Clock, Building, Bookmark, BookmarkCheck, Play, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useLanguage } from '@/lib/language-context'
import { useUser } from '@/lib/user-context'
import { schemes } from '@/lib/schemes-data'
import { cn } from '@/lib/utils'

export default function SchemeDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const { language, t } = useLanguage()
  const { profile, saveScheme, unsaveScheme } = useUser()
  
  const scheme = schemes.find(s => s.id === resolvedParams.id)

  if (!scheme) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">
            {language === 'hi' ? 'योजना नहीं मिली' : language === 'bn' ? 'প্রকল্প পাওয়া যায়নি' : 'Scheme not found'}
          </h1>
          <Button asChild className="mt-4">
            <Link href="/schemes">
              {language === 'hi' ? 'वापस जाएं' : language === 'bn' ? 'ফিরে যান' : 'Go back'}
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  const title = language === 'hi' ? scheme.nameHindi : language === 'bn' ? scheme.nameBengali : scheme.name
  const description = language === 'hi' ? scheme.descriptionHindi : language === 'bn' ? scheme.descriptionBengali : scheme.description
  const isSaved = profile.savedSchemes.includes(scheme.id)

  const toggleSave = () => {
    if (isSaved) {
      unsaveScheme(scheme.id)
    } else {
      saveScheme(scheme.id)
    }
  }

  const eligibilityPoints = [
    scheme.eligibility.minAge || scheme.eligibility.maxAge 
      ? `${language === 'hi' ? 'आयु:' : language === 'bn' ? 'বয়স:' : 'Age:'} ${scheme.eligibility.minAge || 0}-${scheme.eligibility.maxAge || 70} ${language === 'hi' ? 'वर्ष' : language === 'bn' ? 'বছর' : 'years'}`
      : null,
    scheme.eligibility.maxIncome
      ? `${language === 'hi' ? 'आय:' : language === 'bn' ? 'আয়:' : 'Income:'} ${language === 'hi' ? '₹' : '₹'}${(scheme.eligibility.maxIncome / 100000).toFixed(1)} ${language === 'hi' ? 'लाख तक' : language === 'bn' ? 'লাখ পর্যন্ত' : 'Lakh or less'}`
      : null,
    scheme.eligibility.education?.length
      ? `${language === 'hi' ? 'शिक्षा:' : language === 'bn' ? 'শিক্ষা:' : 'Education:'} ${scheme.eligibility.education.join(', ')}`
      : null,
    scheme.eligibility.occupation?.length
      ? `${language === 'hi' ? 'व्यवसाय:' : language === 'bn' ? 'পেশা:' : 'Occupation:'} ${scheme.eligibility.occupation.join(', ')}`
      : null,
    scheme.eligibility.gender && scheme.eligibility.gender !== 'all'
      ? `${language === 'hi' ? 'लिंग:' : language === 'bn' ? 'লিঙ্গ:' : 'Gender:'} ${scheme.eligibility.gender === 'female' ? (language === 'hi' ? 'महिला' : language === 'bn' ? 'মহিলা' : 'Female') : (language === 'hi' ? 'पुरुष' : language === 'bn' ? 'পুরুষ' : 'Male')}`
      : null,
  ].filter(Boolean)

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Button variant="ghost" size="sm" asChild className="mb-4 gap-1.5">
            <Link href="/schemes">
              <ArrowLeft className="h-4 w-4" />
              {t('common.back')}
            </Link>
          </Button>
          
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground sm:text-3xl">{title}</h1>
              <div className="mt-2 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Building className="h-4 w-4" />
                  {scheme.ministry}
                </span>
                {scheme.benefitAmount && (
                  <span className="inline-flex items-center rounded-full bg-green/10 px-3 py-1 text-sm font-medium text-green">
                    {scheme.benefitAmount}
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={toggleSave}
              className={cn(
                'flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors',
                isSaved 
                  ? 'bg-primary/10 text-primary' 
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              )}
            >
              {isSaved ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
              {isSaved 
                ? (language === 'hi' ? 'सहेजा गया' : language === 'bn' ? 'সংরক্ষিত' : 'Saved')
                : (language === 'hi' ? 'सहेजें' : language === 'bn' ? 'সংরক্ষণ করুন' : 'Save')}
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-6 lg:col-span-2">
            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  {language === 'hi' ? 'योजना के बारे में' : language === 'bn' ? 'প্রকল্প সম্পর্কে' : 'About This Scheme'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="leading-relaxed text-muted-foreground">{description}</p>
              </CardContent>
            </Card>

            {/* Eligibility */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green" />
                  {t('schemes.whyQualify')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {eligibilityPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green" />
                      <span className="text-muted-foreground">{point}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Documents */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-saffron" />
                  {t('schemes.documents')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {scheme.documents.map((doc, index) => (
                    <li key={index} className="flex items-center gap-2 rounded-lg bg-secondary p-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-background text-xs font-medium text-muted-foreground">
                        {index + 1}
                      </div>
                      <span className="text-sm text-foreground">{doc}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Video Explainer Placeholder */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Play className="h-5 w-5 text-primary" />
                  {language === 'hi' ? 'वीडियो गाइड' : language === 'bn' ? 'ভিডিও গাইড' : 'Video Guide'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex aspect-video items-center justify-center rounded-lg bg-secondary">
                  <div className="text-center">
                    <Play className="mx-auto h-12 w-12 text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">
                      {language === 'hi' ? 'जल्द आ रहा है' : language === 'bn' ? 'শীঘ্রই আসছে' : 'Coming Soon'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Apply Card */}
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-6">
                <h3 className="mb-4 text-lg font-semibold text-foreground">
                  {language === 'hi' ? 'आवेदन करने के लिए तैयार?' : language === 'bn' ? 'আবেদন করতে প্রস্তুত?' : 'Ready to Apply?'}
                </h3>
                <Button asChild className="w-full gap-2">
                  <a href={scheme.applicationLink} target="_blank" rel="noopener noreferrer">
                    {t('schemes.apply')}
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
                <Button asChild variant="outline" className="mt-3 w-full">
                  <Link href={`/guidance?scheme=${scheme.id}`}>
                    {t('nav.guidance')}
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Quick Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  {language === 'hi' ? 'त्वरित जानकारी' : language === 'bn' ? 'দ্রুত তথ্য' : 'Quick Info'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {language === 'hi' ? 'आवेदन समय' : language === 'bn' ? 'আবেদনের সময়' : 'Application Time'}
                    </p>
                    <p className="text-xs text-muted-foreground">15-30 {language === 'hi' ? 'मिनट' : language === 'bn' ? 'মিনিট' : 'minutes'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {language === 'hi' ? 'लाभार्थी' : language === 'bn' ? 'সুবিধাভোগী' : 'Beneficiaries'}
                    </p>
                    <p className="text-xs text-muted-foreground">10L+ {language === 'hi' ? 'लोग' : language === 'bn' ? 'মানুষ' : 'people'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Help Card */}
            <Card className="bg-secondary">
              <CardContent className="p-6 text-center">
                <p className="text-sm text-muted-foreground">
                  {language === 'hi' 
                    ? 'मदद चाहिए? हमारे AI सहायक से बात करें।'
                    : language === 'bn'
                    ? 'সাহায্য দরকার? আমাদের AI সহায়কের সাথে কথা বলুন।'
                    : 'Need help? Talk to our AI assistant.'}
                </p>
                <Button asChild variant="outline" size="sm" className="mt-3">
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
