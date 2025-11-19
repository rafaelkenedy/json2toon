import React, { useState } from 'react';
import { FileUpload } from './FileUpload';
import { DownloadButton } from './DownloadButton';
import { JsonEditor } from './JsonEditor';
import { convertJsonToToon } from '../utils/toonConverter';

interface ConverterProps {
    darkMode: boolean;
    toggleDarkMode: () => void;
}

export const Converter: React.FC<ConverterProps> = ({ darkMode, toggleDarkMode }) => {
    const [inputJson, setInputJson] = useState<string>('');
    const [outputJson, setOutputJson] = useState<string>('');
    const [fileName, setFileName] = useState<string>('data.toon.json');
    const [error, setError] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<'upload' | 'text'>('upload');

    const processJson = (json: string) => {
        if (!json) {
            setOutputJson('');
            setError(null);
            return;
        }

        try {
            const parsed = JSON.parse(json);
            const converted = convertJsonToToon(parsed);
            setOutputJson(converted);
            setError(null);
        } catch {
            setError('Invalid JSON');
            // Don't clear output to allow user to fix input without losing context
        }
    };

    const handleInputChange = (value: string) => {
        setInputJson(value);
        processJson(value);
    };

    const handleFileUpload = (file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target?.result as string;
            setInputJson(text);
            setFileName(file.name.replace('.json', '.toon.json'));
            processJson(text);
            setViewMode('text'); // Switch to text view to show result
        };
        reader.readAsText(file);
    };

    return (
        <div className="flex flex-col items-center gap-6 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-6xl h-[80vh] transition-colors duration-200">
            <div className="flex justify-between w-full items-center border-b dark:border-gray-700 pb-4">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">JSON to Toon Converter</h2>
                <div className="flex items-center gap-4">
                    <button
                        onClick={toggleDarkMode}
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                        aria-label="Toggle dark mode"
                        title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                    >
                        <svg
                            className={`w-6 h-6 transition-colors duration-200 ${darkMode ? 'text-gray-400' : 'text-yellow-500'}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                    </button>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setViewMode('upload')}
                            className={`px-4 py-2 rounded-md transition-colors ${viewMode === 'upload'
                                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200 font-medium'
                                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                }`}
                        >
                            Upload File
                        </button>
                        <button
                            onClick={() => setViewMode('text')}
                            className={`px-4 py-2 rounded-md transition-colors ${viewMode === 'text'
                                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200 font-medium'
                                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                }`}
                        >
                            Text Editor
                        </button>
                    </div>
                </div>
            </div>

            {viewMode === 'upload' ? (
                <div className="flex-1 flex flex-col items-center justify-center w-full">
                    <FileUpload onFileUpload={handleFileUpload} />
                    <p className="mt-4 text-gray-500 dark:text-gray-400">or switch to Text Editor to paste JSON</p>
                </div>
            ) : (
                <div className="flex-1 flex gap-4 w-full min-h-0">
                    <div className="flex-1 flex flex-col min-h-0">
                        <JsonEditor
                            label="Input JSON"
                            value={inputJson}
                            onChange={handleInputChange}
                            error={error}
                            darkMode={darkMode}
                        />
                    </div>
                    <div className="flex-1 flex flex-col min-h-0">
                        <JsonEditor
                            label="Toon Output"
                            value={outputJson}
                            readOnly={true}
                            darkMode={darkMode}
                        />
                    </div>
                </div>
            )}

            {outputJson && !error && (
                <div className="flex gap-4 pt-4 border-t dark:border-gray-700 w-full justify-end">
                    <DownloadButton data={outputJson} fileName={fileName} />
                </div>
            )}
        </div>
    );
};
