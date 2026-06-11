import type { LucideIcon } from "lucide-react";
import usarecHero from "@/assets/usarec-hero.jpg";
import {
  Star,
  GraduationCap,
  Briefcase,
  Heart,
  ShieldCheck,
  MapPin,
  Wallet,
  ArrowUpRight,
  Building2,
  PiggyBank,
  Calendar,
  LandPlot,
  Car,
  Home,
  Umbrella,
  Activity,
  Users,
  TrendingUp,
  School,
  LineChart,
  Trophy,
  Shield,
  BookOpen,
} from "lucide-react";

export type FormField = {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "number" | "select" | "textarea" | "radio" | "checkbox-group";
  required?: boolean;
  options?: string[];
  placeholder?: string;
  half?: boolean;
};

export type Step = {
  label: string;
  title: string;
  body: string;
  credit: string;
};

export type Benefit = {
  Icon: LucideIcon;
  title: string;
  body: string;
};

export type AudienceCard = {
  accent: string;
  Icon: LucideIcon;
  title: string;
  body: string;
  pills: string[];
};

export type EducationCard = { tag: string; title: string; body: string };
export type AccountTypeItem = { title: string; body: string };

export type EnterprisePartner = {
  slug: "usarec" | "merrill-lynch" | "state-farm" | "edward-jones";
  name: string;
  shortName: string;
  badge: string;
  headline: string;
  subheadline: string;
  body: string;
  primaryCta: string;
  creditBadge: string;
  heroImage: string;
  heroAlt: string;
  steps: [Step, Step, Step];
  totalCredits: string;
  creditsDisclaimer: string;

  middleSectionTitle: string;
  middleSectionSubhead: string;
  benefits: Benefit[];
  benefitsCalloutBody: string;
  benefitsCalloutCta?: string;

  pathSection?: {
    title: string;
    body: string;
    tabs: {
      key: string;
      label: string;
      cards: { title: string; body: string; pills?: string[] }[];
    }[];
  };

  audienceSection?: { title: string; subhead: string; cards: AudienceCard[] };
  educationSection?: { title: string; subhead: string; cards: EducationCard[] };
  accountTypesSection?: { title: string; subhead: string; items: AccountTypeItem[]; callout: string };
  complianceNote?: { title: string; body: string };
  statsBar?: string[];

  formTitle: string;
  formBody: string;
  formCreditCallout: string;
  formFields: FormField[];
  submitLabel: string;
  formFootnotes: string[];
};

const STEP_CREDIT_DISCLAIMER_USAREC =
  "Credits release upon verified completion of each step through USAREC confirmation. Step 2 and Step 3 credits require recruiter verification.";

const STEP_CREDIT_DISCLAIMER_MERRILL =
  "Credits release upon verified completion of each step through Merrill Lynch advisor confirmation.";

const STEP_CREDIT_DISCLAIMER_STATEFARM =
  "Credits release upon verified completion of each step through State Farm agent confirmation. Ongoing contribution percentages vary by policy type.";

