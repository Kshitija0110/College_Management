import React, { useState, useRef } from 'react';
import { Upload, FileText, X, Check } from 'lucide-react';

function Body() {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === 'application/pdf') {
      setFile(droppedFile);
    }
  };

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
    }
  };

  const handleUpload = () => {
    if (file) {
      // Here you would typically handle the file upload to your backend
      console.log('Uploading file:', file);
      // For demo purposes, we'll just show an alert
      alert('File uploaded successfully!');
    }
  };

  const removeFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-semibold text-gray-800">Upload Assignment</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          {/* Upload Section */}
          <div
            className={`border-2 border-dashed rounded-lg p-8 transition-colors ${
              isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="mt-4">
                <label htmlFor="file-upload" className="cursor-pointer">
                  <span className="mt-2 block text-sm font-medium text-gray-900">
                    Drop your PDF file here, or{' '}
                    <span className="text-blue-600 hover:text-blue-500">browse</span>
                  </span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept=".pdf"
                    onChange={handleFileSelect}
                  />
                </label>
                <p className="text-xs text-gray-500 mt-2">PDF files only, up to 10MB</p>
              </div>
            </div>
          </div>

          {/* File Preview */}
          {file && (
            <div className="mt-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-6 w-6 text-blue-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{file.name}</p>
                      <p className="text-xs text-gray-500">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={removeFile}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={handleUpload}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Upload File
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Instructions */}
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-900">Instructions:</h3>
            <ul className="mt-2 text-sm text-gray-500 list-disc list-inside space-y-1">
              <li>Only PDF files are accepted</li>
              <li>Maximum file size is 10MB</li>
              <li>Make sure your file is properly formatted</li>
              <li>Double-check your submission before uploading</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Body;