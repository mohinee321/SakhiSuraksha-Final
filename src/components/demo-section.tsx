

import React, { useState } from 'react';
import { Play, Download, Smartphone } from 'lucide-react';
import { Button } from './ui/button.js';
import { Card } from './ui/card.js';


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
    // <div className="py-20 px-4 bg-gradient-to-r from-primary/5 to-accent/5">
    //   <div className="max-w-6xl mx-auto">
    //     <div className="grid lg:grid-cols-2 gap-12 items-center">
    //       {/* Left - Demo Video */}
    //       <div className="space-y-6">
    //         <div>
    //           <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">{t.title}</h2>
    //           <p className="text-xl text-muted-foreground">{t.subtitle}</p>
    //         </div>



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
      //           <video
      //             controls
      //             autoPlay
      //             playsInline
      //             className="w-full h-64 object-cover"
      //           >
      //             <source src="/vid-1.mp4" type="video/mp4" />
      //             {/* <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" /> */}

      //             Your browser does not support the video tag.
      // </video>
      //         </div>
      //       )}
      //     </div>

      //     );
      //   }

{/* Right - Download App Section */}
//           <div className="space-y-8">
//             <Card className="p-8 bg-white shadow-xl">
//               <div className="text-center space-y-6">
//                 <div className="bg-accent/10 p-4 rounded-full w-20 h-20 mx-auto flex items-center justify-center">
//                   <Smartphone className="w-10 h-10 text-accent" />
//                 </div>

//                 <div>
//                   <h3 className="text-2xl font-bold text-primary mb-2">
//                     {t.downloadTitle}
//                   </h3>
//                   <p className="text-muted-foreground">{t.downloadSubtitle}</p>
//                 </div>
//             <div className="space-y-3">
//                   <Button
//                     size="lg"
//                     className="w-full bg-primary hover:bg-primary/90 text-white"
//                     onClick={() => alert("Redirecting to app store...")}
//                   >
                    

//  <Download className="w-5 h-5 mr-2" />
//                     {t.downloadApp}
//                   </Button>
// <div className="flex gap-2">
//                     <Button variant="outline" className="flex-1">
//                       Android
//                     </Button>
//                     <Button variant="outline" className="flex-1">
//                       iOS
//                     </Button>
//                   </div>
//                 </div>
//               </div>

//  </Card>

//             {/* Features List */}
//             <div className="space-y-4">
//               {t.features.map((feature: string, index: number) => (
//                 <div key={index} className="flex items-center gap-3">
//                   <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center shrink-0">
//                     <span className="text-white text-sm">✓</span>
//                   </div>
//                   <span className="text-muted-foreground">{feature}</span>
//                 </div>
//               ))}

// </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




// export function DemoSection({ language }: DemoSectionProps) {
//   const t = translations[language as keyof typeof translations] || translations.en;

//   return (
//     <div className="py-20 px-4 bg-gradient-to-r from-primary/5 to-accent/5">
//       <div className="max-w-6xl mx-auto">
//         <div className="grid lg:grid-cols-2 gap-12 items-center">
//           {/* Left - Demo Video */}
//           <div className="space-y-6">
//             <div>
//               <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">{t.title}</h2>
//               <p className="text-xl text-muted-foreground">{t.subtitle}</p>
//             </div>

            /* <div className="rounded-2xl overflow-hidden shadow-2xl bg-primary/10">
  <video
    controls
    className="w-full h-64 object-cover"
    poster="https://images.unsplash.com/photo-1663153203126-08bbadc178ad?..."
  >
    <source src="vid-1.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
</div>

              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <Button
                  size="lg"
                  className="bg-white/90 text-primary hover:bg-white rounded-full w-16 h-16"
                  onClick={() => alert('Demo video would play here')}
                >
                  <Play className="w-8 h-8 ml-1" />
                </Button>
              </div>
            </div> */
            




//             <div className="rounded-2xl overflow-hidden shadow-2xl bg-primary/10">
//             <video

