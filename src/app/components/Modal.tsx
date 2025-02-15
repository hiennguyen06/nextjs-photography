"use client";

import { useCallback, useRef, useEffect, TouchEvent } from "react";
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
  const touchStart = useRef<number>(0);
  const touchStartY = useRef<number>(0);
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
    >
      <button
        type="button"
        className="p-4 self-start w-fit text-black"
        onClick={onDismiss}
        aria-label="Close modal"
      >
        <X size={24} />
      </button>
      <div
        ref={wrapper}
        className="relative w-full h-full flex justify-center items-center"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        role="region"
        aria-label="Image gallery navigation"
      >
        {children}
      </div>
    </div>
  );
}
