import React from 'react';
import Editor from '@monaco-editor/react';

interface JsonEditorProps {
    value: string;
    onChange?: (value: string) => void;
    readOnly?: boolean;
    label: string;
    error?: string | null;
}

export const JsonEditor: React.FC<JsonEditorProps> = ({
    value,
    onChange,
    readOnly = false,
    label,
    error,
}) => {
    return (
        <div className="flex flex-col h-full w-full">
            <label className="mb-2 text-sm font-medium text-gray-700">{label}</label>
            <div className={`flex-1 w-full border rounded-lg overflow-hidden transition-all ${error ? 'border-red-500' : 'border-gray-300'
                }`}>
                <Editor
                    height="100%"
                    defaultLanguage="json"
                    value={value}
                    theme="vs-dark"
                    onChange={(value) => onChange && onChange(value || '')}
                    options={{
                        readOnly,
                        minimap: { enabled: false },
                        fontSize: 14,
                        scrollBeyondLastLine: false,
                        automaticLayout: true,
                        wordWrap: 'on',
                        formatOnPaste: true,
                        formatOnType: true,
                    }}
                />
            </div>
            {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>
    );
};
