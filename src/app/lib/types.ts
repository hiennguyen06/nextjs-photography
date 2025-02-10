export interface CloudinaryResourceProps {
  asset_id: string;
  width: number;
  height: number;
  format: string;
  tags?: string[]; // Array of strings
  alt?: string;
  title?: string;
  context?: {
    alt: string;
    title: string;
  };
}

export interface ImageProps {
  id: string;
  width: number;
  height: number;
  tags?: string[];
  alt?: string;
  title?: string;
}

export interface PhotoGalleryProps {
  images: ImageProps[];
}
