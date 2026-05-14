import { useNavigate } from "react-router-dom";
import type { Lp } from "../apis/lp";
import { timeAgo } from "../utils/timeAgo";
import { FALLBACK_IMAGE } from "../constants";

export default function LpCard({ lp }: { lp: Lp }) {
  const navigate = useNavigate();

  return (
    <div
      className="relative aspect-square cursor-pointer overflow-hidden rounded group"
      onClick={() => navigate(`/lp/${lp.id}`)}
    >
      <img
        src={lp.thumbnail}
        alt={lp.title}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
      />
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
        <p className="text-white font-semibold text-sm leading-tight truncate">{lp.title}</p>
        <p className="text-gray-300 text-xs mt-1">{timeAgo(lp.createdAt)}</p>
        <p className="text-gray-300 text-xs mt-0.5">♥ {lp.likes.length}</p>
      </div>
    </div>
  );
}
