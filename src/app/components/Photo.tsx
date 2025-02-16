import Image from "next/image";
import { type PhotoProps } from "@/app/lib/types";
import { buildImageUrl } from "@/app/lib/utils";
import Link from "next/link";

const Photo = ({ image, index }: PhotoProps) => {
  const { id, title, alt, width, height, public_id, format } = image;

  const imageUrl = buildImageUrl(1280, public_id, format);
  return (
    <figure className="relative bg-neutral-200 w-full">
      <Link href={`/photos/${id}`} scroll={false}>
        <Image
          src={imageUrl}
          alt={alt || "Gallery image"}
          width={width}
          height={height}
          loading={`${index < 4 ? "eager" : "lazy"}`}
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
          priority={index < 4}
          crossOrigin="anonymous"
        />
        <figcaption className="sr-only">{title}</figcaption>
      </Link>
    </figure>
  );
};

export default Photo;
