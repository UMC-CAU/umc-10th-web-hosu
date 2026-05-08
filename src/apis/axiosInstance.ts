import axios from "axios";

let isRefreshing = false; // Prevent duplication on retry process

let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (err: unknown) => void;
}> = []; // Storing tokens wait for renew

const processQueue = (error: unknown, token: string | null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve(token!);
  });
  failedQueue = [];
} // Handling all of requests in Queue

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, // Needs to send refreshToken through cookie
})

const isTokenExpired = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 < Date.now() + 30_000; // Renewing before 30s to expired
  } catch {
    return true;
  }
};

axiosInstance.interceptors.request.use(async (config) => {
  let accessToken = localStorage.getItem("accessToken");

  if (accessToken && isTokenExpired(accessToken)) {
    if (!isRefreshing) {
      isRefreshing = true;
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const { data } = await axios.post("/auth/refresh", { refreshToken });
        accessToken = data.accessToken;
        localStorage.setItem("accessToken", accessToken!);
        processQueue(null, accessToken);
      } catch (err) {
        processQueue(err, null);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }
  }

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
})

axiosInstance.interceptors.response.use(
  (response) => response, // Response successed, it passed

  async (error) => {
    const originalRequest = error.config;

    // Only 401 and not re-tried request are handled.
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    // Renewing already, wait on Queue
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then((newToken) => {
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      });
    }

    // Start to renew
    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const refreshToken = localStorage.getItem("refreshToken");
      const { data } = await axios.post("/auth/refresh", { refreshToken });
      const newAccessToken = data.accessToken;

      localStorage.setItem("accessToken", newAccessToken);
      processQueue(null, newAccessToken); // Retry waiting requests

      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return axiosInstance(originalRequest); // Original request retried
    } catch (refreshError) {
      processQueue(refreshError, null); // Waited requests handle to fail
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      window.location.href = "/login"; // Redirect to login page
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export default axiosInstance;