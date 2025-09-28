import React, { useState } from 'react';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { User, Mail, Lock, MapPin, Phone, X } from 'lucide-react';

interface AuthFormsProps {
  language: string;
  isOpen: boolean;
  mode: 'login' | 'register';
  onClose: () => void;
  onSwitchMode: (mode: 'login' | 'register') => void;
  onSuccess?: () => void;
  isInitialRegistration?: boolean;
}

const translations = {
  en: {
    login: "Login",
    register: "Create Account",
    name: "Full Name",
    email: "Email",
    phone: "Phone Number",
    location: "Location",
    password: "Password",
    confirmPassword: "Confirm Password",
    codeWord: "Safety Code Word",
    codeWordHint: "This word will trigger emergency mode when spoken",
    loginButton: "Login",
    registerButton: "Create Account",
    switchToRegister: "Don't have an account? Register",
    switchToLogin: "Already have an account? Login",
    googleLogin: "Continue with Google",
    otpLogin: "Login with OTP",
    privacy: "Your data is encrypted and secure"
  },
  hi: {
    login: "लॉगिन",
    register: "खाता बनाएं",
    name: "पूरा नाम",
    email: "ईमेल",
    phone: "फोन नंबर",
    location: "स्थान",
    password: "पासवर्ड",
    confirmPassword: "पासवर्ड की पुष्टि करें",
    codeWord: "सुरक्षा कोड वर्ड",
    codeWordHint: "यह शब्द बोलने पर आपातकालीन मोड चालू हो जाएगा",
    loginButton: "लॉगिन करें",
    registerButton: "खाता बनाएं",
    switchToRegister: "खाता नहीं है? रजिस्टर करें",
    switchToLogin: "पहले से खाता है? लॉगिन करें",
    googleLogin: "Google से जारी रखें",
    otpLogin: "OTP से लॉगिन करें",
    privacy: "आपका डेटा एन्क्रिप्टेड और सुरक्षित है"
  },
  ta: {
    login: "உள்நுழைவு",
    register: "கணக்கு உருவாக்கவும்",
    name: "முழு பெயர்",
    email: "மின்னஞ்சல்",
    phone: "தொலைபேசி எண்",
    location: "இடம்",
    password: "கடவுச்சொல்",
    confirmPassword: "கடவுச்சொல்லை உறுதிப்படுத்தவும்",
    codeWord: "பாதுகாப்பு குறியீட்டு வார்த்தை",
    codeWordHint: "இந்த வார்த்தையை சொன்னால் அவசர முறை தொடங்கும்",
    loginButton: "உள்நுழைவு",
    registerButton: "கணக்கு உருவாக்கவும்",
    switchToRegister: "கணக்கு இல்லையா? பதிவு செய்யுங்கள்",
    switchToLogin: "ஏற்கனவே கணக்கு உள்ளதா? உள்நுழைவு",
    googleLogin: "Google இல் தொடரவும்",
    otpLogin: "OTP உடன் உள்நுழைவு",
    privacy: "உங்கள் தரவு குறியாக்கம் செய்யப்பட்டு பாதுகாப்பானது"
  },
  bn: {
    login: "লগইন",
    register: "অ্যাকাউন্ট তৈরি করুন",
    name: "সম্পূর্ণ নাম",
    email: "ইমেইল",
    phone: "ফোন নম্বর",
    location: "অবস্থান",
    password: "পাসওয়ার্ড",
    confirmPassword: "পাসওয়ার্ড নিশ্চিত করুন",
    codeWord: "নিরাপত্তা কোড শব্দ",
    codeWordHint: "এই শব্দটি বললে জরুরি মোড চালু হবে",
    loginButton: "লগইন",
    registerButton: "অ্যাকাউন্ট তৈরি করুন",
    switchToRegister: "অ্যাকাউন্ট নেই? নিবন্ধন করুন",
    switchToLogin: "ইতিমধ্যে অ্যাকাউন্ট আছে? লগইন",
    googleLogin: "Google দিয়ে চালিয়ে যান",
    otpLogin: "OTP দিয়ে লগইন",
    privacy: "আপনার ডেটা এনক্রিপ্ট করা এবং নিরাপদ"
  },
  mr: {
    login: "लॉगिन",
    register: "खाते तयार करा",
    name: "पूर्ण नाव",
    email: "ईमेल",
    phone: "फोन नंबर",
    location: "स्थान",
    password: "पासवर्ड",
    confirmPassword: "पासवर्ड पुष्टी करा",
    codeWord: "सुरक्षा कोड वर्ड",
    codeWordHint: "हा शब्द बोलल्यावर आपत्कालीन मोड सुरू होईल",
    loginButton: "लॉगिन करा",
    registerButton: "खाते तयार करा",
    switchToRegister: "खाते नाही? नोंदणी करा",
    switchToLogin: "आधीच खाते आहे? लॉगिन करा",
    googleLogin: "Google ने सुरू ठेवा",
    otpLogin: "OTP ने लॉगिन करा",
    privacy: "तुमचा डेटा एन्क्रिप्टेड आणि सुरक्षित आहे"
  },
  gu: {
    login: "લૉગિન",
    register: "ખાતું બનાવો",
    name: "પૂરું નામ",
    email: "ઇમેઇલ",
    phone: "ફોન નંબર",
    location: "સ્થાન",
    password: "પાસવર્ડ",
    confirmPassword: "પાસવર્ડની પુષ્ટિ કરો",
    codeWord: "સુરક્ષા કોડ વર્ડ",
    codeWordHint: "આ શબ્દ બોલવાથી કટોકટી મોડ શરૂ થશે",
    loginButton: "લૉગિન",
    registerButton: "ખાતું બનાવો",
    switchToRegister: "ખાતું નથી? નોંધણી કરો",
    switchToLogin: "પહેલેથી ખાતું છે? લૉગિન",
    googleLogin: "Google સાથે ચાલુ રાખો",
    otpLogin: "OTP સાથે લૉગિન",
    privacy: "તમારો ડેટા એન્ક્રિપ્ટેડ અને સુરક્ષિત છે"
  }
};

