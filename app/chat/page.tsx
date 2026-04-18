'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { Send, Mic, MicOff, Volume2, ArrowLeft, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useLanguage } from '@/lib/language-context'
import { useUser } from '@/lib/user-context'
import { processUserMessage, getQuickReplies } from '@/lib/chat-engine'
import { cn } from '@/lib/utils'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  step?: number
}

interface ConversationStep {
  question: string
  field: 'isStudent' | 'age' | 'income' | 'state' | 'occupation' | 'complete'
  options?: string[]
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [conversationMode, setConversationMode] = useState<'free' | 'guided'>('free')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { t, language } = useLanguage()
  const { updateProfile, addToHistory } = useUser()

  const conversationSteps: ConversationStep[] = [
    {
      question: language === 'hi' 
        ? 'क्या आप एक छात्र हैं?' 
        : language === 'bn' 
        ? 'আপনি কি একজন ছাত্র?' 
        : 'Are you a student?',
      field: 'isStudent',
      options: language === 'hi' ? ['हां', 'नहीं'] : language === 'bn' ? ['হ্যাঁ', 'না'] : ['Yes', 'No']
    },
    {
      question: language === 'hi' 
        ? 'आपकी उम्र क्या है?' 
        : language === 'bn' 
        ? 'আপনার বয়স কত?' 
        : 'What is your age?',
      field: 'age',
    },
    {
      question: language === 'hi' 
        ? 'आपकी वार्षिक पारिवारिक आय कितनी है?' 
        : language === 'bn' 
        ? 'আপনার বার্ষিক পারিবারিক আয় কত?' 
        : 'What is your annual family income?',
      field: 'income',
      options: language === 'hi' 
        ? ['₹2 लाख से कम', '₹2-5 लाख', '₹5-10 लाख', '₹10 लाख से ज्यादा']
        : language === 'bn'
        ? ['₹2 লাখের কম', '₹2-5 লাখ', '₹5-10 লাখ', '₹10 লাখের বেশি']
        : ['Less than ₹2 Lakh', '₹2-5 Lakh', '₹5-10 Lakh', 'More than ₹10 Lakh']
    },
    {
      question: language === 'hi' 
        ? 'आप किस राज्य में रहते हैं?' 
        : language === 'bn' 
        ? 'আপনি কোন রাজ্যে থাকেন?' 
        : 'Which state do you live in?',
      field: 'state',
    },
    {
      question: language === 'hi' 
        ? 'आपका व्यवसाय क्या है?' 
        : language === 'bn' 
        ? 'আপনার পেশা কী?' 
        : 'What is your occupation?',
      field: 'occupation',
      options: language === 'hi'
        ? ['छात्र', 'किसान', 'व्यवसायी', 'नौकरी', 'बेरोजगार']
        : language === 'bn'
        ? ['ছাত্র', 'কৃষক', 'ব্যবসায়ী', 'চাকরিজীবী', 'বেকার']
        : ['Student', 'Farmer', 'Business', 'Employed', 'Unemployed']
    },
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    // Initial welcome message
    setMessages([{
      id: '1',
      role: 'assistant',
      content: t('chat.welcome'),
    }])
  }, [t])

  const handleSend = async (text?: string) => {
    const messageText = text || input
    if (!messageText.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    addToHistory(messageText)
    setIsTyping(true)

    // Process based on mode
    setTimeout(() => {
      let response: string

      if (conversationMode === 'guided' && currentStep < conversationSteps.length) {
        // Handle guided conversation
        const step = conversationSteps[currentStep]
        
        // Parse and save user response
        if (step.field === 'age') {
          const age = parseInt(messageText)
          if (!isNaN(age)) {
            updateProfile({ age })
          }
        } else if (step.field === 'income') {
          const incomeMap: Record<string, number> = {
            'Less than ₹2 Lakh': 200000, '₹2 लाख से कम': 200000, '₹2 লাখের কম': 200000,
            '₹2-5 Lakh': 500000, '₹2-5 लाख': 500000, '₹2-5 লাখ': 500000,
            '₹5-10 Lakh': 1000000, '₹5-10 लाख': 1000000, '₹5-10 লাখ': 1000000,
            'More than ₹10 Lakh': 1500000, '₹10 लाख से ज्यादा': 1500000, '₹10 লাখের বেশি': 1500000,
          }
          updateProfile({ income: incomeMap[messageText] || 500000 })
        } else if (step.field === 'state') {
          updateProfile({ state: messageText })
        } else if (step.field === 'occupation') {
          const occupationMap: Record<string, string> = {
            'Student': 'Student', 'छात्र': 'Student', 'ছাত্র': 'Student',
            'Farmer': 'Farmer', 'किसान': 'Farmer', 'কৃষক': 'Farmer',
            'Business': 'Self-employed', 'व्यवसायी': 'Self-employed', 'ব্যবসায়ী': 'Self-employed',
            'Employed': 'Private Employee', 'नौकरी': 'Private Employee', 'চাকরিজীবী': 'Private Employee',
            'Unemployed': 'Unemployed', 'बेरोजगार': 'Unemployed', 'বেকার': 'Unemployed',
          }
          updateProfile({ occupation: occupationMap[messageText] || messageText })
        }

        // Move to next step
        const nextStep = currentStep + 1
        setCurrentStep(nextStep)

        if (nextStep < conversationSteps.length) {
          response = conversationSteps[nextStep].question
        } else {
          // Conversation complete
          response = language === 'hi'
            ? 'धन्यवाद! आपकी जानकारी के आधार पर, मैं आपके लिए योजनाएं खोज रहा हूं। कृपया "पात्रता जांचें" पेज पर जाएं या मुझसे किसी भी योजना के बारे में पूछें।'
            : language === 'bn'
            ? 'ধন্যবাদ! আপনার তথ্যের উপর ভিত্তি করে, আমি আপনার জন্য প্রকল্প খুঁজছি। অনুগ্রহ করে "যোগ্যতা যাচাই" পৃষ্ঠায় যান বা আমাকে যেকোনো প্রকল্প সম্পর্কে জিজ্ঞাসা করুন।'
            : 'Thank you! Based on your information, I\'m finding schemes for you. Please visit the "Check Eligibility" page or ask me about any scheme.'
          setConversationMode('free')
        }
      } else {
        // Free conversation mode
        response = processUserMessage(messageText, language)
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        step: conversationMode === 'guided' ? currentStep + 1 : undefined,
      }
      setMessages(prev => [...prev, assistantMessage])
      setIsTyping(false)
    }, 800)
  }

  const startGuidedConversation = () => {
    setConversationMode('guided')
    setCurrentStep(0)
    const assistantMessage: Message = {
      id: Date.now().toString(),
      role: 'assistant',
      content: conversationSteps[0].question,
      step: 1,
    }
    setMessages(prev => [...prev, assistantMessage])
  }

  const toggleVoice = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Voice input is not supported in your browser')
      return
    }

    if (isListening) {
      setIsListening(false)
      return
    }

    const SpeechRecognition = (window as unknown as { SpeechRecognition?: typeof window.SpeechRecognition; webkitSpeechRecognition?: typeof window.SpeechRecognition }).SpeechRecognition || (window as unknown as { webkitSpeechRecognition?: typeof window.SpeechRecognition }).webkitSpeechRecognition
    if (!SpeechRecognition) return

    const recognition = new SpeechRecognition()
    recognition.lang = language === 'hi' ? 'hi-IN' : language === 'bn' ? 'bn-IN' : 'en-US'
    recognition.interimResults = false

    recognition.onstart = () => setIsListening(true)
    recognition.onend = () => setIsListening(false)
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript
      setInput(transcript)
    }

    recognition.start()
  }

  const speakMessage = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = language === 'hi' ? 'hi-IN' : language === 'bn' ? 'bn-IN' : 'en-US'
      window.speechSynthesis.speak(utterance)
    }
  }

  const quickReplies = getQuickReplies(language)
  const currentStepData = conversationMode === 'guided' && currentStep < conversationSteps.length 
    ? conversationSteps[currentStep] 
    : null

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card px-4 py-3">
        <div className="mx-auto flex max-w-3xl items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h1 className="font-semibold text-foreground">{t('nav.chat')}</h1>
              <p className="text-xs text-muted-foreground">
                {language === 'hi' ? 'आपका मार्गदर्शक' : language === 'bn' ? 'আপনার গাইড' : 'Your Guide'}
              </p>
            </div>
          </div>
          {conversationMode === 'guided' && currentStep < conversationSteps.length && (
            <div className="ml-auto rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              {t('common.step')} {currentStep + 1} {t('common.of')} {conversationSteps.length}
            </div>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="chat-scroll flex-1 overflow-y-auto px-4 py-6">
        <div className="mx-auto flex max-w-3xl flex-col gap-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                'flex max-w-[85%] flex-col gap-2',
                message.role === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'
              )}
            >
              <div
                className={cn(
                  'rounded-2xl px-4 py-3 text-base',
                  message.role === 'user'
                    ? 'rounded-br-md bg-primary text-primary-foreground'
                    : 'rounded-bl-md bg-card text-card-foreground shadow-sm'
                )}
              >
                <div className="whitespace-pre-wrap">{message.content}</div>
              </div>
              {message.role === 'assistant' && (
                <button
                  onClick={() => speakMessage(message.content)}
                  className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
                >
                  <Volume2 className="h-3.5 w-3.5" />
                  <span>{language === 'hi' ? 'सुनें' : language === 'bn' ? 'শুনুন' : 'Listen'}</span>
                </button>
              )}
            </div>
          ))}
          
          {isTyping && (
            <div className="mr-auto flex max-w-[85%] items-start">
              <div className="rounded-2xl rounded-bl-md bg-card px-4 py-4 shadow-sm">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: '0ms' }} />
                  <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: '150ms' }} />
                  <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="border-t border-border bg-card px-4 py-3">
        <div className="mx-auto max-w-3xl">
          {/* Guided conversation options */}
          {currentStepData?.options && (
            <div className="mb-3 flex flex-wrap gap-2">
              {currentStepData.options.map((option) => (
                <Button
                  key={option}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSend(option)}
                  className="rounded-full"
                >
                  {option}
                </Button>
              ))}
            </div>
          )}

          {/* Quick replies for free mode */}
          {conversationMode === 'free' && messages.length <= 2 && (
            <div className="mb-3 flex flex-wrap gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={startGuidedConversation}
                className="rounded-full gap-1.5"
              >
                <Sparkles className="h-3.5 w-3.5" />
                {language === 'hi' ? 'गाइडेड सर्च' : language === 'bn' ? 'গাইডেড সার্চ' : 'Guided Search'}
              </Button>
              {quickReplies.map((reply) => (
                <Button
                  key={reply}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSend(reply)}
                  className="rounded-full"
                >
                  {reply}
                </Button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="flex items-center gap-2">
            <Button
              variant={isListening ? 'default' : 'outline'}
              size="icon"
              onClick={toggleVoice}
              className={cn(
                'shrink-0',
                isListening && 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
              )}
            >
              {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </Button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={isListening ? t('chat.listening') : t('chat.placeholder')}
              className="flex-1 rounded-xl border border-input bg-background px-4 py-3 text-base placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <Button size="icon" onClick={() => handleSend()} disabled={!input.trim()} className="shrink-0">
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
