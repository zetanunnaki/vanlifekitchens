/**
 * FAQPage JSON-LD generator.
 *
 * Our MDX content includes "## FAQ" sections with Q&A pairs, but parsing MDX
 * at runtime to extract them is complex. Instead, we maintain a curated map of
 * the highest-value FAQ items per slug — these power Google "People also ask"
 * rich results and don't need to mirror the full FAQ in the article.
 */

export type FaqItem = { question: string; answer: string };

const reviewFaqs: Record<string, FaqItem[]> = {
  "dometic-cfx3-35-powered-cooler": [
    {
      question: "How much power does the Dometic CFX3 35 use per day?",
      answer:
        "About 22–28 Ah per day at 12V in moderate ambient (75°F) when set to 38°F. In hot weather (95°F+) expect 40–55 Ah/day. In cool weather (55–65°F) it can drop as low as 12–16 Ah/day.",
    },
    {
      question: "Is the Dometic CFX3 35 worth it over an Iceco VL35?",
      answer:
        "If you value app control, slightly lower power draw, and Dometic's 3-year warranty, yes. If you'd rather save $500 for a near-identical Secop compressor experience, the Iceco VL35 is the better value.",
    },
    {
      question: "Does the Dometic CFX3 35 freeze?",
      answer:
        "Yes. The CFX3 35 freezes to -7°F and can run as a single-zone freezer or as a refrigerator. It is not a true dual-zone unit — you cannot run fridge and freezer simultaneously.",
    },
    {
      question: "How loud is the Dometic CFX3 35?",
      answer:
        "Around 38–42 dB measured a foot from the housing — quieter than most home refrigerators. You can sleep next to it without issue.",
    },
  ],
  "duxtop-portable-induction-cooktop": [
    {
      question: "Will the Duxtop 9100MC work in a van?",
      answer:
        "Yes, but you need a pure sine wave inverter rated for at least 2000W continuous and a lithium battery bank of at least 200Ah. The cooktop draws about 170 amps at 12V through the inverter at full power.",
    },
    {
      question: "How much battery does the Duxtop use per meal?",
      answer:
        "Roughly 25–35 Ah per day for one person cooking one hot meal. Two people cooking three meals consume 60–90 Ah/day. A 1800W burn for one minute costs about 2.5 Ah.",
    },
    {
      question: "Does the Duxtop work with all cookware?",
      answer:
        "No. Induction requires ferromagnetic cookware — cast iron, carbon steel, and most stainless steel. Aluminum, copper, and ceramic pans will not work.",
    },
  ],
  "lifestraw-home-gravity-pitcher": [
    {
      question: "Is the LifeStraw Home Pitcher worth it for van life?",
      answer:
        "If you refill from varied or unknown water sources (campground spigots, rural wells, trailheads), yes. The two-stage filter is NSF-tested against bacteria, parasites, lead, microplastics, mercury, and PFAS. If you only fill from municipal taps you fully trust, a $30 inline carbon filter is enough.",
    },
    {
      question: "How long do the LifeStraw Home filters last?",
      answer:
        "The membrane microfilter is rated for about 264 gallons (1,000 liters) and the activated carbon + ion exchange stage for about 40 gallons (150 liters). At typical full-time van use of 2 gallons per day, that's roughly 10 weeks on the carbon stage and 4+ months on the membrane before replacement.",
    },
    {
      question: "Why not just buy a Berkey instead?",
      answer:
        "Berkey was pulled from Amazon and Walmart in 2023–2024 following an EPA registration dispute over how its filters are classified and marketed. You can no longer buy one through major retailers with normal warranty and return protection, so we no longer recommend it. The LifeStraw Home is the best gravity pitcher you can actually buy today.",
    },
    {
      question: "Can you travel with water in the LifeStraw Home Pitcher?",
      answer:
        "No. The lid isn't sealed against driving vibration, and water sloshing between the upper reservoir and the lower chamber can spill. Drain the upper reservoir before driving and refill at camp.",
    },
  ],
};

