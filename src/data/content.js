// Every visible word on the page, copied verbatim from content.txt.
// Bracketed values are placeholders waiting for real data - keep the brackets until then.

export const hero = {
  headline: ['Learn.', 'Earn.', 'Lead.'],
  subheading: "Turning India's youth into earners, leaders and founders.",
  body: 'Skillzza Foundation walks with young Indians - especially girls and women - on one connected journey: from staying in school, to future-ready skills, to a first job, to building enterprises of their own.',
  primaryCta: 'Partner with us',
  secondaryCta: 'Back a young changemaker',
  programmes: [
    'Girl Education',
    'School Upskilling',
    'Youth Skilling',
    'Career-to-Campus',
    'Women Empowerment',
    'Entrepreneurship',
  ],
};

export const mission2030 = {
  eyebrow: 'Mission 2030',
  title: "Our promise to India's youth",
  stats: [
    { value: '1 Crore', label: 'young Indians skilled', accent: 'blue' },
    { value: '10 Lakh', label: 'girls kept in school & college', accent: 'violet' },
    { value: '5 Lakh', label: 'first jobs unlocked', accent: 'orange' },
    { value: '1 Lakh', label: 'women- & youth-led enterprises', accent: 'red' },
  ],
};

export const whyWeExist = {
  eyebrow: 'Why we exist',
  title: "India's greatest asset is its youth. Most programmes meet them only once.",
  // { mark } segments get the gold marker sweep; the joined text is the paragraph verbatim.
  problem: [
    'A girl gets a scholarship but drops out before college. A graduate finishes a course but never lands a job. A young woman has a business idea but no mentor, network or first rupee of capital. Each problem has a programme - but ',
    { mark: 'nobody stays with the young person from one step to the next' },
    '.',
  ],
  answer: [
    'Skillzza Foundation is built to change that. We stay with every young person across their whole journey - school, skills, career and enterprise - and ',
    { mark: 'we measure success by the lives that move forward, not the seats that get filled' },
    '.',
  ],
  alignments: ['NEP 2020', 'Skill India', 'Startup India', 'UN SDG 4 · 5 · 8', 'Viksit Bharat 2047'],
};

export const pathway = {
  eyebrow: 'The Skillzza Pathway',
  title: { lead: 'One journey.', not: 'Not ', struck: 'five disconnected programmes', end: '.' },
  body: 'Every young person enters where they are and moves forward with us - and every step is tracked, so no one falls through the cracks.',
  steps: [
    {
      id: 'learn',
      number: '1',
      title: 'Learn',
      subtitle: 'Education & Upskilling',
      body: 'Upskill schools and teachers, keep girls in school and college, and give every young person future-ready AI, digital and life skills.',
      programmes: ['School Upskilling', 'Girl Education', 'Youth Skilling'],
      accent: 'blue',
      image: 'pathway-learn',
    },
    {
      id: 'earn',
      number: '2',
      title: 'Earn',
      subtitle: 'Employability & Careers',
      body: 'Bring industry onto campus and turn skills into internships, first jobs and dignified livelihoods.',
      programmes: ['Career-to-Campus', 'Women Empowerment'],
      accent: 'orange',
      image: 'pathway-earn',
    },
    {
      id: 'lead',
      number: '3',
      title: 'Lead',
      subtitle: 'Entrepreneurship & Innovation',
      body: 'Back young people and women to build enterprises, create jobs for others and return as mentors.',
      programmes: ['Entrepreneurship', 'Changemaker Fellows'],
      accent: 'red',
      image: 'pathway-lead',
    },
  ],
};