//             controls
//             autoPlay
//             // muted
//             playsInline

//             className="w-full h-64 object-cover"
//             // poster="https://images.unsplash.com/photo-1663153203126-08bbadc178ad?auto=format&fit=crop&w=1080&q=80"
//           >
//             <source src="/vid-1.mp4" type="video/mp4" />
//             Your browser does not support the video tag.
//           </video>
//           </div>    
//            }

//             {/* <Button
//               size="lg"
//               className="bg-accent hover:bg-accent/90 text-white px-8"
//               onClick={() => alert('Demo video would play here')}
//             >
//               <Play className="w-5 h-5 mr-2" />
//               {t.watchDemo}
//             </Button> */}

//               <Button
//   size="lg"
//   className="bg-accent hover:bg-accent/90 text-white px-8"
//   onClick={() => alert('Demo video would play here')}
// >
//   <Play className="w-5 h-5 mr-2" />
//   {t.watchDemo}
// </Button>

//           </div>

//           {/* Right - Download App */}
//           <div className="space-y-8">
//             <Card className="p-8 bg-white shadow-xl">
//               <div className="text-center space-y-6">
//                 <div className="bg-accent/10 p-4 rounded-full w-20 h-20 mx-auto flex items-center justify-center">
//                   <Smartphone className="w-10 h-10 text-accent" />
//                 </div>
                
//                 <div>
//                   <h3 className="text-2xl font-bold text-primary mb-2">{t.downloadTitle}</h3>
//                   <p className="text-muted-foreground">{t.downloadSubtitle}</p>
//                 </div>

//                 <div className="space-y-3">
//                   <Button
//                     size="lg"
//                     className="w-full bg-primary hover:bg-primary/90 text-white"
//                     onClick={() => alert('Redirecting to app store...')}
//                   >
//                     <Download className="w-5 h-5 mr-2" />
//                     {t.downloadApp}
//                   </Button>
                  
//                   <div className="flex gap-2">
//                     <Button variant="outline" className="flex-1">
//                       Android
//                     </Button>
//                     <Button variant="outline" className="flex-1">
                      
//                     </Button>
//                   </div>
//                 </div>
//               </div>
//             </Card>

//             {/* Features List */}
//             <div className="space-y-4">
//               {t.features.map((feature, index) => (
//                 <div key={index} className="flex items-center gap-3">
//                   <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center shrink-0">
//                     <span className="text-white text-sm">✓</span>
//                   </div>
//                   <span className="text-muted-foreground">{feature}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




//  ----*********************************************************************************************-------





// import React from 'react';
// import { Play, Download, Smartphone } from 'lucide-react';
// // These imports assume you have these files in your project structure
// import { Button } from '../ui/button'; // Button घटकम्
// import { Card } from '../ui/card';     // Card घटकम्
// import { ImageWithFallback } from '../../figma/ImageWithFallback'; // Assuming path adjustment

// interface DemoSectionProps {
//   language: string;
// }

