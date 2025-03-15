import React from 'react';
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from "react-router-dom";
import App from './App'
import { Provider } from 'react-redux'
import { store } from './redux/store'

const rootElem = document.getElementById('root');

if (rootElem) {
  const root = createRoot(rootElem);

  root.render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  );
}



