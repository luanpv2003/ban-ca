'use client';

import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';

interface ProductImageProps {
  imageUrls: string[];
  title: string;
  discount: number;
}

export default function ProductImage({ imageUrls, title, discount }: ProductImageProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="space-y-4">
      {/* Main Carousel */}
      <div className="relative">
        <div className="overflow-hidden rounded-lg" ref={emblaRef}>
          <div className="flex">
            {imageUrls.map((url, index) => (
              <div key={index} className="flex-[0_0_100%] min-w-0">
                <div className="relative aspect-square bg-gray-100">
                  <Image
                    src={url}
                    alt={`${title} - Image ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={index === 0}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Discount Badge */}
        {discount > 0 && (
          <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg text-lg font-bold shadow-lg z-10">
            -{discount}%
          </div>
        )}

        {/* Navigation Arrows */}
        {imageUrls.length > 1 && (
          <>
            <button
              onClick={() => emblaApi?.scrollPrev()}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all z-10 focus:outline-none focus:ring-2 focus:ring-orange-500"
              aria-label={`Xem ảnh trước, hiện tại đang xem ảnh ${selectedIndex + 1} trong tổng số ${imageUrls.length} ảnh`}
              type="button"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => emblaApi?.scrollNext()}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all z-10 focus:outline-none focus:ring-2 focus:ring-orange-500"
              aria-label={`Xem ảnh tiếp theo, hiện tại đang xem ảnh ${selectedIndex + 1} trong tổng số ${imageUrls.length} ảnh`}
              type="button"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Dots Indicator */}
        {imageUrls.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10" role="tablist" aria-label="Chọn ảnh sản phẩm">
            {imageUrls.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`w-2 h-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-orange-500 ${index === selectedIndex
                  ? 'bg-white w-6'
                  : 'bg-white/50 hover:bg-white/75'
                  }`}
                aria-label={`Chuyển đến ảnh ${index + 1}`}
                aria-selected={index === selectedIndex}
                role="tab"
                type="button"
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnail Gallery */}
      {imageUrls.length > 1 && (
        <div className="grid grid-cols-4 gap-2" role="list" aria-label="Danh sách ảnh thu nhỏ">
          {imageUrls.map((url, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`relative aspect-square rounded-lg overflow-hidden bg-gray-100 border-2 transition-all focus:outline-none focus:ring-2 focus:ring-orange-500 ${selectedIndex === index
                ? 'border-orange-500 ring-2 ring-orange-200'
                : 'border-gray-200 hover:border-orange-300'
                }`}
              aria-label={`Xem ảnh ${index + 1} của ${title}`}
              aria-pressed={selectedIndex === index}
              type="button"
            >
              <Image
                src={url}
                alt=""
                fill
                className="object-cover"
                sizes="100px"
                role="presentation"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
