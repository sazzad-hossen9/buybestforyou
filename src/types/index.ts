export type PriceTier = 'Budget' | 'Mid' | 'Premium';

export interface NavDropdownItem {
  name: string;
  href: string;
  count?: number;
}

export interface NavItem {
  name: string;
  href: string;
  hasDropdown?: boolean;
  dropdownItems?: NavDropdownItem[];
}

export interface FooterColumn {
  title: string;
  links: { name: string; href: string; external?: boolean }[];
}

export interface SiteConfig {
  name: string;
  domain: string;
  tagline: string;
  description: string;
  affiliateDisclosureBar: {
    text: string;
    linkLabel: string;
    linkHref: string;
  };
  affiliateDisclosureFooter: {
    title: string;
    text: string;
    disclaimerLinkLabel: string;
    disclaimerLinkHref: string;
  };
  navigation: NavItem[];
  footerColumns: {
    usefulLinks: FooterColumn;
    product: FooterColumn;
    socialLinks: FooterColumn;
  };
  copyright: string;
  contactEmail: string;
}

export interface SubcategoryMeta {
  name: string;
  slug: string;
  count: number;
}

export interface Category {
  slug: string;
  name: string;
  dotColor: string;
  tintBg: string;
  accentBorder: string;
  description: string;
  subcategories: SubcategoryMeta[];
  mostSearched: string[];
  editorSlug: string;
  reviewCount: number;
  image: string;
}

export interface ProductScoreBreakdown {
  verifiedBuyerRatings: number;
  specMatchToClaims: number;
  expertLabCoverage: number;
  valueForPriceTier: number;
}

export interface BuyerTheme {
  theme: string;
  percentage: number;
  sentiment: 'positive' | 'mixed' | 'negative';
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  categorySlug: string;
  subcategoryName: string;
  priceTier: PriceTier;
  compositeScore: number;
  ratingCategory: string;
  scoreBreakdown: ProductScoreBreakdown;
  weights: {
    verifiedBuyerRatings: number;
    specMatchToClaims: number;
    expertLabCoverage: number;
    valueForPriceTier: number;
  };
  bestFor: string;
  shortDescription: string;
  quickVerdict: string;
  paragraphReview: string;
  pros: string[];
  cons: string[];
  skipIf?: string;
  buyerThemes: BuyerTheme[];
  specs: Record<string, string>;
  whoShouldBuy: {
    goodFit: string;
    lookElsewhere: string;
  };
  alternatives: {
    title: string;
    badge: string;
    score: number;
    tier: string;
    slug?: string;
  }[];
  images: string[];
  affiliateUrl: string;
  updatedDate: string;
  readTime: string;
  authorSlug: string;
}

export interface QuickAnswerPick {
  badge: string;
  productId: string;
  title: string;
  score: number;
  tier: string;
  summary: string;
}

export interface BuyingCriterion {
  title: string;
  description: string;
}

export interface ReviewRoundup {
  slug: string;
  title: string;
  categorySlug: string;
  categoryName: string;
  subcategoryName: string;
  guideType: 'Roundup' | 'Single review' | 'Buying guide';
  updatedDate: string;
  readTimeMinutes: number;
  authorSlug: string;
  quickAnswerSummary: string;
  quickAnswerPicks: QuickAnswerPick[];
  productIds: string[];
  buyingCriteria: BuyingCriterion[];
  methodNote: string;
  methodSources: string;
  faqs: { question: string; answer: string }[];
  featuredImage: string;
}

export interface BlogPostStep {
  stepNumber: number;
  title: string;
  content: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  subtitle: string;
  categorySlug: string;
  categoryName: string;
  tag: string;
  excerpt: string;
  updatedDate: string;
  readTimeMinutes: number;
  authorSlug: string;
  heroImage: string;
  shortAnswer: string;
  steps: BlogPostStep[];
  inlineProduct?: {
    label: string;
    name: string;
    score: number;
    tier: string;
    image: string;
    affiliateUrl: string;
  };
  commonMistakes: string[];
  affiliateDisclosureText: string;
}

export interface Author {
  slug: string;
  name: string;
  initials: string;
  role: string;
  avatarBg: string;
  persona: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  categorySlug?: string;
}

export interface LegalSection {
  id: string;
  title: string;
  content: string;
}

export interface LegalPage {
  slug: string;
  title: string;
  subtitle: string;
  lastUpdated: string;
  showAmazonCallout?: boolean;
  amazonCalloutText?: string;
  sections: LegalSection[];
}

export interface SearchIndexItem {
  id: string;
  title: string;
  slug: string;
  type: 'review' | 'product' | 'blog' | 'category';
  categorySlug: string;
  categoryName: string;
  categoryDot: string;
  excerpt: string;
  score?: number;
  url: string;
}
