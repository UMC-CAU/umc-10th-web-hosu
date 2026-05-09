import axiosInstance from "./axiosInstance";

export type LpOrder = "asc" | "desc";

export interface LpTag {
  id: number;
  name: string;
}

export interface LpLike {
  id: number;
  userId: number;
  lpId: number;
}

export interface LpAuthor {
  id: number;
  name: string;
  email: string;
  bio: string | null;
  avatar: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Lp {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  published: boolean;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  tags: LpTag[];
  likes: LpLike[];
}

export interface LpDetail extends Lp {
  author: LpAuthor;
}

export interface LpListResponse {
  data: Lp[];
  nextCursor: number;
  hasNext: boolean;
}

export const getLpById = async (lpId: number): Promise<LpDetail> => {
  const { data } = await axiosInstance.get(`/lps/${lpId}`);
  return data.data;
};

export const getLps = async (params: {
  cursor?: number;
  limit?: number;
  search?: string;
  order?: LpOrder;
}): Promise<LpListResponse> => {
  const { data } = await axiosInstance.get("/lps", { params });
  return data.data;
};
