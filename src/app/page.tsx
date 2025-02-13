import Header from "@/app/components/Header";
import PhotoGallery from "@/app/components/PhotoGallery";
import getPhotos from "@/app/lib/getPhotos";
const Home = async ({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) => {
  const images = await getPhotos();
  const selectedTag = (await searchParams).tag;

  return (
    <main className="mx-auto max-w-screen-xl px-4">
      <Header />
      <PhotoGallery images={images} selectedTag={selectedTag} />
    </main>
  );
};

export default Home;
