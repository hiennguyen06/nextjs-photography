import { CloudinaryResourceProps } from "@/app/lib/types";

const getPhotos = async () => {
  // Implement caching using fetch with custom cache configuration
  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/resources/search`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(
          process.env.CLOUDINARY_API_KEY +
            ":" +
            process.env.CLOUDINARY_API_SECRET
        ).toString("base64")}`,
      },
      body: JSON.stringify({
        expression: `folder:${process.env.CLOUDINARY_FOLDER}`,
        sort_by: [{ created_at: "desc" }],
        max_results: 100,
        with_field: ["tags", "context"],
      }),
      next: {
        revalidate: 3600, // Cache for 1 hour
      },
    }
  );

  const results = await response.json();

  return results.resources.map(
    (resource: CloudinaryResourceProps, index: number) => ({
      id: index,
      asset_id: resource.asset_id,
      public_id: resource.public_id,
      width: resource.width,
      height: resource.height,
      format: resource.format,
      tags: resource.tags,
      alt: resource.context?.alt,
      title: resource.context?.title,
      aspectRatio: resource.aspect_ratio,
    })
  );
};

export default getPhotos;
