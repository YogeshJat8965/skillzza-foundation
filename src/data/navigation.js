import {
  PiBankDuotone,
  PiBookBookmarkDuotone,
  PiBookOpenTextDuotone,
  PiBrainDuotone,
  PiBriefcaseDuotone,
  PiCertificateDuotone,
  PiChalkboardTeacherDuotone,
  PiChartLineUpDuotone,
  PiClipboardTextDuotone,
  PiCoinsDuotone,
  PiCompassDuotone,
  PiCpuDuotone,
  PiDeviceMobileDuotone,
  PiFileTextDuotone,
  PiFlowerLotusDuotone,
  PiGlobeHemisphereEastDuotone,
  PiGraduationCapDuotone,
  PiHandHeartDuotone,
  PiHandshakeDuotone,
  PiHeartbeatDuotone,
  PiIdentificationBadgeDuotone,
  PiLightbulbFilamentDuotone,
  PiMapPinDuotone,
  PiMedalDuotone,
  PiNewspaperDuotone,
  PiPlantDuotone,
  PiQuotesDuotone,
  PiRocketLaunchDuotone,
  PiSparkleDuotone,
  PiStudentDuotone,
  PiTargetDuotone,
  PiUsersFourDuotone,
  PiUsersThreeDuotone,
} from 'react-icons/pi';

