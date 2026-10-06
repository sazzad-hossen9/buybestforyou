import Link from 'next/link';
import { SafeImage } from '@/components/ui/SafeImage';
import { Clock, Calendar, ArrowRight } from 'lucide-react';
import type { BlogPost } from '@/types';

interface PostCardProps {
  post: BlogPost;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="group card bg-white border border-[#E4E7EB] rounded-[16px] overflow-hidden hover:border-[#8A929C] hover:shadow-sm transition-all flex flex-col justify-between">
      <div>
        {/* Post Image */}
        <div className="relative aspect-16/10 bg-[#F6F7F9] overflow-hidden border-b border-[#E4E7EB]">
          <SafeImage
            src={post.heroImage || '/images/placeholder.jpg'}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[12px] font-bold bg-white/95 text-[#1A1D21] shadow-xs backdrop-blur-xs">
              {post.categoryName}
            </span>
          </div>
        </div>

        {/* Post Info */}
        <div className="p-5">
          <div className="flex items-center gap-2 text-caption text-[12px] text-[#5B6470] mb-2.5">
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

          <h3 className="font-bold text-[18px] text-[#1A1D21] group-hover:text-[#B84A14] transition-colors leading-snug mb-2.5">
            <Link href={`/blog/${post.slug}`}>
              {post.title}
            </Link>
          </h3>

          <p className="text-[14px] leading-[22px] text-[#5B6470] line-clamp-2">
            {post.excerpt || post.subtitle}
          </p>
        </div>
      </div>

      <div className="p-5 pt-0 mt-auto">
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-1.5 text-[14px] font-bold text-[#B84A14] group-hover:underline"
        >
          <span>Read more</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </article>
  );
}
