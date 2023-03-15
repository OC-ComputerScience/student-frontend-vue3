import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost/api",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
  getStudents() {
    return apiClient.get("/students", { crossOrigin: true });
  },
  getStudent(id) {
    return apiClient.get("/students/" + id, { crossOrigin: true });
  },
  addStudent(student) {
    return apiClient.post("/students", student, { crossOrigin: true });
  },
  updateStudent(student) {
    return apiClient.put("/students/" + student.id, student, {
      crossOrigin: true,
    });
  },
  deleteStudent(id) {
    return apiClient.delete("/students/" + id, {
      crossOrigin: true,
    });
  },

  getZipInfo(zip) {
    return apiClient.get("/zip/" + zip, { crossOrigin: true });
  },
};
