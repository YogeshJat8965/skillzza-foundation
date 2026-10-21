# Skillzza Foundation: Landing Page Plan

**Status:** Final draft, approval ke liye (21 Oct 2026). Senior-level upgrades Section 10 mein hain.
**Scope:** Sirf landing page. Donate aur baaki saare action buttons abhi kahin nahi jaayenge.
**Golden rule:** `content.txt` aur navbar screenshots ka text word-for-word use hoga. Apni taraf se koi text add nahi hoga.

---

## 1. Content analysis

- Core idea **"Learn. Earn. Lead."** hai: school se skills, skills se pehli job, aur job se apna enterprise. Ye ek connected journey hai, aur focus girls aur women par hai.
- Logo ka "star ki taraf haath badhata figure" aur content ki journey ek hi kahani hain. Isliye page ka signature element ek scroll-driven journey hoga.
- Primary audience CSR partners, governments aur institutions hain. Isliye tone corporate-premium rahega, playful nahi.
- Content mein placeholders hain, jaise `[0,00,000+]`, `[Govt partner]`, `[₹0,000]`. Inke defaults section 9 mein hain.

---

## 2. Theme: logo se matched

| Logo element | Color | Website par meaning |
|---|---|---|
| "FOUNDATION" text | Navy `#0B2254` | Base: headings, dark sections, footer |
| Blue petal | `#0A8FF0` | **LEARN** pillar |
| Orange/yellow petal | `#FF8A00` | **EARN** pillar (sirf decor; is par white text nahi) |
| "SKILLZZA" red | `#E31E24` | **LEAD** pillar + primary CTA (hover `#C4161C`) |
| Violet petal | `#7B4BD2` | Girls & Women / Scholarships |
| Star | Gold `#FFB000` | Mission 2030, Impact, aspiration |
| Wordmark red→orange | `#E31E24 → #F25C05 → #FF9F1C` | Highlights, progress bar, donate band |

**Neutrals**

| Use | Hex |
|---|---|
| Background | `#FFFFFF` |
| Soft section background | `#F5F7FB` |
| Body text | `#3B4559` |
| Muted text | `#6B7280` |
| Border | `#E4E8F0` |
| Link | `#0A6ED1` |

**Fonts:** Plus Jakarta Sans for headings, Inter for body text.

**Logo motifs jo poori site mein dikhenge**
1. **4 petals:** preloader bloom, leaf-shaped photo masks, menu aur card accents
2. **Star with rays:** twinkle animation, CTA sparkle
3. **Reaching figure:** Pathway section ka journey marker
4. **Tagline style:** spaced grey caps eyebrows (`—— OUR PROGRAMMES ——`), aur lists mein red/blue dot separators
5. **Wordmark gradient:** progress bar, underlines, donate band

---

## 3. Navbar + mega menu (NEW)

### 3.1 Menu content (screenshots se transcribed, ise verify kar lena)

| Menu | Card title | Description | CTA | Columns |
|---|---|---|---|---|
| About Us | About Us | Who we are, why we exist and the people behind the mission. | Read our story → | **WHO WE ARE:** Our Story · Vision, Mission & Values · Mission 2030 — **OUR PEOPLE:** Leadership & Board · Our Partners · Careers |
| Programmes | Programmes | One connected journey for India's youth: Learn. Earn. Lead. | See all programmes → | **EDUCATION & UPSKILLING:** Skillzza Schools · Padho Aage — Girl Education · SkillUp Bharat — Youth Skilling — **EMPLOYABILITY & CAREERS:** Career-to-Campus · Her Rise — Women in Leadership — **ENTREPRENEURSHIP & INNOVATION:** Young Founders · Changemaker Fellowship — **AI FOR IMPACT:** AI for Sustainable Development · Salus AI — Innovative Healthcare · AI for Good Fellowships · SDG Launchpad |
| Labs | Labs | Hands-on and virtual labs where young India learns by building. | Set up a lab → | **OUR LABS:** AI Learning Labs · Virtual Labs · Innovation Labs |
| Scholarships | Scholarships | Up to 90% scholarship on JEE & NEET preparation for deserving students. | Apply now → | **SKILLZZA SCHOLARSHIP:** About the Scholarship · Eligibility & How to Apply · Scholar Stories |
| Impact | Impact | The lives, campuses and districts moving forward with us. | View impact → | **OUR IMPACT:** Impact Dashboard · Where We Work · Community Projects · Reports & Publications — **STORIES & NEWS:** Stories of Change · News & Events |
| Get Involved | Get Involved | Change a life — or change a district. | Partner with us → | **PARTNER:** CSR Partnerships · Government & Institutions · Employers & Mentors — **JOIN:** Volunteer · Campus Chapters · Fundraise for Us |
| Contact Us | — | — | — | Koi dropdown nahi. Ye right side ka highlighted button hai. |

