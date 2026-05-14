import { useState } from "react";
import { useParams } from "react-router-dom";
import { useLpDetail } from "../hooks/useLpDetail";
import { useComments } from "../hooks/useComments";
import { LoadingSpinner, ErrorMessage } from "../components/LoadingSpinner";
import CommentSkeleton from "../components/CommentSkeleton";
import { timeAgo } from "../utils/timeAgo";
import { FALLBACK_IMAGE } from "../constants";
import type { LpOrder } from "../apis/lp";

export default function LpDetailPage() {
  const { lpId } = useParams();
  const { data: lp, isPending, isError, refetch } = useLpDetail(Number(lpId));

  const [commentOrder, setCommentOrder] = useState<LpOrder>("asc");
  const [commentText, setCommentText] = useState("");
  const [commentError, setCommentError] = useState("");

  const {
    data: commentData,
    isPending: isCommentPending,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useComments(Number(lpId), commentOrder);

  const comments = commentData?.pages.flatMap((p) => p.data) ?? [];

  const handleCommentSubmit = () => {
    if (!commentText.trim()) {
      setCommentError("댓글을 입력해주세요.");
      return;
    }
    if (commentText.trim().length > 300) {
      setCommentError("댓글은 300자 이내로 입력해주세요.");
      return;
    }
    setCommentError("");
    // TODO: 댓글 작성 API 연동
  };

  if (isPending) return <LoadingSpinner />;
  if (isError) return <ErrorMessage onRetry={refetch} />;

  return (
    <div className="flex justify-center py-10 px-4">
      <div className="bg-zinc-900 rounded-2xl w-full max-w-xl p-8 flex flex-col gap-6">

        {/* 작성자 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-pink-500 flex items-center justify-center text-white font-bold text-sm overflow-hidden">
              {lp.author.avatar
                ? <img src={lp.author.avatar} alt={lp.author.name} className="w-full h-full object-cover" />
                : lp.author.name[0].toUpperCase()}
            </div>
            <div>
              <p className="text-white text-sm font-medium">{lp.author.name}</p>
              <p className="text-gray-400 text-xs">{timeAgo(lp.createdAt)}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="text-gray-400 hover:text-white transition text-lg">✏️</button>
            <button className="text-gray-400 hover:text-red-400 transition text-lg">🗑️</button>
          </div>
        </div>

        {/* 제목 */}
        <h1 className="text-white text-2xl font-bold">{lp.title}</h1>

        {/* 썸네일 */}
        <div className="flex justify-center">
          <img
            src={lp.thumbnail}
            alt={lp.title}
            className="w-64 h-64 rounded-full object-cover animate-spin"
            style={{ animationDuration: "8s", animationTimingFunction: "linear" }}
            onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
          />
        </div>

        {/* 본문 */}
        <p className="text-gray-300 text-sm leading-relaxed">{lp.content}</p>

        {/* 태그 */}
        {lp.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {lp.tags.map((tag) => (
              <span key={tag.id} className="bg-zinc-700 text-gray-300 text-xs px-3 py-1 rounded-full">
                # {tag.name}
              </span>
            ))}
          </div>
        )}

        {/* 좋아요 */}
        <div className="flex justify-center">
          <button className="flex items-center gap-2 text-pink-500 hover:text-pink-400 transition text-lg font-medium">
            ♥ <span>{lp.likes.length}</span>
          </button>
        </div>

        {/* 댓글 섹션 */}
        <div className="border-t border-zinc-700 pt-6 flex flex-col gap-4">

          {/* 정렬 */}
          <div className="flex items-center justify-between">
            <p className="text-white font-semibold text-sm">
              댓글 {comments.length}{hasNextPage ? "+" : ""}개
            </p>
            <div className="flex gap-2">
              <button
                className={`text-xs px-3 py-1 rounded border transition ${commentOrder === "asc" ? "bg-pink-500 border-pink-500 text-white" : "border-zinc-600 text-gray-400 hover:border-white hover:text-white"}`}
                onClick={() => setCommentOrder("asc")}
              >
                오래된순
              </button>
              <button
                className={`text-xs px-3 py-1 rounded border transition ${commentOrder === "desc" ? "bg-pink-500 border-pink-500 text-white" : "border-zinc-600 text-gray-400 hover:border-white hover:text-white"}`}
                onClick={() => setCommentOrder("desc")}
              >
                최신순
              </button>
            </div>
          </div>

          {/* 댓글 입력 */}
          <div className="flex flex-col gap-1">
            <div className="flex gap-2">
              <input
                type="text"
                value={commentText}
                onChange={(e) => {
                  setCommentText(e.target.value);
                  if (commentError) setCommentError("");
                }}
                onKeyDown={(e) => { if (e.key === "Enter") handleCommentSubmit(); }}
                placeholder="댓글을 입력하세요..."
                maxLength={300}
                className="flex-1 bg-zinc-800 text-white text-sm rounded-lg px-4 py-2 outline-none border border-zinc-700 focus:border-pink-500 transition placeholder-gray-500"
              />
              <button
                onClick={handleCommentSubmit}
                className="bg-pink-500 hover:bg-pink-600 transition text-white text-sm px-4 py-2 rounded-lg font-medium"
              >
                등록
              </button>
            </div>
            <div className="flex justify-between px-1">
              {commentError
                ? <p className="text-red-400 text-xs">{commentError}</p>
                : <span />}
              <p className="text-gray-500 text-xs">{commentText.length}/300</p>
            </div>
          </div>

          {/* 댓글 목록 */}
          <ul className="flex flex-col gap-3">
            {isCommentPending
              ? Array.from({ length: 5 }).map((_, i) => <CommentSkeleton key={i} />)
              : comments.length === 0
                ? <p className="text-gray-500 text-sm text-center py-4">아직 댓글이 없습니다.</p>
                : comments.map((comment) => (
                    <li key={comment.id} className="flex items-start gap-3 py-1">
                      <div className="w-9 h-9 rounded-full bg-pink-500 flex items-center justify-center text-white text-xs font-bold shrink-0 overflow-hidden">
                        {comment.author.avatar
                          ? <img src={comment.author.avatar} alt={comment.author.name} className="w-full h-full object-cover" />
                          : comment.author.name[0].toUpperCase()}
                      </div>
                      <div className="flex flex-col gap-1 flex-1">
                        <span className="text-white text-sm font-medium">{comment.author.name}</span>
                        <p className="text-gray-300 text-sm">{comment.content}</p>
                      </div>
                      <button className="text-gray-500 hover:text-white transition text-lg shrink-0 leading-none">⋮</button>
                    </li>
                  ))
            }
            {isFetchingNextPage &&
              Array.from({ length: 5 }).map((_, i) => <CommentSkeleton key={`next-${i}`} />)
            }
          </ul>

          {/* 더 보기 버튼 */}
          {hasNextPage && (
            <button
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              className="w-full text-sm text-gray-400 hover:text-white border border-zinc-700 hover:border-zinc-500 rounded-lg py-2 transition disabled:opacity-50"
            >
              {isFetchingNextPage ? "불러오는 중..." : "댓글 더 보기"}
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
