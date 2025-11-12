import React, { useState, useRef } from 'react';
import { Upload, File, X, CheckCircle } from 'lucide-react';

export default function FileUploadComponent() {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    const validTypes = ['image/svg+xml', 'image/png', 'image/jpeg', 'image/gif'];
    const maxSize = 800 * 400; // Basic size check
    
    if (validTypes.includes(file.type)) {
      setUploadedFile({
        name: file.name,
        size: (file.size / 1024).toFixed(2) + ' KB',
        type: file.type
      });
    } else {
      alert('Please upload a valid file type (SVG, PNG, JPG, or GIF)');
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className=" ">
      <div className="">
        <div className="bg-white rounded-2xl shadow-xl ">
          
          {!uploadedFile ? (
            <div
              className={`relative border-2 border-dashed rounded-xl p-12 transition-all duration-200 ${
                dragActive 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-gray-100'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept=".svg,.png,.jpg,.jpeg,.gif"
                onChange={handleChange}
              />
              
              <div className="flex flex-col items-center">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 transition-all duration-200 ${
                  dragActive ? 'bg-blue-100' : 'bg-gray-100'
                }`}>
                  <Upload className={`w-10 h-10 transition-colors duration-200 ${
                    dragActive ? 'text-blue-500' : 'text-gray-400'
                  }`} />
                </div>
                
                <p className="text-lg text-gray-700 mb-2">
                  <button 
                    onClick={onButtonClick}
                    className="text-blue-600 hover:text-blue-700 font-semibold underline"
                  >
                    Click to upload
                  </button>
                  {' '}or drag and drop
                </p>
                
                <p className="text-sm text-gray-500 mb-6">
                  SVG, PNG, JPG or GIF (max. 800×400px)
                </p>
                
                <div className="w-full max-w-xs">
                  <div className="relative py-4">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-gray-50 text-gray-500">OR</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={onButtonClick}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
                  >
                    Browse Files
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <File className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <p className="text-sm font-semibold text-green-800">Upload Successful</p>
                    </div>
                    <p className="text-sm font-medium text-gray-800 truncate">{uploadedFile.name}</p>
                    <p className="text-xs text-gray-500 mt-1">{uploadedFile.size}</p>
                  </div>
                </div>
                <button
                  onClick={removeFile}
                  className="ml-4 p-1 hover:bg-red-100 rounded-full transition-colors duration-200 flex-shrink-0"
                >
                  <X className="w-5 h-5 text-red-600" />
                </button>
              </div>
              
              <button
                onClick={removeFile}
                className="mt-4 w-full bg-white hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-lg border border-gray-300 transition-colors duration-200"
              >
                Upload Another File
              </button>
            </div>
          )}
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <p className="text-sm text-blue-800">
              <span className="font-semibold">💡 Tip:</span> For best results, use high-quality images with clear resolution.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}