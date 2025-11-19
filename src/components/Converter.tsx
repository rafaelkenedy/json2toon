import React, { useState, useEffect } from 'react';
import { FileUpload } from './FileUpload';
import { DownloadButton } from './DownloadButton';
import { JsonEditor } from './JsonEditor';
import { convertJsonToToon } from '../utils/toonConverter';

export const Converter: React.FC = () => {
    const [inputJson, setInputJson] = useState<string>('');
    const [outputJson, setOutputJson] = useState<string>('');
    const [fileName, setFileName] = useState<string>('data.toon.json');
    const [error, setError] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<'upload' | 'text'>('upload');

    useEffect(() => {
        if (!inputJson) {
            setOutputJson('');
            setError(null);
            return;
        }

        try {
            const parsed = JSON.parse(inputJson);
            const converted = convertJsonToToon(parsed);
            // converted is already a string from @toon-format/toon
            setOutputJson(converted);
            setError(null);
        } catch (err) {
            setError('Invalid JSON');
            // Don't clear output to allow user to fix input without losing context
        }
    }, [inputJson]);

    const handleFileUpload = (file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target?.result as string;
            setInputJson(text);
            setFileName(file.name.replace('.json', '.toon.json'));
            setViewMode('text'); // Switch to text view to show result
        };
        reader.readAsText(file);
    };

    return (
        <div className="flex flex-col items-center gap-6 p-6 bg-white rounded-xl shadow-lg w-full max-w-6xl h-[80vh]">
            <div className="flex justify-between w-full items-center border-b pb-4">
                <h2 className="text-2xl font-bold text-gray-800">JSON to Toon Converter</h2>
                <div className="flex gap-2">
                    <button
                        onClick={() => setViewMode('upload')}
                        className={`px-4 py-2 rounded-md transition-colors ${viewMode === 'upload' ? 'bg-blue-100 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        Upload File
                    </button>
                    <button
                        onClick={() => setViewMode('text')}
                        className={`px-4 py-2 rounded-md transition-colors ${viewMode === 'text' ? 'bg-blue-100 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        Text Editor
                    </button>
                </div>
            </div>

            {viewMode === 'upload' ? (
                <div className="flex-1 flex flex-col items-center justify-center w-full">
                    <FileUpload onFileUpload={handleFileUpload} />
                    <p className="mt-4 text-gray-500">or switch to Text Editor to paste JSON</p>
                </div>
            ) : (
                <div className="flex-1 flex gap-4 w-full min-h-0">
                    <div className="flex-1 flex flex-col min-h-0">
                        <JsonEditor
                            label="Input JSON"
                            value={inputJson}
                            onChange={setInputJson}
                            error={error}
                        />
                    </div>
                    <div className="flex-1 flex flex-col min-h-0">
                        <JsonEditor
                            label="Toon Output"
                            value={outputJson}
                            readOnly={true}
                        />
                    </div>
                </div>
            )}

            {outputJson && !error && (
                <div className="flex gap-4 pt-4 border-t w-full justify-end">
                    <DownloadButton data={outputJson} fileName={fileName} />
                </div>
            )}
        </div>
    );
};
