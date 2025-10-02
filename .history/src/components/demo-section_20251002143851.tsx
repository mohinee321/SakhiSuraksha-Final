

// import React, { useRef } from 'react';   // ✅ Added useRef import

// import { Play, Download, Smartphone } from 'lucide-react';
import { Play } from 'lucide-react';
import { Button } from './ui/button.js';
import { Card } from './ui/card.js';
import React, { useRef, useState } from 'react'; // ✅ Add useState here


interface DemoSectionProps {
  language?: string;
}

const translations = {
  en: {
    title: "See How Sakhi Suraksha Works",
    subtitle: "Watch our demo video to understand all features",
    downloadTitle: "Download Our App",
    downloadSubtitle: "Available for Android and iOS devices",
    downloadApp: "Download App",
    watchDemo: "Watch Demo",
    features: [
      "Voice recognition for distress detection",
      "Instant connection to help centers",
      "Location sharing with trusted contacts",
      "Anonymous counseling sessions"
    ]
  },
  hi: {
    title: "देखें कि सखी सुरक्षा कैसे काम करती है",
    subtitle: "सभी फीचर्स को समझने के लिए हमारा डेमो वीडियो देखें",
    downloadTitle: "हमारा ऐप डाउनलोड करें",
    downloadSubtitle: "Android और iOS डिवाइसेस के लिए उपलब्ध",
    downloadApp: "ऐप डाउनलोड करें",
    watchDemo: "डेमो देखें",
    features: [
      "परेशानी की पहचान के लिए आवाज़ पहचान",
      "सहायता केंद्रों से तत्काल कनेक्शन",
      "विश्वसनीय संपर्कों के साथ स्थान साझाकरण",
      "गुमनाम परामर्श सत्र"
    ]
  },
  ta: {
    title: "சகி சுரக்ஷா எப்படி வேலை செய்கிறது என்பதைப் பார்க்கவும்",
    subtitle: "அனைத்து அம்சங்களையும் புரிந்து கொள்ள எங்கள் டெமோ வீடியோவைப் பார்க்கவும்",
    downloadTitle: "எங்கள் ஆப்ஸை டவுன்லோட் செய்யுங்கள்",
    downloadSubtitle: "Android மற்றும் iOS சாதனங்களுக்கு கிடைக்கும்",
    downloadApp: "ஆப்ஸ் டவுன்லோட் செய்யுங்கள்",
    watchDemo: "டெமோ பார்க்கவும்",
    features: [
      "துன்பத்தைக் கண்டறிய குரல் அங்கீகாரம்",
      "உதவி மையங்களுடன் உடனடி இணைப்பு",
      "நம்பகமான தொடர்புகளுடன் இடப் பகிர்வு",
      "அநாமதேய ஆலோசனை அமர்வுகள்"
    ]
  },
  bn: {
    title: "দেখুন সখী সুরক্ষা কীভাবে কাজ করে",
    subtitle: "সমস্ত বৈশিষ্ট্য বুঝতে আমাদের ডেমো ভিডিও দেখুন",
    downloadTitle: "আমাদের অ্যাপ ডাউনলোড করুন",
    downloadSubtitle: "Android এবং iOS ডিভাইসের জন্য উপলব্ধ",
    downloadApp: "অ্যাপ ডাউনলোড",
    watchDemo: "ডেমো দেখুন",
    features: [
      "দুর্দশা সনাক্তকরণের জন্য ভয়েস স্বীকৃতি",
      "সাহায্য কেন্দ্রগুলির সাথে তাৎক্ষণিক সংযোগ",
      "বিশ্বস্ত পরিচিতিদের সাথে অবস্থান ভাগাভাগি",
      "বেনামী পরামর্শ সেশন"
    ]
  },
  mr: {
    title: "सखी सुरक्षा कशी कार्य करते ते पहा",
    subtitle: "सर्व वैशिष्ट्ये समजून घेण्यासाठी आमचा डेमो व्हिडिओ पहा",
    downloadTitle: "आमचे अॅप डाउनलोड करा",
    downloadSubtitle: "Android आणि iOS उपकरणांसाठी उपलब्ध",
    downloadApp: "अॅप डाउनलोड करा",
    watchDemo: "डेमो पहा",
    features: [
      "त्रास ओळखण्यासाठी आवाज ओळख",
      "मदत केंद्रांशी तत्काळ कनेक्शन",
      "विश्वासार्ह संपर्कांसह स्थान सामायिकरण",
      "अनामिक सल्लामसलत सत्रे"
    ]
  },
  gu: {
    title: "જુઓ કે સખી સુરક્ષા કેવી રીતે કામ કરે છે",
    subtitle: "બધી સુવિધાઓ સમજવા માટે અમારો ડેમો વીડિયો જુઓ",
    downloadTitle: "અમારી એપ ડાઉનલોડ કરો",
    downloadSubtitle: "Android અને iOS ઉપકરણો માટે ઉપલબ્ધ",
    downloadApp: "એપ ડાઉનલોડ કરો",
    watchDemo: "ડેમો જુઓ",
    features: [
      "તકલીફ શોધવા માટે અવાજ ઓળખ",
      "મદદ કેન્દ્રો સાથે તાત્કાલિક જોડાણ",
      "વિશ્વસનીય સંપર્કો સાથે સ્થાન શેરિંગ",
      "અનામી પરામર્શ સત્રો"
    ]
  }
};

export function DemoSection({ language = 'en'}: DemoSectionProps) {
  const [showVideo, setShowVideo] = useState(false);
  const t = translations[language as keyof typeof translations] || translations.en;


  return (
 

        <div className="p-8">
      <h2 className="text-2xl font-bold mb-2">{t.title}</h2>
      <p className="mb-4 text-gray-600">{t.subtitle}</p>


{!showVideo ? (
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-white px-8"
                onClick={() => setShowVideo(true)}
              >
                <Play className="w-5 h-5 mr-2" />
                {t.watchDemo}
              </Button>
 ) : (
              // <div className="rounded-2xl overflow-hidden shadow-2xl bg-primary/10">
                 <div className="mt-4 aspect-video">
                <iframe
            width="100%"
            height="400"
            // src="https://www.youtube.com/embed/x2DD8tEmaHU"
            src="https://www.youtube.com/embed/xxKAxR3yA1I"
            title="Sakhi Suraksha Demo Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen 
              ></iframe>
 </div>
      )}
    </div>
  );
}
      