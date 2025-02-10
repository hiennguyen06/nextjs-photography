export interface CloudinaryResourceProps {
  asset_id: string;
  width: number;
  height: number;
  format: string;
  tags?: string[]; // Array of strings
  alt?: string;
  title?: string;
  public_id: string;
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
  public_id: string;
  format: string;
}

export interface PhotoGalleryProps {
  images: ImageProps[];
}

export interface PhotoProps {
  image: ImageProps;
  index: number;
}
