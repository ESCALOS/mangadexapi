import React, { useEffect, useState, useRef, useCallback } from 'react';
import axios from 'axios';

interface ChapterData {
  baseUrl: string;
  chapter: {
    hash: string;
    data: string[];
  };
}

interface ChapterImagesProps {
  chapterId: string;
}

const ChapterImages: React.FC<ChapterImagesProps> = ({ chapterId }) => {
  const [images, setImages] = useState<string[]>([]);
  const [loadedImages, setLoadedImages] = useState<number>(3); // Imágenes cargadas inicialmente
  const [baseUrl, setBaseUrl] = useState<string>('');
  const [hash, setHash] = useState<string>('');
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!chapterId) return;

    const fetchChapterData = async () => {
      try {
        const response = await axios.get<ChapterData>(
          `https://api.mangadex.org/at-home/server/${chapterId}`
        );
        setBaseUrl(response.data.baseUrl);
        setHash(response.data.chapter.hash);
        setImages(response.data.chapter.data);
      } catch (error) {
        console.error('Error fetching chapter images:', error);
      }
    };

    fetchChapterData();
  }, [chapterId]);

  // Manejar la carga dinámica de imágenes
  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && loadedImages < images.length) {
        setLoadedImages((prev) => Math.min(prev + 3, images.length));
      }
    },
    [loadedImages, images.length]
  );

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    });

    const { current: currentObserver } = observerRef;

    if (loadMoreRef.current) {
      currentObserver.observe(loadMoreRef.current);
    }

    return () => {
      if (currentObserver) currentObserver.disconnect();
    };
  }, [handleIntersect]);

  return (
    <div className='flex flex-wrap gap-4 max-w-5xl mx-auto'>
      {images.slice(0, loadedImages).map((imageName, index) => (
        <img
          key={index}
          src={`${baseUrl}/data/${hash}/${imageName}`}
          alt={`Page ${index + 1}`}
          loading="lazy"
          className="w-full mb-4"
        />
      ))}
      {/* Div oculto para observar y cargar más imágenes */}
      <div ref={loadMoreRef} style={{ height: '1px' }} />
    </div>
  );
};

export default ChapterImages;
