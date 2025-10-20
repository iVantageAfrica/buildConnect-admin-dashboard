import { useState, useRef, useCallback } from 'react';
import { Upload, CheckCircle, AlertCircle, X, File, Image } from 'lucide-react';

interface FileUploadProps {
  onFileSelect?: (files: File[]) => void;
  onError?: (error: string, file?: File) => void;
  maxSize?: number; 
  accept?: 'images' | 'documents' | 'all' | string[]; 
  multiple?: boolean;
  className?: string;
  disabled?: boolean;
  

  label?: string;
  labelClassName?: string;
  required?: boolean;
  requiredText?: string;
  

  uploadText?: string;
  subtitle?: string;
  filesSelectedText?: string;
  addMoreFilesText?: string;
  readyStatusText?: string;
  fileTooLargeText?: string;
  fileNotSupportedText?: string;
  dropFilesText?: string;
  

  borderRadius?: string;
  backgroundColor?: string;
  hoverBackgroundColor?: string;
  dragOverBackgroundColor?: string;
  iconBackgroundColor?: string;
  iconColor?: string;
  textColor?: string;
  subtitleColor?: string;
  labelColor?: string;
}

const FILE_PRESETS = {
  images: ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'],
  documents: ['.pdf', '.doc', '.docx', '.txt', '.rtf', '.odt'],
  all: ['*']
};

interface FileState {
  file: File;
  id: string;
 error?: string | null;
}

