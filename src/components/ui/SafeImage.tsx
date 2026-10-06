'use client';

import { useState } from 'react';
import Image, { ImageProps } from 'next/image';

interface SafeImageProps extends Omit<ImageProps, 'onError'> {
  fallbackSrc?: string;
}

export function SafeImage({
  src,
  alt,
  fallbackSrc = '/images/cat-automotive.svg',
  className = '',
  unoptimized = true,
  ...props
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false);

  const resolvedSrc = typeof src === 'string' && src.startsWith('/images/') && src.endsWith('.jpg')
    ? src.replace('.jpg', '.svg')
    : src;

  return (
    <Image
      {...props}
      unoptimized={unoptimized}
      src={hasError ? fallbackSrc : resolvedSrc}
      alt={alt || 'Product or category visual representation'}
      className={className}
      onError={() => {
        setHasError(true);
      }}
    />
  );
}
