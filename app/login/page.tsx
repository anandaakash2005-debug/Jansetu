'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import './login.css';
import { loginHtml } from './login-content';

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    const imgBtn = document.querySelector('.img__btn');
    
    const handleImgBtnClick = function() {
        document.querySelector('.cont')?.classList.toggle('s--signup');
    };
    
    if (imgBtn) {
        imgBtn.addEventListener('click', handleImgBtnClick);
    }

    // LANGUAGE DATA
    const languages = [
        { name: 'English', t: { welcomeTitle:'Welcome Back', createTitle:'Create Account', labelEmail:'Email', labelEmail2:'Email', labelPassword:'Password', labelName:'Name', labelPass2:'Password', labelConfirm:'Confirm Password', forgotText:'Forgot password?', signinBtn:'Sign In', signupBtn:'Sign Up', panelSignupTitle:'New here?', panelSignupText:'Create an account and start your journey with us today.', panelSigninTitle:'Welcome back!', panelSigninText:'Already have an account? Sign in to continue.', btnSignup:'Sign Up', btnSignin:'Sign In' }},
        { name: 'हिन्दी', t: { welcomeTitle:'वापस स्वागत है', createTitle:'खाता बनाएं', labelEmail:'ईमेल', labelEmail2:'ईमेल', labelPassword:'पासवर्ड', labelName:'नाम', labelPass2:'पासवर्ड', labelConfirm:'पुष्टि करें', forgotText:'पासवर्ड भूल गए?', signinBtn:'साइन इन', signupBtn:'साइन अप', panelSignupTitle:'नए हैं?', panelSignupText:'खाता बनाएं और हमारे साथ अपनी यात्रा शुरू करें।', panelSigninTitle:'वापसी पर स्वागत!', panelSigninText:'पहले से खाता है? साइन इन करें।', btnSignup:'साइन अप', btnSignin:'साइन इन' }},
        { name: 'বাংলা', t: { welcomeTitle:'স্বাগতম', createTitle:'অ্যাকাউন্ট তৈরি করুন', labelEmail:'ইমেইল', labelEmail2:'ইমেইল', labelPassword:'পাসওয়ার্ড', labelName:'নাম', labelPass2:'পাসওয়ার্ড', labelConfirm:'নিশ্চিত করুন', forgotText:'পাসওয়ার্ড ভুলে গেছেন?', signinBtn:'সাইন ইন', signupBtn:'সাইন আপ', panelSignupTitle:'নতুন এখানে?', panelSignupText:'একটি অ্যাকাউন্ট তৈরি করুন এবং আজই আমাদের সাথে যোগ দিন।', panelSigninTitle:'আবার স্বাগতম!', panelSigninText:'ইতিমধ্যে অ্যাকাউন্ট আছে? সাইন ইন করুন।', btnSignup:'সাইন আপ', btnSignin:'সাইন ইন' }},
    ];
    let currentLang = 0;

    function applyLanguage(t: any) {
        if(document.getElementById('welcome-title')) document.getElementById('welcome-title')!.textContent = t.welcomeTitle;
        if(document.getElementById('create-title')) document.getElementById('create-title')!.textContent = t.createTitle;
        if(document.getElementById('label-email')) document.getElementById('label-email')!.textContent = t.labelEmail;
        if(document.getElementById('label-email2')) document.getElementById('label-email2')!.textContent = t.labelEmail2;
        if(document.getElementById('label-password')) document.getElementById('label-password')!.textContent = t.labelPassword;
        if(document.getElementById('label-name')) document.getElementById('label-name')!.textContent = t.labelName;
        if(document.getElementById('label-pass2')) document.getElementById('label-pass2')!.textContent = t.labelPass2;
        if(document.getElementById('label-confirm')) document.getElementById('label-confirm')!.textContent = t.labelConfirm;
        if(document.getElementById('forgot-text')) document.getElementById('forgot-text')!.textContent = t.forgotText;
        if(document.getElementById('signin-btn')) document.getElementById('signin-btn')!.textContent = t.signinBtn;
        if(document.getElementById('signup-btn')) document.getElementById('signup-btn')!.textContent = t.signupBtn;
        if(document.getElementById('panel-signup-title')) document.getElementById('panel-signup-title')!.textContent = t.panelSignupTitle;
        if(document.getElementById('panel-signup-text')) document.getElementById('panel-signup-text')!.textContent = t.panelSignupText;
        if(document.getElementById('panel-signin-title')) document.getElementById('panel-signin-title')!.textContent = t.panelSigninTitle;
        if(document.getElementById('panel-signin-text')) document.getElementById('panel-signin-text')!.textContent = t.panelSigninText;
        if(document.getElementById('btn-signup-label')) document.getElementById('btn-signup-label')!.textContent = t.btnSignup;
        if(document.getElementById('btn-signin-label')) document.getElementById('btn-signin-label')!.textContent = t.btnSignin;
    }

    function switchLang(dir: number) {
        const oldSpan = document.getElementById('lang-text');
        if (!oldSpan) return;
        oldSpan.className = dir > 0 ? 'lang-out-left' : 'lang-out-right';
        currentLang = (currentLang + dir + languages.length) % languages.length;
        const lang = languages[currentLang];
        setTimeout(() => {
            oldSpan.textContent = lang.name;
            oldSpan.className = dir > 0 ? 'lang-out-right' : 'lang-out-left';
            void oldSpan.offsetWidth;
            oldSpan.className = 'lang-active';
            applyLanguage(lang.t);
        }, 140);
    }

    const handlePrev = () => switchLang(-1);
    const handleNext = () => switchLang(1);

    const langPrev = document.getElementById('lang-prev');
    const langNext = document.getElementById('lang-next');
    
    if (langPrev) langPrev.addEventListener('click', handlePrev);
    if (langNext) langNext.addEventListener('click', handleNext);

    const handleLoginSubmit = () => {
        router.push('/');
    };

    const signinBtn = document.getElementById('signin-btn');
    const signupBtn = document.getElementById('signup-btn');

    if (signinBtn) signinBtn.addEventListener('click', handleLoginSubmit);
    if (signupBtn) signupBtn.addEventListener('click', handleLoginSubmit);

    return () => {
        if (imgBtn) imgBtn.removeEventListener('click', handleImgBtnClick);
        if (langPrev) langPrev.removeEventListener('click', handlePrev);
        if (langNext) langNext.removeEventListener('click', handleNext);
        if (signinBtn) signinBtn.removeEventListener('click', handleLoginSubmit);
        if (signupBtn) signupBtn.removeEventListener('click', handleLoginSubmit);
    };
  }, [router]);

  return (
    <div className="login-wrapper" dangerouslySetInnerHTML={{ __html: loginHtml }}>
    </div>
  );
}
