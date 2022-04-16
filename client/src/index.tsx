import React from 'react';
import { createRoot } from 'react-dom/client';
import { createGlobalStyle } from 'styled-components';
import App from './App';

import '@patternfly/patternfly/patternfly.css';

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
  }
`;

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <GlobalStyles />
    <App />
  </React.StrictMode>
);
