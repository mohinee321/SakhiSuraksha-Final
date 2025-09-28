import React, { useRef, useState } from 'react';
import { LanguageSelector } from './components/language-selector';
import { AuthChoice } from './components/auth-choice';
import { SMSHelper } from './components/sms-helper';
import { FakeShoppingApp } from './components/fake-shopping-app';
import { Navbar } from './components/navbar';
import { HeroSection } from './components/hero-section';
import { FeaturesSection } from './components/features-section';
import { AuthForms } from './components/auth-forms';
import { AboutSection } from './components/about-section';
import { DemoSection } from './components/demo-section';
import { ChatbotWidget } from './components/chatbot-widget';
import { Footer } from './components/footer';

export default function App() {
  const [currentView, setCurrentView] = useState<
    'language' | 'authChoice' | 'auth' | 'sms' | 'home' | 'panic'
  >('language');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  // SOS states
  const [sosPending, setSosPending] = useState(false);
  const [sosCountdown, setSosCountdown] = useState(30);
  const [sosSent, setSosSent] = useState(false);
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const sosTimerRef = useRef<number | null>(null);
  const sosLockRef = useRef(false);

  // ------------------------
  // SOS functions
  // ------------------------
  const startSOSConfirmation = () => {
    if (sosLockRef.current) return;
    sosLockRef.current = true;
    setSosPending(true);
    setSosSent(false);
    setSosCountdown(30);

    sosTimerRef.current = window.setInterval(() => {
      setSosCountdown((prev) => {
        if (prev <= 1) {
          window.clearInterval(sosTimerRef.current!);
          sosTimerRef.current = null;
          sendSOS();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const cancelSOS = () => {
    if (sosTimerRef.current) {
      window.clearInterval(sosTimerRef.current);
      sosTimerRef.current = null;
    }
    setSosPending(false);
    setSosCountdown(30);
    setSosSent(false);
    sosLockRef.current = false;
  };

  const sendSOS = () => {
    setSosPending(false);
    setSosSent(true);
    setCurrentView('panic');

    try {
      setTimeout(() => {
        window.location.href = 'tel:100';
      }, 800);
    } catch (err) {
      console.error('Failed to open dialer', err);
    }

    sosLockRef.current = false;
  };

  // ------------------------
  // Start voice recognition
  // ------------------------
  const startListening = () => {
    if (listening) return;

    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Your browser does not support voice recognition.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = 'en-IN';

    recognition.onresult = (event: any) => {
      const transcript =
        event.results[event.results.length - 1][0].transcript
          .trim()
          .toLowerCase();
      console.log('You said:', transcript);
      if (transcript.includes('help') || transcript.includes('sakhi')) {
        startSOSConfirmation();
      }
    };

    recognition.onerror = (event: any) =>
      console.error('Speech recognition error:', event.error);

    // Restart automatically if recognition stops (common on mobile)
    recognition.onend = () => {
      console.log('Recognition ended, restarting...');
      try {
        recognition.start();
      } catch (err) {
        console.error('Failed to restart recognition:', err);
      }
    };

    recognition.start();
    recognitionRef.current = recognition;
    setListening(true);
    alert("Voice SOS is now active! Say your codeword ('help' or 'sakhi').");
  };

  // ------------------------
  // Navigation logic
  // ------------------------
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

  if (currentView === 'sms') {
    return (
      <SMSHelper
        language={selectedLanguage}
        onBack={() => setCurrentView('authChoice')}
      />
    );
  }

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

  if (currentView === 'panic') {
    return <FakeShoppingApp onExitPanic={() => setCurrentView('home')} />;
  }

  // ------------------------
  // Home view
  // ------------------------
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
  const handleGetHelp = () => startSOSConfirmation();

  return (
    <div className="min-h-screen bg-background relative">
      {/* Navbar */}
      <Navbar
        language={selectedLanguage}
        onLogin={handleLogin}
        onRegister={handleRegister}
        onPanicMode={startSOSConfirmation}
        onChangeLanguage={handleChangeLanguage}
      />

      {/* Voice Activation Button */}
      {!listening && (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={startListening}
            className="px-4 py-3 bg-orange-700 text-white font-bold rounded-full shadow-lg"
          >
            Activate Voice SOS
          </button>
        </div>
      )}

      {/* Main content */}
      <main>
        <HeroSection
          language={selectedLanguage}
          onGetHelp={handleGetHelp}
          onLogin={handleLogin}
          onRegister={handleRegister}
          onPanicMode={startSOSConfirmation}
        />

        <section id="features">
          <FeaturesSection language={selectedLanguage} />
        </section>

        <section id="about">
          <AboutSection language={selectedLanguage} />
        </section>

        <section id="demo">
          <DemoSection language={selectedLanguage} />
        </section>
      </main>

      {/* Footer */}
      <Footer language={selectedLanguage} />

      {/* Chatbot */}
      <ChatbotWidget language={selectedLanguage} />

      {/* SOS Overlay */}
      {(sosPending || sosSent) && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-6">
          <div className="w-full max-w-md rounded-lg overflow-hidden shadow-2xl">
            <div className="bg-red-700 p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-red-700">
                  SOS
                </div>
                <div>
                  <div className="text-white font-bold text-lg">
                    {sosSent ? 'SOS Sent' : 'Emergency Detected'}
                  </div>
                  <div className="text-red-100 text-sm">
                    {sosSent
                      ? 'Connecting to police...'
                      : `Connecting to police in ${sosCountdown}s`}
                  </div>
                </div>
              </div>

              {!sosSent && (
                <button
                  onClick={cancelSOS}
                  className="bg-white text-red-700 font-semibold px-3 py-1 rounded-md"
                  aria-label="Cancel SOS"
                >
                  Cancel
                </button>
              )}
            </div>

            <div className="bg-white p-4">
              {!sosSent ? (
                <>
                  <p className="text-sm text-gray-700 mb-2">
                    We detected your codeword. If this was accidental, press{' '}
                    <strong>Cancel</strong> within 30 seconds.
                  </p>
                  <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
                    <div
                      className="h-3 bg-red-500"
                      style={{
                        width: `${((30 - sosCountdown) / 30) * 100}%`,
                        transition: 'width 0.4s linear',
                      }}
                    />
                  </div>
                </>
              ) : (
                <p className="text-sm text-gray-700">
                  SOS is being sent. Fake shopping panic UI is active and dialer
                  opened.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
