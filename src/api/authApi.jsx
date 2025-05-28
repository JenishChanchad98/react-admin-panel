import axiosInstance from "./axiosInstance";

export const loginAPI = async (bodyData) => {
  const response = await axiosInstance.post("/login", bodyData);

  return response;
};

export const getProfileAPI = async () => {
  const response = await axiosInstance.get("/user/profile");

  return response;
};

export const updateProfileAPI = async (bodyData) => {
  const response = await axiosInstance.put("/user/profile", bodyData);

  return response;
};