const guideFaqs: Record<string, FaqItem[]> = {
  "12v-fridge-buying-guide": [
    {
      question: "How much battery do I need for a 12V fridge?",
      answer:
        "For a typical 35–50L compression fridge drawing 22 Ah/day, plan a 200 Ah LiFePO4 bank for full-time use. This gives you about 2 days of fridge-only autonomy at 80% depth of discharge.",
    },
    {
      question: "Is a compression or thermoelectric cooler better for a van?",
      answer:
        "Compression, every time. Thermoelectric coolers can only cool 15–20°C below ambient, can't freeze, and draw 96–120 Ah/day continuously. Compression fridges draw 20–30 Ah/day and freeze.",
    },
    {
      question: "What size 12V fridge do I need for two people?",
      answer:
        "35–50L is the sweet spot for two people doing 4–7 day trips. Solo travelers can usually live with 25–35L. Families of four need 60L+.",
    },
  ],
  "induction-vs-butane-vs-propane": [
    {
      question: "Is butane or induction cheaper to run in a van?",
      answer:
        "On a marginal per-meal basis, induction is cheaper if you already have the electrical system. On a total-system basis (battery + solar + inverter cost to support induction), butane wins for light cookers.",
    },
    {
      question: "Does butane work in cold weather?",
      answer:
        "No. Butane vaporization fails below 30°F. For winter cooking, switch to propane (works to -44°F) or butane-propane blend cartridges (works to about 0°F).",
    },
  ],
  "van-kitchen-power-budget": [
    {
      question: "How many amp-hours does a van kitchen use per day?",
      answer:
        "A typical van kitchen with compression fridge, occasional induction, lights, and water pump uses 90–150 Ah/day. Heavy induction users can exceed 150 Ah. Butane/propane setups drop to 35–60 Ah.",
    },
    {
      question: "What size lithium battery do I need for a van kitchen?",
      answer:
        "Multiply your daily Ah total by 2 for a 2-day buffer, then divide by 0.8 for LiFePO4 depth of discharge. A 100 Ah/day kitchen needs a 250 Ah battery minimum.",
    },
  ],
  "12v-fridges-complete-guide": [
    { question: "What is the best 12V fridge for van life?", answer: "The Iceco VL35 ProS at $429 is the best value for most full-time van builds. It uses a real Secop BD35 compressor, draws 18–25 Ah/day, and carries a 2-year warranty. For premium dual-zone, the Dometic CFX3-45 at $1,050 is the benchmark." },
    { question: "How long does a 12V fridge last on a single battery charge?", answer: "A 200 Ah LiFePO4 battery provides about 80–95 Ah of usable capacity after accounting for other loads. A typical 35L fridge drawing 22 Ah/day gives roughly 3–4 days of fridge-only autonomy with zero solar." },
    { question: "Can I run a 12V fridge off my car battery?", answer: "Technically yes with a DC-DC isolator or ACR relay, but only while driving. A car's starter battery is not designed for continuous discharge and will die within hours if the engine is off. Use a dedicated house battery." },
  ],
  "cooktops-complete-guide": [
    { question: "What is the best portable cooktop for van life?", answer: "The Duxtop 9100MC portable induction at $75 is the best overall. For builds without electrical systems, the Gas One GS-3000 butane at $30 is the best value. For winter, the Camp Chef Everest 2X propane at $150 handles sub-freezing temperatures." },
    { question: "Can I use induction cooking in a van?", answer: "Yes, with a 200+ Ah LiFePO4 battery bank, a 2000W+ pure sine inverter, and 300+ W of solar. An 1800W induction cooktop draws about 25–30 Ah per 20-minute cooking session." },
    { question: "Is butane safe to use inside a van?", answer: "Only with proper ventilation. Butane combustion produces CO and water vapor. Open at least two windows and run a fan when cooking with butane indoors. A CO detector near the sleeping area is non-negotiable." },
  ],
  "cookware-complete-guide": [
    { question: "What cookware works on induction in a van?", answer: "Ferromagnetic metals only: cast iron, carbon steel, and most stainless steel (check with a magnet — if it sticks to the base, it works). Aluminum, copper, ceramic, and pure titanium do not work on induction." },
    { question: "Is cast iron worth it in a van?", answer: "Yes. A Lodge 10.25-inch cast iron skillet at $25 is the best single-pan value in van life. It sears, braises, bakes bread, and works on every heat source. The only downside is weight (5 lbs) and the seasoning maintenance discipline." },
  ],
  "water-filtration-complete-guide": [
    { question: "What is the best water filter for van life?", answer: "For daily use, the LifeStraw Home Gravity Pitcher at $50. For inline tank protection, the Clearsource Ultra at $200. For backup, the Sawyer Squeeze at $39. For international travel, the Grayl GeoPress at $100. Most full-timers should layer 2–3 of these." },
    { question: "Do I need a water filter in my van?", answer: "If you fill from campground spigots, rural wells, or any source you don't fully trust — yes. Even municipal water benefits from carbon filtration for taste and chlorine. A Sawyer Squeeze at $39 is the minimum for any van kitchen." },
  ],
  "coffee-complete-guide": [
    { question: "What is the best coffee maker for van life?", answer: "The AeroPress Original at $45 is the best overall for daily reliability. The Hario V60 at $20 produces the best-tasting cup. The Wacaco Picopresso at $100 makes real 9-bar espresso. Pick based on your morning ritual preference." },
    { question: "Can you make real espresso in a van?", answer: "Yes. The Wacaco Picopresso is a manual lever press that generates 9 bars of pressure — real espresso with real crema. It needs hot water from any kettle and a good burr grinder. No electricity or plumbing required." },
  ],
  "knives-prep-complete-guide": [
    { question: "What knife should I buy for a van kitchen?", answer: "The Victorinox Fibrox 8-Inch Chef Knife at $45. It is the most universally recommended chef knife in the world — Swiss-made, unkillable, easy to sharpen, lifetime warranty. Add an Opinel No. 8 folding knife at $22 for pocket carry." },
    { question: "How do you store knives safely in a van?", answer: "Four methods work: in-drawer knife block (most secure), wall-mounted magnetic strip (fastest access), knife roll (best for weekend builds), or individual blade sheaths (cheapest). Never store loose knives in a utensil drawer." },
  ],
  "storage-complete-guide": [
    { question: "What is the best storage system for a van kitchen?", answer: "The Iris Weathertight 6-bin set at $119 for dry goods pantry, plus the Gneiss Magnetic Spice Rack at $89 for spice organization. Total $208 covers full-time pantry needs." },
    { question: "How do you organize a van kitchen?", answer: "Use the 5-bin system: pantry bin (dry goods), cookware bin (pots/utensils), fresh food bin (ventilated, floor level), cleaning bin (under sink), and overflow bin (rear storage). Every item has a dedicated home that survives driving." },
  ],
  "solar-cooking-complete-guide": [
    { question: "Can you really cook with solar in a van?", answer: "Yes, in sunny climates. Tube-style solar cookers reach 300–500°F and cook real meals in 1–3 hours. Box ovens reach 250–300°F for slow cooking. The GoSun Fusion hybrid adds 12V electric backup for cloudy days." },
    { question: "Is solar cooking worth it for van life?", answer: "In the American Southwest, Baja, or Mexico — absolutely. Solar handles 30–50% of cooking load with zero fuel cost and zero cabin heat. In the Pacific Northwest or Northeast, it is a summer-only tool." },
  ],
  "best-portable-cooktops-van-life-2026": [
    { question: "What is the best portable cooktop for van life in 2026?", answer: "The Duxtop 9100MC portable induction at $75 paired with a Gas One GS-3000 butane backup at $30. Total $105 covers summer induction primary and winter butane backup." },
    { question: "Is induction or gas better for van cooking?", answer: "Induction is better for full-time builds with proper electrical systems — no CO, instant response, precise control. Gas (butane or propane) is better for budget builds, winter cooking, and builds without solar/battery infrastructure." },
  ],
  "best-12v-fridge-by-budget-2026": [
    { question: "What is the best budget 12V fridge for a van?", answer: "The Costway 30Qt at about $260 is the best compression fridge under $300. For $170 more, the Iceco VL35 ProS at $429 is dramatically better and the recommended pick for anyone who can stretch the budget." },
    { question: "Is a 12V fridge better than a cooler for van life?", answer: "For anything longer than a weekend, yes. A compression fridge maintains precise temperature indefinitely with 20–30 Ah/day of power. A cooler needs ice replenishment every 24–48 hours and food sits in melt water." },
  ],
  "best-water-filters-van-life-2026": [
    { question: "What happened to Berkey water filters?", answer: "Berkey was pulled from Amazon and Walmart in 2023–2024 following an EPA registration dispute over how their filters were classified and marketed as pesticidal devices. The LifeStraw Home Gravity Pitcher is the best currently available alternative with full NSF testing." },
    { question: "Do I need a virus-rated water purifier for van life?", answer: "For US domestic travel, no — viruses are rare in North American freshwater. For international travel (Mexico, Central America, Southeast Asia), yes. The Grayl GeoPress at $100 is the only portable purifier in our catalog that removes viruses." },
  ],
  "best-van-life-cookware-2026": [
    { question: "What is the best cookware set for van life in 2026?", answer: "The Magma Nesting 10-Piece at $189 is the best overall. For budget builds, the Stanley Adventure Base Camp at $60. For the two-pan minimalist kit, the Lodge 10.25-inch cast iron ($25) plus one Magma stainless sauté pan." },
  ],
  "best-coffee-gear-van-life-2026": [
    { question: "What is the best coffee gear for van life in 2026?", answer: "The AeroPress Original ($45) plus the Hario Skerton Pro hand grinder ($60) is the correct starter kit at $105 total. Upgrade to the Hario V60 plus Bonavita gooseneck kettle ($105 more) for pour-over ritual, or the Wacaco Picopresso ($100) for real espresso." },
  ],
  "best-van-kitchen-storage-2026": [
    { question: "What is the best van kitchen storage in 2026?", answer: "The Iris Weathertight 6-bin set ($119) plus the Gneiss Magnetic Spice Rack ($89) at $208 total. Upgrade to Front Runner Wolf Pack Pro bins ($69 each) for overland use on rough terrain." },
  ],
  "winter-van-kitchen-essentials-2026": [
    { question: "Can you cook in a van in winter?", answer: "Yes, with the right fuel. Propane works to -20°F. Butane fails below 32°F. Induction works at any temperature but drains batteries faster with reduced winter solar. The Camp Chef Everest 2X propane stove ($150) is the correct winter primary." },
    { question: "How do you keep water from freezing in a van?", answer: "Insulate all water lines, keep the tank inside the heated cabin, drain the inline filter before freezing nights, and store the gravity pitcher indoors. A frozen Sawyer Squeeze filter is permanently ruined." },
  ],
  "summer-van-kitchen-survival-2026": [
    { question: "How do you cook in a van in summer heat?", answer: "Cook outside whenever possible (tailgate kitchen, picnic table). Use a solar cooker for background meals. Shift cooking to before 10 AM and after 6 PM. Cook cold meals (salads, wraps, grain bowls). Run the MaxxFan on exhaust if cooking indoors." },
    { question: "Does cooking in a van make it hotter?", answer: "Yes. A butane burner adds 8,000–15,000 BTU of waste heat. An induction cooktop adds about 3,400 BTU/hour. In a 200-cubic-foot van cabin at 95°F, that can raise interior temperature 5–15°F." },
  ],
  "van-water-system-setup": [
    { question: "How many gallons of water do two people need in a van?", answer: "About 5–6 gallons per day for efficient use (drinking, cooking, dish washing, hand washing). A 20-gallon tank gives two people roughly 3–4 days of autonomy." },
    { question: "Do I need a 12V water pump for a van kitchen?", answer: "Not strictly — foot pumps work fine and draw zero power. But a 12V diaphragm pump makes the kitchen feel like a house kitchen and adds only 4–8 Ah of draw per day." },
  ],
  "van-kitchen-layouts": [
    { question: "What is the best van kitchen layout?", answer: "A galley layout along one wall is the most common and most functional for vans. Place the fridge at one end, counter in the middle, and sink at the other end. Allow at least 24 inches of uninterrupted counter space for prep." },
    { question: "How much counter space do you need in a van kitchen?", answer: "Minimum 24 x 18 inches of clear counter for basic prep. Ideally 30 x 18 inches for comfortable cooking. Anything under 18 inches of depth makes cutting boards precarious." },
  ],
  "van-life-coffee-setup-guide": [
    { question: "What is the cheapest good coffee setup for a van?", answer: "The AeroPress Original at $45 with pre-ground coffee and any kettle you already own. Total cost: $45. Upgrade to the Hario Skerton Pro hand grinder ($60) when you want fresh-ground." },
  ],
  "van-cooking-safety-guide": [
    { question: "Is it safe to cook inside a van?", answer: "Yes, with precautions. Use a CO detector (mandatory for any gas cooking), ensure ventilation (open 2+ windows), keep a fire extinguisher within reach, and never leave a flame unattended. Induction is the safest indoor option because it produces no combustion." },
  ],
  "van-knife-storage-and-safety": [
    { question: "How do you store knives safely in a moving van?", answer: "Use an in-drawer knife block (most secure), a wall-mounted magnetic strip inside a closed cabinet, a tied knife roll, or individual blade sheaths. Never store loose knives in a utensil drawer — they shift during driving and are an injury risk." },
  ],
  "van-cookware-materials-guide": [
    { question: "What is the best cookware material for van life?", answer: "Cast iron for searing and braising, tri-ply stainless for sauces and delicate work. The two-pan combo (Lodge cast iron + Magma stainless) at $214 covers every cooking task." },
  ],
  "how-to-make-real-espresso-in-a-van": [
    { question: "Can you make real espresso in a van without electricity?", answer: "Yes. The Wacaco Picopresso is a manual lever press that generates 9 bars of pressure using only hot water and hand force. It produces real espresso with crema, no electricity or plumbing needed." },
  ],
};

export function reviewFaqSchema(slug: string) {
  const faqs = reviewFaqs[slug];
  if (!faqs || faqs.length === 0) return null;
  return buildFaqJsonLd(faqs);
}

export function guideFaqSchema(slug: string) {
  const faqs = guideFaqs[slug];
  if (!faqs || faqs.length === 0) return null;
  return buildFaqJsonLd(faqs);
}

function buildFaqJsonLd(faqs: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}
