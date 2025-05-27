import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { store } from './store';
import { Provider } from 'react-redux';

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);

  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file."
  );
}

if ('serviceWorker' in navigator) {
  // регистрация сервис-воркера
  navigator.serviceWorker
    .register('/service-worker.js')
    .then((reg) => {
      reg.onupdatefound = () => {
        const installingWorker = reg.installing;

        if (installingWorker) {
          installingWorker.onstatechange = () => {
            if (
              installingWorker.state === 'installed' &&
              navigator.serviceWorker.controller
            ) {
              // Новая версия сервис-воркера доступна
              console.log('New service worker version available');
            }
          };
        }
      };
    })
    .catch((err) => console.error('service worker not registered', err));
}
