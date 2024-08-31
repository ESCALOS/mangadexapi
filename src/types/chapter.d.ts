// chapter.d.ts
export interface ChapterAttributes {
    title: string;
    volume: string;
    chapter: string;
    translatedLanguage: string;
    createdAt: string;
    updatedAt: string;
    publishAt: string;
    readableAt: string;
    pages: number;
  }
  
  export interface ChapterData {
    id: string;
    type: 'chapter';
    attributes: ChapterAttributes;
  }
  