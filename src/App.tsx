import React, { useState } from 'react';
import { LanguageSelector } from './components/language-selector';
import { AuthChoice } from './components/auth-choice';
import { SMSHelper } from './components/sms-helper';
import { FakeShoppingApp } from './components/fake-shopping-app';
import { Navbar } from './components/navbar';
import { HeroSection } from './components/hero-section';
import { EmergencySOS } from './components/emergency-sos';
import { FeaturesSection } from './components/features-section';
import { AuthForms } from './components/auth-forms';
import { AboutSection } from './components/about-section';
import { DemoSection } from './components/demo-section';
import { ChatbotWidget } from './components/chatbot-widget';
import { Footer } from './components/footer';

export default function App() {
  const [currentView, setCurrentView] = useState<'language' | 'authChoice' | 'auth' | 'sms' | 'home' | 'panic'>('language');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  // Show language selector first
  if (currentView === 'language') {
    return (
      <LanguageSelector
        isOpen={true}
        onLanguageSelect={(language) => {
          setSelectedLanguage(language);
          setCurrentView('authChoice');
        }}
      />
    );
  }

  // Show SMS Helper if requested
  if (currentView === 'sms') {
    return (
      <SMSHelper
        language={selectedLanguage}
        onBack={() => setCurrentView('authChoice')}
      />
    );
  }

  // Show auth choice after language selection
  if (currentView === 'authChoice') {
    return (
      <AuthChoice
        language={selectedLanguage}
        onLogin={() => {
          setAuthMode('login');
          setCurrentView('auth');
        }}
        onRegister={() => {
          setAuthMode('register');
          setCurrentView('auth');
        }}
        onSMS={() => setCurrentView('sms')}
      />
    );
  }

  // Show auth forms when triggered from auth choice
  if (currentView === 'auth') {
    return (
      <div className="min-h-screen bg-background">
        <AuthForms
          language={selectedLanguage}
          isOpen={true}
          mode={authMode}
          onClose={() => setCurrentView('authChoice')}
          onSwitchMode={setAuthMode}
          onSuccess={() => setCurrentView('home')}
          isInitialRegistration={false}
        />
      </div>
    );
  }

  // Show fake shopping app in panic mode
  if (currentView === 'panic') {
    return (
      <FakeShoppingApp onExitPanic={() => setCurrentView('home')} />
    );
  }

  const handleGetHelp = () => {
    alert('Connecting to emergency services...');
  };

  const handleLogin = () => {
    setAuthMode('login');
    setCurrentView('auth');
  };

  const handleRegister = () => {
    setAuthMode('register');
    setCurrentView('auth');
  };

  const handleChangeLanguage = () => {
    setCurrentView('language');
    setSelectedLanguage('');
  };

  // Home page view
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <Navbar
        language={selectedLanguage}
        onLogin={handleLogin}
        onRegister={handleRegister}
        onPanicMode={() => setCurrentView('panic')}
        onChangeLanguage={handleChangeLanguage}
      />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <HeroSection
          language={selectedLanguage}
          onGetHelp={handleGetHelp}
          onLogin={handleLogin}
          onRegister={handleRegister}
          onPanicMode={() => setCurrentView('panic')}
        />

        {/* Features Section */}
        <section id="features">
          <FeaturesSection language={selectedLanguage} />
        </section>

        {/* About Section */}
        <section id="about">
          <AboutSection language={selectedLanguage} />
        </section>

        {/* Demo & Download Section */}
        <section id="demo">
          <DemoSection language={selectedLanguage} />
        </section>
      </main>

      {/* Footer */}
      <Footer language={selectedLanguage} />

      {/* Chatbot Widget */}
      <ChatbotWidget language={selectedLanguage} />
    </div>
  );
}