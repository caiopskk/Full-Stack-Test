import React from 'react';
import { FileUploadProps } from '../types/fileUpload';
import { ArrowUpTrayIcon } from '@heroicons/react/20/solid';

const FileUpload: React.FC<FileUploadProps> = ({
  onFileUpload,
  'data-testid': testId
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      onFileUpload(event.target.files[0]);
    }
  };

  return (
    <label className="btn-upload" data-testid={testId}>
      <div>
        <ArrowUpTrayIcon className="upload-icon" />
      </div>
      Upload CSV File
      <input type="file" onChange={handleChange} />
    </label>
  );
};

export default FileUpload;
