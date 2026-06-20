import axios from "axios";

const API = "http://localhost:5000/api/leads";

export const getLeads = () => axios.get(API);

export const createLead = (data) =>
  axios.post(API, data);

export const getLeadStats = () =>
  API.get("/stats");

export const updateLead = (id, data) =>
  axios.put(`${API}/${id}`, data);

export const deleteLead = (id) =>
  axios.delete(`${API}/${id}`);

export const searchLeads = (keyword) =>
  axios.get(`${API}/search?keyword=${keyword}`);