export function FileUpload({
  onFileSelect,
  onError,
  maxSize = 10,
  accept = 'all',
  multiple = false,
  className = '',
  disabled = false,
  

  label,
  labelClassName = '',
  required = false,
  requiredText = '*',
  

  uploadText,
  subtitle,
  filesSelectedText = 'Selected Files',
  addMoreFilesText = 'Click to add more files or drag & drop',
  readyStatusText = 'Ready',
  fileTooLargeText,
  fileNotSupportedText,
  dropFilesText = 'Drop files here!',
  
  borderRadius = 'rounded-lg',
  backgroundColor = 'bg-white',
  hoverBackgroundColor = 'hover:bg-gray-50',
  dragOverBackgroundColor = 'bg-blue-50',
  iconBackgroundColor = 'bg-teal-100',
  iconColor = 'text-teal-600',
  textColor = 'text-gray-900',
  subtitleColor = 'text-gray-500',
  labelColor = 'text-gray-700',
}: FileUploadProps) {
  const [files, setFiles] = useState<FileState[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadIdCounter = useRef(0);


  const acceptedTypes = typeof accept === 'string' && accept in FILE_PRESETS
    ? FILE_PRESETS[accept as keyof typeof FILE_PRESETS]
    : Array.isArray(accept)
    ? accept
    : FILE_PRESETS.all;


  const getUploadText = () => {
    if (uploadText) return uploadText;
    
    const typeMap = {
      images: 'Click here to upload images',
      documents: 'Click here to upload a scanned copy',
      all: 'Click here to upload files'
    };
    
    return typeof accept === 'string' && accept in typeMap
      ? typeMap[accept as keyof typeof typeMap]
      : 'Click here to upload files';
  };

  const getSubtitle = () => {
    if (subtitle) return subtitle;
    return `(Max size - ${maxSize}MB${multiple ? ' each' : ''})`;
  };

  const getFileTooLargeText = () => {
    return fileTooLargeText || `File too large. Maximum size is ${maxSize}MB`;
  };

  const getFileNotSupportedText = () => {
    return fileNotSupportedText || `File type not supported. Accepted: ${acceptedTypes.join(', ')}`;
  };


  const validateFile = (file: File): string | null => {
    if (file.size > maxSize * 1024 * 1024) {
      return getFileTooLargeText();
    }

    if (!acceptedTypes.includes('*')) {
      const extension = '.' + file.name.split('.').pop()?.toLowerCase();
      if (!acceptedTypes.some(type => type.toLowerCase() === extension)) {
        return getFileNotSupportedText();
      }
    }

    return null;
  };


  const handleFiles = useCallback((fileList: FileList) => {
    const newFiles: FileState[] = [];
    const validFiles: File[] = [];
    
    Array.from(fileList).forEach(file => {
      const error = validateFile(file);
      const fileState: FileState = {
        file,
        id: `file-${++uploadIdCounter.current}`,
        error
      };
      newFiles.push(fileState);
      
      if (!error) {
        validFiles.push(file);
      } else {
        onError?.(error, file);
      }
    });

    if (multiple) {
      setFiles(prev => [...prev, ...newFiles]);
    } else {
      setFiles(newFiles.slice(0, 1));
    }

    if (validFiles.length > 0) {
      onFileSelect?.(validFiles);
    }
  }, [maxSize, acceptedTypes, multiple, onFileSelect, onError]);

  // Drag & Drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (!disabled && e.dataTransfer.files.length) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      handleFiles(e.target.files);
    }
    e.target.value = '';
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
    const remainingFiles = files
      .filter(f => f.id !== id && !f.error)
      .map(f => f.file);
    onFileSelect?.(remainingFiles);
  };

  const formatSize = (bytes: number) => {
    const units = ['B', 'KB', 'MB', 'GB'];
    let size = bytes;
    let unit = 0;
    while (size >= 1024 && unit < units.length - 1) {
      size /= 1024;
      unit++;
    }
    return `${size.toFixed(1)} ${units[unit]}`;
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    const imageTypes = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'];
    
    return imageTypes.includes(extension || '') ? (
      <Image className="w-4 h-4 text-blue-500" />
    ) : (
      <File className="w-4 h-4 text-gray-500" />
    );
  };

  const hasFiles = files.length > 0;

  return (
    <div className={`w-full ${className}`}>
 
      {label && (
        <label className={`block text-sm font-medium ${labelColor} mb-1 ${labelClassName}`}>
          {label}
          {required && (
            <span className="text-red-500 ml-1">{requiredText}</span>
          )}
        </label>
      )}
      
      <div
        className={`
          relative border-2 border-dashed ${borderRadius} cursor-pointer
          transition-all duration-200 ease-out
          ${isDragOver 
            ? `border-blue-400 ${dragOverBackgroundColor} scale-[1.01]` 
            : `border-gray-300 hover:border-gray-400 ${backgroundColor}`
          }
          ${disabled 
            ? 'opacity-50 cursor-not-allowed' 
            : hoverBackgroundColor
          }
          ${hasFiles ? 'min-h-[120px]' : ''}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !disabled && fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept={acceptedTypes.includes('*') ? undefined : acceptedTypes.join(',')}
          multiple={multiple}
          onChange={handleFileInput}
          disabled={disabled}
        />

  
        {!hasFiles && (
          <div className="text-center py-6 px-4">
       
            <div className="flex justify-center mb-3">
              <div className={`w-12 h-12 ${iconBackgroundColor} rounded-full flex items-center justify-center`}>
                <Upload className={`w-5 h-5 ${iconColor}`} />
              </div>
            </div>
        
            <div className={`font-medium ${textColor} text-sm mb-1`}>
              {getUploadText()}
            </div>
            
            
            <div className={`${subtitleColor} text-xs`}>
              {getSubtitle()}
            </div>
          </div>
        )}

     
        {hasFiles && (
          <div className="p-3">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h4 className={`font-medium ${textColor} text-sm`}>
                  {filesSelectedText} ({files.length})
                </h4>
                <p className={`text-xs ${subtitleColor}`}>
                  {addMoreFilesText}
                </p>
              </div>
            </div>

            <div className="grid gap-2">
              {files.map((fileState) => (
                <div
                  key={fileState.id}
                  className={`
                    flex items-center gap-2 p-2 rounded-md border bg-white
                    ${fileState.error ? 'border-red-200 bg-red-50' : 'border-gray-200'}
                  `}
                >
                  <div className={`
                    w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0
                    ${fileState.error ? 'bg-red-100' : 'bg-gray-100'}
                  `}>
                    {fileState.error ? (
                      <AlertCircle className="w-4 h-4 text-red-500" />
                    ) : (
                      getFileIcon(fileState.file.name)
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className={`font-medium text-xs ${textColor} truncate`}>
                      {fileState.file.name}
                    </div>
                    <div className={`text-xs ${subtitleColor}`}>
                      {formatSize(fileState.file.size)}
                      {!fileState.error && (
                        <span className="ml-1 inline-flex items-center">
                          <CheckCircle className="w-3 h-3 text-green-500 mr-1" />
                          {readyStatusText}
                        </span>
                      )}
                    </div>
                    {fileState.error && (
                      <div className="text-xs text-red-600 mt-0.5">{fileState.error}</div>
                    )}
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile(fileState.id);
                    }}
                    className="text-gray-400 hover:text-gray-600 p-0.5 rounded"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Drag Overlay */}
        {isDragOver && (
          <div className={`absolute inset-0 ${dragOverBackgroundColor} ${borderRadius} flex items-center justify-center`}>
            <div className="text-center">
              <Upload className="w-8 h-8 text-blue-600 mx-auto mb-1" />
              <span className="text-blue-700 font-medium text-sm">{dropFilesText}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FileUpload;