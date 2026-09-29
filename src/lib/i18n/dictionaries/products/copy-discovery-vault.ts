import type { ProductCopy } from "@/lib/i18n/dictionaries/products/copy.types";

/** Arabic copy — Discovery Vault — lighter, entry-priced compositions. */
export const copyDiscoveryVault: Record<string, ProductCopy> = {
  "eau-de-brume": {
    name: "أو دو بروم",
    notes: "منعش / ضباب وشاي أخضر",
    description:
      "أو دو بروم هواء الصباح فوق الماء. يوزو وندى يفسحان المجال لشاي أخضر وخاتمة نقية تكاد تكون بلا وزن.",
    scentNotes: {
      top: ["يوزو", "تركيبة الندى"],
      heart: ["شاي أخضر", "فريزيا بيضاء"],
      base: ["أخشاب فاتحة", "مسك نظيف"],
    },
  },
  "baie-rose": {
    name: "باي روز",
    notes: "منعش / فلفل وردي وحمضيات",
    description:
      "باي روز أول دقيقة مشرقة من الصباح. فلفل وردي وجريب فروت فوق راوند ومسك نظيف.",
    scentNotes: {
      top: ["فلفل وردي", "جريب فروت دموي"],
      heart: ["راوند", "نيرولي"],
      base: ["مسك أبيض", "أرز خفيف"],
    },
  },
  "brise-marine": {
    name: "بريز مارين",
    notes: "منعش / نسمة بحرية وخشب طافٍ",
    description:
      "بريز مارين ريح من عرض البحر. رذاذ بحري وبرغموت فوق قاعدة معدنية من الخشب الطافي والمسك.",
    scentNotes: {
      top: ["رذاذ بحري", "برغموت كالابري"],
      heart: ["تركيبة بحرية", "إكليل الجبل"],
      base: ["خشب طافٍ", "مسك معدني"],
    },
  },
};
