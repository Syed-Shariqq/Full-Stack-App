import api from "./axios";

// Signup
export const signup = async (userData) => {
  return api.post("/auth/signup", userData);
};

// Login
export const login = async (credentials) => {
  const res = await api.post("/auth/login", credentials);
  localStorage.setItem("role", res.data.role);
  localStorage.setItem("token", res.data.token); // Jwt token stored in localStorage
  return res.data;
};


