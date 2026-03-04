import { useState } from 'react';
import fileService from '../services/fileService';

export const useFileUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const uploadFile = async (file) => {
    try {
      setUploading(true);
      setError(null);
      const response = await fileService.uploadFile(file);
      setUploading(false);
      return response;
    } catch (err) {
      setError(err.message);
      setUploading(false);
      throw err;
    }
  };

  return {
    uploading,
    error,
    uploadFile,
  };
};

export default useFileUpload;
