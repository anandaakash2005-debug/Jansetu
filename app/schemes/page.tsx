'use client'

import { useState, useMemo, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Search, Filter, GraduationCap, Banknote, Wrench, Rocket, Heart, ArrowRight, Bookmark, BookmarkCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useLanguage } from '@/lib/language-context'
import { useUser } from '@/lib/user-context'
import { schemes, categories, type Scheme } from '@/lib/schemes-data'
import { cn } from '@/lib/utils'

const iconMap: Record<string, React.ElementType> = {
  GraduationCap,
  Banknote,
  Wrench,
  Rocket,
  Heart,
}

function SchemesContent() {
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get('category') || 'all'
  
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(initialCategory)
  const { t, language } = useLanguage()
  const { profile, saveScheme, unsaveScheme } = useUser()

  const filteredSchemes = useMemo(() => {
    return schemes.filter(scheme => {
      const matchesCategory = selectedCategory === 'all' || scheme.category === selectedCategory
      const name = language === 'hi' ? scheme.nameHindi : language === 'bn' ? scheme.nameBengali : scheme.name
      const matchesSearch = !searchQuery || 
        name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        scheme.description.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchQuery, language])

  const getSchemeTitle = (scheme: Scheme) => {
    return language === 'hi' ? scheme.nameHindi : language === 'bn' ? scheme.nameBengali : scheme.name
  }

  const getSchemeDescription = (scheme: Scheme) => {
    return language === 'hi' ? scheme.descriptionHindi : language === 'bn' ? scheme.descriptionBengali : scheme.description
  }

  const getCategoryName = (cat: typeof categories[0]) => {
    return language === 'hi' ? cat.nameHindi : language === 'bn' ? cat.nameBengali : cat.name
  }

  const toggleSaveScheme = (schemeId: string) => {
    if (profile.savedSchemes.includes(schemeId)) {
      unsaveScheme(schemeId)
    } else {
      saveScheme(schemeId)
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">{t('schemes.title')}</h1>
          <p className="mt-2 text-muted-foreground">
            {language === 'hi' 
              ? 'आपके लिए उपलब्ध सभी सरकारी योजनाएं खोजें'
              : language === 'bn'
              ? 'আপনার জন্য উপলব্ধ সব সরকারি প্রকল্প খুঁজুন'
              : 'Discover all government schemes available for you'}
          </p>

          {/* Search and Filter */}
          <div className="mt-6 flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder={language === 'hi' ? 'योजना खोजें...' : language === 'bn' ? 'প্রকল্প খুঁজুন...' : 'Search schemes...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Filter className="h-4 w-4" />
              <span>{t('schemes.filter')}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Category Pills */}
        <div className="mb-6 flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory('all')}
            className="rounded-full"
          >
            {t('schemes.all')}
          </Button>
          {categories.map((category) => {
            const Icon = iconMap[category.icon] || Heart
            return (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="gap-1.5 rounded-full"
              >
                <Icon className="h-3.5 w-3.5" />
                {getCategoryName(category)}
              </Button>
            )
          })}
        </div>

        {/* Results count */}
        <p className="mb-4 text-sm text-muted-foreground">
          {language === 'hi' 
            ? `${filteredSchemes.length} योजनाएं मिलीं`
            : language === 'bn'
            ? `${filteredSchemes.length}টি প্রকল্প পাওয়া গেছে`
            : `${filteredSchemes.length} schemes found`}
        </p>

        {/* Schemes Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredSchemes.map((scheme) => {
            const Icon = iconMap[categories.find(c => c.id === scheme.category)?.icon || 'Heart'] || Heart
            const isSaved = profile.savedSchemes.includes(scheme.id)
            
            return (
              <Card key={scheme.id} className="group overflow-hidden transition-shadow hover:shadow-md">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <button
                      onClick={() => toggleSaveScheme(scheme.id)}
                      className={cn(
                        'rounded-full p-2 transition-colors',
                        isSaved 
                          ? 'bg-primary/10 text-primary' 
                          : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                      )}
                    >
                      {isSaved ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
                    </button>
                  </div>
                  <CardTitle className="mt-3 text-lg leading-tight">
                    {getSchemeTitle(scheme)}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  {scheme.benefitAmount && (
                    <div className="mb-3 inline-flex items-center rounded-full bg-green/10 px-3 py-1 text-sm font-medium text-green">
                      {scheme.benefitAmount}
                    </div>
                  )}
                  <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
                    {getSchemeDescription(scheme)}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{scheme.ministry}</span>
                    <Button asChild size="sm" variant="ghost" className="gap-1">
                      <Link href={`/schemes/${scheme.id}`}>
                        {t('schemes.viewDetails')}
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {filteredSchemes.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-lg text-muted-foreground">
              {language === 'hi' 
                ? 'कोई योजना नहीं मिली। अपनी खोज बदलने का प्रयास करें।'
                : language === 'bn'
                ? 'কোনো প্রকল্প পাওয়া যায়নি। আপনার অনুসন্ধান পরিবর্তন করে দেখুন।'
                : 'No schemes found. Try changing your search.'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function SchemesPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    }>
      <SchemesContent />
    </Suspense>
  )
}
