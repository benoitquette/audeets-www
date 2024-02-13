import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'simplebar/dist/simplebar.css';
import { Provider as ReduxProvider } from 'react-redux';
import '~/assets/third-party/apex-chart.css';
import App from '~/App';
import { store } from '~/store';

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <StrictMode>
    <ReduxProvider store={store}>
      <BrowserRouter basename="/">
        <App />
      </BrowserRouter>
    </ReduxProvider>
  </StrictMode>
);
