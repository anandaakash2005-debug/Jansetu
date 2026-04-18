'use client'

import Link from 'next/link'
import { ArrowRight, MessageSquare, Globe, Sparkles, GraduationCap, Banknote, Wrench, Rocket, Heart, ChevronRight, Users, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useLanguage } from '@/lib/language-context'
import { categories } from '@/lib/schemes-data'

const iconMap: Record<string, React.ElementType> = {
  GraduationCap,
  Banknote,
  Wrench,
  Rocket,
  Heart,
}

export default function HomePage() {
  const { t, language } = useLanguage()

  const features = [
    {
      icon: MessageSquare,
      title: t('feature.noForms'),
      description: t('feature.noFormsDesc'),
      color: 'bg-primary/10 text-primary',
    },
    {
      icon: Globe,
      title: t('feature.yourLanguage'),
      description: t('feature.yourLanguageDesc'),
      color: 'bg-green/10 text-green',
    },
    {
      icon: Sparkles,
      title: t('feature.aiPowered'),
      description: t('feature.aiPoweredDesc'),
      color: 'bg-saffron/10 text-saffron',
    },
  ]

  const testimonials = [
    {
      name: language === 'hi' ? 'प्रिया शर्मा' : language === 'bn' ? 'প্রিয়া শর্মা' : 'Priya Sharma',
      role: language === 'hi' ? 'छात्रा, बिहार' : language === 'bn' ? 'ছাত্রী, বিহার' : 'Student, Bihar',
      quote: language === 'hi' 
        ? 'सारथी ने मुझे एक छात्रवृत्ति खोजने में मदद की जिसके बारे में मुझे पता भी नहीं था। अब मैं इंजीनियरिंग की पढ़ाई कर रही हूं!'
        : language === 'bn'
        ? 'সারথি আমাকে একটি বৃত্তি খুঁজে পেতে সাহায্য করেছে যার কথা আমি জানতামও না। এখন আমি ইঞ্জিনিয়ারিং পড়ছি!'
        : 'Saarthi helped me find a scholarship I didn\'t even know existed. Now I\'m studying engineering!',
    },
    {
      name: language === 'hi' ? 'राजेश कुमार' : language === 'bn' ? 'রাজেশ কুমার' : 'Rajesh Kumar',
      role: language === 'hi' ? 'किसान, उत्तर प्रदेश' : language === 'bn' ? 'কৃষক, উত্তর প্রদেশ' : 'Farmer, Uttar Pradesh',
      quote: language === 'hi'
        ? 'मैंने पहली बार समझा कि पीएम-किसान में कैसे आवेदन करें। सारथी ने सब कुछ आसान बना दिया।'
        : language === 'bn'
        ? 'আমি প্রথমবার বুঝতে পেরেছি কীভাবে PM-KISAN-এ আবেদন করতে হয়। সারথি সব সহজ করে দিয়েছে।'
        : 'I finally understood how to apply for PM-KISAN. Saarthi made everything so simple.',
    },
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-card px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <Sparkles className="h-4 w-4" />
              <span>{language === 'hi' ? 'AI-संचालित सहायक' : language === 'bn' ? 'AI-চালিত সহায়ক' : 'AI-Powered Assistant'}</span>
            </div>
            <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {t('hero.title')}
            </h1>
            <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
              {t('hero.subtitle')}
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg" className="w-full gap-2 text-base sm:w-auto">
                <Link href="/chat">
                  {t('hero.cta')}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full gap-2 text-base sm:w-auto">
                <Link href="/schemes">
                  {t('nav.schemes')}
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-background px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 md:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card key={index} className="border-0 bg-card shadow-sm transition-shadow hover:shadow-md">
                  <CardContent className="flex flex-col items-center p-6 text-center">
                    <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-xl ${feature.color}`}>
                      <Icon className="h-7 w-7" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-foreground">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-card px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              {language === 'hi' ? 'योजनाओं की श्रेणियां' : language === 'bn' ? 'প্রকল্পের বিভাগ' : 'Scheme Categories'}
            </h2>
            <p className="mt-3 text-muted-foreground">
              {language === 'hi' ? 'आपकी ज़रूरत के अनुसार सही योजना खोजें' : language === 'bn' ? 'আপনার প্রয়োজন অনুযায়ী সঠিক প্রকল্প খুঁজুন' : 'Find the right scheme for your needs'}
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {categories.map((category) => {
              const Icon = iconMap[category.icon] || Heart
              const name = language === 'hi' ? category.nameHindi : language === 'bn' ? category.nameBengali : category.name
              return (
                <Link
                  key={category.id}
                  href={`/schemes?category=${category.id}`}
                  className="group flex flex-col items-center gap-3 rounded-xl border border-border bg-background p-6 transition-all hover:border-primary hover:shadow-md"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{name}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-background px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              {language === 'hi' ? 'यह कैसे काम करता है' : language === 'bn' ? 'এটি কীভাবে কাজ করে' : 'How It Works'}
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                step: '1',
                title: language === 'hi' ? 'अपनी ज़रूरत बताएं' : language === 'bn' ? 'আপনার প্রয়োজন বলুন' : 'Tell Us Your Need',
                description: language === 'hi' ? 'बस बोलें या टाइप करें कि आपको क्या चाहिए' : language === 'bn' ? 'শুধু বলুন বা টাইপ করুন আপনার কী দরকার' : 'Just speak or type what you need',
                icon: MessageSquare,
              },
              {
                step: '2',
                title: language === 'hi' ? 'मिलान पाएं' : language === 'bn' ? 'মিল খুঁজুন' : 'Get Matched',
                description: language === 'hi' ? 'AI आपके लिए सही योजनाएं खोजता है' : language === 'bn' ? 'AI আপনার জন্য সঠিক প্রকল্প খোঁজে' : 'AI finds the right schemes for you',
                icon: Sparkles,
              },
              {
                step: '3',
                title: language === 'hi' ? 'आवेदन करें' : language === 'bn' ? 'আবেদন করুন' : 'Apply',
                description: language === 'hi' ? 'सरल गाइड के साथ आवेदन करें' : language === 'bn' ? 'সহজ গাইড সহ আবেদন করুন' : 'Apply with our simple guide',
                icon: CheckCircle,
              },
            ].map((item, index) => {
              const Icon = item.icon
              return (
                <div key={index} className="relative flex flex-col items-center text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Icon className="h-8 w-8" />
                  </div>
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full bg-saffron px-3 py-1 text-xs font-bold text-saffron-foreground">
                    {language === 'hi' ? `चरण ${item.step}` : language === 'bn' ? `ধাপ ${item.step}` : `Step ${item.step}`}
                  </div>
                  <h3 className="mb-2 mt-2 text-lg font-semibold text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-card px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              {language === 'hi' ? 'लोगों की कहानियां' : language === 'bn' ? 'মানুষের গল্প' : 'People\'s Stories'}
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-border bg-background">
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Users className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-pretty text-muted-foreground">&quot;{testimonial.quote}&quot;</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-primary-foreground sm:text-3xl">
            {language === 'hi' ? 'आज ही शुरू करें' : language === 'bn' ? 'আজই শুরু করুন' : 'Start Today'}
          </h2>
          <p className="mt-4 text-primary-foreground/80">
            {language === 'hi' 
              ? 'हजारों लोग सारथी की मदद से सरकारी योजनाओं का लाभ उठा रहे हैं। आप भी जुड़ें!'
              : language === 'bn'
              ? 'হাজার হাজার মানুষ সারথির সাহায্যে সরকারি প্রকল্পের সুবিধা পাচ্ছেন। আপনিও যোগ দিন!'
              : 'Thousands of people are benefiting from government schemes with Saarthi. Join them!'}
          </p>
          <Button asChild size="lg" variant="secondary" className="mt-8 gap-2 text-base">
            <Link href="/chat">
              {t('hero.cta')}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <span className="font-bold">S</span>
              </div>
              <span className="font-semibold text-foreground">Saarthi</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {language === 'hi' 
                ? '© 2026 सारथी। सभी अधिकार सुरक्षित।'
                : language === 'bn'
                ? '© 2026 সারথি। সর্বস্বত্ব সংরক্ষিত।'
                : '© 2026 Saarthi. All rights reserved.'}
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