// Menu text is verbatim from the navigation screenshots. `href` points at the landing-page
// section that covers the link (`focus` tells that section what to highlight); '#' = not live yet.
// `spy` lists the sections that mark the item active while scrolling.
export const navigation = [
  {
    id: 'about',
    label: 'About Us',
    accent: 'navy',
    width: 860,
    title: 'About Us',
    description: 'Who we are, why we exist and the people behind the mission.',
    cta: { label: 'Read our story →', href: '#why-we-exist' },
    image: 'community',
    spy: ['mission-2030', 'why-we-exist', 'why-different', 'partners'],
    groups: [
      {
        label: 'WHO WE ARE',
        links: [
          { label: 'Our Story', icon: PiBookOpenTextDuotone, href: '#why-we-exist' },
          { label: 'Vision, Mission & Values', icon: PiCompassDuotone, href: '#why-we-exist' },
          { label: 'Mission 2030', icon: PiTargetDuotone, href: '#mission-2030' },
        ],
      },
      {
        label: 'OUR PEOPLE',
        links: [
          { label: 'Leadership & Board', icon: PiUsersThreeDuotone, href: '#' },
          { label: 'Our Partners', icon: PiHandshakeDuotone, href: '#partners' },
          { label: 'Careers', icon: PiBriefcaseDuotone, href: '#' },
        ],
      },
    ],
  },
  {
    id: 'programmes',
    label: 'Programmes',
    accent: 'blue',
    width: 1240,
    title: 'Programmes',
    description: 'One connected journey for India’s youth: Learn. Earn. Lead.',
    cta: { label: 'See all programmes →', href: '#programmes' },
    image: 'pathway-learn',
    spy: ['pathway', 'programmes', 'career-to-campus', 'young-founders', 'ai-for-impact'],
    groups: [
      {
        label: 'EDUCATION & UPSKILLING',
        accent: 'blue',
        links: [
          { label: 'Skillzza Schools', icon: PiChalkboardTeacherDuotone, href: '#programmes', focus: 'skillzza-schools' },
          { label: 'Padho Aage - Girl Education', icon: PiStudentDuotone, href: '#programmes', focus: 'padho-aage' },
          { label: 'SkillUp Bharat - Youth Skilling', icon: PiCertificateDuotone, href: '#programmes', focus: 'skillup-bharat' },
        ],
      },
      {
        label: 'EMPLOYABILITY & CAREERS',
        accent: 'orange',
        links: [
          { label: 'Career-to-Campus', icon: PiGraduationCapDuotone, href: '#programmes', focus: 'career-to-campus' },
          { label: 'Her Rise - Women in Leadership', icon: PiFlowerLotusDuotone, href: '#programmes', focus: 'her-rise' },
        ],
      },
      {
        label: 'ENTREPRENEURSHIP & INNOVATION',
        accent: 'red',
        links: [
          { label: 'Young Founders', icon: PiRocketLaunchDuotone, href: '#programmes', focus: 'young-founders' },
          { label: 'Changemaker Fellowship', icon: PiSparkleDuotone, href: '#pathway', focus: 'lead' },
        ],
      },
      {
        label: 'AI FOR IMPACT',
        accent: 'navy',
        links: [
          { label: 'AI for Sustainable Development', icon: PiPlantDuotone, href: '#ai-for-impact', focus: 'ai-sustainable' },
          { label: 'Salus AI - Innovative Healthcare', icon: PiHeartbeatDuotone, href: '#ai-for-impact', focus: 'salus-ai' },
          { label: 'AI for Good Fellowships', icon: PiBrainDuotone, href: '#ai-for-impact', focus: 'ai-for-good' },
          { label: 'SDG Launchpad', icon: PiGlobeHemisphereEastDuotone, href: '#ai-for-impact', focus: 'sdg-launchpad' },
        ],
      },
    ],
  },
  {
    id: 'labs',
    label: 'Labs',
    accent: 'orange',
    width: 760,
    title: 'Labs',
    description: 'Hands-on and virtual labs where young India learns by building.',
    cta: { label: 'Set up a lab →', href: '#labs' },
    image: 'lab-innovation',
    spy: ['labs'],
    groups: [
      {
        label: 'OUR LABS',
        links: [
          { label: 'AI Learning Labs', icon: PiCpuDuotone, href: '#labs', focus: 'ai-learning-labs' },
          { label: 'Virtual Labs', icon: PiDeviceMobileDuotone, href: '#labs', focus: 'virtual-labs' },
          { label: 'Innovation Labs', icon: PiLightbulbFilamentDuotone, href: '#labs', focus: 'innovation-labs' },
        ],
      },
    ],
  },
  {
    id: 'scholarships',
    label: 'Scholarships',
    accent: 'violet',
    width: 780,
    title: 'Scholarships',
    description: 'Up to 90% scholarship on JEE & NEET preparation for deserving students.',
    cta: { label: 'Apply now →', href: '#girls-women-first' },
    image: 'scholar',
    spy: ['girls-women-first'],
    groups: [
      {
        label: 'SKILLZZA SCHOLARSHIP',
        links: [
          { label: 'About the Scholarship', icon: PiMedalDuotone, href: '#girls-women-first' },
          { label: 'Eligibility & How to Apply', icon: PiClipboardTextDuotone, href: '#' },
          { label: 'Scholar Stories', icon: PiQuotesDuotone, href: '#stories' },
        ],
      },
    ],
  },
  {
    id: 'impact',
    label: 'Impact',
    accent: 'gold',
    width: 880,
    title: 'Impact',
    description: 'The lives, campuses and districts moving forward with us.',
    cta: { label: 'View impact →', href: '#impact' },
    image: 'impact-map',
    spy: ['impact', 'stories'],
    groups: [
      {
        label: 'OUR IMPACT',
        links: [
          { label: 'Impact Dashboard', icon: PiChartLineUpDuotone, href: '#impact' },
          { label: 'Where We Work', icon: PiMapPinDuotone, href: '#impact', focus: 'map' },
          { label: 'Community Projects', icon: PiUsersFourDuotone, href: '#' },
          { label: 'Reports & Publications', icon: PiFileTextDuotone, href: '#' },
        ],
      },
      {
        label: 'STORIES & NEWS',
        links: [
          { label: 'Stories of Change', icon: PiBookBookmarkDuotone, href: '#stories' },
          { label: 'News & Events', icon: PiNewspaperDuotone, href: '#' },
        ],
      },
    ],
  },
  {
    id: 'get-involved',
    label: 'Get Involved',
    accent: 'red',
    width: 880,
    title: 'Get Involved',
    description: 'Change a life - or change a district.',
    cta: { label: 'Partner with us →', href: '#get-involved' },
    image: 'women-livelihood',
    spy: ['get-involved', 'donate'],
    groups: [
      {
        label: 'PARTNER',
        links: [
          { label: 'CSR Partnerships', icon: PiHandshakeDuotone, href: '#get-involved', focus: 'csr' },
          { label: 'Government & Institutions', icon: PiBankDuotone, href: '#get-involved', focus: 'government' },
          { label: 'Employers & Mentors', icon: PiIdentificationBadgeDuotone, href: '#get-involved', focus: 'employers' },
        ],
      },
      {
        label: 'JOIN',
        links: [
          { label: 'Volunteer', icon: PiHandHeartDuotone, href: '#get-involved', focus: 'young-people' },
          { label: 'Campus Chapters', icon: PiGraduationCapDuotone, href: '#get-involved', focus: 'young-people' },
          { label: 'Fundraise for Us', icon: PiCoinsDuotone, href: '#donate' },
        ],
      },
    ],
  },
];

export const contactCta = { label: 'Contact Us', href: '#contact' };
