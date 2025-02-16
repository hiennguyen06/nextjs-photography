import { Modal } from "@/app/components/Modal";
import getPhotos from "@/app/lib/getPhotos";
import { buildImageUrl } from "@/app/lib/utils";
import { type ImageProps } from "@/app/lib/types";

const PhotoModal = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = Number.parseInt((await params).id);
  const images = await getPhotos();
  const currentImage = images.find((img: ImageProps) => img.id === id);

  const imageUrl = buildImageUrl(
    1280,
    currentImage.public_id,
    currentImage.format
  );

  return (
    <Modal imageUrl={imageUrl} images={images} currentImage={currentImage} />
  );
};

export default PhotoModal;
