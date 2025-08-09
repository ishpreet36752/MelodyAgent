import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Silence noisy WebGL shader warnings from ANGLE/Three.js in development only
if (import.meta.env.DEV) {
  const originalWarn = console.warn.bind(console);
  const originalError = console.error.bind(console);
  const shouldSuppress = (args: unknown[]): boolean => {
    const first = typeof args[0] === 'string' ? args[0] : '';
    return first.includes('THREE.WebGLProgram: Program Info Log');
  };
  console.warn = (...args: unknown[]) => {
    if (shouldSuppress(args)) return;
    originalWarn(...args);
  };
  console.error = (...args: unknown[]) => {
    if (shouldSuppress(args)) return;
    originalError(...args);
  };
}

createRoot(document.getElementById("root")!).render(<App />);
