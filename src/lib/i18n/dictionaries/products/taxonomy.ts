import type { Locale } from "@/lib/i18n/locale";
import type { TaxonomyCopy } from "@/lib/i18n/dictionaries/products/copy.types";

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
