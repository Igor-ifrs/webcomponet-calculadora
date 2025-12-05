import CSS from "./button.css?inline"; //⚠️ WARNING ONLY VITE
const buttonCSS = new CSSStyleSheet();
buttonCSS.replaceSync(CSS);

import buttonTemplate from "./buttonTemplate.js";

/**
 * Button - Web Component customizado
 *
 * Um componente web reutilizável que encapsula lógica, estrutura e estilos
 * utilizando Shadow DOM para isolamento de estilo.
 *
 * @class Button
 * @extends {HTMLElement}
 *
 * @example
 * Uso básico no HTML
 * <wc-button data-value="0" data-type="[number,operator]"></web-component>
 *
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
     * Callback disparado quando o componente é inserido no DOM
     *
     * Útil para:
     * - Inicializar listeners de eventos
     * - Fazer requisições HTTP
     * - Executar lógica que depende do componente estar no DOM
     *
     * @memberof Button
     */
    connectedCallback() {
        this.#button.innerText = this.#value;
        this.listener();
        console.log("Button added to the DOM.");
    }

    /**
     * Callback disparado quando o componente é removido do DOM
     *
     * Útil para:
     * - Remover listeners de eventos
     * - Limpar timers/intervals
     * - Liberar recursos
     *
     * @memberof Button
     */
    disconnectedCallback() {
        console.log("Button removed from the DOM.");
    }

    /**
     * Callback disparado quando o componente é movido para um novo documento
     *
     * Pode ser útil para sincronizar estado com o novo documento
     *
     * @memberof Button
     */
    adoptedCallback() {
        console.log("Button moved to a new document.");
    }

    /**
     * Callback disparado quando um atributo observado é alterado
     *
     * @memberof Button
     * @param {string} name - Nome do atributo alterado
     * @param {string|null} oldValue - Valor anterior do atributo
     * @param {string|null} newValue - Novo valor do atributo
     */
    attributeChangedCallback(name, oldValue, newValue) {
        console.log(`Attribute: ${name} changed from ${oldValue} to ${newValue}`);
    }

    handleClick() {
        console.log(this);

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

    listener() {
        this.addEventListener("click", this.handleClick);
    }
}
customElements.define("wc-button", Button);
export { Button };
