import React, { useState } from 'react';
import { Phone, MapPin, Search, Plus, Navigation } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';

interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  type: 'police' | 'ambulance' | 'helpline' | 'hospital' | 'ngo' | 'custom';
  location?: string;
  distance?: number; // in km
}

interface EmergencyContactsProps {
  language: string;
  onBack?: () => void;
}

const translations = {
  en: {
    title: 'Emergency Contacts',
    searchPlaceholder: 'Search contacts...',
    addNew: 'Add New Contact',
    call: 'Call',
    noResults: 'No contacts found',
    distance: 'km away',
    contacts: {
      police: 'Police Emergency',
      ambulance: 'Ambulance',
      womenHelpline: 'Women Helpline',
      childHelpline: 'Child Helpline',
      hospital: 'Emergency Hospital',
      ngo: 'Women Support NGO',
      domesticViolence: 'Domestic Violence Helpline',
      legalAid: 'Legal Aid Services'
    }
  },
  hi: {
    title: 'आपातकालीन संपर्क',
    searchPlaceholder: 'संपर्क खोजें...',
    addNew: 'नया संपर्क जोड़ें',
    call: 'कॉल करें',
    noResults: 'कोई संपर्क नहीं मिला',
    distance: 'किमी दूर',
    contacts: {
      police: 'पुलिस आपातकाल',
      ambulance: 'एम्बुलेंस',
      womenHelpline: 'महिला हेल्पलाइन',
      childHelpline: 'बाल हेल्पलाइन',
      hospital: 'आपातकालीन अस्पताल',
      ngo: 'महिला सहायता एनजीओ',
      domesticViolence: 'घरेलू हिंसा हेल्पलाइन',
      legalAid: 'कानूनी सहायता सेवाएं'
    }
  },
  ta: {
    title: 'அவசரகால தொடர்புகள்',
    searchPlaceholder: 'தொடர்புகளைத் தேடு...',
    addNew: 'புதிய தொடர்பைச் சேர்க்கவும்',
    call: 'அழைக்கவும்',
    noResults: 'தொடர்புகள் எதுவும் இல்லை',
    distance: 'கி.மீ தூரம்',
    contacts: {
      police: 'காவல்துறை அவசரம்',
      ambulance: 'ஆம்புலன்ஸ்',
      womenHelpline: 'பெண்கள் உதவி எண்',
      childHelpline: 'குழந்தைகள் உதவி எண்',
      hospital: 'அவசரகால மருத்துவமனை',
      ngo: 'பெண்கள் ஆதரவு அமைப்பு',
      domesticViolence: 'குடும்ப வன்முறை உதவி எண்',
      legalAid: 'சட்ட உதவி சேவைகள்'
    }
  },
  bn: {
    title: 'জরুরি যোগাযোগ',
    searchPlaceholder: 'যোগাযোগ খুঁজুন...',
    addNew: 'নতুন যোগাযোগ যোগ করুন',
    call: 'কল করুন',
    noResults: 'কোনো যোগাযোগ পাওয়া যায়নি',
    distance: 'কিমি দূরে',
    contacts: {
      police: 'পুলিশ জরুরি',
      ambulance: 'অ্যাম্বুলেন্স',
      womenHelpline: 'মহিলা হেল্পলাইন',
      childHelpline: 'শিশু হেল্পলাইন',
      hospital: 'জরুরি হাসপাতাল',
      ngo: 'মহিলা সহায়তা এনজিও',
      domesticViolence: 'ঘরোয়া সহিংসতা হেল্পলাইন',
      legalAid: 'আইনি সহায়তা পরিষেবা'
    }
  },
  mr: {
    title: 'आपत्कालीन संपर्क',
    searchPlaceholder: 'संपर्क शोधा...',
    addNew: 'नवीन संपर्क जोडा',
    call: 'कॉल करा',
    noResults: 'कोणताही संपर्क आढळला नाही',
    distance: 'किमी दूर',
    contacts: {
      police: 'पोलीस आपत्काल',
      ambulance: 'रुग्णवाहिका',
      womenHelpline: 'महिला हेल्पलाइन',
      childHelpline: 'बाल हेल्पलाइन',
      hospital: 'आपत्कालीन रुग्णालय',
      ngo: 'महिला समर्थन एनजीओ',
      domesticViolence: 'घरगुती हिंसाचार हेल्पलाइन',
      legalAid: 'कायदेशीर सहाय्य सेवा'
    }
  },
  gu: {
    title: 'કટોકટી સંપર્કો',
    searchPlaceholder: 'સંપર્કો શોધો...',
    addNew: 'નવો સંપર્ક ઉમેરો',
    call: 'કૉલ કરો',
    noResults: 'કોઈ સંપર્કો મળ્યા નથી',
    distance: 'કિમી દૂર',
    contacts: {
      police: 'પોલીસ કટોકટી',
      ambulance: 'એમ્બ્યુલન્સ',
      womenHelpline: 'મહિલા હેલ્પલાઇન',
      childHelpline: 'બાળ હેલ્પલાઇન',
      hospital: 'કટોકટી હોસ્પિટલ',
      ngo: 'મહિલા સપોર્ટ એનજીઓ',
      domesticViolence: 'ઘરેલું હિંસા હેલ્પલાઇન',
      legalAid: 'કાનૂની સહાય સેવાઓ'
    }
  }
};

