import { type PhotoGalleryProps } from "@/app/lib/types";
import Photo from "@/app/components/Photo";

const PhotoGallery = ({ images }: PhotoGalleryProps) => {
  console.log(images);
  return (
    <section aria-labelledby="gallery-title">
      <h2 className="sr-only">Photography gallery</h2>
      <ul className="grid g grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 select-none">
        {images.map((image, index) => {
          return (
            <li key={image.id}>
              <Photo image={image} index={index} />
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default PhotoGallery;
