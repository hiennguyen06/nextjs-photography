import Image from "next/image";
import { type PhotoProps } from "@/app/lib/types";
import { buildImageUrl } from "@/app/lib/utils";

const Photo = ({ image, index }: PhotoProps) => {
  const { title, alt, width, height, public_id, format } = image;

  const imageUrl = buildImageUrl(1280, public_id, format);
  return (
    <figure>
      <Image
        src={imageUrl}
        alt={alt || "Gallery image"}
        width={width}
        height={height}
        loading={`${index < 8 ? "eager" : "lazy"}`}
        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
      />
      <figcaption className="sr-only">{title}</figcaption>
    </figure>
  );
};

export default Photo;
