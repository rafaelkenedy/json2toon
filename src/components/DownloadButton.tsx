import React from 'react';

interface DownloadButtonProps {
    data: unknown;
    fileName: string;
}

export const DownloadButton: React.FC<DownloadButtonProps> = ({ data, fileName }) => {
    const handleDownload = () => {
        // If data is a string (TOON format), use it directly. If object, stringify it.
        const content = typeof data === 'string' ? data : JSON.stringify(data, null, 2);
        const type = typeof data === 'string' ? 'text/plain' : 'application/json';

        const blob = new Blob([content], { type });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return (
        <button
            onClick={handleDownload}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors font-semibold shadow-sm"
        >
            Download Toon File
        </button>
    );
};
