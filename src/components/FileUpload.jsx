import React, { useRef, useState } from 'react';
import Button from './Button';
import { Upload } from 'lucide-react';

const FileUpload = ({ label, onFileSelect, multiple = false }) => {
  const fileInputRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
    if (onFileSelect) {
      onFileSelect(multiple ? files : files[0]);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="form-group file-upload-container">
      {label && <label>{label}</label>}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        multiple={multiple}
        style={{ display: 'none' }}
      />
      <Button type="button" onClick={handleButtonClick} variant="outline">
        <Upload size={18} style={{ marginRight: '8px' }} />
        {multiple ? 'Upload Files' : 'Upload File'}
      </Button>
      <div className="file-list">
        {selectedFiles.length > 0 ? (
          selectedFiles.map((file, index) => (
            <p key={index}>{file.name}</p>
          ))
        ) : (
          <p>No file chosen</p>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