**Har menu ka apna logo color:** About Us = Navy · Programmes = Blue · Labs = Orange · Scholarships = Violet · Impact = Gold · Get Involved = Red.
Programmes card ke andar columns pillar ke hisaab se colored honge: Education = Blue, Employability = Orange, Entrepreneurship = Red, AI for Impact = Navy.

### 3.2 Desktop navbar (≥1024px)

`[Logo]   About Us ▾  Programmes ▾  Labs ▾  Scholarships ▾  Impact ▾  Get Involved ▾   [Contact Us]`

- **Navbar logo:** tagline ke bina wala variant, kyunki chhote size par tagline padhi nahi jaati. Full logo footer aur preloader mein aayega.
- **Page ke top par:** full-width aur transparent.
- **Scroll karne par ye floating glass pill mein badal jaayega:**
  - pill rounded hoga, white/80 + backdrop blur, aur halki navy shadow ke saath
  - height 76px se 60px ho jaayegi aur logo smoothly chhota hoga
  - pill ke neeche ke edge par brand-gradient **scroll progress line** chalegi
- **Smart hide:** neeche scroll karne par navbar chhup jaayega, upar scroll karte hi wapas aa jaayega. Menu khula ho to nahi chhupega.
- **Hover effect:** ek "liquid pill" background ek item se doosre item tak glide karega, aur uska tint us item ke apne color mein hoga. Chevron 180° ghoomega, aur khule menu ke neeche ek chhota petal-dot dikhega.
- **Load animation:** preloader ke baad nav items stagger hokar upar se aayenge.
- **Contact Us button:**
  - red rang ka, magnetic hover ke saath
  - hover par gradient sweep chalega aur star sparkle dikhega
  - click karne par footer ke contact block tak smooth scroll hoga

### 3.3 Mega menu card: dropdown ki jagah card (signature piece)

- **Morphing card (Stripe-style):**
  - sabhi menus ke liye ek hi card container rahega
  - ek menu se doosre menu par jaane par card ki width, height aur position smoothly morph hogi
  - content us direction se slide-in hoga jidhar mouse gaya
  - card ke upar ka chhota caret active item ki taraf glide karega
- **Open animation:** scale 0.96 → 1, fade aur halki y-movement, spring easing ke saath. Peeche ka page halka dim aur blur ho jaayega.
- **Card ka left side: feature panel (~36%)**
  - background menu ke color ka soft gradient tint hoga, aur corner mein ek bada faint logo petal dheere ghoomega
  - title bada hoga (Plus Jakarta 800), description ke neeche CTA link aayega jiska underline grow karega aur arrow slide karega
  - neeche ek chhoti leaf-masked photo, jo page ki images se hi li jaayegi aur sirf menu khulne par load hogi
- **Card ka right side: link columns**
  - group labels logo tagline style mein (spaced caps + colored dot)
  - har link ek row hoga: chhota rounded icon tile (react-icons, menu color mein tinted) + label
  - **Link hover:** row ka background tint hoga, icon tile solid color mein white icon ke saath bharega, label 4px khiskega, aur end mein → fade-in hoga
  - card khulne par links 40ms stagger ke saath ek-ek karke aayenge