export const ENTERPRISE_PARTNERS: Record<EnterprisePartner["slug"], EnterprisePartner> = {
  usarec: {
    slug: "usarec",
    name: "U.S. Army Recruiting Command",
    shortName: "USAREC",
    badge: "Official Enterprise Partner",
    headline: "Be All You Can Be.",
    subheadline: "Serve. Lead. Rise.",
    body: "USAREC connects America's next generation of Soldiers, Officers, and Reserve warriors with the careers, education, and benefits that built a nation. Explore your path and unlock a future bigger than yourself.",
    primaryCta: "Explore Your Options",
    creditBadge: "Earn up to $575 in your FanPact account",
    heroImage: usarecHero,
    heroAlt: "U.S. Soldiers in training formation at sunrise",
    steps: [
      {
        label: "Step 1",
        title: "Express Interest",
        body: "Submit the information form below.",
        credit: "$50 in your FanPact account",
      },
      {
        label: "Step 2",
        title: "Meet Your Recruiter",
        body: "Complete a one-on-one conversation with your local USAREC recruiter.",
        credit: "$125 in your FanPact account",
      },
      {
        label: "Step 3",
        title: "Take the Next Step",
        body: "Sign an enlistment contract, ROTC commitment, or Officer candidacy agreement.",
        credit: "$400 in your FanPact account",
      },
    ],
    totalCredits: "Earn up to $575 in your FanPact account across all three steps — spend it on anything in the store.",
    creditsDisclaimer: STEP_CREDIT_DISCLAIMER_USAREC,

    middleSectionTitle: "The Army Reserve: Citizen. Soldier. You.",
    middleSectionSubhead:
      "One weekend a month. Two weeks a year. A lifetime of advantage. The Army Reserve lets you build a civilian career, go to school, and serve the nation — all at once.",
    benefits: [
      { Icon: Wallet, title: "Up to $20,000 Bonus", body: "Enlistment bonuses for select MOS in the Army Reserve." },
      { Icon: GraduationCap, title: "100% Tuition Assistance", body: "Up to $4,500/yr plus the Montgomery GI Bill Selected Reserve." },
      { Icon: Briefcase, title: "Keep Your Civilian Job", body: "Serve one weekend a month, two weeks a year. USERRA protects your career." },
      { Icon: Heart, title: "TRICARE Reserve Select", body: "Affordable medical and dental coverage for you and your family." },
      { Icon: ShieldCheck, title: "Student Loan Repayment", body: "Up to $50,000 in loan repayment through the LRP." },
      { Icon: MapPin, title: "Serve Close to Home", body: "Train at a Reserve unit near where you live, work, or study." },
    ],
    benefitsCalloutBody:
      "Eligible recruits can combine an enlistment bonus, student loan repayment, and the Selected Reserve GI Bill for over $150,000 in lifetime value.",
    benefitsCalloutCta: "See If You Qualify",

    pathSection: {
      title: "Choose Your Path",
      body: "USAREC recruits across every channel. Whether you're starting out or stepping up, there's a way in — and a way up.",
      tabs: [
        {
          key: "enlisted",
          label: "Enlisted",
          cards: [
            { title: "Active Duty Enlisted", body: "Full-time Soldier. Up to $50K bonus, free housing, healthcare, and 30 days paid leave." },
            { title: "Army Reserve", body: "Part-time service with full benefits, drill pay, and a civilian career on the side." },
            { title: "Army National Guard", body: "Serve your state and nation — disaster response, federal missions, education benefits." },
            {
              title: "200+ Career Fields",
              body: "From cyber to medicine — find your MOS.",
              pills: ["Cyber & Signal", "Army Medicine", "Mechanics & Engineering", "Aviation", "Infantry & Armor", "Intelligence"],
            },
          ],
        },
        {
          key: "officer",
          label: "Officer",
          cards: [
            { title: "ROTC", body: "Earn your degree and commission through Army ROTC at 1,000+ colleges nationwide." },
            { title: "Officer Candidate School (OCS)", body: "Already have a degree? Commission as an Officer through OCS in 12 weeks." },
            { title: "U.S. Military Academy", body: "Earn a fully-funded degree at West Point and commission as an Army Officer." },
            {
              title: "Direct Commission",
              body: "Bring specialized skills (medical, legal, chaplain) and commission directly as an Officer.",
              pills: ["Medical Corps", "JAG Corps", "Chaplain Corps", "Cyber Corps", "Engineer Corps", "Intelligence"],
            },
          ],
        },
      ],
    },

    formTitle: "Request Information",
    formBody:
      "Fill out the form and a USAREC recruiter will reach out with personalized info on bonuses, education benefits, and the path that fits you.",
    formCreditCallout:
      "Earn $50 in your FanPact account — Step 1 of 3. Complete all three steps to earn up to $575 total.",
    formFields: [
      { name: "firstName", label: "First name", type: "text", required: true, half: true },
      { name: "lastName", label: "Last name", type: "text", required: true, half: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "phone", label: "Phone", type: "tel", half: true },
      { name: "zip", label: "ZIP code", type: "text", required: true, half: true },
      { name: "age", label: "Age", type: "number" },
      {
        name: "interest",
        label: "Interest",
        type: "select",
        options: ["Army Reserve", "Active Duty Enlisted", "National Guard", "Officer / ROTC / OCS"],
      },
      {
        name: "education",
        label: "Education level",
        type: "select",
        options: ["High School (in progress)", "High School Diploma / GED", "Some College", "Associate's Degree", "Bachelor's Degree", "Graduate Degree"],
      },
      { name: "notes", label: "Questions or notes", type: "textarea" },
    ],
    submitLabel: "Submit & Earn $50 in Your FanPact Account",
    formFootnotes: [
      "By submitting, you consent to USAREC contacting you about Army opportunities. See full privacy notice at recruiting.army.mil.",
      "1-888-550-ARMY (2769)",
      "Recruiter follow-up within 24-48 hours.",
    ],
  },

  "merrill-lynch": {
    slug: "merrill-lynch",
    name: "Merrill Lynch",
    shortName: "Merrill Lynch",
    badge: "Official Enterprise Partner",
    headline: "Turn the Grocery Run Into College Savings.",
    subheadline: "Every purchase funds the team. Every purchase can fund the future.",
    body: "FanPact community contributions can route directly to a linked Merrill Lynch 529 account. The same purchase that supports your child's program today builds their college savings for tomorrow.",
    primaryCta: "Start Your Free Consultation",
    creditBadge: "Earn up to $475 in community credits",
    heroImage:
      "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=2400&q=80",
    heroAlt: "Family celebrating a graduation outdoors at sunset",
    steps: [
      {
        label: "Step 1",
        title: "Schedule Your Consultation",
        body: "Book a free, no-obligation 529 college savings consultation with a Merrill Lynch advisor. Learn how tax-advantaged savings can work alongside your FanPact community contributions.",
        credit: "$75 Community Credit",
      },
      {
        label: "Step 2",
        title: "Attend Your Consultation",
        body: "Meet with your Merrill Lynch advisor by phone, video, or in person. Review your college savings timeline, contribution options, and how FanPact credits can flow directly into your 529.",
        credit: "$150 Community Credit",
      },
      {
        label: "Step 3",
        title: "Open Your 529 Account",
        body: "Open a Merrill Lynch 529 account and link it to your FanPact wallet. From that point forward your FanPact community contributions can route automatically to your child's college savings.",
        credit: "$250 Community Credit + 529 routing activated",
      },
    ],
    totalCredits: "$475 total potential community credits",
    creditsDisclaimer: STEP_CREDIT_DISCLAIMER_MERRILL,

    middleSectionTitle: "Why a 529 Plan?",
    middleSectionSubhead:
      "The most powerful college savings vehicle available — and most families don't have one yet.",
    benefits: [
      { Icon: TrendingUp, title: "Tax-Free Growth", body: "Contributions grow income tax-free inside the account." },
      { Icon: PiggyBank, title: "Tax-Free Withdrawals", body: "Withdrawals are tax-free when used for qualified education expenses including tuition, room and board, and books." },
      { Icon: Calendar, title: "Flexible Contributions", body: "Contribute up to $19,000 per year per beneficiary (2026 gift tax limit)." },
      { Icon: School, title: "Use at Any School", body: "Funds apply at any accredited college, university, or vocational school in the US." },
      { Icon: LandPlot, title: "State Tax Benefits", body: "Many states offer additional state income tax deductions for contributions." },
      { Icon: ArrowUpRight, title: "FanPact Integration", body: "Link your 529 to your FanPact wallet and route community credits directly to college savings." },
    ],
    benefitsCalloutBody:
      "The average youth sports family spends $2,000+ per year on participation costs. A Merrill Lynch 529 linked to FanPact means every household purchase works twice — funding the program today and college tomorrow.",

    formTitle: "Schedule Your Free 529 Consultation",
    formBody:
      "No obligation. No minimum investment. Just a conversation about your family's college savings goals.",
    formCreditCallout: "$75 Community Credit — Step 1 of 3 toward $475 total.",
    formFields: [
      { name: "firstName", label: "First name", type: "text", required: true, half: true },
      { name: "lastName", label: "Last name", type: "text", required: true, half: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "phone", label: "Phone", type: "tel", half: true },
      { name: "zip", label: "ZIP code", type: "text", required: true, half: true },
      { name: "childAge", label: "Child's current age", type: "number" },
      { name: "yearsUntilCollege", label: "Estimated years until college", type: "number" },
      { name: "has529", label: "Do you currently have a 529 plan?", type: "radio", options: ["Yes", "No"] },
      {
        name: "contactMethod",
        label: "Preferred contact method",
        type: "select",
        options: ["Phone", "Video", "In-person"],
      },
      { name: "notes", label: "Questions or notes", type: "textarea" },
    ],
    submitLabel: "Schedule Consultation & Claim $75 Credit",
    formFootnotes: [
      "A Merrill Lynch advisor will contact you within 2 business days to schedule your free consultation.",
      "Merrill Lynch, Pierce, Fenner & Smith Incorporated. Member SIPC.",
    ],
  },

  "state-farm": {
    slug: "state-farm",
    name: "State Farm",
    shortName: "State Farm",
    badge: "Official Enterprise Partner",
    headline: "Your Neighbor. Your Agent. Your Coverage.",
    subheadline:
      "State Farm agents are community members — they coach teams, attend games, and know your family by name.",
    body: "State Farm has invested over $157 million in community programs over 25 years. The Good Neighbor model is not marketing — it is how State Farm agents actually live and work in the communities they serve.",
    primaryCta: "Get Your Free Review",
    creditBadge: "Earn up to $450 in community credits",
    heroImage:
      "https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=2400&q=80",
    heroAlt: "Neighborhood family on a residential street at golden hour",
    steps: [
      {
        label: "Step 1",
        title: "Request a Free Quote",
        body: "Get a free, no-obligation insurance quote or review for your family. Auto, home, life, or all three — your local State Farm agent will assess your current coverage and identify any gaps.",
        credit: "$50 Community Credit",
      },
      {
        label: "Step 2",
        title: "Complete Your Review",
        body: "Meet with your local State Farm agent for a full insurance review. Youth sports families have specific coverage considerations — vehicles used for travel tournaments, equipment, liability at events — your agent understands your situation.",
        credit: "$150 Community Credit",
      },
      {
        label: "Step 3",
        title: "Switch to State Farm",
        body: "Move one or more policies to State Farm and activate your ongoing Good Neighbor community contribution — a percentage of your premium supports the community fund through your FanPact account.",
        credit: "$250 Community Credit + ongoing community contribution activated",
      },
    ],
    totalCredits: "$450 total potential community credits",
    creditsDisclaimer: STEP_CREDIT_DISCLAIMER_STATEFARM,

    middleSectionTitle: "Coverage Built for Sports Families",
    middleSectionSubhead:
      "Youth sports families have insurance needs that go beyond the standard policy checklist.",
    benefits: [
      { Icon: Car, title: "Auto", body: "Multiple vehicles, tournament travel, and teen drivers covered under one policy." },
      { Icon: Home, title: "Home & Renters", body: "Equipment, gear, and personal property protection." },
      { Icon: Heart, title: "Life", body: "Protect your family's future with affordable term and whole life options." },
      { Icon: Umbrella, title: "Umbrella", body: "Extra liability protection for sports events, travel, and community activities." },
      { Icon: Activity, title: "Health Supplements", body: "Accident and supplemental health coverage for active young athletes." },
      { Icon: Users, title: "Local Agent", body: "Work directly with an agent in your community — not a call center." },
    ],
    benefitsCalloutBody:
      "State Farm's Hoops in the Hood program has connected 30,000 at-risk youth with basketball and educational programming. The Good Neighbor model extends naturally into every youth sports community FanPact serves.",

    formTitle: "Request Your Free Coverage Review",
    formBody:
      "Your local State Farm agent will contact you within 24 hours to schedule your free, no-obligation review.",
    formCreditCallout: "$50 Community Credit — Step 1 of 3 toward $450 total.",
    formFields: [
      { name: "firstName", label: "First name", type: "text", required: true, half: true },
      { name: "lastName", label: "Last name", type: "text", required: true, half: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "phone", label: "Phone", type: "tel", half: true },
      { name: "zip", label: "ZIP code", type: "text", required: true, half: true },
      {
        name: "coverage",
        label: "Coverage interest",
        type: "checkbox-group",
        options: ["Auto", "Home/Renters", "Life", "Umbrella", "Health Supplement", "Not sure — need advice"],
      },
      { name: "currentProvider", label: "Current insurance provider (optional)", type: "text" },
      { name: "vehicles", label: "Number of vehicles in household", type: "number", half: true },
      { name: "ownRent", label: "Do you own or rent your home?", type: "radio", options: ["Own", "Rent"] },
      { name: "notes", label: "Questions or notes", type: "textarea" },
    ],
    submitLabel: "Request Review & Claim $50 Credit",
    formFootnotes: [
      "State Farm is a committed member of your community and welcomes the opportunity to review your family's coverage needs.",
      "Local agent follow-up within 24 hours.",
    ],
  },
  "edward-jones": {
    slug: "edward-jones",
    name: "Edward Jones",
    shortName: "Edward Jones",
    badge: "Premier Enterprise Partner",
    headline: "Building Futures, One Relationship at a Time.",
    subheadline:
      "From your child's first 529 contribution to an athlete's NIL retirement strategy — Edward Jones advisors are in your community, built for your goals.",
    body: "With 19,000 financial advisors nationwide, $2.2 trillion in assets under management, and Sports and Entertainment certified advisors who specialize in athlete wealth management, Edward Jones is the financial partner built for every stage of the FanPact community.",
    primaryCta: "Schedule Your Free Consultation",
    creditBadge: "Earn up to $500 in community credits",
    heroImage:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=2400&q=80",
    heroAlt: "Financial advisor meeting with a family in a professional office",
    steps: [
      {
        label: "Step 1",
        title: "Schedule Your Consultation",
        body: "Book a free, no-obligation consultation with a local Edward Jones financial advisor. Whether you are a youth sports parent planning for college, a student athlete managing NIL income, or a fan building a retirement account — your advisor meets you where you are.",
        credit: "$75 Community Credit",
      },
      {
        label: "Step 2",
        title: "Meet Your Advisor",
        body: "Complete your first meeting with your Edward Jones advisor. Review your financial goals — 529 education savings, NIL income management, IRA or Roth IRA setup, or a broader wealth strategy. Your advisor builds a personalized plan around your timeline and goals.",
        credit: "$175 Community Credit",
      },
      {
        label: "Step 3",
        title: "Open Your Account",
        body: "Open an Edward Jones account — 529 education savings, traditional or Roth IRA, brokerage account, or NIL wealth management account — and link it to your FanPact wallet. FanPact community credits can route directly to your designated Edward Jones account from that point forward.",
        credit: "$250 Community Credit + account routing activated",
      },
    ],
    totalCredits: "$500 total potential community credits",
    creditsDisclaimer:
      "Credits release upon verified completion of each step through Edward Jones advisor confirmation. Step 2 and Step 3 credits require advisor verification.",

    middleSectionTitle: "Why Edward Jones",
    middleSectionSubhead:
      "A personal advisor for every stage of life — from the first 529 deposit to NIL wealth planning and retirement.",
    benefits: [
      { Icon: Users, title: "19,000+ Advisors", body: "A local advisor near you — not a call center." },
      { Icon: TrendingUp, title: "$2.2T Under Management", body: "Decades of disciplined, long-term investment strategy." },
      { Icon: Trophy, title: "Sports & Entertainment Certified", body: "Advisors who specialize in athlete wealth management." },
      { Icon: PiggyBank, title: "529 Education Savings", body: "Tax-free college savings linked directly to your FanPact wallet." },
      { Icon: Shield, title: "Career Transition Planning", body: "Roadmaps for life after athletics — wealth preservation and income strategy." },
      { Icon: ArrowUpRight, title: "FanPact Routing", body: "Route community credits straight into 529, IRA, Roth, or brokerage accounts." },
    ],
    benefitsCalloutBody:
      "FanPact community credits earned through household purchases can route to any linked Edward Jones account — 529, IRA, Roth IRA, or brokerage — automatically at settlement.",

    audienceSection: {
      title: "One Platform. Every Stage of Life.",
      subhead:
        "Edward Jones serves every member of the FanPact community — from the youngest athlete to the most loyal fan.",
      cards: [
        {
          accent: "#BA7517",
          Icon: GraduationCap,
          title: "529 College Savings",
          body: "Start your child's college savings today. Edward Jones 529 plans grow tax-free and withdraw tax-free for qualified education expenses. Link your 529 to your FanPact wallet and every qualifying household purchase contributes automatically to college savings. The grocery run funds the team and the future simultaneously.",
          pills: ["Tax-Free Growth", "Any Accredited School", "FanPact Integrated"],
        },
        {
          accent: "#1A7A4A",
          Icon: Trophy,
          title: "NIL Income to Retirement",
          body: "NIL income is taxable income. Without a plan, most of it disappears to taxes and lifestyle spending. Edward Jones Sports and Entertainment certified advisors help student athletes route NIL earnings into Roth IRAs, traditional IRAs, and investment accounts before the earning window closes. A student athlete who invests $10,000 in NIL income at 19 in a Roth IRA has decades of tax-free compounding ahead. FanPact community contributions can route directly to a designated athlete investment account.",
          pills: ["Roth IRA Setup", "NIL Tax Strategy", "Sports-Certified Advisor", "FanPact Routing"],
        },
        {
          accent: "#1F5C8B",
          Icon: Users,
          title: "Investment & Retirement Accounts",
          body: "Every FanPact fan who opens an Edward Jones brokerage, IRA, or retirement account can link it to their FanPact wallet. Community credits earned through household purchases can route to your investment account rather than a cash disbursement — putting your everyday spending to work in the market. Edward Jones advisors work with you on asset allocation, risk tolerance, and a long-term wealth strategy built around your goals.",
          pills: ["IRA & Roth IRA", "Brokerage Account", "Community Credits to Investments", "Retirement Planning"],
        },
        {
          accent: "#5C3D7A",
          Icon: Shield,
          title: "Career Transition Planning",
          body: "The transition out of athletics is one of the highest-risk financial moments in a young person's life. Edward Jones advisors with Sports and Entertainment certification specialize in the unique challenges athletes face — irregular income history, short earning windows, and the psychological transition from athlete to professional. Career transition planning with an Edward Jones advisor creates a financial roadmap for life after athletics.",
          pills: ["Sports-Certified Advisor", "Wealth Preservation", "Estate Considerations", "Long-Term Income Strategy"],
        },
      ],
    },

    educationSection: {
      title: "Financial Literacy for Athletes and Families",
      subhead:
        "Edward Jones is committed to helping athletes, families, and fans understand and build their financial futures.",
      cards: [
        { tag: "Monthly Workshops", title: "NIL Income Management", body: "NIL income, budgeting basics, and tax preparation workshops for student athletes and their families." },
        { tag: "Quarterly Seminars", title: "Investment Fundamentals", body: "Introduction to investing, retirement planning, and wealth building strategies for athletes and community members at every income level." },
        { tag: "On-Demand Resources", title: "Protecting Your NIL", body: "Contract review basics, insurance considerations, and financial protection strategies for student athletes managing NIL relationships." },
        { tag: "1-on-1 Consultations", title: "529 and College Savings Planning", body: "Personalized college savings planning for youth sports families — linking FanPact commerce contributions to tax-advantaged education accounts." },
      ],
    },

    accountTypesSection: {
      title: "Every Account Type. One Advisor.",
      subhead:
        "Edward Jones offers the full spectrum of financial accounts — all linkable to your FanPact wallet.",
      items: [
        { title: "529 Education Savings", body: "Tax-free college savings linked to FanPact community credits." },
        { title: "Traditional IRA", body: "Tax-deferred retirement savings for fans and athletes." },
        { title: "Roth IRA", body: "Tax-free retirement growth — ideal for NIL earners at the start of their earning window." },
        { title: "Brokerage Account", body: "Flexible investment account with access to stocks, bonds, mutual funds, and ETFs." },
        { title: "Custodial Account", body: "Invest on behalf of a minor youth athlete — starts building wealth from the first season." },
        { title: "401k Rollover", body: "Roll existing retirement accounts into an Edward Jones managed portfolio with your advisor." },
      ],
      callout:
        "FanPact community credits earned through household purchases can route to any linked Edward Jones account — 529, IRA, Roth IRA, or brokerage — automatically at settlement. The grocery run becomes a retirement contribution. The pet food order funds college. Every purchase works harder.",
    },

    complianceNote: {
      title: "Building Financial Futures Responsibly",
      body: "All Edward Jones programming complies with NCAA NIL guidelines, applicable state regulations, and institutional policies. Edward Jones financial education initiatives are designed to benefit athletes, families, and community members at every income level — not only those with existing NIL arrangements. Edward Jones advisors hold industry-leading credentials including the Sports and Entertainment Accredited Wealth Management Advisor designation for athlete-specific financial planning.",
    },

    statsBar: [
      "19,000+ Financial Advisors Nationwide",
      "$2.2 Trillion Assets Under Management",
      "9 Million+ Clients Served",
      "Sports & Entertainment Certified Advisors",
    ],

    formTitle: "Schedule Your Free Consultation",
    formBody:
      "A local Edward Jones financial advisor will contact you within one business day to schedule your free, no-obligation consultation.",
    formCreditCallout: "$75 Community Credit — Step 1 of 3 toward $500 total.",
    formFields: [
      { name: "firstName", label: "First name", type: "text", required: true, half: true },
      { name: "lastName", label: "Last name", type: "text", required: true, half: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "phone", label: "Phone", type: "tel", half: true },
      { name: "zip", label: "ZIP code", type: "text", required: true, half: true },
      {
        name: "audience",
        label: "I am a",
        type: "select",
        options: [
          "Youth Sports Parent",
          "Student Athlete with NIL Income",
          "Fan or Community Supporter",
          "Post-College Athlete",
          "Other",
        ],
      },
      {
        name: "goal",
        label: "Primary financial goal",
        type: "select",
        options: [
          "529 College Savings",
          "NIL Income Management",
          "IRA or Retirement Account",
          "General Investment Account",
          "Career Transition Planning",
          "Not sure — need guidance",
        ],
      },
      { name: "hasAdvisor", label: "Do you currently work with a financial advisor?", type: "radio", options: ["Yes", "No"] },
      { name: "contactMethod", label: "Preferred contact method", type: "select", options: ["Phone", "Video", "In-person at local branch"] },
      { name: "notes", label: "Questions or notes", type: "textarea" },
    ],
    submitLabel: "Schedule Consultation & Claim $75 Credit",
    formFootnotes: [
      "Edward Jones financial advisors hold industry-leading credentials and serve clients across every income level.",
      "edwardjones.com  |  Local advisor follow-up within 1 business day.",
      "Edward Jones, Member SIPC.",
    ],
  },
};

export function getEnterprisePartner(slug: string): EnterprisePartner | null {
  if (
    slug === "usarec" ||
    slug === "merrill-lynch" ||
    slug === "state-farm" ||
    slug === "edward-jones"
  ) {
    return ENTERPRISE_PARTNERS[slug];
  }
  return null;
}

// Brand icon per partner (used in hero label/cta)
export { Star, Building2, LineChart, BookOpen };
