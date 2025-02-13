"use client";

import { useCallback, useState, useTransition, memo } from "react";
import { useRouter } from "next/navigation";
import { type TagFiltersProps } from "@/app/lib/types";

const TagButton = memo(
  ({
    tag,
    isSelected,
    onClick,
  }: {
    tag: string;
    isSelected: boolean;
    onClick: (tag: string) => void;
  }) => (
    <button
      onClick={() => onClick(tag)}
      aria-pressed={isSelected}
      className={`
      relative px-4 min-w-11 py-2 text-sm rounded-full transition-all
      ${
        isSelected
          ? "bg-[#18181B] text-white"
          : "bg-[#F4F4F5] hover:bg-[#E4E4E7]"
      }
    `}
    >
      {tag}
    </button>
  )
);

TagButton.displayName = "TagButton";

const TagFilters = memo(({ allTags, selectedTag }: TagFiltersProps) => {
  const router = useRouter();
  const [optimisticSelectedTag, setOptimisticSelectedTag] =
    useState(selectedTag);
  const [, startTransition] = useTransition();

  const handleTagClick = useCallback(
    (tag: string) => {
      const newTag = optimisticSelectedTag === tag ? null : tag;
      setOptimisticSelectedTag(newTag);

      startTransition(() => {
        if (newTag === null) {
          router.push("/", { scroll: false });
        } else {
          router.push(`?tag=${encodeURIComponent(tag)}`, { scroll: false });
        }
      });
    },
    [optimisticSelectedTag, router]
  );

  const handleAllClick = useCallback(() => {
    setOptimisticSelectedTag(null);
    startTransition(() => {
      router.push("/", { scroll: false });
    });
  }, [router]);

  return (
    <div className="sticky top-0 z-2 bg-white py-4">
      <ul
        className="relative flex flex-wrap justify-center gap-2"
        role="tablist"
        aria-label="Filter posts by tag"
      >
        <button
          onClick={handleAllClick}
          aria-pressed={optimisticSelectedTag === null}
          className={`
            relative px-4 min-w-11 py-2 text-sm rounded-full transition-all
            ${
              !optimisticSelectedTag
                ? "bg-[#18181B] text-white"
                : "bg-[#F4F4F5] hover:bg-[#E4E4E7]"
            }
          `}
        >
          All
        </button>
        {allTags.map((tag) => (
          <TagButton
            key={tag}
            tag={tag}
            isSelected={optimisticSelectedTag === tag}
            onClick={handleTagClick}
          />
        ))}
      </ul>
    </div>
  );
});

TagFilters.displayName = "TagFilters";

export default TagFilters;
