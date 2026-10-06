import {
  getCategories,
  getProducts,
  getReviews,
  getAuthors,
  getFaqs,
} from '@/lib/data';
import { Hero } from '@/components/home/Hero';
import { TrustStrip } from '@/components/home/TrustStrip';
import { CategoryCards } from '@/components/home/CategoryCards';
import { WinnersGrid } from '@/components/home/WinnersGrid';
import { HowWePick } from '@/components/home/HowWePick';
import { LatestGuides } from '@/components/home/LatestGuides';
import { EditorsRow } from '@/components/home/EditorsRow';
import { HomeFAQ } from '@/components/home/HomeFAQ';

export default async function HomePage() {
  const [categories, products, reviews, authors, faqs] = await Promise.all([
    getCategories(),
    getProducts(),
    getReviews(),
    getAuthors(),
    getFaqs('home'),
  ]);

  return (
    <>
      <Hero />
      <TrustStrip />
      <CategoryCards categories={categories} />
      <WinnersGrid products={products} />
      <HowWePick />
      <LatestGuides initialReviews={reviews} />
      <EditorsRow authors={authors} />
      <HomeFAQ faqs={faqs} />
    </>
  );
}
