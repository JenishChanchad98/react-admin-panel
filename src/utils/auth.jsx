export const saveToken = (data) => {
  localStorage.setItem("user_data", JSON.stringify(data));
};

export const getToken = () => {
  const data = localStorage.getItem("user_data");
  return data ? JSON.parse(data) : null;
};

export const removeToken = () => {
  localStorage.removeItem("user_data");
};
