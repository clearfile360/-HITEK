import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { registerServiceWorker } from './serviceWorkerRegistration';

// Register service worker for offline catalog caching in Vaniyambadi
registerServiceWorker();

createRoot(document.getElementById('root')!).render(<App />);
