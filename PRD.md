# Product Requirements Document (PRD)
# VanLifeKitchen.com — Cooking Gear for Van Dwellers & Nomads

---

## 1. Project Overview

**Domain:** VanLifeKitchen.com
**Type:** Affiliate content website (Amazon Associates + Walmart Affiliate Program)
**Niche:** Compact cooking equipment for van life, RV living, and mobile lifestyles
**Tech Stack:** Next.js 14+ (App Router), Tailwind CSS, TypeScript, deployed on Vercel
**Target Launch:** MVP in 2 weeks

---

## 2. Brand Identity

**Brand Name:** VanLifeKitchen
**Tagline:** "Cook Anywhere. Live Everywhere."
**Brand Voice:** Adventurous, practical, trustworthy — like a seasoned van dweller sharing what actually works on the road. No fluff, no hype — just honest, tested recommendations.
**Color Palette:**
- Primary: Warm earthy orange (#E8752A)
- Secondary: Forest green (#2D5F2D)
- Neutral: Off-white (#FAF8F5)
- Dark: Charcoal (#1A1A1A)
- Accent: Desert sand (#D4A574)

**Typography:**
- Headings: Bold sans-serif (Inter or similar)
- Body: Clean readable sans-serif (Inter)
- Accent: Monospace for specs/data points

**Logo Concept:** A minimalist van silhouette with a cooking flame/spatula integrated. Keep it simple enough to work as a favicon.

---

## 3. Target Audience

**Primary:** Van lifers (ages 25–45), full-time and weekend warriors
**Secondary:** RV owners, overlanders, car campers, tiny home dwellers, boat liveaboards
**Psychographics:**
- Research-heavy buyers — they read 3-5 reviews before purchasing
- Value space-efficiency and multi-functionality
- Budget-conscious but willing to invest in quality gear (30–800 USD range)
- Active on YouTube, Reddit (r/vandwellers, r/vanlife), Instagram
- Prioritize durability, portability, and power efficiency (12V/solar)

---

## 4. Site Architecture & Pages

### 4.1 Global Layout

**Header:**
- Logo (left)
- Navigation: Home | Reviews | Guides | Kitchen Setups | Tools | About
- Search bar (icon, expands on click)
- Mobile: hamburger menu

**Footer:**
- Column 1: Quick links (Reviews, Guides, Kitchen Setups, Tools)
- Column 2: Categories (Cooktops, Fridges, Cookware, Water, Storage)
- Column 3: About, Contact, Privacy Policy, Affiliate Disclosure, Terms
- Column 4: Newsletter signup
- Bottom bar: © 2026 VanLifeKitchen.com | Affiliate Disclosure notice
- Social links: YouTube, Instagram, Pinterest, Reddit

---

### 4.2 Pages to Build

#### HOME PAGE (/)
**Purpose:** Hook visitors, showcase top content, build trust

**Sections (top to bottom):**
1. **Hero Section**
   - Background: Lifestyle image of a van kitchen setup (use placeholder)
   - Headline: "Cook Anywhere. Live Everywhere."
   - Subheadline: "Independent reviews and guides for the best van life kitchen gear — tested on the road, not in a lab."
   - CTA button: "Find Your Gear" → scrolls to categories
   - Secondary CTA: "Take the Kitchen Quiz" → links to quiz tool

2. **Trust Bar**
   - "500+ Products Reviewed" | "100% Independent" | "Updated Weekly" | "Real Van Life Tested"

3. **Featured Categories (Grid — 6 cards)**
   - Portable Cooktops
   - 12V Fridges & Coolers
   - Compact Cookware
   - Water Filtration
   - Kitchen Storage & Organization
   - Solar Cooking
   - Each card: Icon/image, category name, "X products reviewed", arrow link

4. **Top Picks Section**
   - "Our Top Picks This Month"
   - 3 product cards in a row (image, product name, one-line verdict, star rating, price, "Read Review" button, Amazon + Walmart buttons)

5. **Latest Guides Section**
   - 3 guide cards (thumbnail, title, excerpt, read time, date)

6. **Kitchen Setup Showcase**
   - "Real Van Kitchen Setups"
   - Carousel or grid of 3 setup profiles (van name/type, photo, quick specs, "See Full Setup" link)

7. **Newsletter Signup**
   - "Get the Weekly Dispatch"
   - "One email per week. Best new gear, van kitchen tips, and exclusive deals."
   - Email input + Subscribe button

8. **About Snippet**
   - Brief brand story (2–3 sentences)
   - "We're van dwellers who got tired of bad gear recommendations..."
   - Link to full About page

---

#### REVIEWS HUB (/reviews)
**Purpose:** Central hub for all product reviews, organized by category

**Layout:**
- Page title: "Honest Gear Reviews"
- Filter bar: Category dropdown | Price range | Rating | Sort by (newest, highest rated, most popular)
- Grid of review cards (image, product name, category badge, star rating, price, one-line verdict, "Read Review" CTA)
- Pagination (12 per page)
- Sidebar (desktop): Popular reviews, categories list, newsletter CTA

---

#### INDIVIDUAL REVIEW PAGE (/reviews/[slug])
**Purpose:** In-depth product review — primary affiliate conversion page

**Template Structure:**
1. **Review Header**
   - Product name (H1)
   - Category breadcrumb
   - Star rating (out of 5)
   - "Updated [date]" badge
   - Author name + avatar

2. **Quick Verdict Box (sticky on scroll)**
   - One-paragraph verdict
   - Pros (3–5 bullets)
   - Cons (2–3 bullets)
   - Overall score: X/10
   - Price: [amount]
   - **"Buy on Amazon" button** (affiliate link, tag: vanlifekitch-20)
   - **"Buy on Walmart" button** (affiliate link)
   - Small affiliate disclosure text below buttons

3. **Specifications Table**
   - Key specs: Dimensions, weight, power source, wattage, capacity, materials, warranty

4. **Review Body (long-form content sections)**
   - Overview / Who is this for?
   - Design & Build Quality
   - Performance (with specific test results if applicable)
   - Power Consumption (critical for van life)
   - Size & Portability
   - Ease of Cleaning
   - Value for Money
   - Comparison vs Alternatives (brief table)
   - Final Verdict

5. **Comparison CTA**
   - "Compare with similar products" → links to category roundup

6. **Related Reviews**
   - 3 cards of related products

---

#### GUIDES HUB (/guides)
**Purpose:** Educational content for SEO and audience building

**Layout:** Same as Reviews Hub but for guide articles
- Grid of guide cards (thumbnail, title, excerpt, read time, category tag)
- Categories: Setup Guides, Meal Prep, Power & Solar, Water Systems, Budget Builds

---

#### INDIVIDUAL GUIDE PAGE (/guides/[slug])
**Purpose:** Long-form educational content with affiliate links embedded naturally

**Template Structure:**
1. Title (H1) + hero image
2. Author + date + read time
3. Table of Contents (auto-generated, sticky sidebar on desktop)
4. Article body with H2/H3 sections
5. Embedded product recommendations within content (affiliate cards)
6. Newsletter CTA mid-article
7. Related guides at bottom

---

#### KITCHEN SETUPS (/setups)
**Purpose:** Showcase real van kitchen builds — inspirational + affiliate-rich

**Layout:**
- Grid of setup profiles
- Each card: Van type, photo, budget range, "View Setup" CTA

---

#### INDIVIDUAL SETUP PAGE (/setups/[slug])
**Template:**
1. Setup name + van type (H1)
2. Hero photo gallery (carousel)
3. Quick stats: Total cost, van model, cooking style, power setup
4. Full gear list with affiliate links (each item: photo, name, price, Amazon/Walmart button)
5. Owner's notes / tips
6. "Build a Similar Setup" CTA

---

#### TOOLS PAGE (/tools)
**Purpose:** Interactive tools for engagement and SEO

**Tools to Build:**

1. **Van Kitchen Budget Calculator**
   - User selects categories (cooktop, fridge, cookware, water, storage)
   - Picks budget tier per category (budget / mid-range / premium)
   - Calculator shows total estimated cost + recommended products per tier
   - Each product links to review + affiliate link

2. **Kitchen Layout Planner (Simple)**
   - User selects van size (cargo van, sprinter, skoolie, RV)
   - Shows recommended kitchen layout with labeled zones
   - Links to recommended products for each zone

3. **Power Consumption Calculator**
   - User adds kitchen appliances from a list
   - Shows total wattage, daily amp-hour usage
   - Recommends battery/solar setup
   - Links to power products

---

#### ABOUT PAGE (/about)
- Brand story
- Mission statement
- How we review (methodology)
- Team section (can use placeholder for now)
- Affiliate disclosure (full transparency)

---

#### LEGAL PAGES
- **/privacy** — Privacy Policy
- **/terms** — Terms of Service
- **/affiliate-disclosure** — Full affiliate disclosure (FTC compliant)

---

## 5. Affiliate Integration

### 5.1 Amazon Associates
- **Tag:** vanlifekitch-20
- **Implementation:** All Amazon product links must include `?tag=vanlifekitch-20`
- **Button style:** Orange CTA button — "Check Price on Amazon"

### 5.2 Walmart Affiliate Program
- **Tag:** Use Walmart affiliate link format with tracking ID
- **Button style:** Blue CTA button — "Check Price on Walmart"
- **Placement:** Always show as secondary option below Amazon button

### 5.3 Affiliate Link Components
[TRUNCATED IN SOURCE — section cut off mid-sentence: "Create a reusable `,[object Object]"]

<!-- NOTE: The PRD as received was truncated at section 5.3. Remaining sections (5.3 completion, 6+) need to be provided. -->
