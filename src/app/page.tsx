import cloudinary from "@/lib/cloudinary";
import { CloudinaryResourceProps } from "@/app/lib/types";
import Header from "@/app/components/Header";
import PhotoGallery from "@/app/components/PhotoGallery";

const getPhotos = async () => {
  const results = await cloudinary.search
    .expression(`folder:${process.env.CLOUDINARY_FOLDER}`)
    .sort_by("created_at", "desc")
    .max_results(100)
    .with_field(["tags", "context"])
    .execute();

  return results.resources.map((resource: CloudinaryResourceProps) => {
    return {
      id: resource.asset_id,
      public_id: resource.public_id,
      width: resource.width,
      height: resource.height,
      format: resource.format,
      tags: resource.tags,
      alt: resource.context?.alt,
      title: resource.context?.title,
    };
  });
};

const Home = async () => {
  const images = await getPhotos();

  return (
    <main className="mx-auto max-w-screen-xl px-4">
      <Header />
      <PhotoGallery images={images} />
    </main>
  );
};

export default Home;