const defaultContacts: EmergencyContact[] = [
  {
    id: '1',
    name: 'police',
    phone: '100',
    type: 'police',
    location: 'Central Police Station',
    distance: 2.3
  },
  {
    id: '2',
    name: 'ambulance',
    phone: '108',
    type: 'ambulance',
    location: 'Emergency Medical Services',
    distance: 1.8
  },
  {
    id: '3',
    name: 'womenHelpline',
    phone: '181',
    type: 'helpline',
    location: 'National Women Helpline',
    distance: 0
  },
  {
    id: '4',
    name: 'childHelpline',
    phone: '1098',
    type: 'helpline',
    location: 'Child Helpline Services',
    distance: 0
  },
  {
    id: '5',
    name: 'hospital',
    phone: '102',
    type: 'hospital',
    location: 'District Hospital',
    distance: 3.5
  },
  {
    id: '6',
    name: 'ngo',
    phone: '+91-9876543210',
    type: 'ngo',
    location: 'Women Support Center',
    distance: 4.2
  },
  {
    id: '7',
    name: 'domesticViolence',
    phone: '1091',
    type: 'helpline',
    location: 'DV Support Services',
    distance: 0
  },
  {
    id: '8',
    name: 'legalAid',
    phone: '+91-9123456789',
    type: 'ngo',
    location: 'Legal Aid Cell',
    distance: 5.1
  }
];

export function EmergencyContacts({ language, onBack }: EmergencyContactsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [contacts] = useState<EmergencyContact[]>(defaultContacts);

  const t = translations[language as keyof typeof translations] || translations.en;

  const handleCall = (phone: string, name: string) => {
    // In a real app, this would trigger a phone call
    window.location.href = `tel:${phone}`;
  };

  const handleAddContact = () => {
    // In a real app, this would open a dialog to add a new contact
    alert('Add new contact functionality coming soon!');
  };

  // Filter contacts based on search query
  const filteredContacts = contacts.filter(contact => {
    const contactName = t.contacts[contact.name as keyof typeof t.contacts] || contact.name;
    return (
      contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.phone.includes(searchQuery)
    );
  });

  const getTypeColor = (type: EmergencyContact['type']) => {
    switch (type) {
      case 'police':
        return 'bg-primary/10 text-primary';
      case 'ambulance':
        return 'bg-destructive/10 text-destructive';
      case 'helpline':
        return 'bg-accent/10 text-accent';
      case 'hospital':
        return 'bg-destructive/10 text-destructive';
      case 'ngo':
        return 'bg-secondary/20 text-accent';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-primary px-6 py-6 shadow-md">
        <div className="mx-auto max-w-2xl">
          {onBack && (
            <button
              onClick={onBack}
              className="mb-4 text-primary-foreground hover:underline"
            >
              ← Back
            </button>
          )}
          <h1 className="text-primary-foreground mb-4">{t.title}</h1>
          
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white border-0"
            />
          </div>
        </div>
      </div>

      {/* Contacts List */}
      <div className="mx-auto max-w-2xl px-6 py-6">
        {filteredContacts.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            {t.noResults}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredContacts.map((contact) => {
              const contactName = t.contacts[contact.name as keyof typeof t.contacts] || contact.name;
              
              return (
                <Card key={contact.id} className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      {/* Contact Name & Type Badge */}
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="truncate">{contactName}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs ${getTypeColor(contact.type)}`}>
                          {contact.type}
                        </span>
                      </div>
                      
                      {/* Phone Number */}
                      <div className="flex items-center gap-2 mb-2 text-muted-foreground">
                        <Phone className="h-4 w-4" />
                        <span>{contact.phone}</span>
                      </div>
                      
                      {/* Location */}
                      {contact.location && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span className="text-sm truncate">{contact.location}</span>
                          {contact.distance !== undefined && contact.distance > 0 && (
                            <span className="text-sm">
                              • {contact.distance} {t.distance}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    
                    {/* Call Button */}
                    <Button
                      onClick={() => handleCall(contact.phone, contactName)}
                      className="bg-destructive hover:bg-destructive/90 text-destructive-foreground shrink-0"
                      size="icon"
                    >
                      <Phone className="h-5 w-5" />
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* Floating Add Button */}
      <button
        onClick={handleAddContact}
        className="fixed bottom-6 right-6 bg-accent hover:bg-accent/90 text-accent-foreground rounded-full p-4 shadow-lg transition-all hover:scale-110"
        aria-label={t.addNew}
      >
        <Plus className="h-6 w-6" />
      </button>
    </div>
  );
}