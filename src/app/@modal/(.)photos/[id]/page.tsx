import { Modal } from "@/app/components/Modal";
import getPhotos from "@/app/lib/getPhotos";
import { buildImageUrl } from "@/app/lib/utils";
import { type ImageProps } from "@/app/lib/types";
import Image from "next/image";

const PhotoModal = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const images = await getPhotos();
  const image = images.find((img: ImageProps) => img.id === id);

  const imageUrl = buildImageUrl(1280, image.public_id, image.format);
  console.log(image);
  return (
    <Modal>
      <figure>
        <Image
          src={imageUrl}
          alt={image.alt || "Gallery image"}
          width={image.width}
          height={image.height}
        />
        <figcaption className="text-center text-sm text-gray-500">
          {image.title || "Gallery image"}
        </figcaption>
      </figure>
    </Modal>
  );
};

export default PhotoModal;
