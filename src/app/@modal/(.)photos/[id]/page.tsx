import { Modal } from "@/app/components/Modal";

const PhotoModal = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  return (
    <Modal>
      <div>
        <h1>Photo {id}</h1>
        <p>This is a photo</p>
      </div>
    </Modal>
  );
};

export default PhotoModal;
