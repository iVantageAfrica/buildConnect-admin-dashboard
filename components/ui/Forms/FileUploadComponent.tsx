import React, { useState, useRef } from "react";
import { Control, Controller } from "react-hook-form";

export interface FileUploadResult {
  file: File;        
  uri: string;
  name: string;
  type: string;
  width?: number;
  height?: number;
  size: number;
}

interface FileUploadComponentProps {
  control: Control<any>;
  name: string;
  label: string;
  title?: string;
  note?: string;
  icon?: string;
  error?: string;
  maxSizeMB?: number;
  allowedTypes?: string[];
  accept?: string;
  onFileSelected?: (file: FileUploadResult) => void;
  onError?: (error: string) => void;
  containerClassName?: string;
}

export default function FileUploadComponent({
  control,
  name,
  label,
  title = "Upload Document",
  note = "PNG, JPG, PDF (max. 5MB)",
  icon = "/upload-icon.svg",
  error: externalError,
  maxSizeMB = 5,
  allowedTypes = ["image/jpeg", "image/png", "image/jpg", "application/pdf"],
  accept,
  onFileSelected,
  onError,
  containerClassName = "",
}: FileUploadComponentProps) {
  const [localError, setLocalError]   = useState<string | null>(null);
  const [previewUrl, setPreviewUrl]   = useState<string | null>(null);
  const fileInputRef                  = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    if (!allowedTypes.some((type) => file.type.includes(type.replace("*", "")))) {
      return `File type not allowed. Please upload: ${allowedTypes.join(", ")}`;
    }
    if (file.size / (1024 * 1024) > maxSizeMB) {
      return `File is too big (max ${maxSizeMB}MB)`;
    }
    return null;
  };

  const getImageDimensions = (file: File): Promise<{ width: number; height: number }> =>
    new Promise((resolve) => {
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload  = () => { resolve({ width: img.width, height: img.height }); URL.revokeObjectURL(url); };
      img.onerror = () => resolve({ width: 0, height: 0 });
      img.src = url;
    });

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>,
    onChange: (value: any) => void
  ) => {
    try {
      setLocalError(null);
      if (onError) onError("");

      const file = event.target.files?.[0];
      if (!file) return;

      const validationError = validateFile(file);
      if (validationError) {
        setLocalError(validationError);
        if (onError) onError(validationError);
        return;
      }

      const uri = URL.createObjectURL(file);

      if (file.type.startsWith("image/")) {
        const dimensions = await getImageDimensions(file);

        const fileData: FileUploadResult = {
          file,                  // ✅ raw File object
          uri,
          name:   file.name,
          type:   file.type,
          width:  dimensions.width,
          height: dimensions.height,
          size:   file.size,
        };

        setPreviewUrl(uri);
        onChange(fileData);
        if (onFileSelected) onFileSelected(fileData);
      } else {
        const fileData: FileUploadResult = {
          file,                  // ✅ raw File object
          uri,
          name: file.name,
          type: file.type,
          size: file.size,
        };

        onChange(fileData);
        if (onFileSelected) onFileSelected(fileData);
      }

      setLocalError(null);
      if (onError) onError("");
    } catch (error) {
      const msg = "Failed to process file";
      setLocalError(msg);
      if (onError) onError(msg);
    }

    // Reset so same file can be re-selected
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleReUpload = (onChange: (value: any) => void) => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    onChange(null);
    setLocalError(null);
    if (onError) onError("");
  };

  const displayError = externalError || localError;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => {
        const isUploaded = !!value;

        return (
          <div className={containerClassName}>
            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept={accept || allowedTypes.join(",")}
              onChange={(e) => handleFileSelect(e, onChange)}
              className="hidden"
            />

            <label className="font-inter text-base mb-3 px-4 block">{label}</label>

            {/* ── Idle ── */}
            {!isUploaded && !displayError && (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="mx-4 border-2 border-dashed border-gray-300 rounded-3xl py-6 flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
              >
                <img className="w-10 h-10" src={icon} alt="Upload" />
                <p className="text-md pt-4 font-inter text-gray-800 mb-2 text-center">{title}</p>
                <p className="text-gray-500 text-sm font-inter text-center mb-4">{note}</p>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                  className="border border-gray-200 px-12 py-3 rounded-xl bg-white hover:bg-gray-50 transition-colors"
                >
                  <span className="text-gray-700 font-inter">Upload</span>
                </button>
              </div>
            )}

            {/* ── Uploaded ── */}
            {isUploaded && !displayError && value && (
              <div className="mx-4 border-2 border-blue-400 rounded-3xl py-6 flex flex-col items-center bg-blue-50">
                {value.type?.startsWith("image/") ? (
                  <div className="w-20 h-20 rounded-lg overflow-hidden mb-2">
                    <img src={value.uri} alt={value.name} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center mb-2">
                    <span className="text-white text-xl font-bold">✓</span>
                  </div>
                )}
                <p className="text-sm font-inter text-gray-600 mb-1">{value.name}</p>
                <p className="text-xl font-semibold font-inter text-blue-600 mb-2">Upload successful</p>
                <p className="text-gray-600 text-center font-inter mb-4">{note}</p>
                <button
                  type="button"
                  onClick={() => handleReUpload(onChange)}
                  className="border border-gray-300 px-10 py-3 rounded-full bg-white hover:bg-gray-50 transition-colors"
                >
                  <span className="text-gray-700 font-inter text-base">Re-upload</span>
                </button>
              </div>
            )}

            {/* ── Error ── */}
            {displayError && (
              <div className="mx-4 border-2 border-red-400 rounded-3xl py-6 flex flex-col items-center bg-red-50">
                <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center mb-2">
                  <span className="text-white text-xl font-bold">!</span>
                </div>
                <p className="text-xl font-semibold font-inter text-red-600 mb-2 text-center px-4">
                  {displayError}
                </p>
                <p className="text-gray-600 text-center font-inter mb-4">{note}</p>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="border border-red-300 px-10 py-3 rounded-full bg-white hover:bg-red-50 transition-colors"
                >
                  <span className="text-red-700 font-inter text-base">Try Again</span>
                </button>
              </div>
            )}
          </div>
        );
      }}
    />
  );
}