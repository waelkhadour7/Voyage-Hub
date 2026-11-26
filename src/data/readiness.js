export const meta = {
  disclaimer: {
    en: "Rules change. Always confirm with our team before you travel.",
    ar: "تتغير القوانين باستمرار. يرجى دائماً التأكد مع فريقنا قبل السفر.",
  },
};

export const destinations = [
  { code: "PH", iso: "ph", name: { en: "Philippines", ar: "الفلبين" } },
  { code: "CN", iso: "cn", name: { en: "China", ar: "الصين" } },
  { code: "NP", iso: "np", name: { en: "Nepal", ar: "نيبال" } },
  { code: "KR", iso: "kr", name: { en: "South Korea", ar: "كوريا الجنوبية" } },
];

export const nationalities = [
  { code: "AE", iso: "ae", name: { en: "United Arab Emirates", ar: "الإمارات العربية المتحدة" } },
  { code: "SA", iso: "sa", name: { en: "Saudi Arabia", ar: "المملكة العربية السعودية" } },
  { code: "EG", iso: "eg", name: { en: "Egypt", ar: "مصر" } },
  { code: "IN", iso: "in", name: { en: "India", ar: "الهند" } },
  { code: "PK", iso: "pk", name: { en: "Pakistan", ar: "باكستان" } },
  { code: "PH", iso: "ph", name: { en: "Philippines", ar: "الفلبين" } },
  { code: "GB", iso: "gb", name: { en: "United Kingdom", ar: "المملكة المتحدة" } },
  { code: "US", iso: "us", name: { en: "United States", ar: "الولايات المتحدة" } },
  { code: "JOR", iso: "jo", name: { en: "Jordan", ar: "الأردن" } },
  { code: "LBN", iso: "lb", name: { en: "Lebanon", ar: "لبنان" } },
];

