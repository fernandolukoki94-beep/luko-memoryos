import { useState, useRef } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useImageUpload } from "@/hooks/useImageUpload";

interface ImageUploadProps {
  onUploadComplete: (imageUrl: string) => void;
  folder?: string;
}

export default function ImageUpload({ onUploadComplete, folder = "posts" }: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const { uploadImage, uploadProgress } = useImageUpload();

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Show preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Upload to Firebase
    const imageUrl = await uploadImage(file, folder);
    if (imageUrl) {
      onUploadComplete(imageUrl);
      setPreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemovePreview = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-4">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {preview ? (
        <div className="relative rounded-2xl overflow-hidden bg-gray-100">
          <img src={preview} alt="Preview" className="w-full h-64 object-cover" />
          {uploadProgress.isUploading && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="text-center">
                <Loader2 className="animate-spin text-white mx-auto mb-2" size={32} />
                <p className="text-white text-sm font-semibold">
                  {uploadProgress.progress}%
                </p>
              </div>
            </div>
          )}
          {!uploadProgress.isUploading && (
            <button
              onClick={handleRemovePreview}
              className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          )}
        </div>
      ) : (
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={uploadProgress.isUploading}
          className="w-full border-2 border-dashed border-pink-300 rounded-2xl p-8 hover:border-pink-500 hover:bg-pink-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div className="flex flex-col items-center gap-2">
            <Upload size={32} className="text-pink-500" />
            <p className="font-semibold text-gray-700">Clica para fazer upload</p>
            <p className="text-sm text-gray-500">PNG, JPG, GIF até 5MB</p>
          </div>
        </button>
      )}

      {uploadProgress.error && (
        <div className="bg-red-50 border-2 border-red-200 rounded-lg p-3 text-red-700 text-sm font-semibold">
          {uploadProgress.error}
        </div>
      )}
    </div>
  );
}
