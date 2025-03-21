
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Authentication APIs
export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
  
  loginStudent: async (email: string, password: string) => {
    const response = await api.post('/auth/login/student', { email, password });
    return response.data;
  },
  
  loginTeacher: async (email: string, password: string) => {
    const response = await api.post('/auth/login/teacher', { email, password });
    return response.data;
  },
  
  registerStudent: async (name: string, email: string, password: string) => {
    const response = await api.post('/auth/register/student', { name, email, password });
    return response.data;
  },
  
  registerTeacher: async (name: string, email: string, password: string, subject: string) => {
    const response = await api.post('/auth/register/teacher', { name, email, password, subject });
    return response.data;
  },
  
  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  }
};

// Test APIs
export const testAPI = {
  generateTest: async (subject: string, chapter: string, difficulty: string) => {
    const response = await api.post('/test/generate', { subject, chapter, difficulty });
    return response.data;
  },
  
  startTest: async (testId: string) => {
    const response = await api.get(`/test/start/${testId}`);
    return response.data;
  },
  
  submitTest: async (sessionId: string, answers: any[]) => {
    const response = await api.post(`/test/submit/${sessionId}`, { answers });
    return response.data;
  },
  
  getResults: async (testId: string) => {
    const response = await api.get(`/test/results/${testId}`);
    return response.data;
  },
  
  getTeacherTests: async () => {
    const response = await api.get('/test/teacher/tests');
    return response.data;
  },
  
  getStudentTests: async () => {
    const response = await api.get('/test/student/tests');
    return response.data;
  }
};

// Notes APIs
export const notesAPI = {
  uploadNotes: async (formData: FormData) => {
    const response = await api.post('/notes/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  
  getTeacherNotes: async () => {
    const response = await api.get('/notes/teacher');
    return response.data;
  },
  
  getStudentNotes: async (subject: string) => {
    const response = await api.get(`/notes/student/${subject}`);
    return response.data;
  },
  
  getNoteById: async (noteId: string) => {
    const response = await api.get(`/notes/${noteId}`);
    return response.data;
  }
};

// Doubts APIs
export const doubtAPI = {
  askDoubt: async (subject: string, question: string) => {
    const response = await api.post('/doubts/ask', { subject, question });
    return response.data;
  },
  
  getStudentDoubts: async () => {
    const response = await api.get('/doubts/student');
    return response.data;
  },
  
  getCommonDoubts: async (subject: string) => {
    const response = await api.get(`/doubts/common/${subject}`);
    return response.data;
  }
};

export default { authAPI, testAPI, notesAPI, doubtAPI };