- **Behaviour:**
  - hover-intent: 60ms baad khulta hai aur 180ms ki grace ke baad band hota hai, taaki flicker na ho
  - click se bhi khulta hai
  - reduced-motion mode mein sirf fade hoga

### 3.4 Mobile/tablet menu (<1024px)

- **Bar:** logo + compact Contact Us + hamburger. Hamburger ki 3 lines logo ke colors mein hongi aur X mein morph hongi.
- **Menu open:** hamburger se ek circular clip-path reveal hoga jo poori screen par navy-dark background phaila dega. Background mein blurred petals floating rahenge.
- **Items:** bade type mein stagger hokar aayenge. Har item ek accordion hai: tap karne par uska card (description, CTA, grouped links) smooth height animation ke saath khulta hai. Ek waqt mein ek hi khula rahega.
- **Neeche:** full-width Contact Us button.
- Menu khulne par body scroll lock hoga. Esc dabane par menu band hoga, aur focus menu ke andar hi rahega.

### 3.5 Menu links kahan jaayenge

Doosre pages abhi nahi hain. Isliye jis link ka section landing page par maujood hai, wo us section tak smooth scroll karega aur wahan target ko highlight karega. Baaki links kahin nahi jaayenge.

| Link | Behaviour |
|---|---|
| Our Story, Vision, Mission & Values, Read our story → | "Why we exist" section |
| Mission 2030 | Mission 2030 section |
| Our Partners | Partners section |
| Programme names (6), See all programmes → | Programmes section. Carousel us programme ke card par slide karke card ko pulse-highlight karega. |
| Changemaker Fellowship | Pathway ka Lead step |
| AI for Impact ke 4 links | AI for Impact section, wo card highlight |
| AI Learning Labs / Virtual Labs / Innovation Labs, Set up a lab → | Labs section, wo panel expand |
| About the Scholarship, Apply now → | Girls & Women First card |
| Scholar Stories, Stories of Change | Stories section |
| Impact Dashboard, Where We Work, View impact → | Impact so far (map) |
| CSR Partnerships / Government & Institutions / Employers & Mentors, Partner with us → | Get involved section, us audience ka card highlight |
| Volunteer, Campus Chapters | Get involved, "Young People" card |
| Fundraise for Us | Donate band |
| Leadership & Board, Careers, Eligibility & How to Apply, Community Projects, Reports & Publications, News & Events | Inert (kahin nahi jaate) |

### 3.6 Accessibility

- `aria-expanded` aur `aria-controls` lagenge, aur menu Enter/Space/ArrowDown se khulega
- Esc se menu band hoga aur focus wapas trigger par aa jaayega
- Tab order natural rahega, aur focus ring visible rahegi

---

## 4. Page sections (content ke order mein)

**Global**
- Petal-bloom preloader (~1s, ek session mein ek baar)
- Lenis smooth scroll
- Back-to-top button with progress ring
- Reveal animations
- *Pichle plan wala top announcement bar hata diya hai:* mega navbar ke saath ye clutter lagta, aur content mein uske liye koi text bhi nahi hai.

1. **Hero (light background)**
   - Headline "Learn. Earn. Lead.": words navy mein, aur full stops blue / orange / red dots. Load par mask-reveal hoga.
   - Hero photo petal mask mein; peeche logo ke 4 petals ghoomenge aur star twinkle karega
   - 2 CTA buttons
   - Neeche 2 crossed marquee bands (6 programme names)
2. **Mission 2030 (navy)**
   - 4 targets odometer digit-roll ke saath, gold star accent
   - Background mein bada outlined "2030"
3. **Why we exist**
   - Heading scroll ke saath word-by-word fill hogi
   - Tooti line scroll par judkar path banti hai (SVG)
   - NEP / Skill India / Startup India / SDG / Viksit Bharat pills
