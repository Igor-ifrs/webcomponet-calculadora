import keyboardTemplate from "./keyboardTemplate.js";
import KeyValidator from "./KeyValidator.js";
const keyValidator = new KeyValidator();

import CSS from "./keyboard.css?inline"; //⚠️ WARNING ONLY VITE
const keyboardstyle = new CSSStyleSheet();
keyboardstyle.replaceSync(CSS);

class Keyboard extends HTMLElement {
    /** @type {HTMLElement} 📁The HTML container that holds the keyboard buttons and receives event delegation. */
    #keyboardContainer = null;
    constructor() {
        super();
        const root = this.attachShadow({ mode: "open" });
        root.adoptedStyleSheets.push(keyboardstyle);
        root.appendChild(keyboardTemplate.content.cloneNode(true));
        this.#keyboardContainer = root.querySelector(".keyboard_container");
    }

    connectedCallback() {
        this.listeners();
    }

    disconnectedCallback() {
        this.#keyboardContainer.removeEventListener("click", this.#processKey);
        document.removeEventListener("keydown", this.#processKey);
    }

    /**
     * Despacha evento customizado com os dados do botão
     * @param {Object} data - Dados a serem enviados no evento
     */
    dispatchKeyboardEvent(data) {
        const event = new CustomEvent("keyboardValue", {
            detail: {
                data,
            },
            bubbles: true,
            composed: true,
        });
        this.dispatchEvent(event);
    }

    /** @param {Event} */
    #processKey = (event) => {
        console.error(event);

        const key = keyValidator.validate(event);
        if (!key) return;
        if (key === "Enter") event.preventDefault();
        this.dispatchKeyboardEvent(key);
    };

    listeners() {
        document.addEventListener("keydown", this.#processKey);
        this.#keyboardContainer.addEventListener("click", this.#processKey);
    }
}

customElements.define("wc-keyboard", Keyboard);
export { Keyboard };
