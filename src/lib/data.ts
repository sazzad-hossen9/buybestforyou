import fs from 'fs/promises';
import path from 'path';
import type {
  SiteConfig,
  Category,
  Product,
  ReviewRoundup,
  BlogPost,
  Author,
  FAQItem,
  LegalPage,
  SearchIndexItem
} from '@/types';

const DATA_DIR = path.join(process.cwd(), 'public', 'data');

async function readJsonFile<T>(filename: string, fallback: T): Promise<T> {
  try {
    const filePath = path.join(DATA_DIR, filename);
    const content = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(content) as T;
  } catch (error) {
    console.error(`[Data Layer] Error loading ${filename}:`, error);
    return fallback;
  }
}

export async function getSiteConfig(): Promise<SiteConfig> {
  return readJsonFile<SiteConfig>('site.json', {
    name: 'buybestforyou',
    domain: 'buybestforyou.com',
    tagline: 'Real research. Straight answers. No fluff.',
    description: 'Independent buying guides and reviews.',
    affiliateDisclosureBar: {
      text: 'As an Amazon Associate we earn from qualifying purchases. Rankings are never for sale.',
      linkLabel: 'How we make money',
      linkHref: '/legal/affiliate-disclosure'
    },
    affiliateDisclosureFooter: {
      title: 'AFFILIATE DISCLOSURE',
      text: 'BuyBestForYou.com is a participant in the Amazon Services LLC Associates Program. As an Amazon Associate, we earn from qualifying purchases at no additional cost to you.',
      disclaimerLinkLabel: 'Read full disclaimer →',
      disclaimerLinkHref: '/legal/affiliate-disclosure'
    },
    navigation: [],
    footerColumns: {
      usefulLinks: { title: 'USEFUL LINKS', links: [] },
      product: { title: 'PRODUCT', links: [] },
      socialLinks: { title: 'SOCIAL LINKS', links: [] }
    },
    copyright: '©2026 BuyBestForYou. All Rights Reserved.',
    contactEmail: 'info@buybestforyou.com'
  });
}

export async function getCategories(): Promise<Category[]> {
  return readJsonFile<Category[]>('categories.json', []);
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const categories = await getCategories();
  return categories.find((cat) => cat.slug === slug) ?? null;
}

export async function getProducts(): Promise<Product[]> {
  return readJsonFile<Product[]>('products.json', []);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const products = await getProducts();
  return products.find((prod) => prod.slug === slug) ?? null;
}

export async function getProductsByIds(ids: string[]): Promise<Product[]> {
  const products = await getProducts();
  return ids
    .map((id) => products.find((p) => p.id === id || p.slug === id))
    .filter((p): p is Product => Boolean(p));
}

export async function getReviews(): Promise<ReviewRoundup[]> {
  return readJsonFile<ReviewRoundup[]>('reviews.json', []);
}

export async function getReviewBySlug(slug: string): Promise<ReviewRoundup | null> {
  const reviews = await getReviews();
  return reviews.find((rev) => rev.slug === slug) ?? null;
}

export async function getReviewsByCategory(categorySlug: string): Promise<ReviewRoundup[]> {
  const reviews = await getReviews();
  return reviews.filter((rev) => rev.categorySlug === categorySlug);
}

export async function getPosts(): Promise<BlogPost[]> {
  return readJsonFile<BlogPost[]>('posts.json', []);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getPosts();
  return posts.find((p) => p.slug === slug) ?? null;
}

export async function getPostsByCategory(categorySlug: string): Promise<BlogPost[]> {
  const posts = await getPosts();
  return posts.filter((p) => p.categorySlug === categorySlug);
}

export async function getAuthors(): Promise<Author[]> {
  return readJsonFile<Author[]>('authors.json', []);
}

export async function getAuthorBySlug(slug: string): Promise<Author | null> {
  const authors = await getAuthors();
  return authors.find((a) => a.slug === slug) ?? null;
}

export async function getFaqs(key: 'home' | 'automotive' | 'paintPen'): Promise<FAQItem[]> {
  const allFaqs = await readJsonFile<Record<string, FAQItem[]>>('faqs.json', {});
  return allFaqs[key] ?? [];
}

export async function getLegalPage(slug: string): Promise<LegalPage | null> {
  const legalPages = await readJsonFile<Record<string, LegalPage>>('legal.json', {});
  return legalPages[slug] ?? null;
}

export async function getSearchIndex(): Promise<SearchIndexItem[]> {
  return readJsonFile<SearchIndexItem[]>('search-index.json', []);
}