// const translations = {
//   en: {
//     title: "See How Sakhi Suraksha Works",
//     subtitle: "Watch our demo video to understand all features",
//     downloadTitle: "Download Our App",
//     downloadSubtitle: "Available for Android and iOS devices",
//     downloadApp: "Download App",
//     watchDemo: "Watch Demo",
//     features: [
//       "Voice recognition for distress detection",
//       "Instant connection to help centers",
//       "Location sharing with trusted contacts",
//       "Anonymous counseling sessions"
//     ]
//   },
//   hi: {
//     title: "देखें कि सखी सुरक्षा कैसे काम करती है",
//     subtitle: "सभी फीचर्स को समझने के लिए हमारा डेमो वीडियो देखें",
//     downloadTitle: "हमारा ऐप डाउनलोड करें",
//     downloadSubtitle: "Android और iOS डिवाइसेस के लिए उपलब्ध",
//     downloadApp: "ऐप डाउनलोड करें",
//     watchDemo: "डेमो देखें",
//     features: [
//       "परेशानी की पहचान के लिए आवाज़ पहचान",
//       "सहायता केंद्रों से तत्काल कनेक्शन",
//       "विश्वसनीय संपर्कों के साथ स्थान साझाकरण",
//       "गुमनाम परामर्श सत्र"
//     ]
//   },
//   ta: {
//     title: "சகி சுரக்ஷா எப்படி வேலை செய்கிறது என்பதைப் பார்க்கவும்",
//     subtitle: "அனைத்து அம்சங்களையும் புரிந்து கொள்ள எங்கள் டெமோ வீடியோவைப் பார்க்கவும்",
//     downloadTitle: "எங்கள் ஆப்ஸை டவுன்லோட் செய்யுங்கள்",
//     downloadSubtitle: "Android மற்றும் iOS சாதனங்களுக்கு கிடைக்கும்",
//     downloadApp: "ஆப்ஸ் டவுன்லோட் செய்யுங்கள்",
//     watchDemo: "டெமோ பார்க்கவும்",
//     features: [
//       "துன்பத்தைக் கண்டறிய குரல் அங்கீகாரம்",
//       "உதவி மையங்களுடன் உடனடி இணைப்பு",
//       "நம்பகமான தொடர்புகளுடன் இடப் பகிர்வு",
//       "அநாமதேய ஆலோசனை அமர்வுகள்"
//     ]
//   },
//   bn: {
//     title: "দেখুন সখী সুরক্ষা কীভাবে কাজ করে",
//     subtitle: "সমস্ত বৈশিষ্ট্য বুঝতে আমাদের ডেমো ভিডিও দেখুন",
//     downloadTitle: "আমাদের অ্যাপ ডাউনলোড করুন",
//     downloadSubtitle: "Android এবং iOS ডিভাইসের জন্য উপলব্ধ",
//     downloadApp: "অ্যাপ ডাউনলোড",
//     watchDemo: "ডেমো দেখুন",
//     features: [
//       "দুর্দশা সনাক্তকরণের জন্য ভয়েস স্বীকৃতি",
//       "সাহায্য কেন্দ্রগুলির সাথে তাৎক্ষণিক সংযোগ",
//       "বিশ্বস্ত পরিচিতিদের সাথে অবস্থান ভাগাভাগি",
//       "বেনামী পরামর্শ সেশন"
//     ]
//   },
//   mr: {
//     title: "सखी सुरक्षा कशी कार्य करते ते पहा",
//     subtitle: "सर्व वैशिष्ट्ये समजून घेण्यासाठी आमचा डेमो व्हिडिओ पहा",
//     downloadTitle: "आमचे अॅप डाउनलोड करा",
//     downloadSubtitle: "Android आणि iOS उपकरणांसाठी उपलब्ध",
//     downloadApp: "अॅप डाउनलोड करा",
//     watchDemo: "डेमो पहा",
//     features: [
//       "त्रास ओळखण्यासाठी आवाज ओळख",
//       "मदत केंद्रांशी तत्काळ कनेक्शन",
//       "विश्वासार्ह संपर्कांसह स्थान सामायिकरण",
//       "अनामिक सल्लामसलत सत्रे"
//     ]
//   },
//   gu: {
//     title: "જુઓ કે સખી સુરક્ષા કેવી રીતે કામ કરે છે",
//     subtitle: "બધી સુવિધાઓ સમજવા માટે અમારો ડેમો વીડિયો જુઓ",
//     downloadTitle: "અમારી એપ ડાઉનલોડ કરો",
//     downloadSubtitle: "Android અને iOS ઉપકરણો માટે ઉપલબ્ધ",
//     downloadApp: "એપ ડાઉનલોડ કરો",
//     watchDemo: "ડેમો જુઓ",
//     features: [
//       "તકલીફ શોધવા માટે અવાજ ઓળખ",
//       "મદદ કેન્દ્રો સાથે તાત્કાલિક જોડાણ",
//       "વિશ્વસનીય સંપર્કો સાથે સ્થાન શેરિંગ",
//       "અનામી પરામર્શ સત્રો"
//     ]
//   }
// };

