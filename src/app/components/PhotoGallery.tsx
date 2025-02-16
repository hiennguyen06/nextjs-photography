import { type PhotoGalleryProps } from "@/app/lib/types";
import Photo from "@/app/components/Photo";
import TagFilters from "@/app/components/TagFilters";

const PhotoGallery = ({ images, selectedTag }: PhotoGalleryProps) => {
  const allTags = Array.from(
    new Set(images.flatMap((image) => image.tags || []))
  );

  const filteredImages = selectedTag
    ? images.filter((image) => image.tags?.includes(selectedTag))
    : images;
  return (
    <section aria-labelledby="gallery-title">
      <h2 className="sr-only">Photography gallery</h2>
      <TagFilters allTags={allTags} selectedTag={selectedTag} />
      <ul
        role="list"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 select-none"
      >
        {filteredImages.map((image, index) => {
          return (
            <li role="listitem" key={image.id}>
              <Photo image={image} index={index} />
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default PhotoGallery;
