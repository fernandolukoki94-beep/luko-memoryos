import { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase";

interface UploadProgress {
  progress: number;
  isUploading: boolean;
  error: string | null;
}

export function useImageUpload() {
  const [uploadProgress, setUploadProgress] = useState<UploadProgress>({
    progress: 0,
    isUploading: false,
    error: null,
  });

  const uploadImage = async (
    file: File,
    folder: string = "posts"
  ): Promise<string | null> => {
    if (!file) return null;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setUploadProgress({
        progress: 0,
        isUploading: false,
        error: "Por favor, seleciona um ficheiro de imagem válido",
      });
      return null;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadProgress({
        progress: 0,
        isUploading: false,
        error: "A imagem não pode exceder 5MB",
      });
      return null;
    }

    setUploadProgress({
      progress: 0,
      isUploading: true,
      error: null,
    });

    try {
      const timestamp = Date.now();
      const filename = `${timestamp}-${file.name}`;
      const storageRef = ref(storage, `${folder}/${filename}`);

      // Upload file
      const snapshot = await uploadBytes(storageRef, file);

      // Get download URL
      const downloadURL = await getDownloadURL(snapshot.ref);

      setUploadProgress({
        progress: 100,
        isUploading: false,
        error: null,
      });

      return downloadURL;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Erro ao fazer upload da imagem";

      setUploadProgress({
        progress: 0,
        isUploading: false,
        error: errorMessage,
      });

      return null;
    }
  };

  const resetProgress = () => {
    setUploadProgress({
      progress: 0,
      isUploading: false,
      error: null,
    });
  };

  return {
    uploadImage,
    uploadProgress,
    resetProgress,
  };
}
