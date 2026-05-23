import { useRef, useState } from "react";

export function useCreateLpForm() {
  const [lpTitle, setLpTitle] = useState("");
  const [lpContent, setLpContent] = useState("");
  const [lpThumbnail, setLpThumbnail] = useState("");
  const [lpFile, setLpFile] = useState<File | null>(null);
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLpFile(file);
    setLpThumbnail(URL.createObjectURL(file));
  };

  const handleAddTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags((prev) => [...prev, trimmed]);
    }
    setTagInput("");
  };

  const reset = () => {
    setLpTitle("");
    setLpContent("");
    setLpThumbnail("");
    setLpFile(null);
    setTagInput("");
    setTags([]);
  };

  return {
    lpTitle, setLpTitle,
    lpContent, setLpContent,
    lpThumbnail, setLpThumbnail,
    lpFile,
    tagInput, setTagInput,
    tags, setTags,
    fileInputRef,
    handleFileChange,
    handleAddTag,
    reset,
  };
}
