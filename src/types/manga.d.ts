// src/types/manga.d.ts

export interface MangaTitle {
    en?: string;
    ja?: string;
    [key: string]: string | undefined;
  }
  
  export interface MangaAltTitle {
    [key: string]: string;
  }
  
  export interface MangaDescription {
    [languageCode: string]: string;
  }
  
  export interface MangaTagAttributes {
    name: {
      en: string;
      es:? string;
    };
    description: Record<string, unknown>;
    group: 'genre' | 'theme' | 'content' | 'format';
    version: number;
  }
  
  export interface MangaTag {
    id: string;
    type: 'tag';
    attributes: MangaTagAttributes;
  }
  
  export interface MangaAttributes {
    title: MangaTitle;
    altTitles: MangaAltTitle[];
    description: MangaDescription;
    isLocked: boolean;
    links: {
      [key: string]: string;
    };
    originalLanguage: string;
    lastVolume: string;
    lastChapter: string;
    publicationDemographic: string | null;
    status: 'completed' | 'ongoing' | 'hiatus' | 'cancelled';
    year: number;
    contentRating: 'suggestive' | 'erotica' | 'pornographic' | 'safe';
    tags: MangaTag[];
    state: 'published' | 'unpublished';
    chapterNumbersResetOnNewVolume: boolean;
    createdAt: string;
    updatedAt: string;
    version: number;
    availableTranslatedLanguages: string[];
    latestUploadedChapter: string;
  }
  
  export interface MangaData {
    id: string;
    type: 'manga';
    attributes: MangaAttributes;
    relationships: {
      id: string;
      type: 'author' | 'artist' | 'cover_art' | 'manga';
      related?: string;
    }[];
  }
  
  export interface MangaResponse {
    data: MangaData[];
  }
  