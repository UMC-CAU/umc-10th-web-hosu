export default function CommentSkeleton() {
  return (
    <li className="flex items-start gap-3 py-1">
      <div className="w-9 h-9 rounded-full shrink-0 animate-shimmer" />
      <div className="flex flex-col gap-2 flex-1 pt-1">
        <div className="h-3 w-28 rounded-sm animate-shimmer" />
        <div className="h-4 w-full rounded-sm animate-shimmer" />
      </div>
    </li>
  );
}
