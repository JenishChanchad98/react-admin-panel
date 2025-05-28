export const saveToken = (data) => {
  localStorage.setItem("token", data);
};

export const getToken = () => {
  const data = localStorage.getItem("token");
  return data ? data : null;
};

export const removeToken = () => {
  localStorage.removeItem("token");
};
