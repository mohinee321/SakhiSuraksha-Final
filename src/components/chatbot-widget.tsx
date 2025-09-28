import React, { useState } from 'react';
import { MessageCircle, X, Send, Phone } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';

interface ChatbotWidgetProps {
  language: string;
}

const translations = {
  en: {
    title: "Need Help?",
    placeholder: "Type your message...",
    emergency: "Emergency Helpline",
    quickResponses: [
      "I need immediate help",
      "Find nearest help center",
      "I want to talk to someone",
      "How to stay safe?"
    ],
    botResponses: [
      "I'm here to help you. You are not alone.",
      "For immediate emergency, call 100 or press the SOS button.",
      "Would you like me to connect you with a counselor?",
      "Your safety is our priority. What kind of help do you need?"
    ]
  },
  hi: {
    title: "मदद चाहिए?",
    placeholder: "अपना संदेश टाइप करें...",
    emergency: "आपातकालीन हेल्पलाइन",
    quickResponses: [
      "मुझे तुरंत मदद चाहिए",
      "निकटतम सहायता केंद्र खोजें",
      "मैं किसी से बात करना चाहता हूं",
      "सुरक्षित कैसे रहें?"
    ],
    botResponses: [
      "मैं आपकी मदद के लिए यहां हूं। आप अकेले नहीं हैं।",
      "तत्काल आपातकाल के लिए, 100 पर कॉल करें या SOS बटन दबाएं।",
      "क्या आप चाहेंगे कि मैं आपको किसी काउंसलर से जोड़ दूं?",
      "आपकी सुरक्षा हमारी प्राथमिकता है। आपको किस प्रकार की सहायता चाहिए?"
    ]
  },
  ta: {
    title: "உதவி தேவையா?",
    placeholder: "உங்கள் செய்தியை தட்டச்சு செய்யுங்கள்...",
    emergency: "அவசர உதவி மையம்",
    quickResponses: [
      "எனக்கு உடனடி உதவி தேவை",
      "அருகிலுள்ள உதவி மையத்தைக் கண்டறியுங்கள்",
      "நான் யாரிடமாவது பேச விரும்புகிறேன்",
      "எப்படி பாதுகாப்பாக இருப்பது?"
    ],
    botResponses: [
      "நான் உங்களுக்கு உதவ இங்கே இருக்கிறேன். நீங்கள் தனியாக இல்லை.",
      "உடனடி அவசரநிலைக்கு, 100 ஐ அழைக்கவும் அல்லது SOS பொத்தானை அழுத்தவும்.",
      "நான் உங்களை ஒரு ஆலோசகருடன் இணைக்க விரும்புகிறீர்களா?",
      "உங்கள் பாதுகாப்பு எங்கள் முன்னுரிமை. உங்களுக்கு என்ன வகையான உதவி தேவை?"
    ]
  },
  bn: {
    title: "সাহায্য দরকার?",
    placeholder: "আপনার বার্তা টাইপ করুন...",
    emergency: "জরুরি হেল্পলাইন",
    quickResponses: [
      "আমার তাৎক্ষণিক সাহায্য দরকার",
      "নিকটতম সাহায্য কেন্দ্র খুঁজুন",
      "আমি কারো সাথে কথা বলতে চাই",
      "কীভাবে নিরাপদ থাকবেন?"
    ],
    botResponses: [
      "আমি আপনাকে সাহায্য করার জন্য এখানে আছি। আপনি একা নন।",
      "তাৎক্ষণিক জরুরি অবস্থার জন্য, ১০০ এ কল করুন বা SOS বোতাম চাপুন।",
      "আপনি কি চান যে আমি আপনাকে একজন পরামর্শদাতার সাথে সংযুক্ত করি?",
      "আপনার নিরাপত্তা আমাদের অগ্রাধিকার। আপনার কী ধরনের সাহায্য প্রয়োজন?"
    ]
  },
  mr: {
    title: "मदत हवी आहे?",
    placeholder: "तुमचा संदेश टाइप करा...",
    emergency: "आपत्कालीन हेल्पलाइन",
    quickResponses: [
      "मला तातडीने मदत हवी आहे",
      "जवळचे मदत केंद्र शोधा",
      "मला कोणाशी तरी बोलायचे आहे",
      "सुरक्षित कसे राहावे?"
    ],
    botResponses: [
      "मी तुमची मदत करण्यासाठी येथे आहे. तुम्ही एकटे नाही आहात.",
      "तातडीच्या आपत्कालीन परिस्थितीसाठी, १०० वर कॉल करा किंवा SOS बटण दाबा.",
      "तुम्हाला मी तुम्हाला एखाद्या समुपदेशकाशी जोडावे असे वाटते का?",
      "तुमची सुरक्षा आमची प्राथमिकता आहे. तुम्हाला कोणत्या प्रकारची मदत हवी आहे?"
    ]
  },
  gu: {
    title: "મદદ જોઈએ છે?",
    placeholder: "તમારો સંદેશ ટાઈપ કરો...",
    emergency: "કટોકટી હેલ્પલાઈન",
    quickResponses: [
      "મને તાત્કાલિક મદદ જોઈએ છે",
      "નજીકનું મદદ કેન્દ્ર શોધો",
      "હું કોઈની સાથે વાત કરવા માંગુ છું",
      "કેવી રીતે સુરક્ષિત રહેવું?"
    ],
    botResponses: [
      "હું તમારી મદદ કરવા અહીં છું. તમે એકલા નથી.",
      "તાત્કાલિક કટોકટી માટે, ૧૦૦ પર કૉલ કરો અથવા SOS બટન દબાવો.",
      "શું તમે ઇચ્છો છો કે હું તમને કોઈ સલાહકાર સાથે જોડું?",
      "તમારી સુરક્ષા અમારી પ્રાથમિકતા છે. તમને કયા પ્રકારની મદદ જોઈએ છે?"
    ]
  }
};