export function AuthForms({ language, isOpen, mode, onClose, onSwitchMode, onSuccess, isInitialRegistration = false }: AuthFormsProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    password: '',
    confirmPassword: '',
    codeWord: ''
  });

  const t = translations[language as keyof typeof translations] || translations.en;

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form validation
    if (mode === 'register' && formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    
    if (onSuccess) {
      onSuccess();
    } else {
      alert(`${mode === 'login' ? 'Login' : 'Registration'} successful!`);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {isInitialRegistration ? (
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-primary mb-2">
                Welcome to Sakhi Suraksha
              </h2>
              <p className="text-muted-foreground">
                Create your secure account to access emergency support and safety features
              </p>
            </div>
          ) : (
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-primary">
                {mode === 'login' ? t.login : t.register}
              </h2>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div className="space-y-2">
                <Label htmlFor="name">{t.name}</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="name"
                    className="pl-10"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">{t.email}</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  id="email"
                  type="email"
                  className="pl-10"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>
            </div>

            {mode === 'register' && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="phone">{t.phone}</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="phone"
                      className="pl-10"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">{t.location}</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="location"
                      className="pl-10"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      required
                    />
                  </div>
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label htmlFor="password">{t.password}</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  id="password"
                  type="password"
                  className="pl-10"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required
                />
              </div>
            </div>

            {mode === 'register' && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">{t.confirmPassword}</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      className="pl-10"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="codeWord">{t.codeWord}</Label>
                  <Input
                    id="codeWord"
                    className="border-accent"
                    placeholder={t.codeWordHint}
                    value={formData.codeWord}
                    onChange={(e) => setFormData({...formData, codeWord: e.target.value})}
                    required
                  />
                  <p className="text-xs text-muted-foreground">{t.codeWordHint}</p>
                </div>
              </>
            )}

            <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
              {mode === 'login' ? t.loginButton : t.registerButton}
            </Button>

            <div className="space-y-2">
              <Button type="button" variant="outline" className="w-full">
                {t.googleLogin}
              </Button>
              {mode === 'login' && (
                <Button type="button" variant="outline" className="w-full">
                  {t.otpLogin}
                </Button>
              )}
            </div>

            {!isInitialRegistration && (
              <div className="text-center">
                <button
                  type="button"
                  className="text-accent hover:underline"
                  onClick={() => onSwitchMode(mode === 'login' ? 'register' : 'login')}
                >
                  {mode === 'login' ? t.switchToRegister : t.switchToLogin}
                </button>
              </div>
            )}

            <div className="text-center">
              <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                <Lock className="w-3 h-3" />
                {t.privacy}
              </p>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
}