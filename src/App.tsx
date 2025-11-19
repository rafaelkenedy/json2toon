import { useState, useEffect } from 'react';
import { Converter } from './components/Converter';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
          Toon Converter
        </h1>
        <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500 dark:text-gray-400">
          Transform your JSON files into Toon format instantly.
        </p>
      </div>

      <Converter darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />

      <footer className="mt-auto py-6 text-center text-gray-400 dark:text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Toon Converter. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
