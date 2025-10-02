import React, { useState, useEffect } from "react";
import { SplashScreen } from "./components/splash-screen";
import { LanguageSelector } from "./components/language-selector.js";
import { AuthChoice } from "./components/auth-choice.js";
import { SMSHelper } from "./components/sms-helper.js";
import { FakeShoppingApp } from "./components/fake-shopping-app.js";
import { Navbar } from "./components/navbar.js";
import { HeroSection } from "./components/hero-section.js";
import { EmergencyContacts } from "./components/emergency-contacts";
import { FeaturesSection } from "./components/features-section.js";
import { AuthForms } from "./components/auth-forms.js";
import { AboutSection } from "./components/about-section.js";
import { DemoSection } from "./components/demo-section.js";
import { ChatbotWidget } from "./components/chatbot-widget.js";
import { Footer } from "./components/footer";

// 🔹 Voice Analysis Component
function VoiceAnalysis({ onCodewordDetected }: { onCodewordDetected: () => void }) {
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = Array.from(event.results as SpeechRecognitionResultList)
        .map((result) => (result as SpeechRecognitionResult)[0]?.transcript ?? "")
        .join("")
        .toLowerCase();

      const storedCodeword = localStorage.getItem("userCodeword") || "help";
      if (transcript.includes(storedCodeword)) {
        onCodewordDetected();
      }
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event);
    };

    recognition.start();
    return () => recognition.stop();
  }, [onCodewordDetected]);

  return null;
}

// 🔹 SOS Countdown Component
function SOSCountdown({
  onCancel,
  onTimeout,
}: {
  onCancel: () => void;
  onTimeout: () => void;
}) {
  const [secondsLeft, setSecondsLeft] = useState(30);
  useEffect(() => {
    if (secondsLeft <= 0) {
      onTimeout();
      return;
    }
    const timer = setTimeout(() => setSecondsLeft((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft, onTimeout]);

  return (
    <div className="fixed inset-0 bg-red-600 flex flex-col items-center justify-center text-white z-50">
      <h1 className="text-5xl font-bold mb-4">SOS!</h1>
      <p className="text-xl mb-4">
        Connecting to emergency services in {secondsLeft} seconds
      </p>
      <button
        onClick={onCancel}
        className="bg-white text-red-600 font-bold px-6 py-3 rounded shadow hover:bg-gray-200"
      >
        Cancel
      </button>
    </div>
  );
}

// 🔹 Get Location & Send SOS
const getLocation = () =>
  new Promise((resolve, reject) => {
    if (!navigator.geolocation) return reject("Geolocation not supported");
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      (err) => reject(err)
    );
  });

const sendSOS = async () => {
  try {
    const location = await getLocation();
    await fetch("http://localhost:5000/sos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Tanvi",
        location,
        contacts: [
          { number: "+919812345678" },
          { number: "+919876543210" }
        ]
      }),
    });
    alert("SOS Sent via SMS!");
  } catch (err) {
    console.error(err);
    alert("Failed to send SOS");
  }
};

export default function App() {
  const [currentView, setCurrentView] = useState<
    'splash' | 'language' | 'authChoice' | 'auth' | 'sms' | 'codeword' | 'home' | 'panic' | 'contacts'
  >('splash');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [codeword, setCodeword] = useState('');
  const [isSOS, setIsSOS] = useState(false);

  // ─── Splash Screen ───
  if (currentView === 'splash') return <SplashScreen onComplete={() => setCurrentView('language')} />;

  // ─── Language Selector ───
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

  // ─── SMS Helper ───
  if (currentView === 'sms') {
    return <SMSHelper language={selectedLanguage} onBack={() => setCurrentView('authChoice')} />;
  }

  // ─── Auth Choice ───
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

  // ─── Auth Forms ───
  if (currentView === 'auth') {
    return (
      <div className="min-h-screen bg-background">
        <AuthForms
          language={selectedLanguage}
          isOpen={true}
          mode={authMode}
          onClose={() => setCurrentView('authChoice')}
          onSwitchMode={setAuthMode}
          onSuccess={() => setCurrentView('codeword')}
          isInitialRegistration={false}
        />
      </div>
    );
  }

  // ─── Codeword Setup ───
  if (currentView === 'codeword') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-black">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96 flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-4 text-black">Choose Your Codeword</h2>
          <input
            type="text"
            placeholder="Enter codeword"
            value={codeword}
            onChange={(e) => setCodeword(e.target.value)}
            className="border p-2 rounded mb-4 text-black w-full"
          />
          <button
            onClick={() => {
              if (codeword.trim() !== "") {
                localStorage.setItem("userCodeword", codeword.toLowerCase());
                setCurrentView("home");
              }
            }}
            className="bg-gray-200 text-black px-4 py-2 rounded shadow hover:bg-gray-300 w-full"
          >
            Enter
          </button>
        </div>
      </div>
    );
  }

  // ─── Panic Mode ───
  if (currentView === 'panic') return <FakeShoppingApp onExitPanic={() => setCurrentView('home')} />;

  // ─── Emergency Contacts ───
  if (currentView === 'contacts') return <EmergencyContacts language={selectedLanguage} onBack={() => setCurrentView('home')} />;

  // ─── Home Page ───
  return (
    <div className="min-h-screen bg-background">
      {/* Voice Analysis Always Running */}
      <VoiceAnalysis onCodewordDetected={() => setIsSOS(true)} />

      {/* SOS Overlay */}
      {isSOS && (
        <SOSCountdown
          onCancel={() => setIsSOS(false)}
          onTimeout={() => {
            setIsSOS(false);
            sendSOS();
            setCurrentView("panic");
          }}
        />
      )}

      {/* Navbar */}
      <Navbar
        language={selectedLanguage}
        onLogin={() => { setAuthMode('login'); setCurrentView('auth'); }}
        onRegister={() => { setAuthMode('register'); setCurrentView('auth'); }}
        onPanicMode={() => setCurrentView('panic')}
        onChangeLanguage={() => { setCurrentView('language'); setSelectedLanguage(''); }}
        onEmergencyContacts={() => setCurrentView('contacts')}
      />

      {/* Main Content */}
      <main>
        <HeroSection
          language={selectedLanguage}
          onGetHelp={() => sendSOS()}
          onLogin={() => { setAuthMode('login'); setCurrentView('auth'); }}
          onRegister={() => { setAuthMode('register'); setCurrentView('auth'); }}
          onPanicMode={() => setCurrentView('panic')}
        />

        <section id="features"><FeaturesSection language={selectedLanguage} /></section>
        <section id="about"><AboutSection language={selectedLanguage} /></section>
        <section id="demo"><DemoSection language={selectedLanguage} /></section>
      </main>

      <Footer language={selectedLanguage} />
      <ChatbotWidget language={selectedLanguage} />
    </div>
  );
}


