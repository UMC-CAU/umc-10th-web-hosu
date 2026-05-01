import axiosInstance from "./axiosInstance";

export const login = async (email: string, password: string) => {
  const { data } = await axiosInstance.post("/auth/login", { email, password });
  localStorage.setItem("accessToken", data.accessToken);
  localStorage.setItem("refreshToken", data.refreshToken);
  return data;
};

export const signup = async (email: string, password: string, nickname: string) => {
  const { data } = await axiosInstance.post("/auth/signup", { email, password, nickname });
  localStorage.setItem("accessToken", data.accessToken);
  localStorage.setItem("refreshToken", data.refreshToken);
  return data;
};

export const logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};
