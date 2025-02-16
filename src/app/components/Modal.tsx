"use client";

import { useCallback, useRef, useEffect, TouchEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { ImageProps } from "@/app/lib/types";
import Image from "next/image";
export function Modal({
  currentImage,
  images,
  imageUrl,
}: {
  imageUrl: string;
  currentImage: ImageProps;
  images: ImageProps[];
}) {
  const overlay = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const touchStart = useRef<number>(0);
  const touchStartY = useRef<number>(0);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

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

  const handleTouchStart = (e: TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const touchDiffX = touchStart.current - touchEnd;
    const touchDiffY = touchStartY.current - touchEndY;

    // Minimum swipe distance thresholds (in pixels)
    const minSwipeDistance = 50;
    const minSwipeDownDistance = 100;

    // Check if the vertical swipe is more prominent than horizontal
    if (Math.abs(touchDiffY) > Math.abs(touchDiffX)) {
      // Handle vertical swipe
      if (touchDiffY < -minSwipeDownDistance) {
        // Swiped down
        onDismiss();
        return;
      }
    } else if (Math.abs(touchDiffX) > minSwipeDistance) {
      // Handle horizontal swipes
      if (touchDiffX > 0) {
        // Swiped left, go to next image
        if (currentImage.id < images.length) {
          navigateToImage(currentImage.id + 1);
        }
      } else {
        // Swiped right, go to previous image
        if (currentImage.id > 1) {
          navigateToImage(currentImage.id - 1);
        }
      }
    }
  };

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
      className="fixed inset-0 z-10 bg-white flex items-center justify-center flex-col"
      onClick={onClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <button
        type="button"
        className="absolute top-0 right-0 p-4 z-10 self-start w-fit text-black"
        onClick={onDismiss}
        aria-label="Close modal"
      >
        <X size={24} />
      </button>
      <figure
        ref={wrapper}
        className={`relative flex flex-col justify-center items-center transition-opacity duration-500 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        role="region"
        aria-label="Image gallery navigation"
      >
        <Image
          src={imageUrl}
          alt={currentImage.public_id}
          width={currentImage.width}
          height={currentImage.height}
          className="object-contain w-full max-h-[75vh]"
          priority
          onLoad={() => setIsLoading(false)}
        />
        {!isLoading && (
          <figcaption className="text-center text-sm text-gray-500">
            {currentImage.title || "Gallery image"}
          </figcaption>
        )}
      </figure>
    </div>
  );
}
