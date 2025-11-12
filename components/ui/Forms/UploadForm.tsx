import { useState, useRef } from 'react';
import { Upload } from 'lucide-react';

export default function PropertyImageUpload() {
  const [isDragOver, setIsDragOver] = useState(false);
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);

  const handleFiles = (fileList) => {
    const newFiles = Array.from(fileList).map((file, idx) => ({
      file,
      id: Date.now() + idx,
      preview: URL.createObjectURL(file)
    }));
    setFiles(prev => [...prev, ...newFiles]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files.length) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files?.length) {
      handleFiles(e.target.files);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-8">
      {/* Label */}
      <h2 className="text-gray-700 font-medium mb-4">Property Images</h2>

      {/* Upload Area */}
      <div
        className={`
          relative border-2 border-dashed rounded-lg
          transition-all duration-200
          ${isDragOver 
            ? 'border-blue-400 bg-blue-50' 
            : 'border-gray-300 bg-white'
          }
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept="image/svg+xml,image/png,image/jpeg,image/gif"
          multiple
          onChange={handleFileInput}
        />

        {/* Upload Content */}
        <div className="text-center py-4 ">
          {/* Cloud Upload Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
              <Upload className="w-10 h-10 text-gray-400" strokeWidth={1.5} />
            </div>
          </div>

          {/* Text */}
          <div className="">
            <p className="text-gray-700 text-base mb-2">
              <button 
                onClick={openFileDialog}
                className="text-blue-600 font-medium hover:text-blue-700"
              >
                Click to upload
              </button>
              {' '}or drag and drop
            </p>
            <p className="text-gray-400 text-sm">
              SVG, PNG, JPG or GIF (max. 800×400px)
            </p>
          </div>

          {/* OR Divider */}
          <div className="flex items-center justify-center mb-6">
            <span className="text-gray-400 text-sm font-medium">OR</span>
          </div>

          {/* Browse Files Button */}
          <button
            onClick={openFileDialog}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-lg transition-colors"
          >
            Browse Files
          </button>
        </div>

        {/* Drag Overlay */}
        {isDragOver && (
          <div className="absolute inset-0 bg-blue-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Upload className="w-12 h-12 text-blue-600 mx-auto mb-2" />
              <span className="text-blue-700 font-medium">Drop files here!</span>
            </div>
          </div>
        )}
      </div>

      {/* Preview Selected Files */}
      {files.length > 0 && (
        <div className="mt-6">
          <h3 className="text-gray-700 font-medium mb-3">Selected Images ({files.length})</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {files.map((fileItem) => (
              <div key={fileItem.id} className="relative group">
                <img
                  src={fileItem.preview}
                  alt={fileItem.file.name}
                  className="w-full h-32 object-cover rounded-lg border border-gray-200"
                />
                <button
                  onClick={() => setFiles(files.filter(f => f.id !== fileItem.id))}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}