// // Function to handle interactions without using alert()
// const handleInteraction = (message: string) => {
//     console.log(`Interaction: ${message}`);
//     // वास्तविक अनुप्रयोगे, custom modal दर्शयेत्। (In a real application, you would show a custom modal.)
// };


// export function DemoSection({ language }: DemoSectionProps) {
//   const t = translations[language as keyof typeof translations] || translations.en;

//   return (
//     <div className="py-20 px-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl">
//       <div className="max-w-6xl mx-auto">
//         <div className="grid lg:grid-cols-2 gap-12 items-center">
//           {/* Left - Demo Video */}
//           <div className="space-y-6">
//             <div>
//               <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">{t.title}</h2>
//               <p className="text-xl text-muted-foreground">{t.subtitle}</p>
//             </div>

//             {/* Video Player (Using the file from /public/vid-1.mp4) */}
//             <div className="rounded-2xl overflow-hidden shadow-2xl bg-primary/10">
//               <video
//                 controls
//                 className="w-full h-64 object-cover"
//                 // Using a high-quality placeholder image for the poster
//                 poster="https://placehold.co/1080x640/007bff/ffffff?text=Sakhi+Suraksha+Demo"
//               >
//                 {/* The /vid-1.mp4 path directly points to the file in the public folder */}
//                 {/* <source src="/vid-1.mp4" type="video/mp4" /> */}


//                 <source src="/vid-1.mp4" type="video/mp4" />
// {/* This assumes your `vid-1.mp4` is located directly in the `public` directory, which it is, based on the file structure you showed! Let me know if you'd like to adjust the translations or the design of any of these components. */}



//                 {/* Your browser does not support the video tag. */}
//               </video>
//             </div>
            
//             <Button
//               size="lg"
//               className="bg-accent hover:bg-accent/90 text-white px-8 transition duration-300 transform hover:scale-[1.02]"
//               onClick={() => handleInteraction('Play Demo Video')}
//             >
//               <Play className="w-5 h-5 mr-2" />
//               {t.watchDemo}
//             </Button>
//           </div>

//           {/* Right - Download App */}
//           <div className="space-y-8">
//             <Card className="p-8 bg-white shadow-xl border-2 border-primary/10 transition duration-300 hover:shadow-2xl">
//               <div className="text-center space-y-6">
//                 <div className="bg-accent/10 p-4 rounded-full w-20 h-20 mx-auto flex items-center justify-center">
//                   <Smartphone className="w-10 h-10 text-accent" />
//                 </div>
                
//                 <div>
//                   <h3 className="text-2xl font-bold text-primary mb-2">{t.downloadTitle}</h3>
//                   <p className="text-muted-foreground">{t.downloadSubtitle}</p>
//                 </div>

//                 <div className="space-y-3">
//                   <Button
//                     size="lg"
//                     className="w-full bg-primary hover:bg-primary/90 text-white transition duration-300"
//                     onClick={() => handleInteraction('Redirecting to unified app store page...')}
//                   >
//                     <Download className="w-5 h-5 mr-2" />
//                     {t.downloadApp}
//                   </Button>
                  
//                   {/* Split buttons for specific stores */}
//                   <div className="flex gap-4 pt-2">
//                     <Button variant="outline" className="flex-1 text-primary border-primary/20 hover:bg-primary/5">
//                       Android
//                     </Button>
//                     <Button variant="outline" className="flex-1 text-primary border-primary/20 hover:bg-primary/5">
//                       iOS
//                     </Button>
//                   </div>
//                 </div>
//               </div>
//             </Card>

