import Link from 'next/link';
import { SafeImage } from '@/components/ui/SafeImage';
import { Clock, Calendar, ArrowRight } from 'lucide-react';
import type { BlogPost } from '@/types';

interface PostCardProps {
  post: BlogPost;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="group bg-white border border-border rounded-[var(--r-card)] overflow-hidden hover:border-border-strong hover:shadow-sm transition-all flex flex-col justify-between">
      <div>
        {/* Post Image */}
        <div className="relative w-full h-[180px] overflow-hidden bg-surface-muted border-b border-border">
          <SafeImage
            src={post.heroImage || '/images/placeholder.jpg'}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[12px] font-bold bg-white text-ink shadow-xs">
              {post.categoryName}
            </span>
          </div>
        </div>

        {/* Post Info */}
        <div className="p-5">
          <div className="flex items-center gap-2 text-[length:var(--fs-caption)] leading-[var(--lh-caption)] text-[12px] text-muted mb-2.5">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {post.updatedDate}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {post.readTimeMinutes} min read
            </span>
          </div>

          <h3 className="font-bold text-[18px] text-ink group-hover:text-cta transition-colors leading-snug mb-2.5">
            <Link href={`/blog/${post.slug}`}>
              {post.title}
            </Link>
          </h3>

          <p className="text-[14px] leading-[22px] text-muted line-clamp-2">
            {post.excerpt || post.subtitle}
          </p>
        </div>
      </div>

      <div className="p-5 pt-0 mt-auto">
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-1.5 text-[14px] font-bold text-cta group-hover:underline"
        >
          <span>Read more</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </article>
  );
}