4. **The Skillzza Pathway ⭐**
   - **Desktop:** section pin hoga aur 3 panels (Learn / Earn / Lead) horizontal scroll honge. Ek curved path draw hoga jis par logo ka figure chalkar Lead par star tak pahunchega.
   - **Mobile:** vertical timeline
5. **Our programmes**
   - 6 cards ka draggable Swiper carousel, pillar tags ke saath
   - Gradient progress bar
   - Neeche partnership banner
6. **Girls & Women First · Career-to-Campus · Young Founders:** stacking cards on scroll (violet / orange / red)
7. **Skillzza Labs:** 3 expanding photo panels (mobile par carousel)
8. **AI for Impact (dark navy)**
   - Dot-grid background
   - 4 cards ka bento grid, rotating gradient border ke saath
9. **Why we're different**
   - Left heading sticky rahegi
   - Right side 01–04 outline numbers, jo view mein aate hi gradient se fill honge
10. **Impact so far:** 4 stats + India map, jisme 7 active states pulse karenge
11. **Stories of change:** centered Swiper slider with autoplay progress
12. **Partners in change:** 2-row logo marquee opposite directions mein (placeholder tiles)
13. **Get involved:** 4 audience cards 4 petal colors mein, hover par color fill
14. **Back a young changemaker**
    - Navy + gradient glow
    - Teen ₹ statements 3 tiles mein
    - Donate once / Give monthly buttons inert rahenge
15. **Newsletter + Footer**
    - Full logo (white version)
    - Contact block (Contact Us yahin scroll karta hai)
    - Programmes / Transparency columns
    - Bada outlined "Learn. Earn. Lead."

**Background rhythm:** light hero → navy → white → mist → white → tinted stack cards → white → navy → white → mist → white → navy → navy-dark footer.

---

## 5. Images (~21 photos, Unsplash, Indian context)

| Section | Photos |
|---|---|
| Hero | Young woman presenting to peers |
| Pathway (3) | School students · young intern/professional · young founder |
| Programmes (6) | Govt school computer class · girl studying · youth skill training · campus mentor/hiring · woman with laptop · startup workshop |
| Stack cards (3) | Rural girls & women learners · students with industry speaker · founders pitching |
| Labs (3) | AI lab · rural learner on phone · innovators prototyping |
| AI for Impact (2) | Agri/climate tech · community health worker |
| Stories (3) | Girl student · young graduate · woman entrepreneur |

Mega menu photos inhi images se reuse hongi.

**Quality process:**
- Har photo ko khud dekhkar check karunga
- WebP mein compress (cards 800px, hero 1600px, menu 400px)
- Sab par ek common warm color grade
- AI-generated chehre nahi

---

## 6. Tech stack aur structure

- **Stack:** React 19 + Vite + Tailwind v4 + react-icons (same as `skillzza` project). Saath mein GSAP ScrollTrigger, Lenis aur Swiper. Fonts @fontsource se.
- **Text:** `src/data/content.js` mein page ka saara text hoga, aur `src/data/navigation.js` mein menu ka. Dono verbatim.
- **Brand assets:**
  - logo crop karke background transparent
  - navbar variant (tagline ke bina)
  - dark-background variant (white "FOUNDATION")
  - petal aur star SVGs
  - favicon
- **Components:**
  - `Navbar/` (DesktopNav, MegaMenu, MobileMenu)
  - har section ka apna component
  - `ui/` (Eyebrow, Button, Marquee, Petal, Odometer)
- **Icons:** sirf ek family, Phosphor duotone (react-icons ke through)
- **Tooling:**
  - **sharp:** image pipeline (4 sizes, AVIF + WebP, blur placeholders)
  - **Playwright:** screenshots, cross-browser checks, content integrity test
  - **axe-core:** accessibility scan
  - **ESLint + Prettier**

---

## 7. Execution phases

1. **Setup + design system:**
   - Vite setup, `git init` (tumhari permission se)
   - Tokens: colors, spacing, radii, shadows, motion
   - Fluid type scale, contrast-check script, fonts
