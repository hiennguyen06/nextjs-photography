"use client";

import { useCallback, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { ImageProps } from "@/app/lib/types";

export function Modal({
  children,
  currentImage,
  images,
}: {
  children: React.ReactNode;
  currentImage: ImageProps;
  images: ImageProps[];
}) {
  const overlay = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const onDismiss = useCallback(() => {
    router.back();
  }, [router]);

  const navigateToImage = useCallback(
    (index: number) => {
      const newIndex = (index + images.length) % images.length;

      router.replace(`/photos/${newIndex}`, { scroll: false });
    },
    [images.length, router]
  );

  const onClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === overlay.current || e.target === wrapper.current) {
        if (onDismiss) onDismiss();
      }
    },
    [onDismiss]
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          onDismiss();
          break;
        case "ArrowRight":
          if (currentImage.id < images.length) {
            navigateToImage(currentImage.id + 1);
          }
          break;
        case "ArrowLeft":
          if (currentImage.id > 0) {
            navigateToImage(currentImage.id - 1);
          }
          break;
      }
    },
    [currentImage.id, images.length, navigateToImage, onDismiss]
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      ref={overlay}
      className="fixed inset-0 z-10 bg-white flex items-center justify-center"
      onClick={onClick}
    >
      <button
        type="button"
        className="absolute top-0 right-0 p-4 z-20 text-black"
        onClick={onDismiss}
        aria-label="Close modal"
      >
        <X size={24} />
      </button>
      <div
        ref={wrapper}
        className="relative w-full h-full flex justify-center items-center"
      >
        {children}
      </div>
    </div>
  );
}