//             {/* Features List */}
//             <div className="space-y-4 pt-4">
//               {t.features.map((feature, index) => (
//                 <div key={index} className="flex items-start gap-3 p-2 bg-white/5 rounded-lg">
//                   <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center shrink-0 mt-1 shadow-md">
//                     <span className="text-white text-sm">✓</span>
//                   </div>
//                   <span className="text-muted-foreground text-base">{feature}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


// *****************************************************************************************************************************************************



// import React, { useState } from 'react';
// import { Play, Download, Smartphone } from 'lucide-react';

// // =======================================================
// // A. INTERNAL UI COMPONENTS (Defined here to prevent import errors)
// // =======================================================

// // A.1. ImageWithFallback Component (Defined internally)
// interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

// export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({ src, alt, className, ...props }) => {
//   const [didError, setDidError] = useState(false);
//   const handleError = () => { setDidError(true); };

//   if (didError || !src) {
//     return (
//       <div 
//         className={`inline-block bg-gray-100 text-center p-4 rounded-lg text-sm text-gray-500 flex items-center justify-center ${className}`}
//         style={{ minHeight: '100px' }}
//       >
//         Image unavailable
//       </div>
//     );
//   }
//   return (
//     <img
//       src={src}
//       alt={alt}
//       onError={handleError}
//       className={className}
//       {...props}
//     />
//   );
// };

// // A.2. Button Component (Defined internally)
// type ButtonSize = 'sm' | 'md' | 'lg';
// type ButtonVariant = 'default' | 'outline' | 'ghost';

// interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
//   size?: ButtonSize;
//   variant?: ButtonVariant;
//   className?: string;
// }

// const sizeClasses: Record<ButtonSize, string> = {
//   sm: 'px-3 py-1 text-sm',
//   md: 'px-4 py-2 text-base',
//   lg: 'px-6 py-3 text-lg',
// };

// const variantClasses: Record<ButtonVariant, string> = {
//   default: 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md',
//   outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-100',
//   ghost: 'text-gray-700 hover:bg-gray-100',
// };

// export const Button: React.FC<ButtonProps> = ({
//   size = 'md',
//   variant = 'default',
//   className = '',
//   children,
//   ...props
// }) => {
//   const baseClasses = 'inline-flex items-center justify-center rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500';

//   const finalClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

//   return (
//     <button className={finalClasses} {...props}>
//       {children}
//     </button>
//   );
// };

// // A.3. Card Component (Defined internally)
// interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
//   className?: string;
// }

// export const Card: React.FC<CardProps> = ({ className = '', children, ...props }) => {
//   const defaultClasses = 'rounded-xl border bg-card text-card-foreground shadow-sm';
//   const finalClasses = `${defaultClasses} ${className}`;

//   return (
//     <div className={finalClasses} {...props}>
//       {children}
//     </div>
//   );
// };

// // =======================================================
// // B. MAIN DEMO SECTION COMPONENT
// // =======================================================

// interface DemoSectionProps {
//   language: string;
// }