export const programmes = {
  eyebrow: 'Our programmes',
  title: 'Six flagship programmes',
  fundCta: 'Fund a programme →',
  learnMore: 'Learn more →',
  items: [
    {
      id: 'skillzza-schools',
      tag: 'LEARN',
      name: 'Skillzza Schools',
      subtitle: 'School Education Upskilling',
      body: 'Future-ready schools: AI, digital and creative learning for students, professional development for teachers, and AI, virtual and innovation labs - free for government and low-income schools.',
      image: 'prog-schools',
    },
    {
      id: 'padho-aage',
      tag: 'LEARN',
      name: 'Padho Aage',
      subtitle: 'Girl Education',
      body: 'Scholarships, mentoring and family engagement so girls complete school, enter college and choose careers - including up to 90% scholarships on JEE & NEET preparation.',
      image: 'prog-padho-aage',
    },
    {
      id: 'skillup-bharat',
      tag: 'LEARN',
      name: 'SkillUp Bharat',
      subtitle: 'Youth Skilling',
      body: 'AI, digital, creative and life skills for college students, ITI trainees and out-of-school young people, with government-recognised certification.',
      image: 'prog-skillup',
    },
    {
      id: 'career-to-campus',
      tag: 'EARN',
      name: 'Career-to-Campus',
      subtitle: null,
      body: 'Industry leaders, real-world job simulations, internships and hiring drives brought directly to colleges, ITIs and polytechnics - especially in Tier-2 and Tier-3 India.',
      image: 'prog-career',
    },
    {
      id: 'her-rise',
      tag: 'EARN',
      name: 'Her Rise',
      subtitle: 'Women in Leadership',
      body: 'Digital, financial and leadership skills for women in rural and urban India, with paths back to work, into enterprise and into leadership roles.',
      image: 'prog-her-rise',
    },
    {
      id: 'young-founders',
      tag: 'LEAD',
      name: 'Young Founders',
      subtitle: 'Entrepreneurship',
      body: 'Idea-to-enterprise support for youth and women founders - mentors, seed grants, market access and an annual national pitch stage.',
      image: 'prog-founders',
    },
  ],
  partnership: {
    title: 'Bring a programme to your state, school, campus or company',
    body: 'Every programme is co-designed with government, institutional and CSR partners. Detailed programme designs are shared with partners on request.',
    cta: 'Request a partnership deck',
  },
};

export const girlsWomen = {
  eyebrow: 'Girls & Women First',
  title: 'When she rises, a whole family rises with her.',
  body: 'Girls and women are at the heart of every programme we run - not a side project. From a scholarship in Class 11 to a seed grant for her first enterprise, we stay with her at every step.',
  items: [
    {
      title: 'Skillzza Scholarship',
      body: 'Up to 90% scholarship on JEE & NEET preparation for students from underprivileged families.',
    },
    { title: 'Girls in Tech & AI cohorts', body: 'Dedicated cohorts, women mentors and role models in STEM and AI.' },
    {
      title: "Women's livelihood & return-to-work",
      body: 'Digital and financial skills, remote-work readiness and women-led enterprise support.',
    },
  ],
  primaryCta: 'Apply for scholarship',
  secondaryCta: 'Sponsor a girl',
};

export const careerToCampus = {
  eyebrow: 'Career-to-Campus',
  title: 'We bring the careers to the campus - not the other way round.',
  body: [
    { mark: "Talent is everywhere; opportunity isn't." },
    ' We take industry, mentors and employers to the colleges that big recruiters never visit.',
  ],
  items: ['Industry masterclasses', 'Job simulations', 'Virtual internships', 'Campus hiring days'],
  cta: 'Bring it to your campus →',
};

export const youngFounders = {
  eyebrow: 'Young Founders',
  title: { before: 'Job seekers ', muted: 'today', middle: '. Job creators ', bright: 'tomorrow', end: '.' },
  body: 'From a school innovation challenge to a funded enterprise - we back young and women founders with mentors, seed grants and access to markets.',
  items: ['Innovation challenges', 'Founder bootcamps', 'Seed grants', 'National pitch day'],
  cta: 'Apply as a founder →',
};

