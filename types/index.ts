// types/index.ts
export interface GalleryItem {
  id: string;
  imageUrl: string;
  alt: string;
  description: string;
}

export interface FeatureItem {
  id: string;
  icon: string;
  title: string;
  description?: string;
}