2. **Brand assets:** logo variants, petal aur star SVGs, favicon set
3. **Content + integrity test:** `content.js` aur `navigation.js` banenge. Content integrity test pehle hi likh diya jaayega (test-first).
4. **Images:** ~21 photos curate karna; image pipeline (sizes, AVIF/WebP, blur placeholders, credits)
5. **Navbar + mega menu:** desktop + mobile
6. **Sections:** upar se neeche, har section ke baad screenshot check
7. **Motion + signature moments:**
   - Pathway, stacking cards, odometer
   - Preloader → navbar transition
   - Copy animations
8. **Mobile pass:** sticky CTA bar, har test width par layout tuning
9. **QA:**
   - Cross-browser screenshots
   - Lighthouse aur axe scan
   - Content integrity test
   - Keyboard aur reduced-motion walkthrough
10. **Handover:** README, CREDITS, OG image, SEO, production build

---

## 8. Kya nahi hoga

- Content ke bahar ka koi text nahi: © line, social icons, "Drag" ya "All" jaise labels, ya link descriptions
- Koi external navigation ya payment nahi
- AI-generated logon ki photos nahi
- **Ek exception, invisible text:** image alt text, aria-labels aur keyboard users ke liye "Skip to content" link. Ye screen par nahi dikhte (skip link sirf Tab dabane par dikhta hai), lekin accessibility ke liye zaroori hain.

## 9. Defaults (alag chahiye to batao)

1. **Brackets:**
   - Mission 2030 ke numbers (1 Crore, 10 Lakh, 5 Lakh, 1 Lakh) **bina brackets** dikhenge, kyunki ye real targets lagte hain.
   - Baaki placeholders (`[0,00,000+]`, `[Govt partner]`, `[₹0,000]`, `[District, State]`, `[Registered office address]` etc.) **brackets ke saath** waise hi rahenge, taaki saaf dikhe ki ye data abhi aana baaki hai.
   - `[Photo: ...]` lines ki jagah images lagengi.
2. **Hero buttons:**
   - "Partner with us" → Get involved
   - "Back a young changemaker" → donate band
   - "Fund a programme →" → donate band
3. **India map:** official Indian boundaries wala map hi. Reliable SVG na mile to stylized state chips lagenge.

---

## 10. Senior-level upgrades: client ki expectation se aage

Senior developer zyada effects nahi jodta. Wo **consistency, craft aur reliability** par kaam karta hai, kyunki "highly professional" feel wahin se aata hai. Ye sab wo hai jo is page ko achhe se premium banayega.

### 10.1 Pehle design system, phir sections

Professional sites mein har cheez ek hi system se nikalti hai.

- **Spacing:** 8pt scale. Section padding `clamp(80px, 10vw, 140px)`. Container max 1280px, mobile par 20px gutter.
- **Signature "petal corner":** cards aur images ka ek corner nukeela hoga aur baaki rounded (jaise `28px 28px 28px 6px`), bilkul logo ki petal tip jaisa. Ye shape poori site ki pehchaan banegi.
- **Radii tokens:** 8 (inputs) · 16 (cards) · 28 (feature panels) · full (pills).
- **Shadows:** grey nahi, navy-tinted layered shadows, 3 levels mein. Isse depth natural aur brand-matched lagti hai.
- **Motion tokens:** sirf 3 durations (200 / 400 / 700ms) aur 2 easing curves. Har animation inhi se banegi, isliye poori site ek rhythm mein chalegi.
- **Icons:** sirf ek family (Phosphor duotone), pillar colors mein. Icon families mix karna amateur sites ki sabse common galti hai.
- **Contrast:** script se verify hoga. Har text/background pair WCAG AA pass karega; isme koi andaza nahi.

### 10.2 Photo art direction

