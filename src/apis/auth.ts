import axiosInstance from "./axiosInstance";

export const login = async (email: string, password: string) => {
  const { data } = await axiosInstance.post("/auth/signin", { email, password });
  localStorage.setItem("accessToken", data.data.accessToken);
  localStorage.setItem("refreshToken", data.data.refreshToken);
  return data;
};

export const signup = async (email: string, password: string, name: string) => {
  const { data } = await axiosInstance.post("/auth/signup", { email, password, name });
  localStorage.setItem("accessToken", data.data.accessToken);
  localStorage.setItem("refreshToken", data.data.refreshToken);
  return data;
};

export const logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

export const getMe = async () => {
  const { data } = await axiosInstance.get("/users/me");
  return data.data;
};
