import api from './api';

const fileService = {
  uploadFile: async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post('/files/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  downloadFile: (filename) => {
    return `${api.defaults.baseURL}/files/download/${filename}`;
  },

  deleteFile: async (filename) => {
    const response = await api.delete(`/files/${filename}`);
    return response.data;
  },
};

export default fileService;
