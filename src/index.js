import vanillaPhoneTextBox from "./vanillaPhoneTextBox.js";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ReactPhoneTextBox from "./ReactPhoneTextBox.js";

vanillaPhoneTextBox(document.getElementById("phone"));

const rootElement = document.getElementById("reactPhoneTextBox");
const root = createRoot(rootElement);

root.render(
    <StrictMode>
        <ReactPhoneTextBox />
    </StrictMode>
);