// const translations = {
//   en: {
//     title: "See How Sakhi Suraksha Works",
//     subtitle: "Watch our demo video to understand all features",
//     downloadTitle: "Download Our App",
//     downloadSubtitle: "Available for Android and iOS devices",
//     downloadApp: "Download App",
//     watchDemo: "Watch Demo",
//     features: [
//       "Voice recognition for distress detection",
//       "Instant connection to help centers",
//       "Location sharing with trusted contacts",
//       "Anonymous counseling sessions"
//     ]
//   },
//   hi: {
//     title: "देखें कि सखी सुरक्षा कैसे काम करती है",
//     subtitle: "सभी फीचर्स को समझने के लिए हमारा डेमो वीडियो देखें",
//     downloadTitle: "हमारा ऐप डाउनलोड करें",
//     downloadSubtitle: "Android और iOS डिवाइसेस के लिए उपलब्ध",
//     downloadApp: "ऐप डाउनलोड करें",
//     watchDemo: "डेमो देखें",
//     features: [
//       "परेशानी की पहचान के लिए आवाज़ पहचान",
//       "सहायता केंद्रों से तत्काल कनेक्शन",
//       "विश्वसनीय संपर्कों के साथ स्थान साझाकरण",
//       "गुमनाम परामर्श सत्र"
//     ]
//   },
//   ta: {
//     title: "சகி சுரக்ஷா எப்படி வேலை செய்கிறது என்பதைப் பார்க்கவும்",
//     subtitle: "அனைத்து அம்சங்களையும் புரிந்து கொள்ள எங்கள் டெமோ வீடியோவைப் பார்க்கவும்",
//     downloadTitle: "எங்கள் ஆப்ஸை டவுன்லோட் செய்யுங்கள்",
//     downloadSubtitle: "Android மற்றும் iOS சாதனங்களுக்கு கிடைக்கும்",
//     downloadApp: "ஆப்ஸ் டவுன்லோட் செய்யுங்கள்",
//     watchDemo: "டெமோ பார்க்கவும்",
//     features: [
//       "துன்பத்தைக் கண்டறிய குரல் அங்கீகாரம்",
//       "உதவி மையங்களுடன் உடனடி இணைப்பு",
//       "நம்பகமான தொடர்புகளுடன் இடப் பகிர்வு",
//       "அநாமதேய ஆலோசனை அமர்வுகள்"
//     ]
//   },
//   bn: {
//     title: "দেখুন সখী সুরক্ষা কীভাবে কাজ করে",
//     subtitle: "সমস্ত বৈশিষ্ট্য বুঝতে আমাদের ডেমো ভিডিও দেখুন",
//     downloadTitle: "আমাদের অ্যাপ ডাউনলোড করুন",
//     downloadSubtitle: "Android এবং iOS ডিভাইসের জন্য উপলব্ধ",
//     downloadApp: "অ্যাপ ডাউনলোড",
//     watchDemo: "ডেমো দেখুন",
//     features: [
//       "দুর্দশা সনাক্তকরণের জন্য ভয়েস স্বীকৃতি",
//       "সাহায্য কেন্দ্রগুলির সাথে তাৎক্ষণিক সংযোগ",
//       "বিশ্বস্ত পরিচিতিদের সাথে অবস্থান ভাগাভাগি",
//       "বেনামী পরামর্শ সেশন"
//     ]
//   },
//   mr: {
//     title: "सखी सुरक्षा कशी कार्य करते ते पहा",
//     subtitle: "सर्व वैशिष्ट्ये समजून घेण्यासाठी आमचा डेमो व्हिडिओ पहा",
//     downloadTitle: "आमचे अॅप डाउनलोड करा",
//     downloadSubtitle: "Android आणि iOS उपकरणांसाठी उपलब्ध",
//     downloadApp: "अॅप डाउनलोड करा",
//     watchDemo: "डेमो पहा",
//     features: [
//       "त्रास ओळखण्यासाठी आवाज ओळख",
//       "मदत केंद्रांशी तत्काळ कनेक्शन",
//       "विश्वासार्ह संपर्कांसह स्थान सामायिकरण",
//       "अनामिक सल्लामसलत सत्रे"
//     ]
//   },
//   gu: {
//     title: "જુઓ કે સખી સુરક્ષા કેવી રીતે કામ કરે છે",
//     subtitle: "બધી સુવિધાઓ સમજવા માટે અમારો ડેમો વીડિયો જુઓ",
//     downloadTitle: "અમારી એપ ડાઉનલોડ કરો",
//     downloadSubtitle: "Android અને iOS ઉપકરણો માટે ઉપલબ્ધ",
//     downloadApp: "એપ ડાઉનલોડ કરો",
//     watchDemo: "ડેમો જુઓ",
//     features: [
//       "તકલીફ શોધવા માટે અવાજ ઓળખ",
//       "મદદ કેન્દ્રો સાથે તાત્કાલિક જોડાણ",
//       "વિશ્વસનીય સંપર્કો સાથે સ્થાન શેરિંગ",
//       "અનામી પરામર્શ સત્રો"
//     ]
//   }
// };

