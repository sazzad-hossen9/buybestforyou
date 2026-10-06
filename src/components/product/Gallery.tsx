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
    <div className="flex flex-col gap-3">
      {/* Main Image */}
      <div className="relative aspect-4/3 rounded-[16px] bg-white border border-[#E4E7EB] overflow-hidden shadow-xs">
        <SafeImage
          src={activeImage}
          alt={`${productName} view ${selectedIndex + 1}`}
          fill
          className="object-contain p-4 transition-all duration-300"
          priority
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex items-center gap-2.5 overflow-x-auto pb-1">
          {images.map((img, idx) => {
            const isSelected = idx === selectedIndex;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedIndex(idx)}
                className={`relative w-16 h-16 rounded-[12px] bg-white border overflow-hidden shrink-0 transition-all ${
                  isSelected
                    ? 'border-[#B84A14] ring-2 ring-[#B84A14]/30'
                    : 'border-[#E4E7EB] hover:border-[#8A929C] opacity-75 hover:opacity-100'
                }`}
                aria-label={`View image ${idx + 1}`}
              >
                <SafeImage
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
