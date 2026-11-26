// قاعدة أسئلة البوت. كل عنصر: keywords (عربي/إنجليزي) + الجواب بلغتين + أزرار اختيارية (actions).
// actions المتاحة: call, whatsapp, email, agent

export const welcome = {
  a: {
    en: "Hello! 👋 Welcome to Voyage Plus. How can we help you today? Pick a topic below or type your question.",
    ar: "أهلاً بك! 👋 مرحباً بك في فوياج بلاس. كيف يمكننا مساعدتك اليوم؟ اختر موضوعاً شائعاً من الأسفل أو اكتب سؤالك مباشرة.",
  },
};

export const fallback = {
  a: {
    en: "Sorry, I don’t have an answer for that yet. Our team will be happy to help you directly:",
    ar: "عذراً، لا تتوفر لدي إجابة عن هذا السؤال بعد. فريقنا سيسعد بمساعدتك مباشرة عبر القنوات التالية:",
  },
  actions: ["whatsapp", "call", "email"],
};

export const faq = [
  {
    id: "greet",
    keywords: ["hello", "hi", "hey", "good morning", "good evening", "مرحبا", "اهلا", "هلا", "السلام", "صباح الخير", "مساء الخير", "السلام عليكم"],
    a: { en: "Hello! How can I help you with your travel plans today?", ar: "أهلاً بك! كيف يمكنني مساعدتك في ترتيبات سفرك اليوم؟" }
  },

  {
    id: "thanks",
    keywords: ["thanks", "thank you", "شكرا", "مشكور", "يعطيك العافيه", "تسلم"],
    a: { en: "You’re most welcome! Is there anything else I can assist you with?", ar: "عفواً وأهلاً بك دائماً! هل هناك أي خدمة أخرى أستطيع مساعدتك بها؟" }
  },

  {
    id: "services",
    chip: { en: "Services", ar: "جميع الخدمات" },
    keywords: ["services", "service", "what do you offer", "what do you do", "offer", "خدمات", "خدماتكم", "ماذا تقدمون", "شو بتقدموا", "شو الخدمات", "خدمتكم"],
    a: {
      en: "Voyage Plus provides full travel solutions in one portal: Tour Packages 🏖️, Flights ✈️, Hotels 🏨, Visa Assistance 🛂, Airport Transfers 🚘, Travel Insurance 🛡️ and B2B Agent Services. What would you like to explore?",
      ar: "فوياج بلاس تقدم حلول سفر شاملة في بوابة واحدة: الباقات السياحية 🏖️، الطيران ✈️، الفنادق 🏨، التأشيرات 🛂، النقل والمواصلات 🚘، التأمين 🛡️ وخدمات وكلاء B2B. عن أي خدمة تود الاستفسار؟",
    }
  },

  {
    id: "flights",
    chip: { en: "Flights", ar: "حجز الطيران" },
    keywords: ["flight", "flights", "airline", "ticket", "tickets", "ticketing", "fly", "air india", "emirates", "etihad", "turkish", "air arabia", "طيران", "رحلات", "رحله", "تذكره", "تذاكر", "حجز طيران", "خطوط", "أسعار الطيران", "تذكرة طيران"],
    a: {
      en: "Through Voyage Plus you can book airline tickets worldwide. Our airline partners include Air India Express, Emirates, Etihad Airways, Turkish Airlines, Air Arabia and more. Contact our team for instant fares and seat availability.",
      ar: "عبر فوياج بلاس يمكنك الحصول على حجز وتذاكر طيران لجميع دول العالم. من شركائنا: طيران الإمارات، الاتحاد للطيران، الخطوط التركية، طيران العربية وغيرها. تواصل معنا للحصول على أفضل الأسعار والتوفر المباشر.",
    },
    actions: ["whatsapp", "call"]
  },

  {
    id: "hotels",
    chip: { en: "Hotels", ar: "حجز الفنادق" },
    keywords: ["hotel", "hotels", "accommodation", "room", "stay", "resort", "فندق", "فنادق", "اقامه", "غرفه", "غرف", "حجز فندق", "منتجع", "أسعار الفنادق"],
    a: {
      en: "We offer hotel and resort reservations worldwide tailored to your budget (3-star, 4-star, 5-star & luxury resorts). Contact our team to find the best rooms and rates.",
      ar: "نوفر حجوزات فنادق ومنتجعات في جميع أنحاء العالم تناسب جميع الميزانيات (3 نجوم، 4 نجوم، 5 نجوم ومنتجعات فاخرة). تواصل معنا للحصول على أفضل الغرف والأسعار.",
    },
    actions: ["whatsapp"]
  },

  {
    id: "packages",
    chip: { en: "Tour Packages", ar: "الباقات السياحية" },
    keywords: ["package", "packages", "tour", "tours", "holiday", "vacation", "trip", "destination", "destinations", "philippines", "china", "nepal", "korea", "thailand", "japan", "باقه", "باقات", "جولات", "جوله", "سياحه", "سياحي", "عطله", "وجهات", "وجهه", "الفلبين", "الصين", "نيبال", "كوريا", "تايلاند", "برنامج سياحي", "عروض السفر"],
    a: {
      en: "We offer customized holiday and tour packages including Philippines 🇵🇭, China 🇨🇳, Nepal 🇳🇵, South Korea 🇰🇷, Thailand 🇹🇭, Japan 🇯🇵 and more. Contact our travel experts for detailed itineraries and quotes.",
      ar: "نقدم باقات سياحية وعطلات مميزة تشمل الفلبين 🇵🇭، الصين 🇨🇳، نيبال 🇳🇵، كوريا الجنوبية 🇰🇷، تايلاند 🇹🇭، اليابان 🇯🇵 وغيرها. تواصل مع خبراء السفر لدينا لمعرفة برنامج الرحلة والأسعار.",
    },
    actions: ["whatsapp"]
  },

  {
    id: "visa",
    chip: { en: "Visa", ar: "التأشيرات والفيزا" },
    keywords: ["visa", "visas", "passport", "requirements", "تاشيره", "تاشيرات", "فيزا", "فيز", "جواز", "متطلبات الفيزا", "فيزا شينغن", "تأشيرة دخول"],
    a: {
      en: "We provide comprehensive visa assistance, application guidance, and document verification for destinations worldwide. Contact us to check visa requirements for your nationality.",
      ar: "نقدم خدمات المساعدة في استخراج التأشيرات، تجهيز الوثائق ومتابعة الطلبات لجميع دول العالم. تواصل معنا لمعرفة المتطلبات حسب جنسيتك.",
    },
    actions: ["whatsapp"]
  },

  {
    id: "transfer",
    chip: { en: "Transfers", ar: "المواصلات والنقل" },
    keywords: ["transfer", "transfers", "airport pickup", "transport", "pickup", "car", "driver", "نقل", "مواصلات", "توصيل", "استقبال", "توصيل مطار", "سيارة مع سائق"],
    a: {
      en: "Airport transfer and private transport services with drivers are available through Voyage Plus. Contact our team with your pick-up location and travel dates.",
      ar: "نوفر خدمات النقل والمواصلات الخاصة والاستقبال من المطار مع سائقين محترفين. تواصل مع فريقنا وحدد مكان الاستقبال والتاريخ للحصول على الخدمة.",
    },
    actions: ["whatsapp"]
  },

  {
    id: "insurance",
    chip: { en: "Insurance", ar: "التأمين الصحي للسفر" },
    keywords: ["insurance", "travel insurance", "medical", "coverage", "تامين", "التامين", "تأمين سفر", "تأمين طبي"],
    a: {
      en: "Comprehensive travel and medical insurance coverage is available for your trips. Contact us for policy options and prices.",
      ar: "نوفر وثائق التأمين الصحي الشامل والتأمين على السفر لحمايتك أثناء رحلتك. تواصل معنا لمعرفة التغطيات والأسعار.",
    },
    actions: ["whatsapp"]
  },

  {
    id: "price",
    chip: { en: "Prices & Quotes", ar: "الأسعار وعروض الأسعار" },
    keywords: ["price", "prices", "cost", "how much", "rate", "rates", "quote", "offers", "سعر", "اسعار", "كم", "تكلفه", "عرض سعر", "عروض", "كم التكلفة"],
    a: {
      en: "Travel package and ticket prices vary based on your preferred travel dates, destination, and number of passengers. Contact our team to get a instant personalized quote.",
      ar: "تختلف أسعار التذاكر والباقات حسب التواريخ المحددة والوجهة وعدد المسافرين. تواصل مع فريقنا للحصول على عرض سعر مخصص وفوري.",
    },
    actions: ["whatsapp", "call"]
  },

  {
    id: "agent",
    chip: { en: "Agent Sign Up", ar: "التسجيل كوكيل B2B" },
    keywords: ["agent", "agents", "sign up", "signup", "register", "registration", "partner", "become", "join", "b2b", "وكيل", "وكلاء", "تسجيل", "سجل", "انضمام", "شريك", "اصبح", "انضم إلينا"],
    a: {
      en: "To join Voyage Plus as an authorized travel partner/agent, tap Agent Sign Up and submit your company details. Our B2B team will reach out to you promptly.",
      ar: "للانضمام إلى فوياج بلاس كشريك أو وكيل سفر معتمد، اضغط على «التسجيل كوكيل B2B» وقم بتعبئة بيانات شركتك، وسيتواصل معك فريق B2B لدينا فوراً.",
    },
    actions: ["agent"]
  },

  {
    id: "about",
    chip: { en: "About Us", ar: "عن فوياج بلاس" },
    keywords: ["about", "who are you", "who we are", "company", "voyage plus", "من انتم", "من نحن", "عن الشركه", "عنكم", "شركتكم", "نبذه"],
    a: {
      en: "Voyage Plus Travel LLC is a premier outbound travel agency in the UAE dedicated to crafting seamless travel experiences, flight ticketing, hotel reservations, and custom holidays.",
      ar: "فوياج بلاس للسفر ش.ذ.م.م شركة رائده ومتخصصة في خدمات السفر والسياحة الخارجية في الإمارات، تقدم حجوزات طيران، فنادق، باقات سياحية وتأشيرات بأعلى مستويات الجودة والموثوقية.",
    }
  },

  {
    id: "contact",
    chip: { en: "Contact Us", ar: "تواصل معنا" },
    keywords: ["contact", "call", "phone", "number", "whatsapp", "email", "mail", "reach", "support", "help", "اتصال", "اتصل", "رقم", "هاتف", "تلفون", "واتساب", "واتس", "ايميل", "بريد", "تواصل", "دعم", "مساعده"],
    a: {
      en: "You can reach our travel experts directly via Phone, WhatsApp or Email:",
      ar: "يمكنك التواصل المباشر مع فريق خبراء السفر لدينا عبر الهاتف، واتساب أو البريد الإلكتروني:",
    },
    actions: ["call", "whatsapp", "email"]
  },
];
