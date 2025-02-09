export default interface ImageProps {
  asset_id: string;
  width: number;
  height: number;
  format: string;
  tags?: string[]; // Array of strings
  alt?: string;
  title?: string;
  context?: {
    alt: string;
    title: string;
  };
}
