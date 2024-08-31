// src/types/cover.d.ts

export interface CoverAttributes {
    description: string;
    volume: string | null;
    fileName: string;
    locale: string;
    createdAt: string;
    updatedAt: string;
    version: number;
  }
  
  export interface CoverRelationship {
    id: string;
    type: 'manga' | 'user';
  }
  
  export interface CoverData {
    id: string;
    type: 'cover_art';
    attributes: CoverAttributes;
    relationships: CoverRelationship[];
  }
  
  export interface CoverResponse {
    result: 'ok';
    response: 'collection';
    data: CoverData[];
    limit: number;
    offset: number;
    total: number;
  }
  