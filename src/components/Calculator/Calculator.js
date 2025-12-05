/*----------------------------------------CSS CONFIG ONLY VITE----------------------------------------*/
import CSS from "./Calculator.css?inline";
/** @type {CSSStyleSheet} */
const CalculatorCSS = new CSSStyleSheet();
CalculatorCSS.replaceSync(CSS);
/*----------------------------------------END CSS CONFIG----------------------------------------------*/

/** @type {HTMLTemplateElement} */
import CalculatorTemplate from "./CalculatorTemplate.js";

/**
 * Calculator - Web Component customizado
 *
 * Um componente web reutilizável que encapsula lógica, estrutura e estilos
 * utilizando Shadow DOM para isolamento de estilo.
 *
 * @class Calculator
 * @extends {HTMLElement}
 *
 * @example
 * // Uso básico no HTML
 * <web-component data-attr="value"></web-component>
 *
 * // Uso com JavaScript
 * const component = document.createElement('web-component');
 * component.setAttribute('data-attr', 'value');
 * document.body.appendChild(component);
 *
 * @property {string} data-attr - Atributo observado que controla o comportamento do componente
 */
class Calculator extends HTMLElement {
    /**
     * Construtor do Calculator
     *
     * Inicializa o Shadow DOM em modo 'open', aplica os estilos encapsulados
     * e insere o template HTML.
     */
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.adoptedStyleSheets.push(CalculatorCSS);
        shadowRoot.appendChild(CalculatorTemplate.content.cloneNode(true));
    }

    /**
     * Lista de atributos que o componente deve observar
     *
     * Qualquer mudança nesses atributos dispara o método attributeChangedCallback
     *
     * @static
     * @returns {string[]} Array com os nomes dos atributos observados
     */
    static get observedAttributes() {
        return ["data-attr"];
    }

    /**
     * Callback disparado quando o componente é inserido no DOM
     *
     * Útil para:
     * - Inicializar listeners de eventos
     * - Fazer requisições HTTP
     * - Executar lógica que depende do componente estar no DOM
     *
     * @memberof Calculator
     */
    connectedCallback() {
        console.log("Calculator added to the DOM.");
    }

    /**
     * Callback disparado quando o componente é removido do DOM
     *
     * Útil para:
     * - Remover listeners de eventos
     * - Limpar timers/intervals
     * - Liberar recursos
     *
     * @memberof Calculator
     */
    disconnectedCallback() {
        console.log("Calculator removed from the DOM.");
    }

    /**
     * Callback disparado quando o componente é movido para um novo documento
     *
     * Pode ser útil para sincronizar estado com o novo documento
     *
     * @memberof Calculator
     */
    adoptedCallback() {
        console.log("Calculator moved to a new document.");
    }

    /**
     * Callback disparado quando um atributo observado é alterado
     *
     * @memberof Calculator
     * @param {string} name - Nome do atributo alterado
     * @param {string|null} oldValue - Valor anterior do atributo
     * @param {string|null} newValue - Novo valor do atributo
     */
    attributeChangedCallback(name, oldValue, newValue) {
        console.log(`Attribute: ${name} changed from ${oldValue} to ${newValue}`);
    }
}
customElements.define("wc-calculator", Calculator);
export { Calculator };
