import { Modal } from "@/app/components/Modal";
import getPhotos from "@/app/lib/getPhotos";
import { buildImageUrl } from "@/app/lib/utils";
import { type ImageProps } from "@/app/lib/types";
import Image from "next/image";

const PhotoModal = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = Number.parseInt((await params).id);
  const images = await getPhotos();
  const currentImage = images.find((img: ImageProps) => img.id === id);
  console.log(images);

  const imageUrl = buildImageUrl(
    1280,
    currentImage.public_id,
    currentImage.format
  );

  return (
    <Modal images={images} currentImage={currentImage}>
      <figure className="relative overflow-hidden w-[auto] h-[auto] flex flex-col justify-center items-center">
        <Image
          src={imageUrl}
          alt={currentImage.public_id}
          width={currentImage.width}
          height={currentImage.height}
          className="object-contain w-full max-h-[90vh]"
          priority
        />
        <figcaption className="text-center text-sm text-gray-500">
          {currentImage.title || "Gallery image"}
        </figcaption>
      </figure>
    </Modal>
  );
};

export default PhotoModal;
