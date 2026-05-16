import axiosInstance from "./axiosInstance";

export type LpOrder = "asc" | "desc";

export interface CommentAuthor {
  id: number;
  name: string;
  email: string;
  bio: string | null;
  avatar: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: number;
  content: string;
  lpId: number;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  author: CommentAuthor;
}

export interface CommentListResponse {
  data: Comment[];
  nextCursor: number;
  hasNext: boolean;
}

export const getComments = async (
  lpId: number,
  params: { cursor?: number; limit?: number; order?: LpOrder }
): Promise<CommentListResponse> => {
  const { data } = await axiosInstance.get(`/lps/${lpId}/comments`, { params });
  return data.data;
};

export const createComment = async (
  lpId: number,
  content: string
) : Promise<Comment> => {
  const { data } = await axiosInstance.post(`/lps/${lpId}/comments`, { content });
  return data.data;
};

export const updateComment = async (
  lpId: number,
  commentId: number,
  content: string
) : Promise<Comment> => {
  const { data } = await axiosInstance.patch(`/lps/${lpId}/comments/${commentId}`, { content });
  return data.data;
};

export const deleteComment = async (
  lpId: number,
  commentId: number
) : Promise<void> => {
  await axiosInstance.delete(`/lps/${lpId}/comments/${commentId}`);
}