- **Fixed aspect ratios:** hero 4:5, cards 4:3, panels 3:4, stories 4:5. Grid hamesha saaf dikhega.
- **Ek common color grade:** halki warmth aur matched contrast. Dark sections par photos ke upar navy gradient, taaki text hamesha readable rahe.
- **Nazar text ki taraf:** hero aur feature photos aisi chunenge jinmein person headline ki taraf dekh raha ho. Visitor ki aankh apne aap text par jaati hai.
- **Mobile ke liye alag crop** (`<picture>`): wide photo phone par beech se kategi nahi, portrait crop milega.
- **Reveal:** pehle pillar color ka block photo par slide karega, phir photo reveal hogi.
- **Blur-up placeholders:** photo load hone se pehle uska blurred version dikhega. Khaali dabba kabhi nahi dikhega.

### 10.3 Typography craft

- **Fluid type scale** (`clamp`): headings har screen par smoothly scale honge, breakpoint par jump nahi karenge.
- **Headings:** tight tracking (-0.025em) aur `text-wrap: balance`, taaki lines barabar tootein.
- **Paragraphs:** `text-wrap: pretty`, taaki last line mein akela word na bache. Line length max ~65 characters.
- **Stats:** tabular numbers, taaki odometer chalte waqt digits hilein nahi.
- **Non-breaking spaces:** "1 Crore", "10 Lakh", "UN SDG 4 · 5 · 8" kabhi do lines mein nahi tootenge. Text same rahega, sirf wrapping control hogi.
- CTA ke "→" arrows hover par aage khiskenge.

### 10.4 Headings ka matlab visually dikhana (words same)

- **"One journey. Not five disconnected programmes."** Scroll par "five disconnected programmes" par red strike-through draw hogi, aur "One journey." gradient mein chamkega.
- **"When she rises, a whole family rises with her."** Dono "rises" reveal par upar uthenge, aur saath mein bada violet quote mark.
- **"Job seekers today. Job creators tomorrow."** "today" muted rahega, "tomorrow" gradient mein.
- **"Change a life. Or change a district."** "a district" bada hokar emphasis paayega.
- **"Learners. Earners. Leaders."** Har word ke neeche uske pillar color ka hand-drawn underline.
- **Key phrases par gold marker-highlight sweep**, jaise "Talent is everywhere; opportunity isn't." Poore page par 4 se zyada nahi, warna asar khatam ho jaata hai.

### 10.5 Signature moments (gine-chune)

1. **Preloader → navbar:** petals bloom hokar logo banenge, phir logo udkar navbar mein apni jagah baith jaayega.
2. **Hero:** mouse ke saath petals halke se parallax mein hilenge, aur star twinkle karega.
3. **Pathway finale:** figure star tak pahunchega to star mein chhota burst hoga.
4. **Sections ke beech background:** white se navy jaate waqt hard edge nahi hoga; color scroll ke saath blend hoga.
5. **Spotlight cards:** dark AI section ke cards mein mouse ke peeche soft glow chalega.
6. **Inert buttons par star-burst:** Donate once / Give monthly kahin nahi jaate, isliye click par logo colors ke chhote stars ka burst hoga. Bina feedback ke button toota hua lagta hai.
7. **Footer wordmark:** hover par "Learn." blue, "Earn." orange aur "Lead." red ho jaayega.

### 10.6 Navigation polish

- **Scroll-spy:** user jis section mein hai, navbar ka wahi item active dikhega.
- **Anchor offsets:** kisi section par scroll hone ke baad uski heading sticky navbar ke neeche nahi chhupegi.

### 10.7 Mobile alag se design (sirf stack nahi)

- **Sticky bottom CTA bar:** hero ke baad dikhega ("Partner with us" + "Back a young changemaker"), aur donate band aur footer par apne aap chhup jaayega.
- Hover effects sirf mouse wale devices par (`@media (hover: hover)`). Phone par koi bhi cheez hover ke peeche chhupi nahi rahegi.
- Har carousel swipe + snap ke saath chalega. Touch targets kam se kam 44px.
- Mobile par heavy pinning off rahegi aur animations halki hongi.
- **Test widths:** 320 · 360 · 390 · 414 · 768 · 1024 · 1280 · 1440 · 1920 · 2560.