export const labs = {
  eyebrow: 'Skillzza Labs',
  title: 'Where young India learns by building.',
  body: 'Hands-on labs in schools, colleges and communities - and virtual labs that reach every learner, wherever they are.',
  cta: 'Set up a lab',
  items: [
    {
      id: 'ai-learning-labs',
      title: 'AI Learning Labs',
      body: 'Fully equipped labs in government schools and colleges where students build real AI projects with guidance from trained educators.',
      image: 'lab-ai',
      accent: 'blue',
    },
    {
      id: 'virtual-labs',
      title: 'Virtual Labs',
      body: 'Online labs for AI, science, coding and creative tech - so a learner in a remote village gets the same hands-on experience as one in a metro.',
      image: 'lab-virtual',
      accent: 'violet',
    },
    {
      id: 'innovation-labs',
      title: 'Innovation Labs',
      body: 'Maker and innovation spaces where students and young founders turn ideas into prototypes - and prototypes into ventures.',
      image: 'lab-innovation',
      accent: 'orange',
    },
  ],
};

export const aiForImpact = {
  eyebrow: 'AI for Impact',
  title: 'AI in action - solving real problems in real communities.',
  body: 'Young innovators, researchers and partners using AI to advance health, climate and the Sustainable Development Goals.',
  cta: 'Collaborate with us',
  items: [
    {
      id: 'ai-sustainable',
      title: 'AI for Sustainable Development',
      body: 'AI solutions for climate action, water, agriculture and resilient communities.',
      cta: 'Learn more →',
      image: 'ai-sustainable',
    },
    {
      id: 'salus-ai',
      title: 'Salus AI - Innovative Healthcare',
      body: 'AI-powered health innovation for better access, awareness and care in underserved communities.',
      cta: 'Learn more →',
      image: 'ai-health',
    },
    {
      id: 'ai-for-good',
      title: 'AI for Good Fellowships',
      body: 'Fellowships for young researchers and builders working on AI projects with real social impact.',
      cta: 'Apply →',
      image: 'ai-fellows',
    },
    {
      id: 'sdg-launchpad',
      title: 'SDG Launchpad',
      body: 'Taking youth-led solutions for the UN Sustainable Development Goals from idea to scale.',
      cta: 'Submit an idea →',
    },
  ],
};

export const whyDifferent = {
  eyebrow: "Why we're different",
  title: ['A foundation built like a company.', 'Accountable like a public trust.'],
  items: [
    {
      n: '01',
      title: 'Outcomes, not attendance',
      body: 'We report jobs, incomes, enterprises and girls who stay in education - not just people "trained".',
    },
    {
      n: '02',
      title: 'Every rupee, visible',
      body: 'Partners and donors get a live impact view of the learners, campuses and districts they fund.',
    },
    {
      n: '03',
      title: 'AI-first, built to scale',
      body: 'Powered by a proven learning technology platform, so programmes reach lakhs - not hundreds - without losing quality.',
    },
    {
      n: '04',
      title: 'Government at the core',
      body: 'We work inside state systems - schools, colleges, ITIs and districts - so impact lasts beyond any one grant.',
    },
  ],
};

export const impact = {
  title: 'Impact so far',
  meta: 'Data as of [Month Year] · Independently verified [partner name]',
  stats: [
    { value: '[0,00,000+]', label: 'Young people skilled', accent: 'blue' },
    { value: '[00,000+]', label: 'Girls supported in education', accent: 'violet' },
    { value: '[000+]', label: 'Schools & campuses upskilled', accent: 'orange' },
    { value: '[000+]', label: 'Enterprises supported', accent: 'red' },
  ],
  activeLabel: 'Active in',
  states: ['Chhattisgarh', 'Tripura', 'Maharashtra', 'Andhra Pradesh', 'Rajasthan', 'Gujarat', 'Delhi'],
};

export const stories = {
  eyebrow: 'Stories of change',
  title: ['Learners.', 'Earners.', 'Leaders.'],
  viewAll: 'View all stories →',
  readStory: 'Read story →',
  items: [
    {
      tag: 'LEARN · [District, State]',
      title: '[A first-generation girl who cleared her entrance exam]',
      image: 'story-learn',
      accent: 'blue',
    },
    {
      tag: 'EARN · [District, State]',
      title: '[A Tier-3 graduate hired through Career-to-Campus]',
      image: 'story-earn',
      accent: 'orange',
    },
    {
      tag: 'LEAD · [District, State]',
      title: '[A woman founder who now employs her neighbours]',
      image: 'story-lead',
      accent: 'red',
    },
  ],
};

