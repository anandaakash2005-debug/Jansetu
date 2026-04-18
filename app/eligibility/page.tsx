'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Search, CheckCircle, ArrowRight, User, Banknote as BanknoteIcon, GraduationCap, Briefcase, MapPin, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useLanguage } from '@/lib/language-context'
import { useUser } from '@/lib/user-context'
import { schemes, states, educationLevels, occupations, type Scheme } from '@/lib/schemes-data'
import { cn } from '@/lib/utils'

export default function EligibilityPage() {
  const { t, language } = useLanguage()
  const { profile, updateProfile } = useUser()
  
  const [formData, setFormData] = useState({
    age: profile.age?.toString() || '',
    income: profile.income?.toString() || '',
    education: profile.education || '',
    occupation: profile.occupation || '',
    state: profile.state || '',
    gender: profile.gender || '',
  })
  const [showResults, setShowResults] = useState(false)

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = () => {
    // Save to profile
    updateProfile({
      age: parseInt(formData.age) || undefined,
      income: parseInt(formData.income) || undefined,
      education: formData.education || undefined,
      occupation: formData.occupation || undefined,
      state: formData.state || undefined,
      gender: formData.gender as 'male' | 'female' | 'other' | undefined,
    })
    setShowResults(true)
  }

  const eligibleSchemes = useMemo(() => {
    if (!showResults) return []
    
    return schemes.filter(scheme => {
      const e = scheme.eligibility
      const age = parseInt(formData.age)
      const income = parseInt(formData.income)

      // Age check
      if (e.minAge && age < e.minAge) return false
      if (e.maxAge && age > e.maxAge) return false

      // Income check
      if (e.maxIncome && income > e.maxIncome) return false

      // Education check
      if (e.education?.length && formData.education && !e.education.includes(formData.education)) {
        return false
      }

      // Occupation check
      if (e.occupation?.length && formData.occupation && !e.occupation.includes(formData.occupation)) {
        return false
      }

      // Gender check
      if (e.gender && e.gender !== 'all' && formData.gender && e.gender !== formData.gender) {
        return false
      }

      return true
    })
  }, [showResults, formData])

  const getSchemeTitle = (scheme: Scheme) => {
    return language === 'hi' ? scheme.nameHindi : language === 'bn' ? scheme.nameBengali : scheme.name
  }

  const labels = {
    age: language === 'hi' ? 'आयु (वर्षों में)' : language === 'bn' ? 'বয়স (বছরে)' : 'Age (in years)',
    income: language === 'hi' ? 'वार्षिक आय (₹ में)' : language === 'bn' ? 'বার্ষিক আয় (₹ তে)' : 'Annual Income (in ₹)',
    education: language === 'hi' ? 'शिक्षा स्तर' : language === 'bn' ? 'শিক্ষার স্তর' : 'Education Level',
    occupation: language === 'hi' ? 'व्यवसाय' : language === 'bn' ? 'পেশা' : 'Occupation',
    state: language === 'hi' ? 'राज्य' : language === 'bn' ? 'রাজ্য' : 'State',
    gender: language === 'hi' ? 'लिंग' : language === 'bn' ? 'লিঙ্গ' : 'Gender',
    select: language === 'hi' ? 'चुनें' : language === 'bn' ? 'নির্বাচন করুন' : 'Select',
  }

  const genderOptions = [
    { value: 'male', label: t('common.male') },
    { value: 'female', label: t('common.female') },
    { value: 'other', label: t('common.other') },
  ]

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Search className="h-8 w-8" />
          </div>
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">{t('eligibility.title')}</h1>
          <p className="mt-2 text-muted-foreground">
            {language === 'hi' 
              ? 'अपनी जानकारी दें और जानें कि आप किन योजनाओं के लिए पात्र हैं'
              : language === 'bn'
              ? 'আপনার তথ্য দিন এবং জানুন আপনি কোন প্রকল্পের জন্য যোগ্য'
              : 'Enter your details to find schemes you qualify for'}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {!showResults ? (
          <Card>
            <CardHeader>
              <CardTitle>
                {language === 'hi' ? 'अपनी जानकारी दर्ज करें' : language === 'bn' ? 'আপনার তথ্য লিখুন' : 'Enter Your Information'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 sm:grid-cols-2">
                {/* Age */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <User className="h-4 w-4 text-muted-foreground" />
                    {labels.age}
                  </label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) => handleChange('age', e.target.value)}
                    placeholder="25"
                    className="w-full rounded-lg border border-input bg-background px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                {/* Income */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <BanknoteIcon className="h-4 w-4 text-muted-foreground" />
                    {labels.income}
                  </label>
                  <input
                    type="number"
                    value={formData.income}
                    onChange={(e) => handleChange('income', e.target.value)}
                    placeholder="300000"
                    className="w-full rounded-lg border border-input bg-background px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                {/* Education */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                    {labels.education}
                  </label>
                  <select
                    value={formData.education}
                    onChange={(e) => handleChange('education', e.target.value)}
                    className="w-full rounded-lg border border-input bg-background px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="">{labels.select}</option>
                    {educationLevels.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>

                {/* Occupation */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                    {labels.occupation}
                  </label>
                  <select
                    value={formData.occupation}
                    onChange={(e) => handleChange('occupation', e.target.value)}
                    className="w-full rounded-lg border border-input bg-background px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="">{labels.select}</option>
                    {occupations.map(occ => (
                      <option key={occ} value={occ}>{occ}</option>
                    ))}
                  </select>
                </div>

                {/* State */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    {labels.state}
                  </label>
                  <select
                    value={formData.state}
                    onChange={(e) => handleChange('state', e.target.value)}
                    className="w-full rounded-lg border border-input bg-background px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="">{labels.select}</option>
                    {states.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>

                {/* Gender */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    {labels.gender}
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) => handleChange('gender', e.target.value)}
                    className="w-full rounded-lg border border-input bg-background px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="">{labels.select}</option>
                    {genderOptions.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <Button 
                onClick={handleSubmit} 
                size="lg" 
                className="mt-8 w-full gap-2"
                disabled={!formData.age}
              >
                <Search className="h-5 w-5" />
                {t('eligibility.check')}
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div>
            {/* Results Header */}
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-foreground">{t('eligibility.results')}</h2>
                <p className="text-sm text-muted-foreground">
                  {language === 'hi' 
                    ? `${eligibleSchemes.length} योजनाएं मिलीं`
                    : language === 'bn'
                    ? `${eligibleSchemes.length}টি প্রকল্প পাওয়া গেছে`
                    : `${eligibleSchemes.length} schemes found`}
                </p>
              </div>
              <Button variant="outline" onClick={() => setShowResults(false)}>
                {language === 'hi' ? 'फिर से खोजें' : language === 'bn' ? 'আবার খুঁজুন' : 'Search Again'}
              </Button>
            </div>

            {/* Results Grid */}
            {eligibleSchemes.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {eligibleSchemes.map(scheme => (
                  <Card key={scheme.id} className="transition-shadow hover:shadow-md">
                    <CardContent className="p-4">
                      <div className="mb-3 flex items-start justify-between gap-2">
                        <h3 className="font-semibold text-foreground">{getSchemeTitle(scheme)}</h3>
                        {scheme.benefitAmount && (
                          <span className="shrink-0 rounded-full bg-green/10 px-2 py-0.5 text-xs font-medium text-green">
                            {scheme.benefitAmount}
                          </span>
                        )}
                      </div>
                      
                      <div className="mb-3 rounded-lg bg-green/5 p-3">
                        <p className="flex items-start gap-2 text-sm text-green">
                          <CheckCircle className="mt-0.5 h-4 w-4 shrink-0" />
                          {language === 'hi' 
                            ? 'आप इस योजना के लिए पात्र हैं!'
                            : language === 'bn'
                            ? 'আপনি এই প্রকল্পের জন্য যোগ্য!'
                            : 'You are eligible for this scheme!'}
                        </p>
                      </div>
                      
                      <Button asChild size="sm" className="w-full gap-1">
                        <Link href={`/schemes/${scheme.id}`}>
                          {t('schemes.viewDetails')}
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="py-12 text-center">
                <CardContent>
                  <p className="text-muted-foreground">
                    {language === 'hi' 
                      ? 'आपकी जानकारी के आधार पर कोई योजना नहीं मिली। कृपया अपनी जानकारी जांचें।'
                      : language === 'bn'
                      ? 'আপনার তথ্যের উপর ভিত্তি করে কোনো প্রকল্প পাওয়া যায়নি। অনুগ্রহ করে আপনার তথ্য পরীক্ষা করুন।'
                      : 'No schemes found based on your information. Please check your details.'}
                  </p>
                  <Button asChild variant="outline" className="mt-4">
                    <Link href="/chat">
                      {language === 'hi' ? 'AI सहायक से बात करें' : language === 'bn' ? 'AI সহায়কের সাথে কথা বলুন' : 'Talk to AI Assistant'}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
