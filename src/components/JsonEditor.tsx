import React from 'react';

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
            <textarea
                className={`flex-1 w-full p-4 font-mono text-sm border rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all
          ${error ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50'}
          ${readOnly ? 'bg-gray-100 text-gray-600 cursor-not-allowed' : 'text-gray-800'}
        `}
                value={value}
                onChange={(e) => onChange && onChange(e.target.value)}
                readOnly={readOnly}
                spellCheck={false}
                placeholder={readOnly ? '' : 'Paste your JSON here...'}
            />
            {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>
    );
};
