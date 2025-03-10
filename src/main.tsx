import { createRoot } from 'react-dom/client'
import '@/assets/css/index.css';
import '@/assets/css/App.css';
import App from './App'
import '@/assets/css/min_ff.css';
import 'primeicons/primeicons.css';
import '@/assets/css/svg_min.css';

createRoot(document.getElementById("root")).render(<App />);
