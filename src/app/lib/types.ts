export interface CloudinaryResourceProps {
  id: number;
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
    caption: string;
  };
  aspect_ratio: number;
}

export interface ImageProps {
  id: number;
  asset_id: string;
  width: number;
  height: number;
  tags?: string[];
  alt?: string;
  caption?: string;
  public_id: string;
  format: string;
  aspectRatio: number;
}

export interface PhotoGalleryProps {
  images: ImageProps[];
  selectedTag: string | undefined;
}

export interface PhotoProps {
  image: ImageProps;
  index: number;
}

export interface TagFiltersProps {
  allTags: string[];
  selectedTag?: string | null;
}
