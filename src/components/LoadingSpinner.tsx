export function LoadingSpinner() {
  return (
    <div className="flex justify-center mt-16">
      <div className="w-10 h-10 border-4 border-pink-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export function ErrorMessage({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center mt-16 gap-3">
      <p className="text-red-500">데이터를 불러오는 데 실패했습니다.</p>
      <button
        className="border border-pink-500 text-pink-500 rounded px-4 py-1.5 hover:bg-pink-50 transition"
        onClick={onRetry}
      >
        재시도
      </button>
    </div>
  );
}
