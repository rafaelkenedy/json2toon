import { Converter } from './components/Converter';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
          Toon Converter
        </h1>
        <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
          Transform your JSON files into Toon format instantly.
        </p>
      </div>

      <Converter />

      <footer className="mt-auto py-6 text-center text-gray-400 text-sm">
        <p>&copy; {new Date().getFullYear()} Toon Converter. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
