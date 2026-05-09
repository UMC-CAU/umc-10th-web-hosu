import { useParams } from "react-router-dom";
import { useLpDetail } from "../hooks/useLpDetail";
import { LoadingSpinner, ErrorMessage } from "../components/LoadingSpinner";
import { timeAgo } from "../utils/timeAgo";
import { FALLBACK_IMAGE } from "../constants";

export default function LpDetailPage() {
  const { lpId } = useParams();
  const { data: lp, isPending, isError, refetch } = useLpDetail(Number(lpId));

  if (isPending) return <LoadingSpinner />;
  if (isError) return <ErrorMessage onRetry={refetch} />;

  return (
    <div className="flex justify-center py-10 px-4">
      <div className="bg-zinc-900 rounded-2xl w-full max-w-xl p-8 flex flex-col gap-6">

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

        <h1 className="text-white text-2xl font-bold">{lp.title}</h1>

        <div className="flex justify-center">
          <img
            src={lp.thumbnail}
            alt={lp.title}
            className="w-64 h-64 rounded-full object-cover animate-spin"
            style={{ animationDuration: "8s", animationTimingFunction: "linear" }}
            onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
          />
        </div>

        <p className="text-gray-300 text-sm leading-relaxed">{lp.content}</p>

        {lp.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {lp.tags.map((tag) => (
              <span key={tag.id} className="bg-zinc-700 text-gray-300 text-xs px-3 py-1 rounded-full">
                # {tag.name}
              </span>
            ))}
          </div>
        )}

        <div className="flex justify-center">
          <button className="flex items-center gap-2 text-pink-500 hover:text-pink-400 transition text-lg font-medium">
            ♥ <span>{lp.likes.length}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