export function ChatbotWidget({ language }: ChatbotWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{text: string, isBot: boolean}>>([]);
  const [inputValue, setInputValue] = useState('');

  const t = translations[language as keyof typeof translations] || translations.en;

  const handleSendMessage = (message?: string) => {
    const messageText = message || inputValue;
    if (!messageText.trim()) return;

    setMessages(prev => [...prev, { text: messageText, isBot: false }]);
    setInputValue('');

    // Simulate bot response
    setTimeout(() => {
      const randomResponse = t.botResponses[Math.floor(Math.random() * t.botResponses.length)];
      setMessages(prev => [...prev, { text: randomResponse, isBot: true }]);
    }, 1000);
  };

  return (
    <>
      {/* Chat Widget Button */}
      {!isOpen && (
        <Button
          className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-accent hover:bg-accent/90 shadow-lg z-30"
          onClick={() => setIsOpen(true)}
        >
          <MessageCircle className="w-6 h-6 text-white" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-80 h-96 z-30 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-accent text-white rounded-t-lg">
            <h3 className="font-semibold">{t.title}</h3>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.length === 0 && (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  {t.botResponses[0]}
                </p>
                <div className="grid gap-2">
                  {t.quickResponses.map((response, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="text-xs justify-start h-auto py-2"
                      onClick={() => handleSendMessage(response)}
                    >
                      {response}
                    </Button>
                  ))}
                </div>
              </div>
            )}
            
            {messages.map((message, index) => (
              <div
                key={index}
                className={`p-2 rounded-lg max-w-[80%] ${
                  message.isBot
                    ? 'bg-muted text-foreground mr-auto'
                    : 'bg-accent text-white ml-auto'
                }`}
              >
                <p className="text-sm">{message.text}</p>
              </div>
            ))}
          </div>

          {/* Emergency Button */}
          <div className="p-2 border-t">
            <Button
              variant="destructive"
              size="sm"
              className="w-full mb-2"
              onClick={() => alert('Connecting to emergency helpline...')}
            >
              <Phone className="w-4 h-4 mr-2" />
              {t.emergency}
            </Button>
          </div>

          {/* Input */}
          <div className="p-3 border-t">
            <div className="flex gap-2">
              <Input
                placeholder={t.placeholder}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
              />
              <Button size="sm" onClick={() => handleSendMessage()}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
}