// // Function to handle interactions without using alert()
// const handleInteraction = (message: string) => {
//     console.log(`Interaction: ${message}`);
//     // In a real application, you would show a custom modal instead of alert/confirm.
// };


// export function DemoSection({ language }: DemoSectionProps) {
//   const t = translations[language as keyof typeof translations] || translations.en;

//   return (
//     <div className="py-20 px-4 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 rounded-xl">
//       <div className="max-w-6xl mx-auto">
//         <div className="grid lg:grid-cols-2 gap-12 items-center">
//           {/* Left - Demo Video */}
//           <div className="space-y-6">
//             <div>
//               <h2 className="text-3xl lg:text-4xl font-bold text-indigo-700 mb-4">{t.title}</h2>
//               <p className="text-xl text-gray-600">{t.subtitle}</p>
//             </div>

//             {/* Video Player (Mocked) */}
//             <div className="rounded-2xl overflow-hidden shadow-2xl bg-indigo-700/10">
//               <video
//                 controls
//                 className="w-full h-64 object-cover"
//                 // Using a high-quality placeholder image for the poster
//                 poster="https://placehold.co/1080x640/5c6bc0/ffffff?text=Sakhi+Suraksha+Demo"
//               >
//                 {/* The /vid-1.mp4 path directly points to the file in the public folder */}
//                 <source src="/vid-1.mp4" type="video/mp4" />
//                 Your browser does not support the video tag.
//               </video>
//             </div>
            
//             <Button
//               size="lg"
//               className="bg-purple-600 hover:bg-purple-700 text-white px-8 transition duration-300 transform hover:scale-[1.02]"
//               onClick={() => handleInteraction('Play Demo Video')}
//             >
//               <Play className="w-5 h-5 mr-2" />
//               {t.watchDemo}
//             </Button>
//           </div>

//           {/* Right - Download App */}
//           <div className="space-y-8">
//             <Card className="p-8 bg-white shadow-xl border-2 border-indigo-700/10 transition duration-300 hover:shadow-2xl">
//               <div className="text-center space-y-6">
//                 <div className="bg-purple-600/10 p-4 rounded-full w-20 h-20 mx-auto flex items-center justify-center">
//                   <Smartphone className="w-10 h-10 text-purple-600" />
//                 </div>
                
//                 <div>
//                   <h3 className="text-2xl font-bold text-indigo-700 mb-2">{t.downloadTitle}</h3>
//                   <p className="text-gray-600">{t.downloadSubtitle}</p>
//                 </div>

//                 <div className="space-y-3">
//                   <Button
//                     size="lg"
//                     className="w-full bg-indigo-600 hover:bg-indigo-700 text-white transition duration-300"
//                     onClick={() => handleInteraction('Redirecting to unified app store page...')}
//                   >
//                     <Download className="w-5 h-5 mr-2" />
//                     {t.downloadApp}
//                   </Button>
                  
//                   {/* Split buttons for specific stores */}
//                   <div className="flex gap-4 pt-2">
//                     <Button variant="outline" className="flex-1 text-indigo-600 border-indigo-600/20 hover:bg-indigo-600/5">
//                       Android
//                     </Button>
//                     <Button variant="outline" className="flex-1 text-indigo-600 border-indigo-600/20 hover:bg-indigo-600/5">
//                       iOS
//                     </Button>
//                   </div>
//                 </div>
//               </div>
//             </Card>

//             {/* Features List */}
//             <div className="space-y-4 pt-4">
//               {t.features.map((feature, index) => (
//                 <div key={index} className="flex items-start gap-3 p-2 bg-white rounded-lg border border-gray-100 shadow-sm">
//                   <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center shrink-0 mt-1 shadow-md">
//                     <span className="text-white text-sm font-bold">✓</span>
//                   </div>
//                   <span className="text-gray-700 text-base">{feature}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
