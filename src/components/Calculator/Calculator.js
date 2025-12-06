import CSS from "./calculator.css?inline"; //⚠️ WARNING ONLY VITE
const calculatorCSS = new CSSStyleSheet();
calculatorCSS.replaceSync(CSS);

import calculatorTemplate from "./calculatorTemplate.js";

/**
 * Calculator - Web Component que gerencia cálculos
 * @class Calculator
 * @extends {HTMLElement}
 */
class Calculator extends HTMLElement {
    #keyboard = null;
    #display = null;
    constructor() {
        super();
        const root = this.attachShadow({ mode: "open" });
        root.adoptedStyleSheets.push(calculatorCSS);
        root.appendChild(calculatorTemplate.content.cloneNode(true));
        this.#keyboard = root.querySelector(".keyboard");
        this.#display = root.querySelector("wc-display");
    }

    /**
     * Inicializa os listeners de eventos
     */
    connectedCallback() {
        this.listeners();
    }

    /**
     * Remove listeners ao desmontar
     */
    disconnectedCallback() {
        this.removeEventListener("button-click", this.onButtonClick);
        document.removeEventListener("keydown", this.onKeyDown);
    }

    /**
     * Re-adiciona listeners ao mover para novo documento
     */
    adoptedCallback() {
        this.listeners();
    }

    /**
     * Captura custom event "button-click" e exibe valor no console
     */
    onButtonClick = (event) => {
        console.log("Button clicado:", event.detail);
    };

    /**
     * Captura tecla pressionada e exibe no console
     */
    onKeyDown = (event) => {
        console.log("Tecla pressionada:", event.key);
    };

    handleClick({ target }) {
        target.classList.add("pressed");
        setTimeout(() => {
            target.classList.remove("pressed");
        }, 500);
    }

    listeners() {
        this.addEventListener("button-click", this.onButtonClick);
        document.addEventListener("keydown", this.onKeyDown);
        this.#keyboard.addEventListener("click", this.handleClick);
    }
}
customElements.define("wc-calculator", Calculator);
export { Calculator };