export const rules = {
  // 🇦🇪 UAE
  AE: {
    PH: {
      status: "visa_free",
      stayDays: 30,
      processingDays: null,
      passportValidityMonths: 6,
      documents: [
        { id: "passport", title: { en: "Valid Passport", ar: "جواز سفر ساري المفعول" }, hint: { en: "Valid at least 6 months beyond intended stay", ar: "يجب أن يكون سارياً لمدة 6 أشهر على الأقل بعد الإقامة" } },
        { id: "ticket", title: { en: "Return Ticket", ar: "تذكرة العودة" }, hint: { en: "Confirmed return ticket within 30 days", ar: "تذكرة عودة مؤكدة خلال 30 يوماً" } },
      ],
      notes: { en: "UAE citizens enter Philippines visa-free for up to 30 days.", ar: "يدخل مواطنو الإمارات الفلبين بدون تأشيرة لمدة تصل إلى 30 يوماً." },
      source: "https://dubaipcg.dfa.gov.ph",
      lastReviewed: "2025-02-01",
    },
    CN: {
      status: "visa_free",
      stayDays: 30,
      processingDays: null,
      passportValidityMonths: 6,
      documents: [
        { id: "passport", title: { en: "Valid Passport", ar: "جواز سفر ساري المفعول" }, hint: { en: "Valid for at least 6 months", ar: "ساري المفعول لمدة 6 أشهر على الأقل" } },
        { id: "booking", title: { en: "Hotel & Flight Booking", ar: "حجز الطيران والفندق" }, hint: { en: "Confirmed travel itinerary", ar: "جدول رحلات وطيران مؤكد" } },
      ],
      notes: { en: "Mutual visa exemption allows UAE citizens to enter China visa-free for up to 30 days.", ar: "اتفاقية الإعفاء المتبادل تتيح لمواطني الإمارات دخول الصين بدون تأشيرة لمدة 30 يوماً." },
      source: "http://ae.china-embassy.gov.cn",
      lastReviewed: "2025-02-01",
    },
    NP: {
      status: "on_arrival",
      stayDays: 30,
      processingDays: [1, 2],
      passportValidityMonths: 6,
      documents: [
        { id: "passport", title: { en: "Passport", ar: "جواز السفر" }, hint: { en: "Valid for at least 6 months", ar: "ساري لمدة 6 أشهر على الأقل" } },
        { id: "photo", title: { en: "Passport Photos", ar: "صور شخصية" }, hint: { en: "2 passport size photos for arrival visa form", ar: "صورتان مقاس جواز السفر للنموذج" } },
      ],
      notes: { en: "Visa on arrival available at Tribhuvan International Airport (Kathmandu).", ar: "التأشيرة متاحة عند الوصول في مطار كاتماندو الدولي." },
      source: "https://immigration.gov.np",
      lastReviewed: "2025-02-01",
    },
    KR: {
      status: "visa_free",
      stayDays: 90,
      processingDays: [1, 2],
      passportValidityMonths: 6,
      documents: [
        { id: "passport", title: { en: "Valid Passport", ar: "جواز سفر ساري المفعول" }, hint: { en: "Valid for at least 6 months", ar: "ساري لمدة 6 أشهر على الأقل" } },
        { id: "keta", title: { en: "K-ETA Approval (if required)", ar: "موافقة K-ETA (إن طُلبت)" }, hint: { en: "Apply online prior to flight", ar: "التقديم عبر الإنترنت قبل السفر" } },
      ],
      notes: { en: "UAE passport holders enjoy visa-free entry to South Korea for up to 90 days.", ar: "يتمتع حامل الجواز الإماراتي بالدخول بدون تأشيرة لكوريا الجنوبية لمدة تصل إلى 90 يوماً." },
      source: "https://www.k-eta.go.kr",
      lastReviewed: "2025-02-01",
    },
  },

  // 🇸🇦 Saudi Arabia
  SA: {
    PH: {
      status: "visa_free",
      stayDays: 30,
      processingDays: null,
      passportValidityMonths: 6,
      documents: [
        { id: "passport", title: { en: "Valid Passport", ar: "جواز سفر ساري المفعول" }, hint: { en: "Valid at least 6 months beyond intended stay", ar: "ساري المفعول 6 أشهر على الأقل" } },
        { id: "ticket", title: { en: "Return Ticket", ar: "تذكرة العودة" }, hint: { en: "Confirmed onward travel ticket", ar: "تذكرة سفر مؤكدة" } },
      ],
      notes: { en: "Saudi citizens enter Philippines visa-free for up to 30 days.", ar: "يدخل المواطنون السعوديون الفلبين بدون تأشيرة لمدة 30 يوماً." },
      source: "https://riyadhpcg.dfa.gov.ph",
      lastReviewed: "2025-02-01",
    },
    CN: {
      status: "e_visa",
      stayDays: 30,
      processingDays: [3, 5],
      passportValidityMonths: 6,
      documents: [
        { id: "passport", title: { en: "Passport", ar: "جواز السفر" }, hint: { en: "Minimum 6 months validity", ar: "صلاحية 6 أشهر كحد أدنى" } },
        { id: "photo", title: { en: "Recent Photo", ar: "صورة شخصية" }, hint: { en: "White background", ar: "خلفية بيضاء" } },
        { id: "hotel", title: { en: "Flight & Hotel Confirmation", ar: "حجز الطيران والفندق" }, hint: { en: "Confirmed itinerary", ar: "حجز مؤكد" } },
      ],
      notes: { en: "Saudi citizens can apply for China e-Visa online prior to travel.", ar: "يمكن للمواطنين السعوديين التقديم على التأشيرة الإلكترونية للصين قبل السفر." },
      source: "http://sa.china-embassy.gov.cn",
      lastReviewed: "2025-02-01",
    },
    NP: {
      status: "on_arrival",
      stayDays: 30,
      processingDays: [1, 2],
      passportValidityMonths: 6,
      documents: [
        { id: "passport", title: { en: "Passport", ar: "جواز السفر" }, hint: { en: "Valid for at least 6 months", ar: "ساري لمدة 6 أشهر على الأقل" } },
      ],
      notes: { en: "Visa available on arrival at Kathmandu airport.", ar: "التأشيرة متاحة عند الوصول في مطار كاتماندو." },
      source: "https://immigration.gov.np",
      lastReviewed: "2025-02-01",
    },
    KR: {
      status: "e_visa",
      stayDays: 30,
      processingDays: [2, 4],
      passportValidityMonths: 6,
      documents: [
        { id: "passport", title: { en: "Valid Passport", ar: "جواز السفر" }, hint: { en: "At least 6 months validity", ar: "صلاحية 6 أشهر على الأقل" } },
        { id: "keta", title: { en: "K-ETA Online Approval", ar: "موافقة K-ETA الإلكترونية" }, hint: { en: "Must be obtained online at least 72 hours before flight", ar: "يجب الحصول عليها عبر الإنترنت قبل 72 ساعة من الرحلة" } },
      ],
      notes: { en: "Saudi nationals must apply for K-ETA online before departure.", ar: "يجب على المواطنين السعوديين التقديم على موافقة K-ETA قبل المغادرة." },
      source: "https://www.k-eta.go.kr",
      lastReviewed: "2025-02-01",
    },
  },

  // 🇪🇬 Egypt
  EG: {
    PH: {
      status: "visa_required",
      stayDays: 30,
      processingDays: [5, 10],
      passportValidityMonths: 6,
      documents: [
        { id: "passport", title: { en: "Valid Passport", ar: "جواز السفر" }, hint: { en: "Valid for 6+ months", ar: "ساري لمدة 6 أشهر على الأقل" } },
        { id: "bank", title: { en: "Bank Statement", ar: "كشف حساب بنكي" }, hint: { en: "Last 3 months stamped", ar: "كشف حساب لآخر 3 أشهر مخصوم ومختوم" } },
        { id: "job", title: { en: "NOC / Employment Letter", ar: "خطاب العمل / الموارد البشرية" }, hint: { en: "Stating salary & leave period", ar: "يوضح الراتب وفترة الإجازة" } },
      ],
      notes: { en: "Egyptian passport holders require a visa in advance from Philippine embassy.", ar: "يتطلب حاملو الجواز المصري الحصول على تأشيرة مسبقة من سفارة الفلبين." },
      source: null,
      lastReviewed: "2025-02-01",
    },
    CN: {
      status: "visa_required",
      stayDays: 30,
      processingDays: [7, 12],
      passportValidityMonths: 6,
      documents: [
        { id: "passport", title: { en: "Valid Passport", ar: "جواز السفر" }, hint: { en: "At least 6 months validity", ar: "صلاحية 6 أشهر على الأقل" } },
        { id: "form", title: { en: "Visa Application & Photo", ar: "نموذج التأشيرة والصورة" }, hint: { en: "Completed form with passport photo", ar: "استمارة مكتملة مع صورة شخصية" } },
        { id: "booking", title: { en: "Flight & Hotel Confirmation", ar: "حجز الفندق والطيران" }, hint: { en: "Confirmed roundtrip booking", ar: "حجز عودة وطيران مؤكد" } },
      ],
      notes: { en: "Embassy visa required prior to departure for Egyptian citizens.", ar: "تأشيرة السفارة مطلوبة قبل المغادرة للمواطنين المصريين." },
      source: null,
      lastReviewed: "2025-02-01",
    },
    NP: {
      status: "on_arrival",
      stayDays: 30,
      processingDays: [1, 2],
      passportValidityMonths: 6,
      documents: [
        { id: "passport", title: { en: "Passport", ar: "جواز السفر" }, hint: { en: "Valid for at least 6 months", ar: "ساري لمدة 6 أشهر على الأقل" } },
      ],
      notes: { en: "Egyptian citizens can obtain a visa on arrival at Kathmandu airport.", ar: "يمكن للمواطنين المصريين الحصول على تأشيرة عند الوصول في مطار كاتماندو." },
      source: "https://immigration.gov.np",
      lastReviewed: "2025-02-01",
    },
    KR: {
      status: "visa_required",
      stayDays: 30,
      processingDays: [7, 14],
      passportValidityMonths: 6,
      documents: [
        { id: "passport", title: { en: "Valid Passport", ar: "جواز السفر" }, hint: { en: "6 months minimum validity", ar: "صلاحية 6 أشهر على الأقل" } },
        { id: "bank", title: { en: "Bank Statement", ar: "كشف حساب بنكي" }, hint: { en: "6 months stamped bank statement", ar: "كشف حساب لآخر 6 أشهر" } },
        { id: "job", title: { en: "Employment Certificate", ar: "شهادة إثبات عمل" }, hint: { en: "Company NOC letter", ar: "خطاب عدم مانع من الشركة" } },
      ],
      notes: { en: "South Korea requires a pre-arranged embassy visa for Egyptian passport holders.", ar: "تتطلب كوريا الجنوبية تأشيرة مسبقة لحاملي الجواز المصري." },
      source: null,
      lastReviewed: "2025-02-01",
    },
  },

  // 🇮🇳 India
  IN: {
    PH: {
      status: "depends",
      stayDays: 14,
      processingDays: [5, 8],
      passportValidityMonths: 6,
      documents: [
        { id: "passport", title: { en: "Valid Passport", ar: "جواز السفر" }, hint: { en: "Valid for 6+ months", ar: "ساري لمدة 6 أشهر على الأقل" } },
        { id: "valid-visa", title: { en: "US/Schengen/UK/Japan Visa (if applicable)", ar: "تأشيرة أمريكا/شنغن/بريطانيا/اليابان (إن وجدت)" }, hint: { en: "Valid US/UK/Schengen visa allows 14 days visa-free entry", ar: "تأشيرة أمريكا أو شنغن أو بريطانيا المفعّلة تسمح بالدخول لمدة 14 يوماً بدون تأشيرة" } },
      ],
      notes: { en: "Indian passport holders with a valid US, Schengen, UK, Japan, or Australia visa get 14-day visa-free entry. Otherwise embassy visa required.", ar: "يحصل حاملو الجواز الهندي ممن لديهم تأشيرة سارية لأمريكا أو شنغن أو بريطانيا على دخول مجاني لمدة 14 يوماً، وإلا يلزم تأشيرة سفارة." },
      source: "https://newdelhipcg.dfa.gov.ph",
      lastReviewed: "2025-02-01",
    },
    CN: {
      status: "visa_required",
      stayDays: 30,
      processingDays: [5, 8],
      passportValidityMonths: 6,
      documents: [
        { id: "passport", title: { en: "Passport", ar: "جواز السفر" }, hint: { en: "Valid for 6+ months", ar: "ساري لـ 6 أشهر" } },
        { id: "photo", title: { en: "Visa Photos", ar: "صور شخصية" }, hint: { en: "2 biometric photos", ar: "صورتان بيومترية" } },
      ],
      notes: { en: "Indian passport holders require a visa in advance.", ar: "يتطلب حاملو الجواز الهندي الحصول على تأشيرة مسبقة." },
      source: null,
      lastReviewed: "2025-02-01",
    },
    NP: {
      status: "visa_free",
      stayDays: null,
      processingDays: null,
      passportValidityMonths: null,
      documents: [
        { id: "id", title: { en: "Voter ID or Passport", ar: "هوية الانتخاب أو جواز السفر" }, hint: { en: "Official Indian photo ID", ar: "إثبات شخصية رسمي" } },
      ],
      notes: { en: "Freedom of movement under India-Nepal treaty. No visa required for Indian citizens.", ar: "حرية التنقل بموجب معاهدة الهند ونيبال. لا تلزم تأشيرة للمواطنين الهنود." },
      source: "https://immigration.gov.np",
      lastReviewed: "2025-02-01",
    },
    KR: {
      status: "visa_required",
      stayDays: 30,
      processingDays: [5, 10],
      passportValidityMonths: 6,
      documents: [
        { id: "passport", title: { en: "Valid Passport", ar: "جواز السفر" }, hint: { en: "6 months validity", ar: "صلاحية 6 أشهر" } },
        { id: "bank", title: { en: "Bank Statement & ITR", ar: "كشف حساب وإقرار ضريبي" }, hint: { en: "Proof of financial stability", ar: "إثبات ملاءة مالية" } },
      ],
      notes: { en: "Indian passport holders require a South Korea embassy visa before travel.", ar: "يتطلب حاملو الجواز الهندي تأشيرة سفارة كوريا الجنوبية قبل السفر." },
      source: null,
      lastReviewed: "2025-02-01",
    },
  },

  // 🇵🇰 Pakistan
  PK: {
    PH: {
      status: "visa_required",
      stayDays: 30,
      processingDays: [7, 14],
      passportValidityMonths: 6,
      documents: [
        { id: "passport", title: { en: "Valid Passport", ar: "جواز السفر" }, hint: { en: "6 months validity", ar: "صلاحية 6 أشهر" } },
        { id: "bank", title: { en: "Bank Statement", ar: "كشف حساب بنكي" }, hint: { en: "Stamped bank statement", ar: "كشف حساب مخصوم ومختوم" } },
      ],
      notes: { en: "Embassy visa required for Pakistani citizens.", ar: "تأشيرة سفارة مطلوبة للمواطنين الباكستانيين." },
      source: null,
      lastReviewed: "2025-02-01",
    },
    CN: {
      status: "visa_required",
      stayDays: 30,
      processingDays: [5, 10],
      passportValidityMonths: 6,
      documents: [
        { id: "passport", title: { en: "Passport", ar: "جواز السفر" }, hint: { en: "Valid for 6+ months", ar: "ساري لـ 6 أشهر" } },
      ],
      notes: { en: "Chinese embassy visa required prior to travel.", ar: "تأشيرة سفارة الصين مطلوبة قبل السفر." },
      source: null,
      lastReviewed: "2025-02-01",
    },
    NP: {
      status: "visa_required",
      stayDays: 30,
      processingDays: [5, 8],
      passportValidityMonths: 6,
      documents: [
        { id: "passport", title: { en: "Valid Passport", ar: "جواز السفر" }, hint: { en: "6 months validity", ar: "صلاحية 6 أشهر" } },
      ],
      notes: { en: "Pakistani citizens require visa approval in advance prior to arrival in Nepal.", ar: "يتطلب المواطنون الباكستانيون موافقة تأشيرة مسبقة قبل الوصول لنيبال." },
      source: "https://immigration.gov.np",
      lastReviewed: "2025-02-01",
    },
    KR: {
      status: "visa_required",
      stayDays: 30,
      processingDays: [7, 14],
      passportValidityMonths: 6,
      documents: [
        { id: "passport", title: { en: "Passport", ar: "جواز السفر" }, hint: { en: "At least 6 months validity", ar: "صلاحية 6 أشهر على الأقل" } },
      ],
      notes: { en: "Pre-arranged visa required for Pakistani nationals.", ar: "تأشيرة مسبقة مطلوبة للمواطنين الباكستانيين." },
      source: null,
      lastReviewed: "2025-02-01",
    },
  },

  // 🇵🇭 Philippines
  PH: {
    PH: {
      status: "visa_free",
      stayDays: null,
      processingDays: null,
      passportValidityMonths: null,
      documents: [],
      notes: { en: "Home country. No visa required for citizens.", ar: "البلد الأم. لا توجد تأشيرة مطلوبة للمواطنين." },
      source: null,
      lastReviewed: "2025-02-01",
    },
    CN: {
      status: "visa_required",
      stayDays: 30,
      processingDays: [5, 8],
      passportValidityMonths: 6,
      documents: [
        { id: "passport", title: { en: "Valid Passport", ar: "جواز السفر" }, hint: { en: "At least 6 months validity", ar: "صلاحية 6 أشهر على الأقل" } },
      ],
      notes: { en: "Visa required prior to departure for Philippine passport holders.", ar: "تأشيرة مطلوبة قبل المغادرة لحاملي الجواز الفلبيني." },
      source: null,
      lastReviewed: "2025-02-01",
    },
    NP: {
      status: "on_arrival",
      stayDays: 30,
      processingDays: [1, 2],
      passportValidityMonths: 6,
      documents: [
        { id: "passport", title: { en: "Passport", ar: "جواز السفر" }, hint: { en: "Valid for at least 6 months", ar: "ساري لمدة 6 أشهر على الأقل" } },
      ],
      notes: { en: "Visa on arrival available at Kathmandu airport.", ar: "التأشيرة متاحة عند الوصول في مطار كاتماندو." },
      source: "https://immigration.gov.np",
      lastReviewed: "2025-02-01",
    },
    KR: {
      status: "visa_required",
      stayDays: 59,
      processingDays: [5, 10],
      passportValidityMonths: 6,
      documents: [
        { id: "passport", title: { en: "Valid Passport", ar: "جواز السفر" }, hint: { en: "6 months validity", ar: "صلاحية 6 أشهر" } },
        { id: "job", title: { en: "Certificate of Employment", ar: "شهادة إثبات عمل" }, hint: { en: "HR letter", ar: "خطاب موارد بشرية" } },
      ],
      notes: { en: "Embassy visa required prior to travel for Philippine citizens.", ar: "تأشيرة سفارة مطلوبة قبل السفر للمواطنين الفلبينيين." },
      source: null,
      lastReviewed: "2025-02-01",
    },
  },

  // 🇬🇧 United Kingdom
  GB: {
    PH: {
      status: "visa_free",
      stayDays: 30,
      processingDays: null,
      passportValidityMonths: 6,
      documents: [
        { id: "passport", title: { en: "Valid Passport", ar: "جواز السفر" }, hint: { en: "6 months validity", ar: "صلاحية 6 أشهر" } },
        { id: "ticket", title: { en: "Return Ticket", ar: "تذكرة العودة" }, hint: { en: "Confirmed onward travel ticket", ar: "تذكرة عودة مؤكدة" } },
      ],
      notes: { en: "UK citizens enjoy visa-free entry for up to 30 days.", ar: "يتمتع المواطنون البريطانيون بالدخول بدون تأشيرة لمدة تصل إلى 30 يوماً." },
      source: "https://londonpcg.dfa.gov.ph",
      lastReviewed: "2025-02-01",
    },
    CN: {
      status: "e_visa",
      stayDays: 30,
      processingDays: [3, 5],
      passportValidityMonths: 6,
      documents: [
        { id: "passport", title: { en: "Passport", ar: "جواز السفر" }, hint: { en: "Valid for 6+ months", ar: "ساري لـ 6 أشهر" } },
      ],
      notes: { en: "E-visa / embassy visa required for UK passport holders.", ar: "تأشيرة إلكترونية أو سفارة مطلوبة لحاملي الجواز البريطاني." },
      source: null,
      lastReviewed: "2025-02-01",
    },
    NP: {
      status: "on_arrival",
      stayDays: 30,
      processingDays: [1, 2],
      passportValidityMonths: 6,
      documents: [
        { id: "passport", title: { en: "Passport", ar: "جواز السفر" }, hint: { en: "Valid for 6+ months", ar: "ساري لمدة 6 أشهر" } },
      ],
      notes: { en: "Visa on arrival available for UK passport holders.", ar: "تأشيرة عند الوصول متاحة لحاملي الجواز البريطاني." },
      source: "https://immigration.gov.np",
      lastReviewed: "2025-02-01",
    },
    KR: {
      status: "e_visa",
      stayDays: 90,
      processingDays: [1, 2],
      passportValidityMonths: 6,
      documents: [
        { id: "passport", title: { en: "Valid Passport", ar: "جواز السفر" }, hint: { en: "At least 6 months validity", ar: "صلاحية 6 أشهر على الأقل" } },
        { id: "keta", title: { en: "K-ETA Online Registration", ar: "تسجيل K-ETA الإلكتروني" }, hint: { en: "Apply at least 72 hours before flight", ar: "التقديم قبل 72 ساعة من المغادرة" } },
      ],
      notes: { en: "UK passport holders can enter South Korea visa-free for up to 90 days with K-ETA approval.", ar: "يمكن لحاملي الجواز البريطاني دخول كوريا الجنوبية بدون تأشيرة لمدة 90 يوماً بموافقة K-ETA." },
      source: "https://www.k-eta.go.kr",
      lastReviewed: "2025-02-01",
    },
  },

  // 🇺🇸 United States
  US: {
    PH: {
      status: "visa_free",
      stayDays: 30,
      processingDays: null,
      passportValidityMonths: 6,
      documents: [
        { id: "passport", title: { en: "Valid Passport", ar: "جواز السفر" }, hint: { en: "At least 6 months validity", ar: "صلاحية 6 أشهر على الأقل" } },
        { id: "ticket", title: { en: "Return Ticket", ar: "تذكرة العودة" }, hint: { en: "Confirmed onward travel ticket", ar: "تذكرة عودة مؤكدة" } },
      ],
      notes: { en: "US citizens enter Philippines visa-free for up to 30 days.", ar: "يدخل المواطنون الأمريكيون الفلبين بدون تأشيرة لمدة تصل إلى 30 يوماً." },
      source: "https://philippineembassy-dc.org",
      lastReviewed: "2025-02-01",
    },
    CN: {
      status: "e_visa",
      stayDays: 30,
      processingDays: [3, 5],
      passportValidityMonths: 6,
      documents: [
        { id: "passport", title: { en: "Passport", ar: "جواز السفر" }, hint: { en: "Valid for 6+ months", ar: "ساري لـ 6 أشهر" } },
      ],
      notes: { en: "US citizens can apply for China e-Visa online.", ar: "يمكن للمواطنين الأمريكيين التقديم على التأشيرة الإلكترونية للصين." },
      source: null,
      lastReviewed: "2025-02-01",
    },
    NP: {
      status: "on_arrival",
      stayDays: 30,
      processingDays: [1, 2],
      passportValidityMonths: 6,
      documents: [
        { id: "passport", title: { en: "Passport", ar: "جواز السفر" }, hint: { en: "Valid for 6+ months", ar: "ساري لـ 6 أشهر" } },
      ],
      notes: { en: "Visa on arrival available for US passport holders.", ar: "تأشيرة عند الوصول متاحة لحاملي الجواز الأمريكي." },
      source: "https://immigration.gov.np",
      lastReviewed: "2025-02-01",
    },
    KR: {
      status: "e_visa",
      stayDays: 90,
      processingDays: [1, 2],
      passportValidityMonths: 6,
      documents: [
        { id: "passport", title: { en: "Valid Passport", ar: "جواز السفر" }, hint: { en: "At least 6 months validity", ar: "صلاحية 6 أشهر على الأقل" } },
        { id: "keta", title: { en: "K-ETA Authorization", ar: "تصريح K-ETA" }, hint: { en: "Apply online prior to travel", ar: "التقديم عبر الإنترنت قبل السفر" } },
      ],
      notes: { en: "US citizens enjoy 90 days visa-free travel to South Korea with K-ETA registration.", ar: "يتمتع المواطنون الأمريكيون بالسفر بدون تأشيرة لمدة 90 يوماً لكوريا الجنوبية مع التسجيل بـ K-ETA." },
      source: "https://www.k-eta.go.kr",
      lastReviewed: "2025-02-01",
    },
  },

  // 🇯🇴 Jordan
  JOR: {
    PH: {
      status: "visa_required",
      stayDays: 30,
      processingDays: [5, 10],
      passportValidityMonths: 6,
      documents: [
        { id: "passport", title: { en: "Valid Passport", ar: "جواز السفر" }, hint: { en: "6 months validity", ar: "صلاحية 6 أشهر" } },
      ],
      notes: { en: "Jordanian passport holders require a Philippine embassy visa prior to departure.", ar: "يتطلب حاملو الجواز الأردني تأشيرة من السفارة الفلبينية قبل المغادرة." },
      source: null,
      lastReviewed: "2025-02-01",
    },
    CN: {
      status: "visa_required",
      stayDays: 30,
      processingDays: [7, 12],
      passportValidityMonths: 6,
      documents: [
        { id: "passport", title: { en: "Valid Passport", ar: "جواز السفر" }, hint: { en: "6 months validity", ar: "صلاحية 6 أشهر" } },
      ],
      notes: { en: "Embassy visa required for Jordanian citizens.", ar: "تأشيرة سفارة مطلوبة للمواطنين الأردنيين." },
      source: null,
      lastReviewed: "2025-02-01",
    },
    NP: {
      status: "on_arrival",
      stayDays: 30,
      processingDays: [1, 2],
      passportValidityMonths: 6,
      documents: [
        { id: "passport", title: { en: "Passport", ar: "جواز السفر" }, hint: { en: "Valid for 6+ months", ar: "ساري لـ 6 أشهر" } },
      ],
      notes: { en: "Visa on arrival available for Jordanian passport holders at Kathmandu airport.", ar: "تأشيرة عند الوصول متاحة لحاملي الجواز الأردني بمطار كاتماندو." },
      source: "https://immigration.gov.np",
      lastReviewed: "2025-02-01",
    },
    KR: {
      status: "visa_required",
      stayDays: 30,
      processingDays: [7, 14],
      passportValidityMonths: 6,
      documents: [
        { id: "passport", title: { en: "Valid Passport", ar: "جواز السفر" }, hint: { en: "6 months minimum validity", ar: "صلاحية 6 أشهر على الأقل" } },
      ],
      notes: { en: "Pre-arranged embassy visa required for Jordanian nationals.", ar: "تأشيرة سفارة مسبقة مطلوبة للمواطنين الأردنيين." },
      source: null,
      lastReviewed: "2025-02-01",
    },
  },

  // 🇱🇧 Lebanon
  LBN: {
    PH: {
      status: "visa_required",
      stayDays: 30,
      processingDays: [5, 10],
      passportValidityMonths: 6,
      documents: [
        { id: "passport", title: { en: "Valid Passport", ar: "جواز السفر" }, hint: { en: "6 months validity", ar: "صلاحية 6 أشهر" } },
      ],
      notes: { en: "Lebanese citizens require a visa in advance from Philippine embassy.", ar: "يتطلب المواطنون اللبنانيون الحصول على تأشيرة مسبقة من سفارة الفلبين." },
      source: null,
      lastReviewed: "2025-02-01",
    },
    CN: {
      status: "visa_required",
      stayDays: 30,
      processingDays: [7, 12],
      passportValidityMonths: 6,
      documents: [
        { id: "passport", title: { en: "Valid Passport", ar: "جواز السفر" }, hint: { en: "6 months validity", ar: "صلاحية 6 أشهر" } },
      ],
      notes: { en: "Chinese embassy visa required prior to travel.", ar: "تأشيرة السفارة الصينية مطلوبة قبل السفر." },
      source: null,
      lastReviewed: "2025-02-01",
    },
    NP: {
      status: "on_arrival",
      stayDays: 30,
      processingDays: [1, 2],
      passportValidityMonths: 6,
      documents: [
        { id: "passport", title: { en: "Passport", ar: "جواز السفر" }, hint: { en: "Valid for 6+ months", ar: "ساري لـ 6 أشهر" } },
      ],
      notes: { en: "Visa on arrival available for Lebanese passport holders at Kathmandu airport.", ar: "تأشيرة عند الوصول متاحة لحاملي الجواز اللبناني في مطار كاتماندو." },
      source: "https://immigration.gov.np",
      lastReviewed: "2025-02-01",
    },
    KR: {
      status: "visa_required",
      stayDays: 30,
      processingDays: [7, 14],
      passportValidityMonths: 6,
      documents: [
        { id: "passport", title: { en: "Valid Passport", ar: "جواز السفر" }, hint: { en: "6 months validity", ar: "صلاحية 6 أشهر" } },
      ],
      notes: { en: "Embassy visa required before departure for Lebanese passport holders.", ar: "تأشيرة سفارة مطلوبة قبل المغادرة لحاملي الجواز اللبناني." },
      source: null,
      lastReviewed: "2025-02-01",
    },
  },
};

export const sampleRules = {};
