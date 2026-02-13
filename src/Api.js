const API_URL = "https://frontend-3-2qnc.onrender.com/api";

export const getProductos = async () => {
  const res = await fetch(`${API_URL}/productos`);
  return await res.json();
};
