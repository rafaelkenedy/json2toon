import React, { useCallback } from 'react';

interface FileUploadProps {
    onFileUpload: (file: File) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
    const handleDrop = useCallback(
        (e: React.DragEvent<HTMLDivElement>) => {
            e.preventDefault();
            e.stopPropagation();
            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                onFileUpload(e.dataTransfer.files[0]);
            }
        },
        [onFileUpload]
    );

    const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files && e.target.files[0]) {
                onFileUpload(e.target.files[0]);
            }
        },
        [onFileUpload]
    );

    return (
        <div
            className="flex flex-col items-center justify-center w-full max-w-md p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
        >
            <input
                type="file"
                accept=".json"
                className="hidden"
                id="file-upload"
                onChange={handleChange}
            />
            <label htmlFor="file-upload" className="flex flex-col items-center cursor-pointer">
                <svg
                    className="w-12 h-12 text-gray-400 dark:text-gray-500 mb-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    ></path>
                </svg>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                    Drag & drop a JSON file here, or click to select
                </span>
            </label>
        </div>
    );
};
