import { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMe } from "../apis/auth";
import { useUpdateMe } from "../hooks/user/useUpdateMe";
import { LoadingSpinner } from "../components/LoadingSpinner";

export default function MyPage() {
  const { data: me, isPending } = useQuery({ queryKey: ["me"], queryFn: getMe });
  const { mutate: updateMe, isPending: isSaving, error: saveError } = useUpdateMe();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [avatarPreview, setAvatarPreview] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const openEdit = () => {
    setName(me?.name ?? "");
    setBio(me?.bio ?? "");
    setAvatarPreview(me?.avatar ?? "");
    setIsEditing(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleSave = () => {
    updateMe(
      { name, bio, avatar: avatarPreview },
      { onSuccess: () => setIsEditing(false) }
    );
  };

  if (isPending) return <LoadingSpinner />;

  return (
    <div className="flex justify-center py-10 px-4">
      <div className="bg-zinc-900 rounded-2xl w-full max-w-md p-8 flex flex-col gap-6">

        <div className="flex items-center gap-6">
          {/* 프로필 사진 */}
          <div className="relative shrink-0">
            {isEditing ? (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="relative w-24 h-24 rounded-full overflow-hidden group focus:outline-none"
              >
                <img
                  src={avatarPreview || "https://placehold.co/200x200?text=?"}
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
                <span className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition text-white text-xs font-medium">
                  변경
                </span>
              </button>
            ) : (
              <div className="w-24 h-24 rounded-full overflow-hidden bg-zinc-700 flex items-center justify-center">
                {me?.avatar
                  ? <img src={me.avatar} alt={me.name} className="w-full h-full object-cover" />
                  : <span className="text-white text-3xl font-bold">{me?.name?.[0]?.toUpperCase()}</span>
                }
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          {/* 정보 */}
          <div className="flex flex-col gap-2 flex-1">
            {isEditing ? (
              <>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="이름"
                  className="bg-zinc-800 text-white text-sm rounded-lg px-3 py-2 outline-none border border-zinc-600 focus:border-pink-500"
                />
                <input
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="bio (선택)"
                  className="bg-zinc-800 text-white text-sm rounded-lg px-3 py-2 outline-none border border-zinc-600 focus:border-pink-500 placeholder-gray-500"
                />
                <p className="text-gray-500 text-sm">{me?.email}</p>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2">
                  <p className="text-white font-semibold text-lg">{me?.name}</p>
                  <button
                    onClick={openEdit}
                    className="text-gray-400 hover:text-white transition text-base"
                  >
                    ⚙
                  </button>
                </div>
                {me?.bio && <p className="text-gray-400 text-sm">{me.bio}</p>}
                <p className="text-gray-500 text-sm">{me?.email}</p>
              </>
            )}
          </div>
        </div>

        {isEditing && saveError && (
          <p className="text-red-400 text-xs text-center">
            저장 실패: {(saveError as Error).message}
          </p>
        )}

        {isEditing && (
          <div className="flex gap-3">
            <button
              onClick={() => setIsEditing(false)}
              className="flex-1 py-2 rounded-lg border border-zinc-600 text-gray-400 hover:text-white hover:border-zinc-400 text-sm transition"
            >
              취소
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving || !name.trim()}
              className="flex-1 py-2 rounded-lg bg-pink-500 hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium transition"
            >
              {isSaving ? "저장 중..." : "저장"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
