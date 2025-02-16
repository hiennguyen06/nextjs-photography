import getPhotos from "@/app/lib/getPhotos";
import { ImageProps } from "@/app/lib/types";
import { buildImageUrl } from "@/app/lib/utils";
import Image from "next/image";

const PhotoPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = Number.parseInt((await params).id);
  const images = await getPhotos();
  const currentImage = images.find((img: ImageProps) => img.id === id);
  const imageUrl = buildImageUrl(
    1536,
    currentImage.public_id,
    currentImage.format
  );
  return (
    <figure className="flex flex-col items-center overflow-hidden justify-center h-dvh">
      <Image
        src={imageUrl}
        alt={currentImage.public_id}
        width={currentImage.width}
        height={currentImage.height}
        className="object-contain w-full max-h-[75vh]"
        priority
      />
    </figure>
  );
};

export default PhotoPage;
