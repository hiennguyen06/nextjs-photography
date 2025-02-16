"use client";
import { type PhotoGalleryProps } from "@/app/lib/types";
import Photo from "@/app/components/Photo";
import TagFilters from "@/app/components/TagFilters";
import Masonry from "react-masonry-css";

const PhotoGallery = ({ images, selectedTag }: PhotoGalleryProps) => {
  const allTags = Array.from(
    new Set(images.flatMap((image) => image.tags || []))
  );

  const filteredImages = selectedTag
    ? images.filter((image) => image.tags?.includes(selectedTag))
    : images;

  const breakpointColumns = {
    default: 3,
    1280: 3,
    768: 2,
    640: 1,
  };

  return (
    <section aria-labelledby="gallery-title">
      <h2 className="sr-only">Photography gallery</h2>
      <TagFilters allTags={allTags} selectedTag={selectedTag} />
      <Masonry breakpointCols={breakpointColumns} className="flex gap-4">
        {filteredImages.map((image, index) => (
          <figure key={image.id} className="mb-4">
            <Photo image={image} index={index} />
          </figure>
        ))}
      </Masonry>
    </section>
  );
};

export default PhotoGallery;
