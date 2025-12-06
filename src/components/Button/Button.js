import CSS from "./button.css?inline"; //⚠️ WARNING ONLY VITE
const buttonCSS = new CSSStyleSheet();
buttonCSS.replaceSync(CSS);

import buttonTemplate from "./buttonTemplate.js";

/**
 * Button - Web Component que dispara custom event ao clique
 * @class Button
 * @extends {HTMLElement}
 * @example
 * <wc-button data-pressed="false" data-value="0" data-type="number"></wc-button>
 */
class Button extends HTMLElement {
    #button = null;
    #value = null;
    #type = null;

    constructor() {
        super();
        const root = this.attachShadow({ mode: "open" });
        root.adoptedStyleSheets.push(buttonCSS);
        root.appendChild(buttonTemplate.content.cloneNode(true));
        this.#button = root.querySelector("button");
        this.#value = this.getAttribute("data-value");
        this.#type = this.getAttribute("data-type"); //[operator, number]
    }

    /**
     * Configura o texto do botão e adiciona listener de clique
     */
    connectedCallback() {
        this.#button.innerText = this.#value;
        this.#button.addEventListener("click", this);
    }

    /**
     * Remove o listener de clique ao remover o componente do DOM
     */
    disconnectedCallback() {
        this.#button.removeEventListener("click", this);
    }

    /**
     * Re-adiciona listener ao mover para novo documento
     */
    adoptedCallback() {
        this.#button.addEventListener("click", this);
    }

    /**
     * Protocolo handleEvent - chamado automaticamente pelo navegador
     * @param {Event} event - Evento nativo do navegador
     */
    handleEvent(event) {
        const events = {
            click: this.handleClick(event),
        };
        events[event.type];
    }

    /**
     * Dispara custom event com valor e tipo do botão
     */
    handleClick() {
        const customEvent = new CustomEvent("button-click", {
            detail: {
                value: this.#value,
                type: this.#type,
            },
            bubbles: true,
            composed: true,
        });
        this.dispatchEvent(customEvent);
    }
}

customElements.define("wc-button", Button);
export { Button };
