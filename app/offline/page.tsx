'use client'

import { Wifi, MapPin, Download, MessageCircle, Phone, Clock, Navigation, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useLanguage } from '@/lib/language-context'

const cscCenters = [
  {
    name: 'CSC Pragati Vihar',
    address: 'Block A, Pragati Vihar, Near Post Office',
    phone: '+91 98765 43210',
    timing: '9:00 AM - 6:00 PM',
    distance: '1.2 km',
  },
  {
    name: 'Jan Seva Kendra - Sector 5',
    address: 'Sector 5, Main Market, Shop No. 15',
    phone: '+91 98765 43211',
    timing: '10:00 AM - 7:00 PM',
    distance: '2.5 km',
  },
  {
    name: 'Digital Seva Kendra',
    address: 'Village Panchayat Office, Near Bus Stand',
    phone: '+91 98765 43212',
    timing: '9:30 AM - 5:30 PM',
    distance: '3.8 km',
  },
]

export default function OfflinePage() {
  const { language, t } = useLanguage()

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/919876543210?text=Hello, I need help with government schemes', '_blank')
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-saffron/10 text-saffron">
            <Wifi className="h-8 w-8" />
          </div>
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">{t('offline.title')}</h1>
          <p className="mt-2 text-muted-foreground">
            {language === 'hi' 
              ? 'ऑफलाइन भी मदद पाएं - नजदीकी सेंटर खोजें या WhatsApp पर संपर्क करें'
              : language === 'bn'
              ? 'অফলাইনেও সাহায্য পান - কাছাকাছি সেন্টার খুঁজুন বা WhatsApp-এ যোগাযোগ করুন'
              : 'Get help offline - find nearby centers or contact us on WhatsApp'}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-6 lg:col-span-2">
            {/* CSC Centers */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  {t('offline.csc')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cscCenters.map((center, index) => (
                    <div key={index} className="rounded-lg border border-border p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground">{center.name}</h3>
                          <p className="mt-1 text-sm text-muted-foreground">{center.address}</p>
                          
                          <div className="mt-3 flex flex-wrap gap-3 text-sm">
                            <span className="flex items-center gap-1.5 text-muted-foreground">
                              <Phone className="h-3.5 w-3.5" />
                              {center.phone}
                            </span>
                            <span className="flex items-center gap-1.5 text-muted-foreground">
                              <Clock className="h-3.5 w-3.5" />
                              {center.timing}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <span className="rounded-full bg-green/10 px-2 py-1 text-xs font-medium text-green">
                            {center.distance}
                          </span>
                          <Button variant="outline" size="sm" className="gap-1.5">
                            <Navigation className="h-3.5 w-3.5" />
                            {language === 'hi' ? 'दिशाएं' : language === 'bn' ? 'দিকনির্দেশ' : 'Directions'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="mt-4 text-center text-xs text-muted-foreground">
                  {language === 'hi' 
                    ? 'यह डेमो डेटा है। वास्तविक स्थान आपके क्षेत्र के अनुसार भिन्न होंगे।'
                    : language === 'bn'
                    ? 'এটি ডেমো ডেটা। প্রকৃত অবস্থান আপনার এলাকা অনুযায়ী ভিন্ন হবে।'
                    : 'This is demo data. Actual locations will vary based on your area.'}
                </p>
              </CardContent>
            </Card>

            {/* What CSC Centers Offer */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {language === 'hi' ? 'CSC केंद्र में क्या मिलेगा?' : language === 'bn' ? 'CSC কেন্দ্রে কী পাবেন?' : 'What CSC Centers Offer'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    language === 'hi' ? 'योजनाओं के लिए आवेदन' : language === 'bn' ? 'প্রকল্পের জন্য আবেদন' : 'Apply for schemes',
                    language === 'hi' ? 'दस्तावेज स्कैन और अपलोड' : language === 'bn' ? 'নথি স্ক্যান এবং আপলোড' : 'Document scan & upload',
                    language === 'hi' ? 'आधार अपडेट' : language === 'bn' ? 'আধার আপডেট' : 'Aadhaar update',
                    language === 'hi' ? 'बैंक खाता खोलना' : language === 'bn' ? 'ব্যাংক অ্যাকাউন্ট খোলা' : 'Bank account opening',
                    language === 'hi' ? 'प्रमाण पत्र डाउनलोड' : language === 'bn' ? 'সার্টিফিকেট ডাউনলোড' : 'Certificate download',
                    language === 'hi' ? 'ऑनलाइन भुगतान' : language === 'bn' ? 'অনলাইন পেমেন্ট' : 'Online payments',
                  ].map((service, index) => (
                    <div key={index} className="flex items-center gap-2 rounded-lg bg-secondary p-3">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                        {index + 1}
                      </div>
                      <span className="text-sm text-foreground">{service}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* WhatsApp Help */}
            <Card className="border-green/30 bg-green/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green">
                  <MessageCircle className="h-5 w-5" />
                  {t('offline.whatsapp')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-muted-foreground">
                  {language === 'hi' 
                    ? 'WhatsApp पर हमसे संपर्क करें और अपने सवाल पूछें।'
                    : language === 'bn'
                    ? 'WhatsApp-এ আমাদের সাথে যোগাযোগ করুন এবং আপনার প্রশ্ন জিজ্ঞাসা করুন।'
                    : 'Contact us on WhatsApp and ask your questions.'}
                </p>
                <Button onClick={handleWhatsAppClick} className="w-full gap-2 bg-green text-green-foreground hover:bg-green/90">
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </Button>
              </CardContent>
            </Card>

            {/* Download Schemes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="h-5 w-5 text-saffron" />
                  {t('offline.download')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-muted-foreground">
                  {language === 'hi' 
                    ? 'योजनाओं की जानकारी PDF में डाउनलोड करें।'
                    : language === 'bn'
                    ? 'প্রকল্পের তথ্য PDF-এ ডাউনলোড করুন।'
                    : 'Download scheme information as PDF.'}
                </p>
                <div className="space-y-2">
                  {[
                    { name: language === 'hi' ? 'छात्रवृत्ति योजनाएं' : language === 'bn' ? 'বৃত্তি প্রকল্প' : 'Scholarship Schemes', size: '2.1 MB' },
                    { name: language === 'hi' ? 'ऋण योजनाएं' : language === 'bn' ? 'ঋণ প্রকল্প' : 'Loan Schemes', size: '1.8 MB' },
                    { name: language === 'hi' ? 'कल्याण योजनाएं' : language === 'bn' ? 'কল্যাণ প্রকল্প' : 'Welfare Schemes', size: '3.2 MB' },
                  ].map((file, index) => (
                    <Button key={index} variant="outline" className="w-full justify-between text-left" disabled>
                      <span className="truncate">{file.name}</span>
                      <span className="shrink-0 text-xs text-muted-foreground">{file.size}</span>
                    </Button>
                  ))}
                </div>
                <p className="mt-3 text-center text-xs text-muted-foreground">
                  {language === 'hi' ? 'जल्द उपलब्ध' : language === 'bn' ? 'শীঘ্রই আসছে' : 'Coming soon'}
                </p>
              </CardContent>
            </Card>

            {/* Helpline */}
            <Card className="bg-secondary">
              <CardContent className="p-4 text-center">
                <Phone className="mx-auto h-8 w-8 text-primary" />
                <h3 className="mt-2 font-semibold text-foreground">
                  {language === 'hi' ? 'सरकारी हेल्पलाइन' : language === 'bn' ? 'সরকারি হেল্পলাইন' : 'Government Helpline'}
                </h3>
                <a href="tel:1800-111-555" className="mt-1 block text-2xl font-bold text-primary">
                  1800-111-555
                </a>
                <p className="mt-1 text-xs text-muted-foreground">
                  {language === 'hi' ? 'टोल फ्री' : language === 'bn' ? 'টোল ফ্রি' : 'Toll Free'}
                </p>
              </CardContent>
            </Card>

            {/* Official Portals */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  {language === 'hi' ? 'आधिकारिक पोर्टल' : language === 'bn' ? 'অফিসিয়াল পোর্টাল' : 'Official Portals'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[
                    { name: 'scholarships.gov.in', url: 'https://scholarships.gov.in' },
                    { name: 'pmkisan.gov.in', url: 'https://pmkisan.gov.in' },
                    { name: 'mudra.org.in', url: 'https://www.mudra.org.in' },
                  ].map((portal, index) => (
                    <a
                      key={index}
                      href={portal.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between rounded-lg bg-background p-2 text-sm text-foreground transition-colors hover:bg-secondary"
                    >
                      {portal.name}
                      <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
