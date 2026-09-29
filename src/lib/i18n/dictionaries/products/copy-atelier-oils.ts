import type { ProductCopy } from "@/lib/i18n/dictionaries/products/copy.types";

/** Arabic copy — Atelier Oils — concentrated oils poured in the studio. */
export const copyAtelierOils: Record<string, ProductCopy> = {
  "ambre-solaire": {
    name: "أمبر سولير",
    notes: "شرقي / عنبر وبنزوين",
    description:
      "يحتفظ أمبر سولير بآخر دفء النهار. برتقال دموي يذوب في البنزوين وأثر عنبري ذهبي بطيء.",
    scentNotes: {
      top: ["برتقال دموي", "فلفل وردي"],
      heart: ["بنزوين سيامي", "إيمورتيل"],
      base: ["عنبر ذهبي", "فانيليا مطلقة"],
    },
  },
  "papier-vetiver": {
    name: "بابييه فيتيفير",
    notes: "خشبي / نجيل وورق",
    description:
      "بابييه فيتيفير برائحة مكتبة قديمة. برغموت يرفع النجيل الجاوي فوق البردي وقاعدة فانيليا هادئة.",
    scentNotes: {
      top: ["برغموت", "حبّ الفلفل الوردي"],
      heart: ["نجيل جاوي", "بردي"],
      base: ["خشب الأرز", "فانيليا بوربون"],
    },
  },
  "miel-fume": {
    name: "مييل فومي",
    notes: "شرقي / عسل وتبغ",
    description:
      "مييل فومي دفء بلا حلاوة. عسل وورق تبغ يستقران على التونكا وقاعدة عنبر جافة.",
    scentNotes: {
      top: ["برتقال مرّ", "قشر القرفة"],
      heart: ["عسل مطلق", "ورق التبغ"],
      base: ["حبة التونكا", "عنبر جاف"],
    },
  },
  "encens-blanc": {
    name: "أنسان بلان",
    notes: "شرقي / لبان ومُرّ",
    description:
      "أنسان بلان بخور بلا دخان. لبان عُماني ومُرّ فوق قاعدة من العنبر الفاتح والصندل.",
    scentNotes: {
      top: ["إليمي", "فلفل وردي"],
      heart: ["لبان عُماني", "مُرّ"],
      base: ["عنبر أبيض", "صندل"],
    },
  },
};
