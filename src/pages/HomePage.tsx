import { useEffect, useRef, useState } from "react";
import { type LpOrder } from "../apis/lp";
import { useLps } from "../hooks/lp/useLps";
import { useCreateLp } from "../hooks/comment/useCreateLp";
import { useCreateLpForm } from "../hooks/lp/useCreateLpForm";
import LpCard from "../components/LpCard";
import LpCardSkeleton from "../components/LpCardSkeleton";
import { ErrorMessage } from "../components/LoadingSpinner";
import Modal from "../components/Modal";
import { FALLBACK_IMAGE } from "../constants";

export default function Homepage() {
  const [sort, setSort] = useState<LpOrder>("asc");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    lpTitle, setLpTitle,
    lpContent, setLpContent,
    lpThumbnail,
    tagInput, setTagInput,
    tags, setTags,
    fileInputRef,
    handleFileChange,
    handleAddTag,
    reset,
  } = useCreateLpForm();

  const { mutate: createLp, isPending: isCreating } = useCreateLp();

  const handleCreateLp = () => {
    createLp(
      { title: lpTitle, content: lpContent, thumbnail: lpThumbnail, tags, published: true },
      {
        onSuccess: () => {
          setIsModalOpen(false);
          reset();
        },
      }
    );
  };

  const { data, isPending, isError, refetch, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useLps(sort);

  const hasNextPageRef = useRef(hasNextPage);
  const isFetchingNextPageRef = useRef(isFetchingNextPage);
  const fetchNextPageRef = useRef(fetchNextPage);

  useEffect(() => { hasNextPageRef.current = hasNextPage; }, [hasNextPage]);
  useEffect(() => { isFetchingNextPageRef.current = isFetchingNextPage; }, [isFetchingNextPage]);
  useEffect(() => { fetchNextPageRef.current = fetchNextPage; }, [fetchNextPage]);

  // 스크롤 없이 뷰포트가 꽉 차지 않으면 자동으로 다음 페이지 로드
  useEffect(() => {
    if (isFetchingNextPage || isPending || !hasNextPage) return;
    const { scrollHeight, clientHeight } = document.documentElement;
    if (scrollHeight <= clientHeight + 200) {
      fetchNextPage();
    }
  }, [isFetchingNextPage, isPending, hasNextPage, fetchNextPage]);

  useEffect(() => {
    if (isPending) return;

    const handleScroll = () => {
      const { scrollY, innerHeight } = window;
      const { scrollHeight } = document.documentElement;

      if (scrollY + innerHeight >= scrollHeight - 200) {
        if (hasNextPageRef.current && !isFetchingNextPageRef.current) {
          fetchNextPageRef.current();
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isPending]);

  const lps = data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <>
      <div className="flex justify-end gap-2">
        <button
          className={`border rounded px-3 py-1 ${sort === "asc" ? "bg-pink-500 text-white" : ""}`}
          onClick={() => setSort("asc")}
        >
          오래된순
        </button>
        <button
          className={`border rounded px-3 py-1 ${sort === "desc" ? "bg-pink-500 text-white" : ""}`}
          onClick={() => setSort("desc")}
        >
          최신순
        </button>
      </div>

      {isError && <ErrorMessage onRetry={refetch} />}

      <div className="grid grid-cols-5 gap-2 mt-4">
        {isPending
          ? Array.from({ length: 10 }).map((_, i) => <LpCardSkeleton key={i} />)
          : lps.map((lp) => <LpCard key={lp.id} lp={lp} />)
        }
        {isFetchingNextPage &&
          Array.from({ length: 10 }).map((_, i) => <LpCardSkeleton key={`next-${i}`} />)
        }
      </div>

      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-8 right-8 bg-pink-500 hover:bg-pink-600 transition rounded-full w-14 h-14 text-3xl text-white shadow-lg flex items-center justify-center"
      >
        +
      </button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="flex flex-col gap-4">
          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="relative w-40 h-40 rounded-full overflow-hidden group focus:outline-none"
            >
              <img
                src={lpThumbnail || FALLBACK_IMAGE}
                alt="thumbnail preview"
                className="w-full h-full object-cover"
                onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
              />
              <span className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition text-white text-sm font-medium">
                사진 업로드
              </span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
          <input
            value={lpTitle}
            onChange={(e) => setLpTitle(e.target.value)}
            placeholder="LP Name"
            className="bg-zinc-800 text-white text-sm rounded-lg px-4 py-2 outline-none border border-zinc-700 focus:border-pink-500 transition placeholder-gray-500"
          />
          <input
            value={lpContent}
            onChange={(e) => setLpContent(e.target.value)}
            placeholder="LP Content"
            className="bg-zinc-800 text-white text-sm rounded-lg px-4 py-2 outline-none border border-zinc-700 focus:border-pink-500 transition placeholder-gray-500"
          />
          <div className="flex gap-2">
            <input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") handleAddTag(); }}
              placeholder="LP Tag"
              className="flex-1 bg-zinc-800 text-white text-sm rounded-lg px-4 py-2 outline-none border border-zinc-700 focus:border-pink-500 transition placeholder-gray-500"
            />
            <button
              onClick={handleAddTag}
              className="bg-zinc-700 hover:bg-zinc-600 text-white text-sm px-4 py-2 rounded-lg transition"
            >
              Add
            </button>
          </div>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  onClick={() => setTags((prev) => prev.filter((t) => t !== tag))}
                  className="bg-zinc-700 text-gray-300 text-xs px-3 py-1 rounded-full cursor-pointer hover:bg-zinc-600 transition"
                >
                  #{tag} ✕
                </span>
              ))}
            </div>
          )}
          <button
            onClick={handleCreateLp}
            disabled={isCreating}
            className="w-full bg-pink-500 hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm py-3 rounded-lg transition font-medium"
          >
            {isCreating ? "업로드 중..." : "Add LP"}
          </button>
        </div>
      </Modal>
    </>
  );
}
