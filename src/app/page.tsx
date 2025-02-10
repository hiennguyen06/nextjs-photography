import cloudinary from "@/lib/cloudinary";
import { CloudinaryResourceProps } from "@/app/lib/types";
import Header from "@/app/components/Header";
import PhotoGallery from "@/app/components/PhotoGallery";

export default async function Home() {
  const images = await getPhotos();

  return (
    <main className="mx-auto max-w-screen-2xl px-4">
      <Header />
      <PhotoGallery images={images} />
    </main>
  );
}

async function getPhotos() {
  const results = await cloudinary.search
    .expression(`folder:${process.env.CLOUDINARY_FOLDER}`)
    .sort_by("created_at", "desc")
    .max_results(100)
    .with_field(["tags", "context"])
    .execute();

  return results.resources.map((resource: CloudinaryResourceProps) => {
    return {
      id: resource.asset_id,
      width: resource.width,
      height: resource.height,
      format: resource.format,
      tags: resource.tags,
      alt: resource.context?.alt,
      title: resource.context?.title,
    };
  });
}