### 10.8 Performance bhi ek feature hai

**Targets (Lighthouse mobile):** Performance 90+, LCP < 2.5s, CLS < 0.05.

- **Images:** har photo 4 sizes mein (400 / 800 / 1200 / 1600), AVIF + WebP.
- **Fonts:** sirf zaroori weights, Latin subset, preload. Fallback font ke metrics match kiye jaayenge, taaki font load hote waqt text na kude.
- **Lazy loading:** neeche ke sections ki heavy cheezein (Swiper, map) tabhi load hongi jab user wahan pahunchne wala ho.
- **Smooth animations:** sirf `transform` aur `opacity` animate honge. Marquees screen se bahar jaate hi ruk jaayenge.

### 10.9 Accessibility (WCAG 2.2 AA)

- **Pause control:** marquees aur autoplay sliders hover ya focus par rukenge, aur ek chhota pause/play icon button bhi hoga. Zyada tar sites ye rule (WCAG 2.2.2) miss kar deti hain.
- **Structure:** ek hi `h1`, sahi heading order aur landmarks.
- **Keyboard:** poora page keyboard se chalega, visible focus rings ke saath.
- **Screen reader:** odometer jaise animations screen reader ko seedha final value batayenge.
- **Automated axe scan**, target 0 violations.

### 10.10 SEO aur sharing

- **Title aur meta description content se hi:** "Learn. Earn. Lead." aur "Turning India's youth into earners, leaders and founders."
- **Designed OG image (1200×630):** logo + headline + hero photo. Link WhatsApp ya LinkedIn par share hoga to ek proper preview card dikhega.
- NGO structured data (JSON-LD), favicon set aur theme-color.

### 10.11 Engineering quality

- **Content integrity test (sabse important):**
  - Automated test rendered page par content.txt aur navigation ki har line verbatim dhundhega.
  - Saath hi ye bhi check karega ki page par koi aisa visible text toh nahi jo content mein nahi hai.
  - Matlab "content change nahi hona chahiye" wala rule machine verify karegi, yaad ke bharose nahi rahega.
- **Tokens:** saare colors, spacing aur fonts tokens se aayenge, koi hardcoded value nahi.
- **Image pipeline:** ek hi command se sizes, formats, blur placeholders aur credits list ban jaayengi.
- ESLint clean, aur browser console mein 0 errors/warnings.
- **Git:** har phase ke baad commit hoga (tumhari permission se), taaki kuch bigde to pichhle step par wapas ja sakein.

### 10.12 QA process

- **Screenshots:** Playwright se Chromium, Firefox aur WebKit (Safari ka engine) teeno mein, saari test widths par. Har screenshot main khud dekhunga.
- Lighthouse (mobile + desktop), axe scan aur content integrity test.
- Keyboard-only walkthrough, reduced-motion walkthrough aur slow-network test.

### 10.13 Handover

- **README:**
  - project kaise chalana hai
  - placeholders kahan update karne hain (ek hi file)
  - photos kaise badalni hain (ek folder + ek map file)
  - deploy kaise karna hai
- **CREDITS.md:** Unsplash photographers ki list.
- Production build (`npm run build`) Vercel ya Netlify par deploy ke liye ready rahegi.

### 10.14 Jo jaan-boojhkar NAHI karenge (restraint bhi craft hai)

- **Dark mode toggle:** brand light hai, aur isse QA double ho jaata.
- **Poori site par custom cursor:** NGO site par ye gimmick lagta hai.
- **Video hero:** authentic footage nahi hai, aur page heavy ho jaata.
- **Scroll-jacking:** sirf Pathway mein, aur kahin nahi.
- **Fake data:** "Every rupee, visible" ke liye koi fake dashboard ya fake numbers nahi.
- **Ek section, ek "wow":** kisi section mein ek se zyada signature effect nahi.
