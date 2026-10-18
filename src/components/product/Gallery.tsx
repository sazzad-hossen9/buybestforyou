'use client';

import { useState } from 'react';
import { SafeImage } from '@/components/ui/SafeImage';

interface GalleryProps {
  images: string[];
  productName: string;
}

export function Gallery({ images, productName }: GalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const activeImage = images[selectedIndex] || images[0] || '/images/placeholder.jpg';

  return (
    <div className="w-full flex flex-col items-center lg:items-start">
      {/* 520x520 Main Image Card */}
      <div className="w-full max-w-[520px] aspect-square rounded-[var(--r-banner)] bg-white border border-border shadow-[var(--sh-card)] flex flex-col items-center justify-between p-8 relative overflow-hidden">
        <div className="flex-1 w-full relative flex items-center justify-center min-h-0">
          <SafeImage
            src={activeImage}
            alt={`${productName} - view ${selectedIndex + 1}`}
            fill
            className="object-contain p-4 transition-all duration-300"
            priority
          />
        </div>
        <p className="text-[13px] leading-[18px] text-muted text-center pt-2 select-none">
          [Product image — Amazon product media]
        </p>
      </div>

      {/* Thumbnails Row: 72x72px, radius 12px, gap 8px, active 2px border ink */}
      {images.length > 1 && (
        <div className="flex items-center gap-2 mt-3.5 max-w-[520px] overflow-x-auto pb-1">
          {images.map((img, idx) => {
            const isSelected = idx === selectedIndex;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedIndex(idx)}
                className={`relative w-[72px] h-[72px] rounded-[12px] bg-white overflow-hidden shrink-0 transition-all cursor-pointer ${
                  isSelected
                    ? 'border-2 border-ink'
                    : 'border border-border hover:border-border-input opacity-80 hover:opacity-100'
                }`}
                aria-label={`View image ${idx + 1}`}
              >
                <SafeImage
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  className="object-contain p-1"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
