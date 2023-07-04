import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import vanillaPhoneTextBox from './vanillaPhoneTextBox';
import ReactPhoneTextBox from './ReactPhoneTextBox';

vanillaPhoneTextBox(document.getElementById('phone'));

const rootElement = document.getElementById('reactPhoneTextBox');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <ReactPhoneTextBox />
  </StrictMode>,
);
