export type Editor = {
  slug: string;
  name: string;
  initials: string;
  role: string;
  bio: string;
  expertise: string[];
};

export const editors: Record<string, Editor> = {
  maya: {
    slug: "maya",
    name: "Maya Larsen",
    initials: "ML",
    role: "Senior Editor & Founder",
    bio: "Six years full-time in a Sprinter 144, formerly a mechanical engineer at a renewable energy startup. Maya runs every power-system test on this site with a Victron BMV-712 shunt and writes the deep technical reviews. If a number is in a Maya review, she measured it twice.",
    expertise: ["12V refrigeration", "power systems", "induction cooking", "electrical builds"],
  },
  theo: {
    slug: "theo",
    name: "Theo Park",
    initials: "TP",
    role: "Field Editor & Recipe Lead",
    bio: "A former line cook turned full-time van dweller, Theo lives in a Promaster 136 and has cooked roughly 1,800 meals out of it. He covers cooktops, cookware, and meal prep — and writes the recipes that actually fit a single-burner reality.",
    expertise: ["cooktops", "cookware", "meal prep", "kitchen ergonomics"],
  },
  cassidy: {
    slug: "cassidy",
    name: "Cassidy Brooks",
    initials: "CB",
    role: "Gear Reviewer",
    bio: "Three years of weekend and shoulder-season trips out of a Ford Transit 148. Cassidy approaches the site from the part-timer perspective — what works without a full electrical system, what survives storage between trips, and what's worth the upgrade later. She covers water systems, storage, solar cooking, and budget builds.",
    expertise: ["water filtration", "kitchen storage", "solar cooking", "budget builds"],
  },
};

export const editorList: Editor[] = [editors.maya, editors.theo, editors.cassidy];

/** Map a product author string to an Editor object. */
export function getEditor(authorName: string): Editor {
  for (const e of editorList) {
    if (e.name === authorName || e.slug === authorName.toLowerCase()) return e;
  }
  // Default fallback
  return editors.maya;
}
