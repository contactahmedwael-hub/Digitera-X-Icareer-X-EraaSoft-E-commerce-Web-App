import type { Locale } from "@/lib/i18n/locale";

/**
 * Per-product copy. Product ids, categories, scent families and occasions
 * stay as they are — only what a customer reads is translated.
 */
export type ProductCopy = {
  name: string;
  notes: string;
  description: string;
  scentNotes: { top: string[]; heart: string[]; base: string[] };
};

export type TaxonomyCopy = {
  category: Record<string, string>;
  scentFamily: Record<string, string>;
  occasion: Record<string, string>;
};

export const productCopy: Record<Locale, Record<string, ProductCopy>> = {
  en: {},
  ar: {
    "fleur-de-lune": {
      name: "فلور دو لون",
      notes: "زهري / ياسمين ومسك أبيض",
      description:
        "يستقر فلور دو لون على البشرة كضوء القمر على الكتان. يفتتح بحمضيات مضيئة، ثم ينفتح على قلب من الياسمين، وينتهي إلى مسك أبيض ناعم.",
      scentNotes: {
        top: ["نيرولي كالابري", "ماندرين أخضر"],
        heart: ["ياسمين سامباك", "زهر البرتقال"],
        base: ["مسك أبيض", "خشب أرز فاتح"],
      },
    },
    "santal-parchment": {
      name: "سانتال بارشمنت",
      notes: "خشبي / صندل وهيل",
      description:
        "يلتف سانتال بارشمنت حول البشرة كورق الرقّ العتيق. يفتتح بنوتات عليا مشرقة، ثم ينتقل إلى بردي نقي وصندل دافئ غني، ليجف على هيل وعنبر.",
      scentNotes: {
        top: ["برغموت صقلي", "فلفل وردي"],
        heart: ["ياسمين سامباك مصري", "بردي"],
        base: ["صندل هندي غربي", "هيل", "عنبر"],
      },
    },
    "noir-cocoon": {
      name: "نوار كوكون",
      notes: "شرقي / تبغ وعنبر",
      description:
        "يقرّب نوار كوكون المساء إليك. تبغ مدخّن يفسح المجال لقلب من الكاكاو، قبل أن يستقر في أثر عنبري راتنجي طويل.",
      scentNotes: {
        top: ["ورق التبغ", "زنجبيل متبّل"],
        heart: ["خلاصة الكاكاو", "حبة التونكا"],
        base: ["عنبر رمادي", "أخشاب جافة"],
      },
    },
    "sol-dor": {
      name: "سول دور",
      notes: "منعش / برغموت وملح البحر",
      description:
        "يحتفظ سول دور بآخر ساعة من ضوء النهار على الساحل. برغموت مملّح يفتتح على خشب طافٍ معدني، قبل خاتمة من العنبر المشمس.",
      scentNotes: {
        top: ["برغموت كالابري", "ملح البحر"],
        heart: ["خشب طافٍ معدني", "زهر البرتقال"],
        base: ["مسك أبيض", "عنبر مشمس"],
      },
    },
    "atelier-oud": {
      name: "أتيليه عود",
      notes: "خشبي / عود فاخر وزعفران",
      description:
        "أتيليه عود هو الدار في أكثر حالاتها تركيزًا. زعفران وورد دمشقي يفتتحان على عود غني، وينغلقان على جلد مدخّن وقطران البتولا.",
      scentNotes: {
        top: ["زعفران", "ورد دمشقي"],
        heart: ["عود لاوسي", "لبان"],
        base: ["جلد مدخّن", "قطران البتولا"],
      },
    },
    "rose-absolute": {
      name: "روز أبسوليوت",
      notes: "زهري / ورد دمشقي وأرز",
      description:
        "روز أبسوليوت ورد بلا حلاوة. خضرة ندية ترفع قلبًا دمشقيًا يستقر على الأرز والباتشولي الترابي.",
      scentNotes: {
        top: ["فلفل وردي", "خضرة ندية"],
        heart: ["ورد دمشقي", "جيرانيوم"],
        base: ["أرز فرجيني", "باتشولي"],
      },
    },
  },
};

export const taxonomyCopy: Record<Locale, TaxonomyCopy> = {
  en: {
    category: {
      "pure-extractions": "Pure Extractions",
      "private-reserve": "Private Reserve",
      "atelier-oils": "Atelier Oils",
      "discovery-vault": "Discovery Vault",
    },
    scentFamily: {
      floral: "Floral",
      woody: "Woody",
      oriental: "Oriental",
      fresh: "Fresh",
    },
    occasion: {
      "personal-use": "Personal Use",
      wedding: "Wedding",
      "gift-sets": "Gift Sets",
      birthday: "Birthday",
    },
  },
  ar: {
    category: {
      "pure-extractions": "خلاصات نقية",
      "private-reserve": "المحمية الخاصة",
      "atelier-oils": "زيوت الأتيليه",
      "discovery-vault": "خزانة الاكتشاف",
    },
    scentFamily: {
      floral: "زهري",
      woody: "خشبي",
      oriental: "شرقي",
      fresh: "منعش",
    },
    occasion: {
      "personal-use": "استخدام شخصي",
      wedding: "زفاف",
      "gift-sets": "أطقم هدايا",
      birthday: "عيد ميلاد",
    },
  },
};

export const archetypeCopy: Record<Locale, Record<string, string>> = {
  en: {
    floral: "Rose, Jasmine, Neroli",
    woody: "Cedarwood, Oud, Santal",
    oriental: "Amber, Spices, Vanilla",
    fresh: "Citrus, Marine, Herbs",
  },
  ar: {
    floral: "ورد، ياسمين، نيرولي",
    woody: "أرز، عود، صندل",
    oriental: "عنبر، توابل، فانيليا",
    fresh: "حمضيات، بحري، أعشاب",
  },
};

export const occasionBlurbs: Record<Locale, Record<string, string>> = {
  en: {
    "personal-use": "Everyday luxury as second skin",
    wedding: "Immortalize the vows with notes of white jasmine",
    "gift-sets": "A bespoke gesture of ultimate prestige",
    birthday: "Vibrant, celebrating a personal revolution",
  },
  ar: {
    "personal-use": "فخامة يومية كأنها بشرة ثانية",
    wedding: "خلّد العهد بنوتات الياسمين الأبيض",
    "gift-sets": "لفتة مصممة خصيصًا بأرقى معانيها",
    birthday: "نابض بالحياة، يحتفي بثورة شخصية",
  },
};
