# JSON to Toon Converter

A modern, React-based web application that converts JSON files into the "Token-Oriented Object Notation" (TOON) format. Features a beautiful, IDE-like interface with dark mode support.

## Features

- **File Upload**: Drag-and-drop or select JSON files for conversion.
- **IDE-like Editor**: Real-time JSON editing with syntax highlighting using Monaco Editor (VS Code's editor).
- **Split View**: Side-by-side comparison of input JSON and output TOON.
- **Dark/Light Mode**: Toggle between themes for comfortable viewing in any lighting.
- **Instant Conversion**: Powered by the official `@toon-format/toon` library.
- **Download**: Easily download the converted `.toon.json` files.

## Technologies Used

- **Frontend**: React, TypeScript, Vite
- **Styling**: TailwindCSS
- **Editor**: `@monaco-editor/react`
- **Conversion**: `@toon-format/toon`

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/rafaelkenedy/json2toon.git
   cd json2toon
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`.

## Usage

1. **Upload Mode**: Click "Upload File" or drag a JSON file onto the drop zone. The app will automatically convert it and switch to the text editor view.
2. **Text Editor Mode**: Paste your JSON directly into the left pane. The converted TOON format will appear instantly in the right pane.
3. **Download**: Click the "Download Toon File" button to save the result.
4. **Theme**: Use the Sun/Moon icon in the top right to toggle between light and dark modes.

## License

MIT
