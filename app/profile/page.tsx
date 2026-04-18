'use client'

import Link from 'next/link'
import { User, Bookmark, History, Trash2, Edit2, Save, X, ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useLanguage } from '@/lib/language-context'
import { useUser } from '@/lib/user-context'
import { schemes, states, educationLevels, occupations } from '@/lib/schemes-data'

export default function ProfilePage() {
  const { language, t } = useLanguage()
  const { profile, updateProfile, unsaveScheme, clearProfile } = useUser()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: profile.name || '',                                           // NEW
    age: profile.age?.toString() || '',
    income: profile.income?.toString() || '',
    education: profile.education || '',
    occupation: profile.occupation || '',
    state: profile.state || '',
    residence: profile.residence || '',                                 // NEW
    caste: profile.caste || '',                                         // NEW
    gender: profile.gender || '',
    is_disabled: profile.is_disabled || false,                         // NEW
    disability_percentage: profile.disability_percentage?.toString() || '', // NEW
    is_bpl: profile.is_bpl || false,
    is_gov_employee: profile.is_gov_employee || false,                                  // NEW
  })

  const handleSave = async () => {
    const updatedProfile = {
      name: formData.name || undefined,
      age: formData.age ? parseInt(formData.age) : undefined,
      income: formData.income ? parseInt(formData.income) : undefined,
      education: formData.education || undefined,
      occupation: formData.occupation || undefined,
      state: formData.state || undefined,
      residence: formData.residence || undefined,
      caste: formData.caste || undefined,
      gender: formData.gender as 'male' | 'female' | 'other' | undefined,
      is_disabled: formData.is_disabled,
      disability_percentage: formData.is_disabled
        ? parseInt(formData.disability_percentage) || undefined
        : undefined,
      is_bpl: formData.is_bpl,
      is_gov_employee: formData.is_gov_employee,
    };

    // 🔹 update local state
    updateProfile(updatedProfile);

    // 🔹 send to database
    await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProfile),
    });

    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: profile.name || '',                                         // NEW
      age: profile.age?.toString() || '',
      income: profile.income?.toString() || '',
      education: profile.education || '',
      occupation: profile.occupation || '',
      state: profile.state || '',
      residence: profile.residence || '',                               // NEW
      caste: profile.caste || '',                                       // NEW
      gender: profile.gender || '',
      is_disabled: profile.is_disabled || false,                       // NEW
      disability_percentage: profile.disability_percentage?.toString() || '', // NEW
      is_bpl: profile.is_bpl || false,                                 // NEW
      is_gov_employee: profile.is_gov_employee || false,                                // NEW
    })
    setIsEditing(false)
  }

  const savedSchemesList = schemes.filter(s => profile.savedSchemes.includes(s.id))

  const getSchemeTitle = (scheme: typeof schemes[0]) => {
    return language === 'hi' ? scheme.nameHindi : language === 'bn' ? scheme.nameBengali : scheme.name
  }

  const labels = {
    name: language === 'hi' ? 'नाम' : language === 'bn' ? 'নাম' : 'Name',                           // NEW
    age: language === 'hi' ? 'आयु' : language === 'bn' ? 'বয়স' : 'Age',
    income: language === 'hi' ? 'वार्षिक आय' : language === 'bn' ? 'বার্ষিক আয়' : 'Annual Income',
    education: language === 'hi' ? 'शिक्षा' : language === 'bn' ? 'শিক্ষা' : 'Education',
    occupation: language === 'hi' ? 'व्यवसाय' : language === 'bn' ? 'পেশা' : 'Occupation',
    state: language === 'hi' ? 'राज्य' : language === 'bn' ? 'রাজ্য' : 'State',
    residence: language === 'hi' ? 'निवास' : language === 'bn' ? 'বাসস্থান' : 'Residence',          // NEW
    caste: language === 'hi' ? 'जाति' : language === 'bn' ? 'জাতি' : 'Caste',                       // NEW
    gender: language === 'hi' ? 'लिंग' : language === 'bn' ? 'লিঙ্গ' : 'Gender',
    is_disabled: language === 'hi' ? 'विकलांग' : language === 'bn' ? 'প্রতিবন্ধী' : 'Disabled',   // NEW
    disability_percentage: language === 'hi' ? 'विकलांगता %' : language === 'bn' ? 'প্রতিবন্ধিতা %' : 'Disability %', // NEW
    is_bpl: language === 'hi' ? 'बीपीएल' : language === 'bn' ? 'বিপিএল' : 'BPL (Below Poverty Line)', // NEW
    is_gov_employee: language === 'hi' ? 'सरकारी कर्मचारी' : language === 'bn' ? 'সরকারি কর্মচারী' : 'Govt Employee', // NEW
    select: language === 'hi' ? 'चुनें' : language === 'bn' ? 'নির্বাচন করুন' : 'Select',
  }

  const genderLabels: Record<string, string> = {
    male: t('common.male'),
    female: t('common.female'),
    other: t('common.other'),
  }

  // NEW: caste options
  const casteOptions = ['General', 'OBC', 'SC', 'ST', 'EWS']

  // NEW: residence options
  const residenceOptions = [
    language === 'hi' ? 'शहरी' : language === 'bn' ? 'শহর' : 'Urban',
    language === 'hi' ? 'ग्रामीण' : language === 'bn' ? 'গ্রামীণ' : 'Rural',
  ]

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <User className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground sm:text-3xl">{t('profile.title')}</h1>
              <p className="text-muted-foreground">
                {language === 'hi'
                  ? 'आपकी सहेजी गई जानकारी और योजनाएं'
                  : language === 'bn'
                    ? 'আপনার সংরক্ষিত তথ্য এবং প্রকল্প'
                    : 'Your saved information and schemes'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Profile Info */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                {language === 'hi' ? 'व्यक्तिगत जानकारी' : language === 'bn' ? 'ব্যক্তিগত তথ্য' : 'Personal Information'}
              </CardTitle>
              {!isEditing ? (
                <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
                  <Edit2 className="h-4 w-4" />
                </Button>
              ) : (
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" onClick={handleCancel}>
                    <X className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={handleSave}>
                    <Save className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <div className="space-y-4">
                  {/* NEW: Name */}
                  <div>
                    <label className="text-sm text-muted-foreground">{labels.name}</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-muted-foreground">{labels.age}</label>
                    <input
                      type="number"
                      value={formData.age}
                      onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                      className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">{labels.income}</label>
                    <input
                      type="number"
                      value={formData.income}
                      onChange={(e) => setFormData(prev => ({ ...prev, income: e.target.value }))}
                      className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">{labels.education}</label>
                    <select
                      value={formData.education}
                      onChange={(e) => setFormData(prev => ({ ...prev, education: e.target.value }))}
                      className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="">{labels.select}</option>
                      {educationLevels.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">{labels.occupation}</label>
                    <select
                      value={formData.occupation}
                      onChange={(e) => setFormData(prev => ({ ...prev, occupation: e.target.value }))}
                      className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="">{labels.select}</option>
                      {occupations.map(occ => (
                        <option key={occ} value={occ}>{occ}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">{labels.state}</label>
                    <select
                      value={formData.state}
                      onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value }))}
                      className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="">{labels.select}</option>
                      {states.map(state => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                  </div>

                  {/* NEW: Residence */}
                  <div>
                    <label className="text-sm text-muted-foreground">{labels.residence}</label>
                    <select
                      value={formData.residence}
                      onChange={(e) => setFormData(prev => ({ ...prev, residence: e.target.value }))}
                      className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="">{labels.select}</option>
                      {residenceOptions.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>

                  {/* NEW: Caste */}
                  <div>
                    <label className="text-sm text-muted-foreground">{labels.caste}</label>
                    <select
                      value={formData.caste}
                      onChange={(e) => setFormData(prev => ({ ...prev, caste: e.target.value }))}
                      className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="">{labels.select}</option>
                      {casteOptions.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-sm text-muted-foreground">{labels.gender}</label>
                    <select
                      value={formData.gender}
                      onChange={(e) => setFormData(prev => ({ ...prev, gender: e.target.value }))}
                      className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="">{labels.select}</option>
                      <option value="male">{t('common.male')}</option>
                      <option value="female">{t('common.female')}</option>
                      <option value="other">{t('common.other')}</option>
                    </select>
                  </div>

                  {/* NEW: BPL toggle */}
                  <div className="flex items-center justify-between rounded-lg border border-input px-3 py-2">
                    <label className="text-sm text-muted-foreground">{labels.is_bpl}</label>
                    <input
                      type="checkbox"
                      checked={formData.is_bpl}
                      onChange={(e) => setFormData(prev => ({ ...prev, is_bpl: e.target.checked }))}
                      className="h-4 w-4 rounded border-input accent-primary"
                    />
                  </div>

                  <div className="flex items-center justify-between rounded-lg border border-input px-3 py-2">
                    <label className="text-sm text-muted-foreground">
                      {language === 'hi'
                        ? 'क्या परिवार में सरकारी कर्मचारी है?'
                        : language === 'bn'
                          ? 'পরিবারে কি সরকারি কর্মচারী আছে?'
                          : 'Is anyone in family a govt employee?'}
                    </label>
                    <input
                      type="checkbox"
                      checked={formData.is_gov_employee}
                      onChange={(e) =>
                        setFormData(prev => ({
                          ...prev,
                          is_gov_employee: e.target.checked,
                        }))
                      }
                      className="h-4 w-4 rounded border-input accent-primary"
                    />
                  </div>

                  {/* NEW: Disabled toggle */}
                  <div className="flex items-center justify-between rounded-lg border border-input px-3 py-2">
                    <label className="text-sm text-muted-foreground">{labels.is_disabled}</label>
                    <input
                      type="checkbox"
                      checked={formData.is_disabled}
                      onChange={(e) =>
                        setFormData(prev => ({
                          ...prev,
                          is_disabled: e.target.checked,
                          disability_percentage: e.target.checked ? prev.disability_percentage : '',
                        }))
                      }
                      className="h-4 w-4 rounded border-input accent-primary"
                    />
                  </div>

                  {/* NEW: Disability percentage — only shown when disabled is checked */}
                  {formData.is_disabled && (
                    <div>
                      <label className="text-sm text-muted-foreground">{labels.disability_percentage}</label>
                      <input
                        type="number"
                        min={0}
                        max={100}
                        value={formData.disability_percentage}
                        onChange={(e) => setFormData(prev => ({ ...prev, disability_percentage: e.target.value }))}
                        className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  {[
                    { label: labels.name, value: profile.name || '-' },                              // NEW
                    { label: labels.age, value: profile.age ? `${profile.age} ${language === 'hi' ? 'वर्ष' : language === 'bn' ? 'বছর' : 'years'}` : '-' },
                    { label: labels.income, value: profile.income ? `₹${(profile.income / 100000).toFixed(1)} ${language === 'hi' ? 'लाख' : language === 'bn' ? 'লাখ' : 'Lakh'}` : '-' },
                    { label: labels.education, value: profile.education || '-' },
                    { label: labels.occupation, value: profile.occupation || '-' },
                    { label: labels.state, value: profile.state || '-' },
                    { label: labels.residence, value: profile.residence || '-' },                    // NEW
                    { label: labels.caste, value: profile.caste || '-' },                            // NEW
                    { label: labels.gender, value: profile.gender ? genderLabels[profile.gender] : '-' },
                    { label: labels.is_bpl, value: profile.is_bpl ? (language === 'hi' ? 'हां' : language === 'bn' ? 'হ্যাঁ' : 'Yes') : (language === 'hi' ? 'नहीं' : language === 'bn' ? 'না' : 'No') }, // NEW
                    { label: labels.is_disabled, value: profile.is_disabled ? (language === 'hi' ? 'हां' : language === 'bn' ? 'হ্যাঁ' : 'Yes') : (language === 'hi' ? 'नहीं' : language === 'bn' ? 'না' : 'No') }, // NEW
                    ...(profile.is_disabled ? [{ label: labels.disability_percentage, value: profile.disability_percentage ? `${profile.disability_percentage}%` : '-' }] : []), // NEW
                    { label: labels.is_gov_employee, value: profile.is_gov_employee ? (language === 'hi' ? 'हां' : language === 'bn' ? 'হ্যাঁ' : 'Yes') : (language === 'hi' ? 'नहीं' : language === 'bn' ? 'না' : 'No') }, // NEW
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between border-b border-border pb-2 last:border-0">
                      <span className="text-sm text-muted-foreground">{item.label}</span>
                      <span className="text-sm font-medium text-foreground">{item.value}</span>
                    </div>
                  ))}
                </div>
              )}

              <Button
                variant="destructive"
                size="sm"
                onClick={clearProfile}
                className="mt-6 gap-1.5"
              >
                <Trash2 className="h-3.5 w-3.5" />
                {language === 'hi' ? 'डेटा साफ करें' : language === 'bn' ? 'ডেটা মুছুন' : 'Clear Data'}
              </Button>
            </CardContent>
          </Card>

          {/* Saved Schemes — unchanged */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bookmark className="h-5 w-5 text-saffron" />
                {t('profile.saved')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {savedSchemesList.length > 0 ? (
                <div className="space-y-3">
                  {savedSchemesList.map(scheme => (
                    <div key={scheme.id} className="flex items-center justify-between rounded-lg bg-secondary p-3">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{getSchemeTitle(scheme)}</p>
                        {scheme.benefitAmount && (
                          <p className="text-xs text-green">{scheme.benefitAmount}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <Button asChild variant="ghost" size="sm">
                          <Link href={`/schemes/${scheme.id}`}>
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => unsaveScheme(scheme.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center">
                  <Bookmark className="mx-auto h-8 w-8 text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">
                    {language === 'hi'
                      ? 'कोई सहेजी गई योजना नहीं'
                      : language === 'bn'
                        ? 'কোনো সংরক্ষিত প্রকল্প নেই'
                        : 'No saved schemes'}
                  </p>
                  <Button asChild variant="link" size="sm" className="mt-2">
                    <Link href="/schemes">{t('nav.schemes')}</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Search History — unchanged */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="h-5 w-5 text-primary" />
                {t('profile.history')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {profile.searchHistory.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {profile.searchHistory.map((query, index) => (
                    <Link
                      key={index}
                      href={`/chat?q=${encodeURIComponent(query)}`}
                      className="rounded-full bg-secondary px-3 py-1.5 text-sm text-secondary-foreground transition-colors hover:bg-secondary/80"
                    >
                      {query}
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  {language === 'hi'
                    ? 'कोई खोज इतिहास नहीं'
                    : language === 'bn'
                      ? 'কোনো অনুসন্ধান ইতিহাস নেই'
                      : 'No search history'}
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}