const CLOUDINARY_BASE_URL = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;

export const buildImageUrl = (
  width: number,
  public_id: string,
  format: string
): string => {
  return `${CLOUDINARY_BASE_URL}/q_auto:eco,f_webp,c_fill,w_${width},dpr_auto/${public_id}.${format}`;
};
