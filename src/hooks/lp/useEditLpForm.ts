import { useEffect, useState } from "react";
import type { LpDetail } from "../../apis/lp";
import { useUpdateLp } from "./useUpdateLp";

export function useEditLpForm(lpId: number, lp: LpDetail | undefined) {
  const [isOpen, setIsOpen] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editThumbnail, setEditThumbnail] = useState("");
  const [editTags, setEditTags] = useState<string[]>([]);
  const [editTagInput, setEditTagInput] = useState("");

  const { mutate: updateLpMutate, isPending: isUpdating } = useUpdateLp(lpId);

  useEffect(() => {
    if (lp && isOpen) {
      setEditTitle(lp.title);
      setEditContent(lp.content);
      setEditThumbnail(lp.thumbnail);
      setEditTags(lp.tags.map((t) => t.name));
    }
  }, [lp, isOpen]);

  const openEdit = () => setIsOpen(true);
  const closeEdit = () => setIsOpen(false);

  const handleAddTag = () => {
    const trimmed = editTagInput.trim();
    if (trimmed && !editTags.includes(trimmed)) {
      setEditTags((prev) => [...prev, trimmed]);
    }
    setEditTagInput("");
  };

  const handleUpdate = () => {
    updateLpMutate(
      { title: editTitle, content: editContent, thumbnail: editThumbnail, tags: editTags, published: true },
      { onSuccess: closeEdit }
    );
  };

  return {
    isOpen, openEdit, closeEdit,
    editTitle, setEditTitle,
    editContent, setEditContent,
    editThumbnail, setEditThumbnail,
    editTags, setEditTags,
    editTagInput, setEditTagInput,
    handleAddTag,
    handleUpdate,
    isUpdating,
  };
}