export const partners = {
  title: 'Partners in change',
  body: 'Governments, technology leaders, universities, employers, foundations and CSR partners.',
  items: ['[Govt partner]', '[Tech partner]', '[University]', '[Employer]', '[Foundation]', '[CSR partner]'],
};

export const getInvolved = {
  eyebrow: 'Get involved',
  title: { before: 'Change a life. Or change ', emphasis: 'a district', end: '.' },
  items: [
    {
      id: 'csr',
      audience: 'CSR PARTNERS',
      title: 'Adopt a District or a Lab',
      body: 'Fund the full Learn–Earn–Lead pathway in one district, or set up an AI or Innovation Lab, with outcome-linked milestones and live reporting.',
      cta: 'Start a conversation →',
      accent: 'red',
    },
    {
      id: 'government',
      audience: 'GOVERNMENTS & INSTITUTIONS',
      title: 'Bring us to your state or campus',
      body: 'Zero-cost programmes for schools, colleges, ITIs, universities and districts.',
      cta: 'Request a proposal →',
      accent: 'blue',
    },
    {
      id: 'employers',
      audience: 'EMPLOYERS & MENTORS',
      title: 'Hire, host or mentor',
      body: 'Hire our learners, host interns, lead a masterclass or mentor a young founder.',
      cta: 'Join the network →',
      accent: 'orange',
    },
    {
      id: 'young-people',
      audience: 'YOUNG PEOPLE',
      title: 'Become a Changemaker Fellow',
      body: 'Volunteer, lead a campus chapter, or give back as an alumni mentor.',
      cta: 'Apply now →',
      accent: 'violet',
    },
  ],
};

export const donate = {
  title: 'Back a young changemaker',
  tiers: [
    { amount: '[₹0,000]', text: 'keeps a girl in school for a year', accent: 'violet' },
    { amount: '[₹00,000]', text: 'takes a young person from skills to a first job', accent: 'orange' },
    { amount: '[₹0,00,000]', text: 'seeds a woman-led enterprise.', accent: 'red' },
  ],
  note: 'Donations eligible under Section 80G.',
  primaryCta: 'Donate once',
  secondaryCta: 'Give monthly',
};

export const newsletter = {
  title: 'Stay close to the change',
  body: 'Stories, impact reports and opportunities - once a month.',
  label: 'Email address',
  placeholder: 'you@example.com',
  cta: 'Subscribe',
};

export const footer = {
  name: 'Skillzza Foundation',
  tagline: 'Learn. Earn. Lead.',
  address: 'WeWork India, Chromium, Powai, Mumbai, Maharashtra',
  registered: '[Registered office address]',
  email: '[foundation@skillzza.com]',
  phone: '[+91 00000 00000]',
  hours: 'Mon–Sat, 10:00 AM – 6:00 PM',
  columns: [
    {
      title: 'Programmes',
      links: [
        { label: 'Skillzza Schools', href: '#programmes', focus: 'skillzza-schools' },
        { label: 'Padho Aage', href: '#programmes', focus: 'padho-aage' },
        { label: 'SkillUp Bharat', href: '#programmes', focus: 'skillup-bharat' },
        { label: 'Career-to-Campus', href: '#programmes', focus: 'career-to-campus' },
        { label: 'Her Rise - Women in Leadership', href: '#programmes', focus: 'her-rise' },
        { label: 'Young Founders', href: '#programmes', focus: 'young-founders' },
        { label: 'Skillzza Labs', href: '#labs' },
        { label: 'AI for Impact', href: '#ai-for-impact' },
      ],
    },
    {
      title: 'Transparency',
      links: [
        { label: 'Annual reports', href: '#' },
        { label: 'Financial statements', href: '#' },
        { label: 'Registrations (12A · 80G · CSR-1)', href: '#' },
        { label: 'Board & governance', href: '#' },
        { label: 'Grievance redressal', href: '#' },
      ],
    },
  ],
};
