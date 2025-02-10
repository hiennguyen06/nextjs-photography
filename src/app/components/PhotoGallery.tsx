import { PhotoGalleryProps } from "@/app/lib/types";

export default function PhotoGallery({ images }: PhotoGalleryProps) {
  console.log(images);
  return (
    <section aria-labelledby="gallery-title">
      <h2 className="sr-only">Photography gallery</h2>
      <ul>
        <li>
          <figure>
            <figcaption className="sr-only">Caption for the image</figcaption>
          </figure>
        </li>
      </ul>
    </section>
  );
}
